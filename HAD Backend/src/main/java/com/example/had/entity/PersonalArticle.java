package com.example.had.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

@Entity(name = "Personal_Article")
@Table(name = "personal_articles")
public class PersonalArticle
{
    @Id
    @GeneratedValue(generator = "uuid4")
    @GenericGenerator(name = "UUID", strategy = "uuid4")
    @Type(type = "org.hibernate.type.UUIDCharType")
    @Column(columnDefinition = "CHAR(36)")
    private UUID id;

    @Column(
            name = "article_type",
            nullable = false
    )
    private String articleType;

    @Column(
            name = "article_author",
            nullable = false
    )
    private String articleAuthor;

    @Column(name = "article_thumbnail",
            nullable = true
    )
    private String articleThumbnail;

    @Column(name = "completed")
    private boolean isCompleted;
    @ManyToOne
    @JoinColumn(
            name = "doctor_id",
            referencedColumnName = "doctor_id",
            foreignKey = @ForeignKey(
                    name = "doctor_id_fk"
            )
    )
    @JsonBackReference
    private Doctor doctor;


    @ManyToOne
    @JoinColumn(
            name = "user_id",
            referencedColumnName = "user_id",
            foreignKey = @ForeignKey(
                    name = "user_id_fk"
            )
    )
    @JsonBackReference
    private User user;

    @Column(
            name = "article_url",
            nullable = false
    )
    private String articleUrl;

    @Column(
            name = "article_title",
            nullable = false
    )
    private String articleTitle;

    public PersonalArticle() {

    }

    public UUID getId() {
        return id;
    }

    public String getArticleType() {
        return articleType;
    }

    public String getArticleAuthor() {
        return articleAuthor;
    }

    public String getArticleThumbnail() {
        return articleThumbnail;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public User getUser() {
        return user;
    }

    public String getArticleUrl() {
        return articleUrl;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setArticleType(String articleType) {
        this.articleType = articleType;
    }

    public void setArticleAuthor(String articleAuthor) {
        this.articleAuthor = articleAuthor;
    }

    public void setArticleThumbnail(String articleThumbnail) {
        this.articleThumbnail = articleThumbnail;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }

    public void setArticleUrl(String articleUrl) {
        this.articleUrl = articleUrl;
    }


    public String getArticleTitle() {
        return articleTitle;
    }

    public void setArticleTitle(String articleTitle) {
        this.articleTitle = articleTitle;
    }





    public PersonalArticle(String articleType,
                           String articleAuthor,
                           String articleThumbnail,
                           Doctor doctor,
                           User user,
                           String articleUrl,
                           String articleTitle) {
        this.articleType = articleType;
        this.articleAuthor = articleAuthor;
        this.articleThumbnail = articleThumbnail;
        this.doctor = doctor;
        this.user = user;
        this.articleUrl = articleUrl;
        this.articleTitle = articleTitle;
    }

    @Override
    public String toString() {
        return "PersonalArticle{" +
                "id=" + id +
                ", articleType='" + articleType + '\'' +
                ", articleAuthor='" + articleAuthor + '\'' +
                ", articleThumbnail='" + articleThumbnail + '\'' +
                ", doctor=" + doctor +
                ", user=" + user +
                ", articleUrl='" + articleUrl + '\'' +
                ", articleTitle='" + articleTitle + '\'' +
                '}';
    }
}
