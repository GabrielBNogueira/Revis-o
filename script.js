// Inicialização de variáveis
const tabela = document.querySelector('tbody');
const form = document.querySelector('form');
let doacoes = JSON.parse(localStorage.getItem('doacoes')) || [];
let editandoId = null;

// Impacto social por tipo de doação
const impactoSocial = {
  roupas: 2,
  brinquedos: 3,
  alimentos: 4
};

// Função para renderizar a tabela
function renderizar() {
  tabela.innerHTML = '';

  doacoes.forEach((doacao, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${doacao.nome}</td>
      <td>${doacao.tipo}</td>
      <td>${doacao.quantidade}</td>
      <td>${doacao.infantil ? 'Sim' : 'Não'}</td>
      <td>${doacao.quantidade * impactoSocial[doacao.tipo]}</td>
      <td>
        <button onclick="editar(${index})">Editar</button>
        <button onclick="excluir(${index})">Excluir</button>
      </td>
    `;
    tabela.appendChild(tr);
  });
}

// Evento de envio do formulário
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const novaDoacao = {
    nome: document.getElementById('nome').value,
    tipo: document.getElementById('tipo').value,
    quantidade: parseInt(document.getElementById('quantidade').value),
    infantil: document.getElementById('infantil').checked
  };

  if (editandoId !== null) {
    doacoes[editandoId] = novaDoacao;
    editandoId = null;
  } else {
    doacoes.push(novaDoacao);
  }

  localStorage.setItem('doacoes', JSON.stringify(doacoes));
  form.reset();
  renderizar();
});

// Função para editar uma doação
function editar(index) {
  const d = doacoes[index];
  document.getElementById('nome').value = d.nome;
  document.getElementById('tipo').value = d.tipo;
  document.getElementById('quantidade').value = d.quantidade;
  document.getElementById('infantil').checked = d.infantil;
  editandoId = index;
}

// Função para excluir uma doação
function excluir(index) {
  if (confirm('Deseja excluir esta doação?')) {
    doacoes.splice(index, 1);
    localStorage.setItem('doacoes', JSON.stringify(doacoes));
    renderizar();
  }
}

// Renderizar doações ao carregar a página
renderizar();
