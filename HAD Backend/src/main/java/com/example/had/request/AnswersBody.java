package com.example.had.request;

import java.util.List;
import java.util.UUID;

public class AnswersBody {
    UUID patientId;
    int weekNumber;
    int sessionNumber;
    List<Float> answer_value;
    List<String> answer_options;

    public UUID getPatientId() {
        return patientId;
    }

    public int getWeekNumber() {
        return weekNumber;
    }

    public int getSessionNumber() {
        return sessionNumber;
    }

    public List<Float> getAnswer_value() {
        return answer_value;
    }

    public List<String> getAnswer_options() {
        return answer_options;
    }
}
