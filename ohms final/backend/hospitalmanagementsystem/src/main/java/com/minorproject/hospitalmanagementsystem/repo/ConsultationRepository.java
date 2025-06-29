package com.minorproject.hospitalmanagementsystem.repo;

import com.minorproject.hospitalmanagementsystem.entity.Consultation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConsultationRepository extends JpaRepository<Consultation,Long> {
    List<Consultation> findByDoctorId(Long doctorId);
    List<Consultation> findByPatientId(Long patientId);
}
