package com.conexao_brennand.conexao_brennand.controller;

import com.conexao_brennand.conexao_brennand.model.Respondente;
import com.conexao_brennand.conexao_brennand.services.RespondenteService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PublicController {

    private final RespondenteService respondenteService;

    public PublicController(RespondenteService respondenteService) {
        this.respondenteService = respondenteService;
    }

    // Sem DTO: recebe a entidade Respondente diretamente
    @PostMapping("/respondentes")
    public ResponseEntity<Respondente> upsertRespondente(@Valid @RequestBody Respondente body) {
        var salvo = respondenteService.upsertRespondente(body);
        return ResponseEntity.ok(salvo);
    }
}
