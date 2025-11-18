package com.conexao_brennand.conexao_brennand.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoriaRankingDTO {
    private String categoria;
    private double media;
    private int quantidade;
    private int posicao;
}