package com.portaria.gestao.dto;

import lombok.Data;
import java.util.List;

@Data
public class FuncionarioRequest {
    private String nome;
    private String documento;
    private String fotoUrl;
    private boolean isAtivo;
    private List<VeiculoRequest> veiculos;
}