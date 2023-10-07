package com.example.had.entity;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

@Entity(name = "articles")
@Table(
        name = "articles"
)
public class Articles {
    //    @Id
//    @SequenceGenerator(
//            name = "article_sequence",
//            sequenceName = "article_sequence",
//            allocationSize = 1
//    )
//    @GeneratedValue(
//            strategy = GenerationType.AUTO,
//            generator = "article_sequence"
//    )
//    @Column(
//            name = "article_id",
//            length = 12
//    )
//private Long id;
    @Id
    @GeneratedValue(generator = "uuid4")
    @GenericGenerator(name = "UUID", strategy = "uuid4")
    @Type(type = "org.hibernate.type.UUIDCharType")
    @Column(columnDefinition = "CHAR(36)")
    private UUID id;


    @Column(
            name = "article_type",
            nullable = true
    )
    private String articleType;


    @Column(
            name = "article_week",
            nullable = false
    )
    private String articleWeek;


    @Column(
            name = "article_session",
            nullable = false
    )
    private String articleSession;


    @Column(
            name = "article_link",
            nullable = false
    )
    private String articleLink;

    @Column(
            name = "article_title",
            nullable = false
    )
    private String articleTitle;


    public Articles() {
    }


    public Articles(String articleType,
                    String articleWeek,
                    String articleSession,
                    String articleLink,
                    String articleTitle) {
        this.articleType = articleType;
        this.articleWeek = articleWeek;
        this.articleSession = articleSession;
        this.articleLink = articleLink;
        this.articleTitle = articleTitle;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getArticleType() {
        return articleType;
    }

    public void setArticleType(String articleType) {
        this.articleType = articleType;
    }

    public String getArticleWeek() {
        return articleWeek;
    }

    public void setArticleWeek(String articleWeek) {
        this.articleWeek = articleWeek;
    }

    public String getArticleSession() {
        return articleSession;
    }

    public void setArticleSession(String articleSession) {
        this.articleSession = articleSession;
    }

    public String getArticleLink() {
        return articleLink;
    }

    public void setArticleLink(String articleLink) {
        this.articleLink = articleLink;
    }

    public String getArticleTitle() {
        return articleTitle;
    }

    public void setArticleTitle(String articleTitle) {
        this.articleTitle = articleTitle;
    }


    @Override
    public String toString() {
        return "Articles{" +
                "id=" + id +
                ", articleType='" + articleType + '\'' +
                ", articleWeek='" + articleWeek + '\'' +
                ", articleSession='" + articleSession + '\'' +
                ", articleLink='" + articleLink + '\'' +
                ", articleTitle='" + articleTitle + '\'' +
                '}';
    }
}