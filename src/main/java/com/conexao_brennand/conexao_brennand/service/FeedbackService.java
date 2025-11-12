package com.conexao_brennand.conexao_brennand.service;

import com.conexao_brennand.conexao_brennand.dto.AdminFeedbackResponse;
import com.conexao_brennand.conexao_brennand.dto.FeedbackDetalhadoDTO;
import com.conexao_brennand.conexao_brennand.model.Feedback;
import com.conexao_brennand.conexao_brennand.model.Usuario;
import com.conexao_brennand.conexao_brennand.repository.FeedbackRepository;
import com.conexao_brennand.conexao_brennand.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final UsuarioRepository usuarioRepository;

    public FeedbackService(FeedbackRepository feedbackRepository,
                           UsuarioRepository usuarioRepository) {
        this.feedbackRepository = feedbackRepository;
        this.usuarioRepository = usuarioRepository;
    }

    // ------------------ MÉTODOS ORIGINAIS ------------------ //

    public Feedback criarFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public List<Feedback> listarFeedbacks() {
        return feedbackRepository.findAll();
    }

    public Feedback buscarFeedbackId(long id) {
        return feedbackRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Feedback não encontrado"
                ));
    }

    public List<Feedback> buscarFeedbackUsuarioId(long usuarioId) {
        return feedbackRepository.findByUsuarioId(usuarioId);
    }

    // ------------------ NOVO MÉTODO DETALHADO PARA ADMIN ------------------ //

    public AdminFeedbackResponse listarFeedbacksDetalhados(
            String gender,
            String city,
            Integer minAge,
            Integer maxAge
    ) {
        // Busca todos os feedbacks
        List<Feedback> feedbacks = feedbackRepository.findAll();

        // Mapeia para DTO juntando com dados do usuário e já filtrando
        List<FeedbackDetalhadoDTO> detalhados = feedbacks.stream()
                .map(f -> {
                    Optional<Usuario> usuarioOpt = usuarioRepository.findById(f.getUsuarioId());
                    if (usuarioOpt.isEmpty()) {
                        return null; // ignora feedback sem usuário associado
                    }
                    Usuario u = usuarioOpt.get();

                    Integer idade = calcularIdade(u.getDataNascimento());

                    FeedbackDetalhadoDTO dto = new FeedbackDetalhadoDTO();
                    dto.setId(f.getId());
                    dto.setUsuarioId(f.getUsuarioId());
                    dto.setNomeUsuario(u.getNome());
                    dto.setSexo(u.getSexo());
                    dto.setCidade(u.getCidade());
                    dto.setIdade(idade);
                    dto.setAtendimento(f.getAtendimento());
                    dto.setAcessibilidade(f.getAcessibilidade());
                    dto.setInfra(f.getInfra());
                    dto.setSeguranca(f.getSeguranca());
                    dto.setLimpeza(f.getLimpeza());
                    dto.setComentario(f.getComentario());

                    return dto;
                })
                .filter(dto -> dto != null)
                // filtros por sexo, cidade, idade
                .filter(dto -> {
                    if (gender != null && !gender.isBlank() && dto.getSexo() != null) {
                        if (!dto.getSexo().equalsIgnoreCase(gender)) {
                            return false;
                        }
                    }
                    if (city != null && !city.isBlank() && dto.getCidade() != null) {
                        if (!dto.getCidade().equalsIgnoreCase(city)) {
                            return false;
                        }
                    }
                    if (dto.getIdade() != null) {
                        if (minAge != null && dto.getIdade() < minAge) return false;
                        if (maxAge != null && dto.getIdade() > maxAge) return false;
                    }
                    return true;
                })
                .collect(Collectors.toList());

        // Calcula média geral segura
        Double mediaGeral = null;
        if (!detalhados.isEmpty()) {
            mediaGeral = detalhados.stream()
                    .mapToDouble(d ->
                            (d.getAtendimento()
                                    + d.getAcessibilidade()
                                    + d.getInfra()
                                    + d.getSeguranca()
                                    + d.getLimpeza()) / 5.0
                    )
                    .average()
                    .orElse(Double.NaN);

            if (mediaGeral.isNaN()) {
                mediaGeral = null;
            }
        }

        AdminFeedbackResponse resp = new AdminFeedbackResponse();
        resp.setMediaGeral(mediaGeral);
        resp.setFeedbacks(detalhados);

        return resp;
    }

    // ------------------ MÉTODO AUXILIAR ------------------ //

    /**
     * Converte a String dataNascimento em idade (anos).
     * Aceita formatos "yyyy-MM-dd" e "dd/MM/yyyy".
     */
    private Integer calcularIdade(String dataNascimentoStr) {
        if (dataNascimentoStr == null || dataNascimentoStr.isBlank()) {
            return null;
        }

        LocalDate nascimento = null;

        // tenta ISO (yyyy-MM-dd)
        try {
            nascimento = LocalDate.parse(dataNascimentoStr, DateTimeFormatter.ISO_LOCAL_DATE);
        } catch (DateTimeParseException e) {
            // tenta dd/MM/yyyy
            try {
                nascimento = LocalDate.parse(dataNascimentoStr,
                        DateTimeFormatter.ofPattern("dd/MM/yyyy"));
            } catch (DateTimeParseException e2) {
                return null; // formato desconhecido
            }
        }

        return Period.between(nascimento, LocalDate.now()).getYears();
    }
}
