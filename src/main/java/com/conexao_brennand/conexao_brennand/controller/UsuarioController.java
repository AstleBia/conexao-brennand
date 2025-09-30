package com.conexao_brennand.conexao_brennand.controller;

import com.conexao_brennand.conexao_brennand.model.Usuario;
import com.conexao_brennand.conexao_brennand.service.UsuarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    private final UsuarioService usuarioService;
    public UsuarioController(UsuarioService usuarioService){
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public List<Usuario> listar(){
        return usuarioService.listarUsuarios();
    }

    @GetMapping("/{usuarioId}")
    public Usuario buscarPorId(@PathVariable long usuarioId){
        return usuarioService.listaUsuarioId(usuarioId);
    }

    @PostMapping
    public Usuario criar(@RequestBody Usuario usuario){
        return usuarioService.criarUsuario(usuario);
    }

}
