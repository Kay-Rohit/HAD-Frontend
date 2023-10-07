package com.example.had.contoller;

import com.example.had.request.QuestionAddBody;
import com.example.had.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }
    @PostMapping("/add/questions")
    public ResponseEntity<?> addQuestion(@RequestBody List<QuestionAddBody> question){
        boolean added = adminService.addQuestion(question);
        if (added)
            return ResponseEntity.ok("Added Successfully");
        return ResponseEntity.unprocessableEntity().body("Not Able to add");
    }
}
