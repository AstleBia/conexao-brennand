package com.conexao_brennand.conexao_brennand.repository;

import com.conexao_brennand.conexao_brennand.model.Usuario;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

//feito por Vinicius
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);

    boolean existsByEmail(String email);
}
