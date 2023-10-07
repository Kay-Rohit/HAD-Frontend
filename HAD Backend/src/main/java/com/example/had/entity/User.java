package com.example.had.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.hibernate.validator.constraints.Range;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity(name = "User")
@Table(
        name = "user_master",
        uniqueConstraints =
        @UniqueConstraint(
                name = "user_email_unique",
                columnNames = "email"
        )
)
public class User {
    @Id
    @GeneratedValue(generator = "uuid4")
    @GenericGenerator(name = "UUID", strategy = "uuid4")
    @Type(type = "org.hibernate.type.UUIDCharType")
    @Column(
            name = "user_id"
    )
    private UUID id;
    @Column(
            name = "email",
            nullable = false
    )
    private String email;

    @Column(
            name = "fname",
            nullable = false,
            length = 20
    )
    private String firstName;


    @Column(
            name = "lname",
            nullable = true,
            length = 20
    )
    private String lastName;


    @Column(
            name = "mname",
            nullable = true,
            length = 20
    )
    private String middleName;


    @Column(
            name = "gender",
            nullable = true
    )
    private String gender;



    @Column(
            name = "date_of_birth",
            nullable = true
    )
    private String dob;


    @Column(
            name = "contact",
            nullable = true
    )
    private String contact;


    @Column(
            name = "address",
            nullable = true
    )
    private String address;


    @Column(
            name = "registration_stamp",
            nullable = true
    )
    private String registrationStamp;


    @Column(
            name = "depression_severity"
    )
    @Range(min = 1, max = 100)
    private float depressionSeverity;

    @Column(
            name = "is_active"
    )
    private Boolean isActive; // a user is active if last login was 5 days or less

    @Column(name = "session_done")
    private int sessionDone;

    @Column(name = "week_done")
    private int weekDone;

    public int getSessionDone() {
        return sessionDone;
    }

    public void setSessionDone(int sessionDone) {
        this.sessionDone = sessionDone;
    }

    public int getWeekDone() {
        return weekDone;
    }

    public void setWeekDone(int weekDone) {
        this.weekDone = weekDone;
    }

    public Boolean getActive() {
        return isActive;
    }

    @ElementCollection
    private List<Timestamp> entryTime;

    @ElementCollection
    private List<Timestamp> exitTime;

    @ManyToOne
//    @JsonBackReference
    private Doctor doctor;
    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonManagedReference
    private List<Chat> chatList = new ArrayList<>();
    @OneToOne(
            mappedBy = "user",
            orphanRemoval = true
    )
    @JsonBackReference
    private Report report;

    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonManagedReference
    private List<Answers> answers = new ArrayList<>();
    public List<Answers> getAnswers() {
        return answers;
    }

    public void setAnswers(List<Answers> answers) {
        this.answers = answers;
    }

    public List<PersonalArticle> getPersonalArticles() {
        return personalArticles;
    }

    public void setPersonalArticles(List<PersonalArticle> personalArticles) {
        this.personalArticles = personalArticles;
    }

    @OneToMany(
            mappedBy = "user",
            orphanRemoval = true
    )
    private List<PersonalArticle> personalArticles = new ArrayList<>();

    public void addReport(Report report){
        this.setReport(report);
        report.setUser(this);
    }

    public void removeReport(Report report){
        this.setReport(null);
        report.setUser(null);
    }
    public void addChat(Chat chat){
        if(!this.chatList.contains(chat)){
            chatList.add(chat);
            chat.setUser(this);
        }
    }
    public void removeChat(Chat chat){
        if (this.chatList.contains(chat)){
            this.chatList.remove(chat);
            chat.setUser(null);
        }
    }
    public void addDoctor(Doctor doctor){
        this.setDoctor(doctor);
        List<User> userList = doctor.getUserList();
        userList.add(this);
        doctor.setUserList(userList);
    }
    public void removeDoctor(Doctor doctor){
        this.setDoctor(null);
        List<User> userList = doctor.getUserList();
        userList.remove(this);
        doctor.setUserList(userList);
    }
    public void addAnswer(Answers answers){
        this.answers.add(answers);
        answers.setUser(this);
    }
    public void removeAnswer(Answers answers){
        this.answers.remove(answers);
        answers.setUser(null);
    }
    public User() {
    }
    public User(String email, String firstName) {
        this.email = email;
        this.firstName = firstName;
        this.depressionSeverity = 1;
        this.weekDone = -1;
        this.sessionDone = -1;
    }

    public List<Timestamp> getEntryTime() {
        return entryTime;
    }

    public void setEntryTime(List<Timestamp> entryTime) {
        this.entryTime = entryTime;
    }

    public List<Timestamp> getExitTime() {
        return exitTime;
    }

    public void setExitTime(List<Timestamp> exitTime) {
        this.exitTime = exitTime;
    }

    public User(String email,
                String firstName,
                String lastName,
                String middleName,
                String gender,
                String dob,
                String contact,
                String address,
                String registrationStamp,
                float depressionSeverity) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.gender = gender;
        this.dob = dob;
        this.contact = contact;
        this.address = address;
        this.registrationStamp = registrationStamp;
        this.depressionSeverity = depressionSeverity;
        this.weekDone = -1;
        this.sessionDone = -1;
    }


    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public Boolean isActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getRegistrationStamp() {
        return registrationStamp;
    }

    public void setRegistrationStamp(String registrationStamp) {
        this.registrationStamp = registrationStamp;
    }

    public float getDepressionSeverity() {
        return depressionSeverity;
    }

    public void setDepressionSeverity(float depressionSeverity) {
        this.depressionSeverity = depressionSeverity;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public List<Chat> getChatList() {
        return chatList;
    }

    public void setChatList(List<Chat> chatList) {
        this.chatList = chatList;
    }

    public Report getReport() {
        return report;
    }

    public void setReport(Report report) {
        this.report = report;
    }

    @Override
    public String toString() {
        return "user{" +
                "id='" + id + '\'' +
                ", email='" + email + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", middleName='" + middleName + '\'' +
                ", gender='" + gender + '\'' +
                ", dob=" + dob +
                ", contact='" + contact + '\'' +
                ", address='" + address + '\'' +
                ", registrationStamp='" + registrationStamp + '\'' +
                ", depressionSeverity=" + depressionSeverity +
                ", doctorList=" + doctor.getEmail() +
                ", chatList=" + chatList.size() +
                ", report=" + report.toString() +
                '}';
    }
}