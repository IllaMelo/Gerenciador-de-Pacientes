package com.PacientesHospital;

import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;

public interface PacienteRepository extends CrudRepository<Paciente, Integer>{
}