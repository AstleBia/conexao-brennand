package com.conexao_brennand.conexao_brennand.controller;

import com.conexao_brennand.conexao_brennand.dto.AdminDTO;
import com.conexao_brennand.conexao_brennand.dto.AdminLogin;
import com.conexao_brennand.conexao_brennand.model.Admin;
import com.conexao_brennand.conexao_brennand.service.AdminService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AdminController.class)
@AutoConfigureMockMvc(addFilters = false)
class AdminControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AdminService adminService;

    @Test
    @DisplayName("Deve cadastrar um novo admin")
    void deveCadastrarAdmin() throws Exception {
        Admin adminSalvo = new Admin();
        adminSalvo.setId(1L); // ajuste se o nome do setter for diferente

        when(adminService.cadastro(any(Admin.class))).thenReturn(adminSalvo);

        mockMvc.perform(post("/admin/cadastro")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L));
    }

    @Test
    @DisplayName("Deve realizar login com sucesso e retornar mensagem")
    void deveRealizarLoginComSucesso() throws Exception {
        when(adminService.login(any(AdminLogin.class))).thenReturn(true);

        mockMvc.perform(post("/admin/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isOk())
                .andExpect(content().string("Login feito com sucesso"));
    }

    @Test
    @DisplayName("Deve retornar corpo vazio quando login falhar")
    void deveRetornarVazioQuandoLoginFalhar() throws Exception {
        when(adminService.login(any(AdminLogin.class))).thenReturn(false);

        mockMvc.perform(post("/admin/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isOk())
                .andExpect(content().string(""));
    }

    @Test
    @DisplayName("Deve listar admins cadastrados")
    void deveListarAdmins() throws Exception {
        when(adminService.listarAdmins()).thenReturn(Collections.<AdminDTO>emptyList());

        mockMvc.perform(get("/admin"))
                .andExpect(status().isOk());

        verify(adminService).listarAdmins();
    }
}
