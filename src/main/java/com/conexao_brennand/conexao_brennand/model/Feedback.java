package com.conexao_brennand.conexao_brennand.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private int atendimento;
    private int acessibilidade;
    private int infra;
    private int seguranca;
    private int limpeza;
    private String comentario;
}
