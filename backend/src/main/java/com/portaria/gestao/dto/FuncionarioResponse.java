package com.portaria.gestao.dto;

import lombok.Data;
import java.util.List;

@Data
public class FuncionarioResponse {
    private Long id;
    private String nome;
    private String documento;
    private String fotoUrl;
    private boolean isAtivo;
    private List<VeiculoResponse> veiculos;
}