package com.Gabriel.Prova.Service;

import com.Gabriel.Prova.Repository.Repository;
import com.Gabriel.Prova.ENTITY.Estudante;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class service {
    @Autowired
    private Repository repository;

    public Estudante criarEstudante(Estudante estudante) {
        return repository.save(estudante);
    }

    public List<Estudante> findAll() {
        return repository.findAll();
    }

}