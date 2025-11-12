package com.conexao_brennand.conexao_brennand.controller;

import com.conexao_brennand.conexao_brennand.dto.AdminFeedbackResponse;
import com.conexao_brennand.conexao_brennand.service.FeedbackService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/feedbacks")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://localhost:4173"})
public class AdminFeedbackController {

    private final FeedbackService feedbackService;

    public AdminFeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @GetMapping("/detalhado")
    public AdminFeedbackResponse listarFeedbacksDetalhados(
            @RequestParam(value = "gender", required = false) String gender,
            @RequestParam(value = "city", required = false) String city,
            @RequestParam(value = "minAge", required = false) Integer minAge,
            @RequestParam(value = "maxAge", required = false) Integer maxAge
    ) {
        // Se nada vier, usamos um range bem amplo por padrão
        if (minAge == null) minAge = 0;
        if (maxAge == null) maxAge = 120;

        return feedbackService.listarFeedbacksDetalhados(gender, city, minAge, maxAge);
    }
}
