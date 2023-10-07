package com.example.had.contoller;

import com.example.had.response.PlotWeekScore;
import com.example.had.response.Severity;
import com.example.had.response.Usage;
import com.example.had.service.DoctorService;
import com.example.had.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/analytics")
@PreAuthorize("hasRole('ROLE_DOCTOR')")
public class AnalyticsController {
    private final UserService userService;
    private final DoctorService doctorService;

    public AnalyticsController(UserService userService, DoctorService doctorService) {
        this.userService = userService;
        this.doctorService = doctorService;
    }
    @GetMapping("/plot-line-chart/{patientId}/week/{weekNumber}")
    public ResponseEntity<?> getWeekScore(@PathVariable UUID patientId, @PathVariable int weekNumber){
        PlotWeekScore score = userService.getWeekScore(patientId, weekNumber);
        if(score!=null)
            return ResponseEntity.ok(score);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/severity-list/{doctorId}")
    public ResponseEntity<?> getSeverityList(@PathVariable UUID doctorId){
        List<Severity> severityList = doctorService.getSeverityList(doctorId);
        if (severityList!=null)
            return ResponseEntity.ok(severityList);
        return ResponseEntity.noContent().build();

    }
    @GetMapping("/allUsage/{doctorId}")
    public ResponseEntity<?> getAllUsage(@PathVariable UUID doctorId)
    {
        List<Usage> usageList= doctorService.getUsage(doctorId);
        if(usageList.size() == 0)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(usageList);
    }

}