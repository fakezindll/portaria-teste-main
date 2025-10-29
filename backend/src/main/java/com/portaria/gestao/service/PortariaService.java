package com.portaria.gestao.service;

import com.portaria.gestao.dto.FuncionarioResponse;
import com.portaria.gestao.dto.RegistroPortariaResponse;
import com.portaria.gestao.model.Funcionario;
import com.portaria.gestao.model.RegistroPortaria;
import com.portaria.gestao.repository.FuncionarioRepository;
import com.portaria.gestao.repository.RegistroPortariaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PortariaService {

    private final FuncionarioRepository funcionarioRepository;
    private final RegistroPortariaRepository registroRepository;

    public RegistroPortariaResponse registrarEntrada(String documento) {
        Funcionario funcionario = funcionarioRepository.findByDocumento(documento)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Funcionário não encontrado."));

        RegistroPortaria registroAtivo =
                registroRepository.findFirstByFuncionarioAndHoraSaidaIsNullOrderByHoraEntradaDesc(funcionario);

        if (registroAtivo != null) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, "Entrada já registrada e ativa.");
        }

        RegistroPortaria novoRegistro = new RegistroPortaria();
        novoRegistro.setFuncionario(funcionario);
        novoRegistro.setHoraEntrada(LocalDateTime.now());

        RegistroPortaria salvo = registroRepository.save(novoRegistro);
        return toResponse(salvo);
    }

    public RegistroPortariaResponse registrarSaida(String documento) {
        Funcionario funcionario = funcionarioRepository.findByDocumento(documento)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Funcionário não encontrado."));

        RegistroPortaria registroAtivo =
                registroRepository.findFirstByFuncionarioAndHoraSaidaIsNullOrderByHoraEntradaDesc(funcionario);

        if (registroAtivo == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_ACCEPTABLE, "Não há entrada ativa para este funcionário.");
        }

        registroAtivo.setHoraSaida(LocalDateTime.now());
        RegistroPortaria atualizado = registroRepository.save(registroAtivo);

        return toResponse(atualizado);
    }

    // 🔹 Novo método: listar IDs de funcionários com entrada ativa
    public List<Long> listarFuncionariosComEntradaAtiva() {
        return registroRepository.findFuncionariosComEntradaAtiva();
    }

    // 🔹 Conversão de entidades para DTOs
    private RegistroPortariaResponse toResponse(RegistroPortaria registro) {
        RegistroPortariaResponse response = new RegistroPortariaResponse();
        response.setId(registro.getId());
        response.setHoraEntrada(registro.getHoraEntrada());
        response.setHoraSaida(registro.getHoraSaida());

        if (registro.getFuncionario() != null) {
            response.setFuncionario(mapFuncionarioToResponse(registro.getFuncionario()));
        }

        return response;
    }

    private FuncionarioResponse mapFuncionarioToResponse(Funcionario funcionario) {
        FuncionarioResponse response = new FuncionarioResponse();
        response.setId(funcionario.getId());
        response.setNome(funcionario.getNome());
        response.setDocumento(funcionario.getDocumento());
        return response;
    }
}
