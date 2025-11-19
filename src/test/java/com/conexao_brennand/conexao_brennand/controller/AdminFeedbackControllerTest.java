package com.conexao_brennand.conexao_brennand.controller;

import com.conexao_brennand.conexao_brennand.dto.AdminFeedbackResponse;
import com.conexao_brennand.conexao_brennand.dto.CategoriaRankingDTO;
import com.conexao_brennand.conexao_brennand.service.FeedbackService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AdminFeedbackController.class)
@AutoConfigureMockMvc(addFilters = false)
class AdminFeedbackControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private FeedbackService feedbackService;

    @Test
    @DisplayName("Deve chamar service com os parâmetros recebidos para listar feedbacks detalhados")
    void deveListarFeedbacksDetalhadosComParametros() throws Exception {
        AdminFeedbackResponse response = new AdminFeedbackResponse();
        when(feedbackService.listarFeedbacksDetalhados("M", "Recife", 18, 40))
                .thenReturn(response);

        mockMvc.perform(get("/admin/feedbacks/detalhado")
                        .param("gender", "M")
                        .param("city", "Recife")
                        .param("minAge", "18")
                        .param("maxAge", "40"))
                .andExpect(status().isOk());

        verify(feedbackService).listarFeedbacksDetalhados("M", "Recife", 18, 40);
    }

    @Test
    @DisplayName("Deve aplicar idade padrão (0 a 120) quando não forem enviados minAge e maxAge")
    void deveAplicarIdadePadraoQuandoNaoEnviadoRange() throws Exception {
        when(feedbackService.listarFeedbacksDetalhados("F", "Olinda", 0, 120))
                .thenReturn(new AdminFeedbackResponse());

        mockMvc.perform(get("/admin/feedbacks/detalhado")
                        .param("gender", "F")
                        .param("city", "Olinda"))
                .andExpect(status().isOk());

        verify(feedbackService).listarFeedbacksDetalhados("F", "Olinda", 0, 120);
    }

    @Test
    @DisplayName("Deve calcular ranking de categorias chamando o service")
    void deveCalcularRankingCategorias() throws Exception {
        when(feedbackService.calcularRankingCategorias())
                .thenReturn(Collections.<CategoriaRankingDTO>emptyList());

        mockMvc.perform(get("/admin/feedbacks/ranking"))
                .andExpect(status().isOk());

        verify(feedbackService).calcularRankingCategorias();
    }
}
