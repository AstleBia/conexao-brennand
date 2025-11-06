package com.conexao_brennand.conexao_brennand.model;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Entity
@Table(name = "administrador")
@NoArgsConstructor
@AllArgsConstructor

public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(length = 50)
    private String nome;

    @Column(nullable = false, length = 30)
    private String email;

    @Column(nullable = false)
    private String senhaHash;

    public long getId(){
        return this.id;
    }
    public void setId(long id){
        this.id = id;
    }

    public String getNome(){
        return this.nome;
    }
    public void setNome(String nome){
        this.nome = nome;
    }

    public String getEmail(){
        return this.email;
    }
    public void setEmail(String email){
        this.email = email;
    }

    public String getSenhaHash(){
        return this.senhaHash;
    }
    public void setSenhaHash(String senhaHash){
        this.senhaHash = senhaHash;
    }


}

    

