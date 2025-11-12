package com.conexao_brennand.conexao_brennand.dto;

import java.util.List;

public class AdminFeedbackResponse {

    private Double mediaGeral;
    private List<FeedbackDetalhadoDTO> feedbacks;

    public Double getMediaGeral() {
        return mediaGeral;
    }

    public void setMediaGeral(Double mediaGeral) {
        this.mediaGeral = mediaGeral;
    }

    public List<FeedbackDetalhadoDTO> getFeedbacks() {
        return feedbacks;
    }

    public void setFeedbacks(List<FeedbackDetalhadoDTO> feedbacks) {
        this.feedbacks = feedbacks;
    }
}