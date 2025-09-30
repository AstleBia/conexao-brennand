package com.conexao_brennand.conexao_brennand.controller;

import com.conexao_brennand.conexao_brennand.model.Feedback;
import com.conexao_brennand.conexao_brennand.service.FeedbackService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feedbacks")
class FeedbackController {
    private final FeedbackService feedbackService;
    public FeedbackController(FeedbackService feedbackService){
        this.feedbackService = feedbackService;
    }

    @GetMapping
    public List<Feedback> listar(){
        return feedbackService.listarFeedbacks();
    }
    @GetMapping("/{feedbackId}")
    public Feedback buscarPorId(@PathVariable long id){
        return feedbackService.buscarFeedbackId(id);
    }
    @PostMapping
    public Feedback criar(@RequestBody Feedback feedback){
        return feedbackService.criarFeedback(feedback);
    }
}
