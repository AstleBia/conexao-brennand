package com.conexao_brennand.conexao_brennand.repository.projection;

public interface FeedbackWithUserProjection {

    Long getId();         
    Long getUsuarioId();  

    String getNome();      
    String getCidade();   
    String getSexo();      
    String getDataNascimento(); 

    int getAtendimento();
    int getAcessibilidade();
    int getInfra();
    int getSeguranca();
    int getLimpeza();
    String getComentario();
}
