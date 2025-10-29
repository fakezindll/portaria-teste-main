package com.portaria.gestao.controller;

import com.portaria.gestao.dto.RegistroPortariaRequest;
import com.portaria.gestao.dto.RegistroPortariaResponse;
import com.portaria.gestao.service.PortariaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portaria")
@RequiredArgsConstructor
public class PortariaController {

    private final PortariaService portariaService;

    @PostMapping("/entrada")
    public ResponseEntity<RegistroPortariaResponse> registrarEntrada(
            @RequestBody RegistroPortariaRequest request) {
        RegistroPortariaResponse response =
                portariaService.registrarEntrada(request.getIdentificador());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/saida")
    public ResponseEntity<RegistroPortariaResponse> registrarSaida(
            @RequestBody RegistroPortariaRequest request) {
        RegistroPortariaResponse response =
                portariaService.registrarSaida(request.getIdentificador());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 🔹 Novo endpoint: listar IDs de funcionários com entrada ativa
    @GetMapping("/ativos")
    public ResponseEntity<List<Long>> listarFuncionariosComEntradaAtiva() {
        List<Long> idsAtivos = portariaService.listarFuncionariosComEntradaAtiva();
        return ResponseEntity.ok(idsAtivos);
    }
}
