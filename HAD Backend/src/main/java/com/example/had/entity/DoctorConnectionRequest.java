package com.example.had.entity;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

@Entity(name = "DoctorConnectionRequest")
@Table(name = "doctor_connection_request",
        uniqueConstraints = {
            @UniqueConstraint(columnNames = {"user_id", "doctor_id"}, name = "unique_connection_requests")
        }
    )
public class DoctorConnectionRequest {
    @Id
    @GeneratedValue(generator = "uuid4")
    @GenericGenerator(name = "UUID", strategy = "uuid4")
    @Type(type = "org.hibernate.type.UUIDCharType")
    @Column(columnDefinition = "CHAR(36)", name = "request_id")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    public DoctorConnectionRequest() {
    }

    public DoctorConnectionRequest(User user, Doctor doctor) {
        this.user = user;
        this.doctor = doctor;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    @Override
    public String toString() {
        return "DoctorConnectionRequest{" +
                "id=" + id +
                ", user=" + user.getEmail() +
                ", doctor=" + doctor.getEmail() +
                '}';
    }
}
