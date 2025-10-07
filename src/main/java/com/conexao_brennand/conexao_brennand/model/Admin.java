package com.conexao_brennand.conexao_brennand.model;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;


import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "admins", uniqueConstraints = {
    @UniqueConstraint(name = "uk_admin_email", columnNames = "email")
})


public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String nome;

    @Column(nullable = false, length = 160)
    private String email;

    @Column(name = "senha_hash", nullable = false, length = 100)
    private String senhaHash;

    @Column(nullable = false)
    private Boolean ativo = true;

    @Column(name = "criado_em", nullable = false,
            columnDefinition = "timestamp with time zone")
    private OffsetDateTime criadoEm = OffsetDateTime.now();

    protected Admin() { }

    public Admin(String nome, String email, String senhaHash) {
        this.nome = nome;
        this.email = email;
        this.senhaHash = senhaHash;
        this.ativo = true;
        this.criadoEm = OffsetDateTime.now();
    }

    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getEmail() { return email; }
    public String getSenhaHash() { return senhaHash; }
    public Boolean getAtivo() { return ativo; }
    public OffsetDateTime getCriadoEm() { return criadoEm; }

    public void desativar() { this.ativo = false; }
}

    

