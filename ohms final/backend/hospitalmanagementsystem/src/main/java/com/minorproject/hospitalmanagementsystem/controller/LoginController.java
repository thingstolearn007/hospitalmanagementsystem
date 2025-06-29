package com.minorproject.hospitalmanagementsystem.controller;

import com.minorproject.hospitalmanagementsystem.entity.Admin;
import com.minorproject.hospitalmanagementsystem.entity.Doctor;
import com.minorproject.hospitalmanagementsystem.entity.Patient;
import com.minorproject.hospitalmanagementsystem.repo.AdminRepository;
import com.minorproject.hospitalmanagementsystem.repo.DoctorRepository;
import com.minorproject.hospitalmanagementsystem.repo.PatientRepository;
import com.minorproject.hospitalmanagementsystem.request.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private DoctorRepository doctorRepo;

    @Autowired
    private AdminRepository adminRepo;

    @Autowired
    private PatientRepository patientRepo;

    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        String email = request.getEmail();
        String password = request.getPassword();

        // Check Doctor table
        Optional<Doctor> doctorOpt = Optional.ofNullable(doctorRepo.findByEmail(email));
        if (doctorOpt.isPresent()) {
            Doctor doctor = doctorOpt.get();
            if (doctor.getPassword().equals(password)) {
                return ResponseEntity.ok(generateToken(email, "DOCTOR"));
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
        }

        // Check Admin table
        Optional<Admin> adminOpt = adminRepo.findByEmail(email);
        if (adminOpt.isPresent()) {
            Admin admin = adminOpt.get();
            if (admin.getPassword().equals(password)) {
                return ResponseEntity.ok(generateToken(email, "1")); // 1 = Admin
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
        }

        // Check Patient table
        Optional<Patient> patientOpt = Optional.ofNullable(patientRepo.findByEmail(email));
        if (patientOpt.isPresent()) {
            Patient patient = patientOpt.get();
            if (patient.getPassword().equals(password)) {
                return ResponseEntity.ok(generateToken(email, "0")); // 0 = Patient
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    private String generateToken(String email, String role) {
        return role + "_TOKEN_FOR_" + email;
    }
}
