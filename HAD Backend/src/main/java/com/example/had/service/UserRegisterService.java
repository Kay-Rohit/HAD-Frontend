package com.example.had.service;

import com.example.had.entity.Auth;
import com.example.had.entity.User;
import com.example.had.repository.AuthRepository;
import com.example.had.repository.UserRepository;
import com.example.had.request.UserRegisterRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.Date;

@Service
public class UserRegisterService {
    private final AuthRepository authRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserRegisterService(AuthRepository authRepository,
                               UserRepository userRepository,
                               PasswordEncoder passwordEncoder) {
        this.authRepository = authRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
@Transactional
    public ResponseEntity<?> registerUser(UserRegisterRequest userRegisterRequest) {
        try {
            Timestamp timestamp = new Timestamp(System.currentTimeMillis());
            authRepository.save(new Auth(userRegisterRequest.getEmail(),
                    passwordEncoder.encode(userRegisterRequest.getPassword()),
                    "USER",
                    timestamp.toString()
                    ));

            User user = new User(
                    userRegisterRequest.getEmail(),
                    userRegisterRequest.getFirstName(),
                    userRegisterRequest.getLastName(),
                    userRegisterRequest.getMiddleName(),
                    userRegisterRequest.getGender(),
                    userRegisterRequest.getDob(),
                    userRegisterRequest.getContact(),
                    userRegisterRequest.getAddress(),
                    new Date().toString(),
                    1
            );
            user.setDoctor(null);
            user.setAnswers(null);
            user.setChatList(null);

            userRepository.save(user);

            System.out.println("USER "+userRegisterRequest.getEmail()+" registered");

            return ResponseEntity.ok("Registered Successfully");
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Not able to register");
        }
    }
}
