package com.conexao_brennand.conexao_brennand.dto;

import com.conexao_brennand.conexao_brennand.model.Admin;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class AdminDTO {
    private String nome;
    private String email;

    public AdminDTO(Admin admin){
        this.nome = admin.getNome();
        this.email = admin.getEmail();
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
}
