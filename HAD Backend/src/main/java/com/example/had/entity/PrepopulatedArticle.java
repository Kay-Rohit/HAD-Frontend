package com.example.had.entity;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;
@Entity(name = "PrepopulatedArticle")
@Table(name = "prepopulated_article")
public class PrepopulatedArticle
{
    @Id
    @GeneratedValue(generator = "uuid4")
    @GenericGenerator(name = "UUID", strategy = "uuid4")
    @Type(type = "org.hibernate.type.UUIDCharType")
    @Column(columnDefinition = "CHAR(36)", name = "prepopulated_article_id")
    private UUID id;

    @Column(
            name = "article_title",
            nullable = false
    )
    public String articleTitle;

    @Column(
            name = "article_image",
            nullable = false
    )
    public String articleImage;

    @Column(
            name = "description",
            nullable = false
    )
    public String description;


    @Column(
            name = "background_color",
            nullable = false
    )
    public String backgroundColor;

    @OneToOne(
            mappedBy = "prepopulatedArticle",
            orphanRemoval = true
    )
//    @JsonBackReference
    public Subarticle subarticle;

    public  PrepopulatedArticle()
    {

    }

    public PrepopulatedArticle(String articleTitle, String articleImage, String description, String backgroundColor) {
        this.articleTitle = articleTitle;
        this.articleImage = articleImage;
        this.description = description;
        this.backgroundColor = backgroundColor;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getArticleTitle() {
        return articleTitle;
    }

    public void setArticleTitle(String articleTitle) {
        this.articleTitle = articleTitle;
    }

    public String getArticleImage() {
        return articleImage;
    }

    public void setArticleImage(String articleImage) {
        this.articleImage = articleImage;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBackgroundColor() {
        return backgroundColor;
    }

    public void setBackgroundColor(String backgroundColor) {
        this.backgroundColor = backgroundColor;
    }

    public Subarticle getSubarticle() {
        return subarticle;
    }

    public void setSubarticle(Subarticle subarticle) {
        this.subarticle = subarticle;
    }
}