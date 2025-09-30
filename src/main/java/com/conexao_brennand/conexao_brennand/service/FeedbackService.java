package com.conexao_brennand.conexao_brennand.service;

import com.conexao_brennand.conexao_brennand.repository.FeedbackRepository;
import org.springframework.stereotype.Service;

@Service
public class FeedbackService {
    private final FeedbackRepository feedbackRepository;
    public FeedbackService (FeedbackRepository feedbackRepository){
        this.feedbackRepository = feedbackRepository;
    }
}
