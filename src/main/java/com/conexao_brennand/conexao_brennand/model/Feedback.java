package com.conexao_brennand.conexao_brennand.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name="feedback")
@NoArgsConstructor
@AllArgsConstructor
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

    @Column(name = "usuario_id")
    private Long usuarioId;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getAtendimento() {
        return atendimento;
    }

    public void setAtendimento(int atendimento) {
        this.atendimento = atendimento;
    }

    public int getAcessibilidade() {
        return acessibilidade;
    }

    public void setAcessibilidade(int acessibilidade) {
        this.acessibilidade = acessibilidade;
    }

    public int getInfra() {
        return infra;
    }

    public void setInfra(int infra) {
        this.infra = infra;
    }

    public int getSeguranca() {
        return seguranca;
    }

    public void setSeguranca(int seguranca) {
        this.seguranca = seguranca;
    }

    public int getLimpeza() {
        return limpeza;
    }

    public void setLimpeza(int limpeza) {
        this.limpeza = limpeza;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }
}
