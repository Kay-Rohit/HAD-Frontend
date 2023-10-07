package com.example.had.contoller;


import com.example.had.entity.Doctor;
import com.example.had.entity.PersonalArticle;
import com.example.had.entity.PrepopulatedArticle;
import com.example.had.request.LoginRequestBody;
import com.example.had.request.PodcastBody;
import com.example.had.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/")
//@PreAuthorize("permitAll()")
public class TemplateController {
    private final LoginService loginService;
    private final DoctorService doctorService;
    private final PrepopulatedArticleService prepopulatedArticleService;
    private final PersonalizedArticleService personalizedArticleService;
    private final PodcastService podcastService;


    public TemplateController(LoginService loginService,
                              DoctorService doctorService,
                              PrepopulatedArticleService prepopulatedArticleService, PersonalizedArticleService personalizedArticleService, PodcastService podcastService) {
        this.loginService = loginService;
        this.doctorService = doctorService;
        this.prepopulatedArticleService = prepopulatedArticleService;
        this.personalizedArticleService = personalizedArticleService;
        this.podcastService = podcastService;
    }
    @GetMapping("custom-logout")
    public String connectionCheck(){
        return "courses";
    }
    @GetMapping("get/doctors")
    public ResponseEntity<?> getDoctors(){
        List<Doctor> allDoctors = doctorService.getAllDoctors();
        if (allDoctors != null)
            return ResponseEntity.ok(allDoctors);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("login-timestamp")
    public ResponseEntity<?> getLogin(@RequestBody LoginRequestBody loginRequestBody) {
        return loginService.getUserByLogin(loginRequestBody.getUsername(), loginRequestBody.getPassword());
    }
    @GetMapping("preData")
    public ResponseEntity<?> getPreData(){
        List<PrepopulatedArticle> preData = prepopulatedArticleService.getPreData();
        if (preData.size() == 0)
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(preData);
    }
    @GetMapping("/get/self-article/{patientId}")
    @PreAuthorize("hasAnyRole('ROLE_DOCTOR','ROLE_USER')")
    public ResponseEntity<?> getPersonalized(@PathVariable UUID patientId){
        List<PersonalArticle> byUser = personalizedArticleService.getByUser(patientId);
        if (byUser != null)
            return ResponseEntity.ok(byUser);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/add-podcast")
    public ResponseEntity<?> addPodcast(@NotNull @RequestBody List<PodcastBody> podcastBody){
        boolean added = podcastService.addPodcast(podcastBody);
        if (added)
            return ResponseEntity.ok(podcastBody.size()+" Podcasts added");
        return ResponseEntity.unprocessableEntity().body("Not able add");
    }
}