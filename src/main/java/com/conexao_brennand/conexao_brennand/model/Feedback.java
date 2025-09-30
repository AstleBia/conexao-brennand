package com.conexao_brennand.conexao_brennand.model;

import jakarta.persistence.*;

@Entity
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private int atendimento;

    @Column(nullable = false)
    private int acessibilidade;

    @Column(nullable = false)
    private int infra;

    @Column(nullable = false)
    private int seguranca;

    @Column(nullable = false)
    private int limpeza;

    @Column(length = 250)
    private String comentario;
}
