package com.example.had.service;

import com.example.had.entity.Auth;
import com.example.had.entity.Doctor;
import com.example.had.repository.AuthRepository;
import com.example.had.repository.DoctorRepository;
import com.example.had.request.DoctorRegisterRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Service
public class DoctorRegisterService {
    private final AuthRepository authRepository;
    private final DoctorRepository doctorRepository;
    private final PasswordEncoder passwordEncoder;
    public DoctorRegisterService(AuthRepository authRepository, DoctorRepository doctorRepository, PasswordEncoder passwordEncoder) {
        this.authRepository = authRepository;
        this.doctorRepository = doctorRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseEntity registerDoctor(DoctorRegisterRequest doctorRegisterRequest) {
        try{
            doctorRepository.save(new Doctor(doctorRegisterRequest.getEmail(),
                    doctorRegisterRequest.getFirstName(),
                    doctorRegisterRequest.getMiddleName(),
                    doctorRegisterRequest.getLastName(),
                    doctorRegisterRequest.getGender(),
                    doctorRegisterRequest.getAge(),
                    doctorRegisterRequest.getDegree(),
                    doctorRegisterRequest.getSpecialisation(),
                    doctorRegisterRequest.getExperience(),
                    doctorRegisterRequest.getAddress(),
                    doctorRegisterRequest.getContact(),
                    doctorRegisterRequest.getImageUrl(),
                    4,
                    doctorRegisterRequest.getPatientLimit(),
                    doctorRegisterRequest.getPatientCount(),
                    doctorRegisterRequest.getRegistrationNumber(),
                    new Timestamp(System.currentTimeMillis()).toString()));

            System.out.println(doctorRegisterRequest.getEmail() + " Requested for DOCTOR authorization");

            return ResponseEntity.ok("Awaiting Response from Admin");
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Not able to register");
        }
    }
    @Transactional
    public ResponseEntity authDoctor(UUID doctorId) {
        try{
            Timestamp timestamp = new Timestamp(System.currentTimeMillis());
            doctorRepository.updateIsVerifiedById(true,doctorId);

            String username = doctorRepository.findById(doctorId).get().getEmail();
            String password = "password";

            authRepository.save(
                    new Auth(
                    username
                    , passwordEncoder.encode(password),
                            "DOCTOR",
                            timestamp.toString()
                    )
            );

            System.out.println(username + " Doctor verified");

            return ResponseEntity.ok("Registered Successfully");
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Not able to register");
        }
    }

    public ResponseEntity getAllRequests() {
        try{
            List<Doctor> byIsVerified = doctorRepository.findByIsVerifiedOrderByRegistrationStampDesc(false);

            System.out.println("Send verified DOCTORS List");

            return ResponseEntity.ok(byIsVerified);
        }catch (Exception e){
            System.out.println("Not able to find");
            return ResponseEntity.noContent().build();
        }
    }
}
