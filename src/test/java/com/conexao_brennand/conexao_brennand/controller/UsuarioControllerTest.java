package com.conexao_brennand.conexao_brennand.controller;

import com.conexao_brennand.conexao_brennand.model.Usuario;
import com.conexao_brennand.conexao_brennand.service.UsuarioService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UsuarioController.class)
class UsuarioControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UsuarioService usuarioService;

    @Test
    @DisplayName("Deve listar todos os usuários")
    void deveListarUsuarios() throws Exception {
        Usuario u1 = new Usuario();
        u1.setId(1L);
        u1.setNome("João");
        u1.setEmail("joao@email.com");

        Usuario u2 = new Usuario();
        u2.setId(2L);
        u2.setNome("Maria");
        u2.setEmail("maria@email.com");

        List<Usuario> usuarios = Arrays.asList(u1, u2);

        when(usuarioService.listarUsuarios()).thenReturn(usuarios);

        mockMvc.perform(get("/usuarios"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nome").value("João"))
                .andExpect(jsonPath("$[1].email").value("maria@email.com"));
    }

    @Test
    @DisplayName("Deve criar um novo usuário")
    void deveCriarUsuario() throws Exception {
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setNome("João");
        usuario.setEmail("joao@email.com");

        when(usuarioService.criarUsuario(any(Usuario.class))).thenReturn(usuario);

        mockMvc.perform(post("/usuarios")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"nome\":\"João\",\"email\":\"joao@email.com\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("João"))
                .andExpect(jsonPath("$.email").value("joao@email.com"));
    }
}

