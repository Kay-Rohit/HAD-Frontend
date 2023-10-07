package com.example.had.entity;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

@Entity(name = "QuestionBank")
@Table(
        name = "question_bank"
)
public class Question {
    @Id
    @GeneratedValue(generator = "uuid4")
    @GenericGenerator(name = "UUID", strategy = "uuid4")
    @Type(type = "org.hibernate.type.UUIDCharType")
    @Column(columnDefinition = "CHAR(36)", name = "question_id")
    private UUID id;

    @Column(
            name = "question_string",
            columnDefinition = "TEXT",
            nullable = false
    )
    private String question;


    @Column(
            name = "question_type",
            nullable = false
    )
    private String questionType;


    @Column(
            name = "option1",
            nullable = false
    )
    private String option1;


    @Column(
            name = "option2",
            nullable = false
    )
    private String option2;

    @Column(
            name = "option3",
            nullable = false
    )
    private String option3;

    @Column(
            name = "option4",
            nullable = false
    )
    private String option4;


    @Column(
            name = "value1",
            nullable = false,
            precision = 2
    )
    private float value1;


    @Column(
            name = "value2",
            nullable = false,
            precision = 2
    )
    private float value2;


    @Column(
            name = "value3",
            nullable = false,
            precision = 2
    )
    private float value3;


    @Column(
            name = "value4",
            nullable = false,
            precision = 2
    )
    private float value4;





    @Column(
            name = "week_number",
            nullable = false
    )
    private int weekNumber;


    @Column(
            name = "session_number",
            nullable = false
    )
    private int sessionNumber;

    public Question() {
    }

    public Question(String question,
                    String questionType,
                    String option1,
                    String option2,
                    String option3,
                    String option4,
                    float value1,
                    float value2,
                    float value3,
                    float value4,
                    int weekNumber,
                    int sessionNumber) {
        this.question = question;
        this.questionType = questionType;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.option4 = option4;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
        this.weekNumber = weekNumber;
        this.sessionNumber = sessionNumber;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getQuestionType() {
        return questionType;
    }

    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }

    public String getOption1() {
        return option1;
    }

    public void setOption1(String option1) {
        this.option1 = option1;
    }

    public String getOption2() {
        return option2;
    }

    public void setOption2(String option2) {
        this.option2 = option2;
    }

    public String getOption3() {
        return option3;
    }

    public void setOption3(String option3) {
        this.option3 = option3;
    }

    public String getOption4() {
        return option4;
    }

    public void setOption4(String option4) {
        this.option4 = option4;
    }

    public float getValue1() {
        return value1;
    }

    public void setValue1(float value1) {
        this.value1 = value1;
    }

    public float getValue2() {
        return value2;
    }

    public void setValue2(float value2) {
        this.value2 = value2;
    }

    public float getValue3() {
        return value3;
    }

    public void setValue3(float value3) {
        this.value3 = value3;
    }

    public float getValue4() {
        return value4;
    }

    public void setValue4(float value4) {
        this.value4 = value4;
    }

//    public String getCorrectAnswer() {
//        return correctAnswer;
//    }
//
//    public void setCorrectAnswer(String correctAnswer) {
//        this.correctAnswer = correctAnswer;
//    }

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

    @Override
    public String toString() {
        return "question{" +
                "id='" + id + '\'' +
                ", question='" + question + '\'' +
                ", questionType='" + questionType + '\'' +
                ", option1='" + option1 + '\'' +
                ", option2='" + option2 + '\'' +
                ", option3='" + option3 + '\'' +
                ", option4='" + option4 + '\'' +
                ", value1=" + value1 +
                ", value2=" + value2 +
                ", value3=" + value3 +
                ", value4=" + value4 +
                ", weekNumber=" + weekNumber +
                ", sessionNumber=" + sessionNumber +
                '}';
    }
}