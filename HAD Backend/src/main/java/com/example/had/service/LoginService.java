package com.example.had.service;

import com.example.had.entity.Auth;
import com.example.had.entity.Doctor;
import com.example.had.entity.User;
import com.example.had.repository.AuthRepository;
import com.example.had.repository.DoctorRepository;
import com.example.had.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Objects;

@Service
public class LoginService {
    private final AuthRepository authRepository;
    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public LoginService(AuthRepository authRepository,
                        DoctorRepository doctorRepository,
                        UserRepository userRepository,
                        PasswordEncoder passwordEncoder) {
        this.authRepository = authRepository;
        this.doctorRepository = doctorRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    public boolean isPasswordMatch(String plainPassword, String encryptedPassword) {
        return passwordEncoder.matches(plainPassword, encryptedPassword);
    }

    public ResponseEntity<?> getUserByLogin(String username, String password) {
        try {
            Timestamp timestamp = new Timestamp(System.currentTimeMillis());
            Auth byUsername = authRepository.findByUsername(username);

            String role = "role";
            if (isPasswordMatch(password, byUsername.getPassword())) {
                role = byUsername.getRole();
                System.out.println("Password matched " + role);
            }

            int i = authRepository.updateLastLoginByUsername(timestamp.toString(), username);

            if (Objects.equals(role, "DOCTOR")){
                Doctor doctor = doctorRepository.findByEmailIgnoreCase(username);

                System.out.println(doctor.getEmail()+" Logged In");

                return ResponseEntity.ok(doctor);
            }
            if (Objects.equals(role, "USER")){
                User user = userRepository.findByEmail(username);

                System.out.println(user.getEmail());

                return ResponseEntity.ok(user);
            }
            if (Objects.equals(username, "lynda")
                    && Objects.equals(password, "password")){

                System.out.println("Admin Logged In");

                return ResponseEntity.ok("ADMIN");
            }
        }catch (Exception e){
            System.out.println(e);
            System.out.println("Not a authorized user");
        }

        return ResponseEntity.notFound().build();
    }
}