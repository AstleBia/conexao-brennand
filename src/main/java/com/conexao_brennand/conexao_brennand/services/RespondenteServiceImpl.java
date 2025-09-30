package com.conexao_brennand.conexao_brennand.services;

import com.conexao_brennand.conexao_brennand.model.Respondente;
import com.conexao_brennand.conexao_brennand.repository.RespondenteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RespondenteServiceImpl implements RespondenteService {

    private final RespondenteRepository repository;

    public RespondenteServiceImpl(RespondenteRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional
    public Respondente upsertRespondente(Respondente body) {
        if (body == null || body.getEmail() == null) {
            throw new IllegalArgumentException("Email é obrigatório.");
        }

        // email já está normalizado no setter; garanta que foi aplicado:
        body.setEmail(body.getEmail());

        var existente = repository.findByEmail(body.getEmail()).orElse(null);

        if (existente == null) {
            // criação: ignora qualquer id vindo no JSON (não temos setId)
            return repository.save(new Respondente(body.getNome(), body.getEmail(), body.getCidade()));
        } else {
            // atualização: só campos editáveis (nunca altere email/id aqui)
            existente.setNome(body.getNome());
            existente.setCidade(body.getCidade());
            return repository.save(existente);
        }
    }
}
