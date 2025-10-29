package com.portaria.gestao.repository;

import com.portaria.gestao.model.Funcionario;
import com.portaria.gestao.model.RegistroPortaria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface RegistroPortariaRepository extends JpaRepository<RegistroPortaria, Long> {

    RegistroPortaria findFirstByFuncionarioAndHoraSaidaIsNullOrderByHoraEntradaDesc(Funcionario funcionario);

    List<RegistroPortaria> findByHoraEntradaBetween(LocalDateTime start, LocalDateTime end);

    // 🔹 Buscar IDs de funcionários com registro ativo (sem saída)
    @Query("SELECT DISTINCT r.funcionario.id FROM RegistroPortaria r WHERE r.horaSaida IS NULL")
    List<Long> findFuncionariosComEntradaAtiva();
}
