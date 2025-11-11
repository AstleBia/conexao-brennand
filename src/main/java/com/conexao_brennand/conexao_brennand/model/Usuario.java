package com.conexao_brennand.conexao_brennand.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "usuario")
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(length = 50)
    private String nome;

    @Column(nullable = false, length = 30)
    private String email;

    @Column(length = 30)
    private String cidade;

    @JsonFormat(pattern="yyyy/MM/dd")
    private LocalDate dataNascimento;

    @Column(length = 30)
    private String sexo;


    public long getId() { return id;}
    public void setId(long id){
        this.id = id;
    }

    public String getNome() { return nome;}
    public void setNome(String nome) { this.nome = nome; }

    public String getEmail() { return email;}
    public void setEmail(String email) { this.email = email; }

    public String getCidade() { return cidade;}
    public void setCidade(String cidade) { this.cidade = cidade; }

    public LocalDate getNascimento(){
        return this.dataNascimento;
    }
    public void setNascimento(LocalDate dataNascimento){
        this.dataNascimento = dataNascimento;
    }

    public String getSexo(){
        return this.sexo;
    }
    public void setSexo(String sexo){
        this.sexo = sexo;
    }
}
