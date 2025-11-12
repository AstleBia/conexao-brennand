package com.conexao_brennand.conexao_brennand.dto;

public class FeedbackDetalhadoDTO {

    private Long id;
    private Long usuarioId;
    private String nomeUsuario;
    private String sexo;
    private String cidade;
    private Integer idade;

    private int atendimento;
    private int acessibilidade;
    private int infra;
    private int seguranca;
    private int limpeza;

    private String comentario;

    // ----------------------------
    //     CONSTRUTOR COMPLETO
    // ----------------------------
    public FeedbackDetalhadoDTO(
            String nomeUsuario,
            String sexo,
            String cidade,
            Integer idade,
            int atendimento,
            int acessibilidade,
            int infra,
            int seguranca,
            int limpeza,
            String comentario
    ) {
        this.nomeUsuario = nomeUsuario;
        this.sexo = sexo;
        this.cidade = cidade;
        this.idade = idade;
        this.atendimento = atendimento;
        this.acessibilidade = acessibilidade;
        this.infra = infra;
        this.seguranca = seguranca;
        this.limpeza = limpeza;
        this.comentario = comentario;
    }

    // ----------------------------
    //  CONSTRUTOR VAZIO (OBRIGATÓRIO)
    // ----------------------------
    public FeedbackDetalhadoDTO() {}

    // ----------------------------
    // GETTERS E SETTERS
    // ----------------------------

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }
    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getNomeUsuario() {
        return nomeUsuario;
    }
    public void setNomeUsuario(String nomeUsuario) {
        this.nomeUsuario = nomeUsuario;
    }

    public String getSexo() {
        return sexo;
    }
    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public String getCidade() {
        return cidade;
    }
    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public Integer getIdade() {
        return idade;
    }
    public void setIdade(Integer idade) {
        this.idade = idade;
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
}
