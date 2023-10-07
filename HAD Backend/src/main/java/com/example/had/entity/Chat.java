package com.example.had.entity;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

@Entity(name = "Chat")
@Table(
        name = "chat_master"
)
public class Chat {
    @Id
    @GeneratedValue(generator = "uuid4")
    @GenericGenerator(name = "UUID", strategy = "uuid4")
    @Type(type = "org.hibernate.type.UUIDCharType")
    @Column(
            name = "chat_id"
    )
    private UUID id;
    @Column(
            name = "chat_message",
            updatable = false
    )
    private String chatMessage;


    @Column(
            name = "chat_sent_stamp",
            nullable = false
    )
    private String chatSentStamp;

    @ManyToOne
    @JoinColumn(
            name = "doctor_id",
            nullable = false,
            referencedColumnName = "doctor_id",
            foreignKey = @ForeignKey(
                    name = "doctor_chat_fk"
            )
    )
    private Doctor doctor;

    @ManyToOne
    @JoinColumn(
            name = "patient_id",
            nullable = false,
            referencedColumnName = "user_id",
            foreignKey = @ForeignKey(
                    name = "user_chat_fk"
            )
    )
    private User user;

    public Chat() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getChatMessage() {
        return chatMessage;
    }

    public void setChatMessage(String chatMessage) {
        this.chatMessage = chatMessage;
    }

    public String getChatSentStamp() {
        return chatSentStamp;
    }

    public void setChatSentStamp(String chatSentStamp) {
        this.chatSentStamp = chatSentStamp;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Chat(String chatMessage, String chatSentStamp) {
        this.chatMessage = chatMessage;
        this.chatSentStamp = chatSentStamp;
    }

    @Override
    public String toString() {
        return "chat{" +
                "id='" + id + '\'' +
                ", chatMessage='" + chatMessage + '\'' +
                ", chatSentStamp='" + chatSentStamp + '\'' +
                ", doctor=" + doctor.getEmail() +
                ", user=" + user.getEmail() +
                '}';
    }
}