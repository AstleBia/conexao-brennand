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
    public Feedback buscarPorId(@PathVariable long feedbackId){
        return feedbackService.buscarFeedbackId(feedbackId);
    }

    @PostMapping
    public Feedback criar(@RequestBody Feedback feedback){
        return feedbackService.criarFeedback(feedback);
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<Feedback> buscarPorUsuario(@PathVariable Long usuarioId){
        return feedbackService.buscarFeedbackUsuarioId(usuarioId);
    }
}
