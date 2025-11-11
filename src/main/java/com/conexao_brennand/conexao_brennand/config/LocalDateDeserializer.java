package com.conexao_brennand.conexao_brennand.config;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class LocalDateDeserializer extends JsonDeserializer<LocalDate> {
    
    @Override
    public LocalDate deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        String date = p.getText();
        if (date == null || date.isEmpty()) {
            return null;
        }
        
        // Tenta diferentes formatos
        try {
            return LocalDate.parse(date, DateTimeFormatter.ISO_LOCAL_DATE); // yyyy-MM-dd
        } catch (Exception e) {
            try {
                return LocalDate.parse(date, DateTimeFormatter.ofPattern("dd/MM/yyyy"));
            } catch (Exception e2) {
                throw new IOException("Cannot parse date: " + date, e2);
            }
        }
    }
}