package com.example.had.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity(name = "Answers")
@Table(name = "answers_master")
public class Answers {
    @Id
    @GeneratedValue(generator = "uuid4")
    @GenericGenerator(name = "UUID", strategy = "uuid4")
    @Type(type = "org.hibernate.type.UUIDCharType")
    @Column(columnDefinition = "CHAR(36)", name = "answer_id")
    private UUID id;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(
            name = "patient_id",
            nullable = false,
            referencedColumnName = "user_id",
            foreignKey = @ForeignKey(
                    name = "user_answer_fk"
            )
    )
    private User user;

    @Column(name = "week_number")
    private int weekNumber;

    @Column(name = "session_number")
    private int sessionNumber;

    @ElementCollection
    private List<Float> answer_value;

    @ElementCollection
    private List<String> answer_options;

    public Answers() {
    }

    public Answers(int weekNumber,
                   int sessionNumber,
                   List<Float> answer_value,
                   List<String> answer_options) {
        this.weekNumber = weekNumber;
        this.sessionNumber = sessionNumber;
        this.answer_value = answer_value;
        this.answer_options = answer_options;
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

    public int getWeekNumber() {
        return weekNumber;
    }

    public void setWeekNumber(int weekNumber) {
        this.weekNumber = weekNumber;
    }

    public int getSessionNumber() {
        return sessionNumber;
    }

    public void setSessionNumber(int sessionNumber) {
        this.sessionNumber = sessionNumber;
    }

    public List<Float> getAnswer_value() {
        return answer_value;
    }

    public void setAnswer_value(List<Float> answer_value) {
        this.answer_value = answer_value;
    }

    public List<String> getAnswer_options() {
        return answer_options;
    }

    public void setAnswer_options(List<String> answer_options) {
        this.answer_options = answer_options;
    }

    @Override
    public String toString() {
        return "Answers{" +
                "id=" + id +
                ", user=" + user +
                ", weekNumber=" + weekNumber +
                ", sessionNumber=" + sessionNumber +
                ", answer_value=" + answer_value +
                ", answer_options=" + answer_options +
                '}';
    }
}
