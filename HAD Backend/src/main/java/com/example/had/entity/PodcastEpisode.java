package com.example.had.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

@Entity(name = "PodcastEpisode")
@Table(name = "podcast_episode")
public class PodcastEpisode {
    @Id
    @GeneratedValue(generator = "uuid4")
    @GenericGenerator(name = "UUID", strategy = "uuid4")
    @Type(type = "org.hibernate.type.UUIDCharType")
    @Column(columnDefinition = "CHAR(36)", name = "podcast_episode_id")
    private UUID id;

    @ManyToOne
    @JoinColumn(
            name = "podcast_id",
            referencedColumnName = "podcast_id",
            foreignKey = @ForeignKey(name = "podcast_episode_fk")
    )
    @JsonBackReference
    private Podcast podcast;

    @Column(name = "episode_number")
    private int episodeNumber;

    @Column(name = "episode_title", columnDefinition = "TEXT")
    private String episodeTitle;

    @Column(name = "episode_description" ,columnDefinition = "TEXT")
    private String episodeDescription;

    @Column(name = "episode_url", columnDefinition = "TEXT")
    private String episodeURL;

    @Column(name = "is_completed")
    private boolean isCompleted;

    public PodcastEpisode() {
    }

    public PodcastEpisode(int episodeNumber,
                          String episodeTitle,
                          String episodeDescription,
                          String episodeURL,
                          boolean isCompleted) {
        this.episodeNumber = episodeNumber;
        this.episodeTitle = episodeTitle;
        this.episodeDescription = episodeDescription;
        this.episodeURL = episodeURL;
        this.isCompleted = isCompleted;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Podcast getPodcast() {
        return podcast;
    }

    public void setPodcast(Podcast podcast) {
        this.podcast = podcast;
    }

    public int getEpisodeNumber() {
        return episodeNumber;
    }

    public void setEpisodeNumber(int episodeNumber) {
        this.episodeNumber = episodeNumber;
    }

    public String getEpisodeTitle() {
        return episodeTitle;
    }

    public void setEpisodeTitle(String episodeTitle) {
        this.episodeTitle = episodeTitle;
    }

    public String getEpisodeDescription() {
        return episodeDescription;
    }

    public void setEpisodeDescription(String episodeDescription) {
        this.episodeDescription = episodeDescription;
    }

    public String getEpisodeURL() {
        return episodeURL;
    }

    public void setEpisodeURL(String episodeURL) {
        this.episodeURL = episodeURL;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }

}
