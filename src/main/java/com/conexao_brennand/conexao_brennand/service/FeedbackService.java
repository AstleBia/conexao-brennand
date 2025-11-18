package com.conexao_brennand.conexao_brennand.service;

import com.conexao_brennand.conexao_brennand.dto.AdminFeedbackResponse;
import com.conexao_brennand.conexao_brennand.dto.CategoriaRankingDTO;
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
import java.util.*;
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

    // ------------------ MÉTODO DE RANKING POR CATEGORIA ------------------ //

    public List<CategoriaRankingDTO> calcularRankingCategorias() {
        List<Feedback> feedbacks = feedbackRepository.findAll();
        
        if (feedbacks.isEmpty()) {
            return new ArrayList<>();
        }

        // Mapa para acumular valores por categoria
        Map<String, Double> somaPorCategoria = new HashMap<>();
        Map<String, Integer> quantidadePorCategoria = new HashMap<>();

        // Inicializar categorias
        String[] categorias = {"atendimento", "acessibilidade", "infra", "seguranca", "limpeza"};
        for (String categoria : categorias) {
            somaPorCategoria.put(categoria, 0.0);
            quantidadePorCategoria.put(categoria, 0);
        }

        // Acumular valores de cada feedback
        for (Feedback feedback : feedbacks) {
            somaPorCategoria.put("atendimento", somaPorCategoria.get("atendimento") + feedback.getAtendimento());
            somaPorCategoria.put("acessibilidade", somaPorCategoria.get("acessibilidade") + feedback.getAcessibilidade());
            somaPorCategoria.put("infra", somaPorCategoria.get("infra") + feedback.getInfra());
            somaPorCategoria.put("seguranca", somaPorCategoria.get("seguranca") + feedback.getSeguranca());
            somaPorCategoria.put("limpeza", somaPorCategoria.get("limpeza") + feedback.getLimpeza());
            
            quantidadePorCategoria.put("atendimento", quantidadePorCategoria.get("atendimento") + 1);
            quantidadePorCategoria.put("acessibilidade", quantidadePorCategoria.get("acessibilidade") + 1);
            quantidadePorCategoria.put("infra", quantidadePorCategoria.get("infra") + 1);
            quantidadePorCategoria.put("seguranca", quantidadePorCategoria.get("seguranca") + 1);
            quantidadePorCategoria.put("limpeza", quantidadePorCategoria.get("limpeza") + 1);
        }

        // Criar lista de DTOs com médias calculadas
        List<CategoriaRankingDTO> ranking = new ArrayList<>();
        int posicao = 1;
        
        for (String categoria : categorias) {
            double soma = somaPorCategoria.get(categoria);
            int quantidade = quantidadePorCategoria.get(categoria);
            double media = quantidade > 0 ? soma / quantidade : 0.0;
            
            CategoriaRankingDTO dto = new CategoriaRankingDTO();
            dto.setCategoria(categoria);
            dto.setMedia(media);
            dto.setQuantidade(quantidade);
            dto.setPosicao(0); // será definida após ordenação
            ranking.add(dto);
        }

        // Ordenar da pior média para a melhor
        ranking.sort((a, b) -> Double.compare(a.getMedia(), b.getMedia()));
        
        // Definir posições
        for (int i = 0; i < ranking.size(); i++) {
            ranking.get(i).setPosicao(i + 1);
        }

        return ranking;
    }
}
