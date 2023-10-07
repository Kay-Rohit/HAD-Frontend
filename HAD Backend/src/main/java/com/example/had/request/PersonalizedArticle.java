package com.example.had.request;

import java.util.UUID;
public class PersonalizedArticle {
    private String articleAuthor;
    private String articleThumbnail;
    private String articleTitle;
    private String articleType;
    private String articleUrl;
    private UUID doctorId;
    private UUID userId;

    public String getArticleAuthor() {
        return articleAuthor;
    }

    public String getArticleThumbnail() {
        return articleThumbnail;
    }

    public String getArticleTitle() {
        return articleTitle;
    }

    public String getArticleType() {
        return articleType;
    }

    public String getArticleUrl() {
        return articleUrl;
    }

    public UUID getDoctorId() {
        return doctorId;
    }

    public UUID getUserId() {
        return userId;
    }
}
