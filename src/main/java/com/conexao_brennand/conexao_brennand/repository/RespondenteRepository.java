package com.conexao_brennand.conexao_brennand.repository;

import com.conexao_brennand.conexao_brennand.model.Respondente;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RespondenteRepository extends JpaRepository<Respondente, Long> {
    Optional<Respondente> findByEmail(String email);
}


// Define findByEmail para buscar por email sem escrever SQL.
// Usa Optional para forçar tratamento do “não encontrado”.