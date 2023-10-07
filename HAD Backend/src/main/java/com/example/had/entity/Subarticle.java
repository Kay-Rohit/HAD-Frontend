package com.example.had.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity(name = "Subarticle")
@Table(name = "subarticle")
public class Subarticle
{
    @Id
    @GeneratedValue(generator = "uuid4")
    @GenericGenerator(name = "UUID", strategy = "uuid4")
    @Type(type = "org.hibernate.type.UUIDCharType")
    @Column(columnDefinition = "CHAR(36)", name = "subarticle_id")
    private UUID id;


    @Column(
            name = "title",
            nullable = false
    )
    public String title;

    @Column(
            name = "description",
            nullable = false
    )
    public String description;

    @ElementCollection
    public List<String> imageUrl;

    @ElementCollection
    public List<String> textData;

    @OneToOne(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER
    )
    @JoinColumn(
            name = "prepopulated_article_id",
            referencedColumnName = "prepopulated_article_id",
            foreignKey = @ForeignKey(
                    name = "prepopulated_article_fk"
            )
    )
    @JsonBackReference
    public PrepopulatedArticle prepopulatedArticle;


    public Subarticle() {
    }

    public Subarticle(String title, String description, List<String> imageUrl, List<String> textData) {
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.textData = textData;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(List<String> imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<String> getTextData() {
        return textData;
    }

    public void setTextData(List<String> textData) {
        this.textData = textData;
    }


    public PrepopulatedArticle getPrepopulatedArticle() {
        return prepopulatedArticle;
    }

    public void setPrepopulatedArticle(PrepopulatedArticle prepopulatedArticle) {
        this.prepopulatedArticle = prepopulatedArticle;
    }
}