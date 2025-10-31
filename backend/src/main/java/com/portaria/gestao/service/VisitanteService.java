package com.portaria.gestao.service;

import com.portaria.gestao.model.Visitante;
import com.portaria.gestao.repository.VisitanteRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class VisitanteService {

    private final VisitanteRepository visitanteRepository;

    public VisitanteService(VisitanteRepository visitanteRepository) {
        this.visitanteRepository = visitanteRepository;
    }

    public List<Visitante> listarTodos() {
        return visitanteRepository.findAll();
    }

    public Visitante adicionar(Visitante visitante) {
        visitante.setDataEntrada(LocalDateTime.now());
        visitante.setPresente(true);
        return visitanteRepository.save(visitante);
    }

    public Visitante registrarSaida(Long id) {
        Visitante visitante = visitanteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Visitante não encontrado."));
        visitante.setDataSaida(LocalDateTime.now());
        visitante.setPresente(false);
        return visitanteRepository.save(visitante);
    }

    public void deletar(Long id) {
        visitanteRepository.deleteById(id);
    }
}