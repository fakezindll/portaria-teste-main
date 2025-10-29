package com.portaria.gestao.controller;

import com.portaria.gestao.model.Funcionario;
import com.portaria.gestao.repository.FuncionarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/funcionarios")
@RequiredArgsConstructor
public class FuncionarioController {

    private final FuncionarioRepository funcionarioRepository;

    @GetMapping
    public ResponseEntity<List<Funcionario>> listar() {
        return ResponseEntity.ok(funcionarioRepository.findByAtivoTrue());
    }

    @PostMapping
    public ResponseEntity<Funcionario> criar(@RequestBody Funcionario funcionario) {
        funcionario.setAtivo(true);
        if (funcionario.getVeiculos() != null) {
            funcionario.getVeiculos().forEach(v -> v.setFuncionario(funcionario));
        }
        return ResponseEntity.ok(funcionarioRepository.save(funcionario));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Funcionario> atualizar(@PathVariable Long id, @RequestBody Funcionario funcionario) {
        Funcionario existente = funcionarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));

        existente.setNome(funcionario.getNome());
        existente.setDocumento(funcionario.getDocumento());
        existente.setFotoUrl(funcionario.getFotoUrl());
        existente.setAtivo(funcionario.isAtivo());

        existente.getVeiculos().clear();
        if (funcionario.getVeiculos() != null) {
            funcionario.getVeiculos().forEach(v -> v.setFuncionario(existente));
            existente.getVeiculos().addAll(funcionario.getVeiculos());
        }

        return ResponseEntity.ok(funcionarioRepository.save(existente));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        Funcionario funcionario = funcionarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));

        funcionario.setAtivo(false);
        funcionarioRepository.save(funcionario);

        return ResponseEntity.noContent().build();
    }
}
