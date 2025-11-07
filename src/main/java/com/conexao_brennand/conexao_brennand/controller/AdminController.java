package com.conexao_brennand.conexao_brennand.controller;

import com.conexao_brennand.conexao_brennand.dto.AdminDTO;
import com.conexao_brennand.conexao_brennand.dto.AdminLogin;
import com.conexao_brennand.conexao_brennand.model.Admin;
import com.conexao_brennand.conexao_brennand.service.AdminService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    private final AdminService adminService;

    public AdminController(AdminService adminService){
        this.adminService = adminService;
    }

    @PostMapping("/cadastro")
    public Admin cadastro (@RequestBody Admin admin) {
        return adminService.cadastro(admin);
    }

    @PostMapping("/login")
    public String login(@RequestBody AdminLogin adminLogin){
        if (adminService.login(adminLogin)){
            return "Login feito com sucesso";
        }
        return null;
    }

    @GetMapping
    public List<AdminDTO> listar(){
        return adminService.listarAdmins();
    }

}
