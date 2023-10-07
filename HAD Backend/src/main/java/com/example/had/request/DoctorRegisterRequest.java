package com.example.had.request;

public class DoctorRegisterRequest {
     String email;
     String password;
     String firstName;
     String lastName;
     String middleName;
     String gender;
     int age;
     String degree;
     String specialisation;
     int experience;
     String address;
     String contact;
     String imageUrl;
     String registrationNumber;
     int PatientLimit;
     int PatientCount;

     public int getPatientLimit() {
          return PatientLimit;
     }
     public String getPassword() {
          return password;
     }

     public int getPatientCount() {
          return PatientCount;
     }

     public String getEmail() {
          return email;
     }

     public String getFirstName() {
          return firstName;
     }

     public String getLastName() {
          return lastName;
     }

     public String getMiddleName() {
          return middleName;
     }

     public String getGender() {
          return gender;
     }

     public int getAge() {
          return age;
     }

     public String getDegree() {
          return degree;
     }

     public String getSpecialisation() {
          return specialisation;
     }

     public int getExperience() {
          return experience;
     }

     public String getAddress() {
          return address;
     }

     public String getContact() {
          return contact;
     }

     public String getImageUrl() {
          return imageUrl;
     }

     public String getRegistrationNumber() {
          return registrationNumber;
     }

}
