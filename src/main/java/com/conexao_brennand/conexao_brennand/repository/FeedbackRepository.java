package com.conexao_brennand.conexao_brennand.repository;

import com.conexao_brennand.conexao_brennand.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.Repository;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
}
