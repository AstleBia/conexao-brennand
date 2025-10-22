package com.conexao_brennand.conexao_brennand.service;

import com.conexao_brennand.conexao_brennand.model.Feedback;
import com.conexao_brennand.conexao_brennand.repository.FeedbackRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class FeedbackService {
    private final FeedbackRepository feedbackRepository;
    public FeedbackService (FeedbackRepository feedbackRepository){
        this.feedbackRepository = feedbackRepository;
    }

    public Feedback criarFeedback(Feedback feedback){
        return feedbackRepository.save(feedback);
    }

    public List<Feedback> listarFeedbacks(){
        return feedbackRepository.findAll();
    }

    public Feedback buscarFeedbackId(long id){
        return feedbackRepository.findById(id)
                .orElseThrow(()-> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Feedback não encontrado"
                ));
    }
    public List<Feedback> buscarFeedbackUsuarioId(long usuarioId){
        return feedbackRepository.findByUsuarioId(usuarioId);
    }

}
