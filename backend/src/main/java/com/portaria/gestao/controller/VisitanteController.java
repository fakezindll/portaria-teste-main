package com.portaria.gestao.controller;

import com.portaria.gestao.model.Visitante;
import com.portaria.gestao.service.VisitanteService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/visitantes")
@CrossOrigin(origins = "http://localhost:5173") // porta do front
public class VisitanteController {

    private final VisitanteService visitanteService;

    public VisitanteController(VisitanteService visitanteService) {
        this.visitanteService = visitanteService;
    }

    @GetMapping
    public List<Visitante> listarTodos() {
        return visitanteService.listarTodos();
    }

    @PostMapping
    public Visitante adicionar(@RequestBody Visitante visitante) {
        return visitanteService.adicionar(visitante);
    }

    @PutMapping("/{id}/saida")
    public Visitante registrarSaida(@PathVariable Long id) {
        return visitanteService.registrarSaida(id);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        visitanteService.deletar(id);
    }
}