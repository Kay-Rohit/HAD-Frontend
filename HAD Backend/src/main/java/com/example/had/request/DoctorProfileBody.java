package com.example.had.request;

public class DoctorProfileBody {
    private String address;
    private String imageUrl;
    private String contact;
    private int patientLimit;
    private String specialization;

    public String getAddress() {
        return address;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getContact() {
        return contact;
    }

    public int getPatientLimit() {
        return patientLimit;
    }

    public String getSpecialization() {
        return specialization;
    }
}
