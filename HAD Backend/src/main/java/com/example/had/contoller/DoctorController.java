package com.example.had.contoller;

import com.example.had.entity.Doctor;
import com.example.had.entity.User;
import com.example.had.request.DoctorProfileBody;
import com.example.had.request.PersonalizedArticle;
import com.example.had.response.Usage;
import com.example.had.service.DoctorService;
import com.example.had.service.PersonalizedArticleService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/doctor")
@PreAuthorize("hasRole('ROLE_DOCTOR')")
public class DoctorController {
    private final DoctorService doctorService;
    private final PersonalizedArticleService personalizedArticleService;

    public DoctorController(DoctorService doctorService, PersonalizedArticleService personalizedArticleService) {
        this.doctorService = doctorService;
        this.personalizedArticleService = personalizedArticleService;
    }

    @GetMapping("/dashboard/get-reg-patients/{doctorId}")
    public ResponseEntity<?> getRegisteredPatients(@PathVariable UUID doctorId){
        List<User> registeredPatients = doctorService.getRegisteredPatients(doctorId);
        if (registeredPatients!=null)
            return ResponseEntity.ok(registeredPatients);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/dashboard/requests/{doctorId}")
    public ResponseEntity<?> getRequests(@PathVariable UUID doctorId){
        List<User> requests = doctorService.getRequests(doctorId);
        return ResponseEntity.ok(requests);
    }
    @GetMapping("/dashboard/request-accepted/{doctorId}/{userId}")
    public ResponseEntity<?> acceptedRequest(
            @PathVariable UUID doctorId,
            @PathVariable UUID userId
    ) {
        doctorService.getResponse(doctorId, userId);
        return ResponseEntity.ok("Assigned patient successfully");
    }
    @GetMapping("/dashboard/request-rejected/{doctorId}/{userId}")
    public ResponseEntity<?> rejectedRequest(
            @PathVariable UUID doctorId,
            @PathVariable UUID userId
    ) {
        doctorService.reject(doctorId, userId);
        return ResponseEntity.ok("Rejected request for connection");
    }
    @GetMapping("/my-patients/get/{doctorId}/{patientId}")
    public ResponseEntity<?> getPatient(@PathVariable UUID patientId,
                                           @PathVariable UUID doctorId){
        User patient = doctorService.getPatient(doctorId,patientId);
        if (patient==null)
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(patient);
    }
    @GetMapping("/get/profile/{doctorId}")
    public ResponseEntity<?> getProfile(@PathVariable UUID doctorId){
        Doctor profile = doctorService.getProfile(doctorId);
        if (profile==null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(profile);
    }



    @PostMapping("/update/profile/{doctorId}")
    public ResponseEntity<?> updateProfile(@PathVariable UUID doctorId,
                                           @RequestBody DoctorProfileBody doctorProfileBody){
        boolean profile = doctorService.updateProfile(doctorId, doctorProfileBody);
        if (profile)
            return ResponseEntity.ok("Updated Successfully");
        return ResponseEntity.unprocessableEntity().body("Not able to update");
    }
    @PostMapping("/update/password/{username}/{password}")
    public ResponseEntity<?> updatePassword(@PathVariable String password,
                                            @PathVariable String username){
        boolean updated = doctorService.updatePassword(username,password);
        if (updated)
            return ResponseEntity.ok("Password Updated");
        return ResponseEntity.unprocessableEntity().body("Not able to find");
    }
    @PostMapping("add/self-article")
    public ResponseEntity<?> addPersonalized(@NotNull @RequestBody List<PersonalizedArticle> personalizedArticles){
        boolean added = personalizedArticleService.add(personalizedArticles);
        if (added)
            return ResponseEntity.ok("Personalized data added");
        return ResponseEntity.unprocessableEntity().body("Not able to add or process entity");
    }
    @PostMapping("delete/self-article/{articleId}")
    public ResponseEntity<?> deletePersonalized(@PathVariable UUID articleId){
        boolean deleted = personalizedArticleService.delete(articleId);
        if (deleted)
            return ResponseEntity.ok("Self article deleted");
        return ResponseEntity.unprocessableEntity().body("not able to delete");
    }


}