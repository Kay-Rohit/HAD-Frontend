package com.example.had.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Entity(name = "Doctor")
@Table(
        name = "doctor_master",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "doctor_email_unique",
                        columnNames = "email"
                ),
                @UniqueConstraint(
                        name = "doctor_registration_number_unique",
                        columnNames = "registration_number"
                ),
                @UniqueConstraint(
                        name = "doctor_contact_unique",
                        columnNames = "contact"
                )
        }
)
public class Doctor {
    @Id
    @GeneratedValue(generator = "uuid4")
    @GenericGenerator(name = "UUID", strategy = "uuid4")
    @Type(type = "org.hibernate.type.UUIDCharType")
    @Column(columnDefinition = "CHAR(36)", name = "doctor_id")
    private UUID id;
    @Column(
            name = "email",
            nullable = false
    )
    private String email;
    @Column(
            name = "fname",
            nullable = false,
            length = 15
    )
    private String firstName;


    @Column(
            name = "lname",
            nullable = false,
            length = 15
    )
    private String lastName;


    @Column(
            name = "mname",
            nullable = false,
            length = 15
    )
    private String middleName;


    @Column(
            name = "gender",
            nullable = false
    )
    private String gender;


    @Column(
            name = "age",
            nullable = false
    )
    private int age;


    @Column(
            name = "degree",
            nullable = false
    )
    private String degree;


    @Column(
            name = "specialisation",
            nullable = true
    )
    private String specialisation;


    @Column(
            name = "experience",
            nullable = false
    )
    private int experience;


    @Column(
            name = "address",
            nullable = false,
            length = 100
    )
    private String address;


    @Column(
            name = "contact",
            nullable = false,
            length = 13
    )
    private String contact;


    @Column(
            name = "image_url",
            nullable = true
    )
    private String imageUrl;


    @Column(
            name = "rating",
            nullable = true
    )
    private int rating;


    @Column(
            name = "patient_limit",
            nullable = false
    )
    private int patientLimit;


    @Column(
            name = "patient_count",
            nullable = false
    )
    private int patientCount;


    @Column(
            name = "registration_number",
            nullable = false
    )
    private String registrationNumber;


    @Column(
            name = "registration_stamp",
            nullable = false
    )
    private String registrationStamp;
    @Column
    private boolean isVerified;


    @ElementCollection
    private List<String> languages;

    @ManyToMany(
            cascade = CascadeType.ALL
    )
    @JoinTable(
            name = "assigned_doctors",
            joinColumns = @JoinColumn(
                    name = "doctor_id",
                    foreignKey = @ForeignKey(
                            name = "assigned_doctor_doctor_id_fk"
                    )
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "patient_id",
                    foreignKey = @ForeignKey(
                            name = "assigned_doctor_user_id_fk"
                    )
            )
    )
    @JsonManagedReference
    @JsonIgnoreProperties("doctor")
    private List<User> userList = new ArrayList<>();


    @OneToMany(
            mappedBy = "doctor",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonManagedReference
    private List<Chat> chatList = new ArrayList<>();


    @OneToMany(
            mappedBy = "doctor",
            orphanRemoval = true,
            cascade = {CascadeType.PERSIST, CascadeType.REMOVE}
    )
    private List<PersonalArticle> personalArticles = new ArrayList<>();


    public Doctor() {
    }

    public Doctor(String email,
                  String firstName,
                  String lastName,
                  String middleName,
                  String gender,
                  int age,
                  String degree,
                  String specialisation,
                  int experience,
                  String address,
                  String contact,
                  String imageUrl,
                  int rating,
                  int patientLimit,
                  int patientCount,
                  String registrationNumber,
                  String registrationStamp) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.gender = gender;
        this.age = age;
        this.degree = degree;
        this.specialisation = specialisation;
        this.experience = experience;
        this.address = address;
        this.contact = contact;
        this.imageUrl = imageUrl;
        this.rating = rating;
        this.patientLimit = patientLimit;
        this.patientCount = patientCount;
        this.registrationNumber = registrationNumber;
        this.registrationStamp = registrationStamp;
        this.isVerified = false;
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
    public List<String> getLanguages() {
        return languages;
    }

    public void setLanguages(List<String> languages) {
        this.languages = languages;
    }

    public List<PersonalArticle> getPersonalArticles() {
        return personalArticles;
    }

    public void setPersonalArticles(List<PersonalArticle> personalArticles) {
        this.personalArticles = personalArticles;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public boolean isVerified() {
        return isVerified;
    }

    public void setVerified(boolean verified) {
        isVerified = verified;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
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

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getSpecialisation() {
        return specialisation;
    }

    public void setSpecialisation(String specialisation) {
        this.specialisation = specialisation;
    }

    public int getExperience() {
        return experience;
    }

    public void setExperience(int experience) {
        this.experience = experience;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public int getPatientLimit() {
        return patientLimit;
    }

    public void setPatientLimit(int patientLimit) {
        this.patientLimit = patientLimit;
    }

    public int getPatientCount() {
        return patientCount;
    }

    public void setPatientCount(int patientCount) {
        this.patientCount = patientCount;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getRegistrationStamp() {
        return registrationStamp;
    }

    public void setRegistrationStamp(String registrationStamp) {
        this.registrationStamp = registrationStamp;
    }

    public List<User> getUserList() {
        return userList;
    }

    public void setUserList(List<User> userList) {
        this.userList = userList;
    }

    public List<Chat> getChatList() {
        return chatList;
    }

    public void setChatList(List<Chat> chatList) {
        this.chatList = chatList;
    }

    public void addChat(Chat chat){
        if (!this.chatList.contains(chat)){
            this.chatList.add(chat);     // add to chats if not present already
            chat.setDoctor(this);        // keep both ways sync
        }
    }
    public void removeChat(Chat chat){
        if(this.chatList.contains(chat)){
            this.chatList.remove(chat);
            chat.setDoctor(null);       // removed chat will have no doctor associated
        }
    }
    public void addUser(User user){
        if(!this.userList.contains(user)){
            this.userList.add(user);
            user.setDoctor(this);
        }
    }
    public void removeUser(User user){
        if(this.userList.contains(user)){
            this.userList.remove(user);
            user.setDoctor(null);
        }
    }

    public void addPersonalArticle(PersonalArticle personalArticle)
    {
        if(!this.personalArticles.contains(personalArticle))
        {
            this.personalArticles.add(personalArticle);
            personalArticle.setDoctor(this);
        }
    }

    public void removePersonalArticle(PersonalArticle personalArticle)
    {
        if(this.personalArticles.contains(personalArticle))
        {
            this.personalArticles.remove(personalArticle);
            personalArticle.setDoctor(null);
        }
    }

    @Override
    public String toString() {
        return "doctor{" +
                "id='" + id + '\'' +
                ", email='" + email + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", middleName='" + middleName + '\'' +
                ", gender='" + gender + '\'' +
                ", age=" + age +
                ", degree='" + degree + '\'' +
                ", specialisation='" + specialisation + '\'' +
                ", experience=" + experience +
                ", address='" + address + '\'' +
                ", contact='" + contact + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", rating=" + rating +
                ", patientLimit=" + patientLimit +
                ", patientCount=" + patientCount +
                ", registrationNumber='" + registrationNumber + '\'' +
                ", registrationStamp='" + registrationStamp + '\'' +
                ", userList=" + userList.size() +
                ", chatList=" + chatList.size() +
                '}';
    }
}