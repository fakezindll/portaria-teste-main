package com.portaria.gestao.dto;

import lombok.Data;

@Data
public class VeiculoRequest {

    private Long id;
    private String placa;
    private String modelo;
    private String marca;
    private String cor;
}