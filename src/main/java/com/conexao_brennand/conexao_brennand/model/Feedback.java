package com.conexao_brennand.conexao_brennand.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="feedback")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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
