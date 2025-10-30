package com.conexao_brennand.conexao_brennand.controller;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.conexao_brennand.conexao_brennand.model.Feedback;
import com.conexao_brennand.conexao_brennand.service.FeedbackService;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(FeedbackController.class)
class FeedbackControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private FeedbackService feedbackService;

    @Test
    @DisplayName("Deve listar todos os feedbacks")
    void deveListarFeedbacks() throws Exception {
        Feedback f1 = new Feedback();
        f1.setId(1L);
        f1.setComentario("Ótimo projeto!");

        Feedback f2 = new Feedback();
        f2.setId(2L);
        f2.setComentario("Precisa de mais informações.");

        List<Feedback> feedbacks = Arrays.asList(f1, f2);
        when(feedbackService.listarFeedbacks()).thenReturn(feedbacks);

        mockMvc.perform(get("/feedbacks"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].comentario").value("Ótimo projeto!"))
                .andExpect(jsonPath("$[1].comentario").value("Precisa de mais informações."));
    }

    @Test
    @DisplayName("Deve criar um novo feedback")
    void deveCriarFeedback() throws Exception {
        Feedback feedback = new Feedback();
        feedback.setId(1L);
        feedback.setComentario("Ótimo projeto!");

        when(feedbackService.criarFeedback(any(Feedback.class))).thenReturn(feedback);

        mockMvc.perform(post("/feedbacks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"comentario\":\"Ótimo projeto!\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.comentario").value("Ótimo projeto!"));
    }
}

