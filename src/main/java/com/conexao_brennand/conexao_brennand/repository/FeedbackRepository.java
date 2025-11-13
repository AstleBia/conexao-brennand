package com.conexao_brennand.conexao_brennand.repository;

import com.conexao_brennand.conexao_brennand.model.Feedback;
import com.conexao_brennand.conexao_brennand.repository.projection.FeedbackWithUserProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByUsuarioId(Long usuarioId);

    @Query("""
        SELECT 
            f.id            AS id,
            f.usuarioId     AS usuarioId,
            u.nome          AS nome,
            u.cidade        AS cidade,
            u.sexo          AS sexo,
            u.dataNascimento AS dataNascimento,
            f.atendimento   AS atendimento,
            f.acessibilidade AS acessibilidade,
            f.infra         AS infra,
            f.seguranca     AS seguranca,
            f.limpeza       AS limpeza,
            f.comentario    AS comentario
        FROM Feedback f
        JOIN Usuario u ON f.usuarioId = u.id
        WHERE (:gender IS NULL OR LOWER(u.sexo) = LOWER(:gender))
          AND (:city   IS NULL OR LOWER(u.cidade) = LOWER(:city))
        """)
    List<FeedbackWithUserProjection> findAllWithUser(
            @Param("gender") String gender,
            @Param("city") String city
    );
}
