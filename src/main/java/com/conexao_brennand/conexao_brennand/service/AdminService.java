package com.conexao_brennand.conexao_brennand.service;

import com.conexao_brennand.conexao_brennand.dto.AdminDTO;
import com.conexao_brennand.conexao_brennand.dto.AdminLogin;
import com.conexao_brennand.conexao_brennand.model.Admin;
import com.conexao_brennand.conexao_brennand.repository.AdminRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminService {
    private final AdminRepository adminRepository;
    private BCryptPasswordEncoder passwordEncoder;
    public AdminService(AdminRepository adminRepository){
        this.adminRepository = adminRepository;
    }

    public List<AdminDTO> listarAdmins(){
        List<Admin> admins = adminRepository.findAll();
        return admins.stream()
                .map(admin -> new AdminDTO(admin))
                .collect(Collectors.toList());
    }

    public boolean login(AdminLogin adminLogin){
        Optional<Admin> admin = adminRepository.findByEmail(adminLogin.getEmail());
        if (admin.isPresent()){
            return passwordEncoder.matches(
                    adminLogin.getSenha(),
                    admin.get().getSenhaHash()
            );
        }
        return false;
    }

    public Admin cadastro(Admin admin){
        if (adminExiste(admin)){
            throw new RuntimeException("Admin já existe!");
        }
        String senhaHash = passwordEncoder.encode(admin.getSenhaHash());
        admin.setSenhaHash(senhaHash);
        return adminRepository.save(admin);
    }

    public boolean adminExiste(Admin admin){
        return adminRepository.existsByEmail(admin.getEmail());
    }
}
