package com.conexao_brennand.conexao_brennand.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.time.Instant;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Table(name = "respondentes", 
       uniqueConstraints = @UniqueConstraint ( name = "uk_respondentes_email", columnNames = "email" ) )

public class Respondente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Column(nullable = false)
    private String email;

    private String cidade;

    @Column(nullable = false, updatable = false)
    private Instant criadoEm = Instant.now();

    // Construtor padrão (necessário para JPA)
    protected Respondente() {}

    public Respondente(String nome, String email, String cidade) {
        this.nome = nome;
        this.email = email;
        this.cidade = cidade;
    }

    public Long getId() { return id;}

    public String getNome() { return nome;}
    public void setNome(String nome) { this.nome = nome; }

    public String getEmail() { return email;}
    public void setEmail(String email) { this.email = email; }

    public String getCidade() { return cidade;}
    public void setCidade(String cidade) { this.cidade = cidade; }

    public Instant getCriadoEm() { return criadoEm; }
}
