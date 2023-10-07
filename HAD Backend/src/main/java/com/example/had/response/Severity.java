package com.example.had.response;

import java.util.UUID;

public class Severity {
    private UUID id;
    private String severityLevel;
    private int count;

    public Severity(UUID id, String severityLevel, int count) {
        this.id = id;
        this.severityLevel = severityLevel;
        this.count = count;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getSeverityLevel() {
        return severityLevel;
    }

    public void setSeverityLevel(String severityLevel) {
        this.severityLevel = severityLevel;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
