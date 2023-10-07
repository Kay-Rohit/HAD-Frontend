package com.example.had.entity;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity(name = "Podcast")
@Table(name = "podcast")
public class Podcast {
    @Id
    @GeneratedValue(generator = "uuid4")
    @GenericGenerator(name = "UUID", strategy = "uuid4")
    @Type(type = "org.hibernate.type.UUIDCharType")
    @Column(columnDefinition = "CHAR(36)", name = "podcast_id")
    private UUID id;

    @Column(name = "artist")
    private String artist;

    @Column(name = "image", columnDefinition = "TEXT")
    private String image;

    @Column(name = "podcast_title", columnDefinition = "TEXT")
    private String podcastTitle;

    @Column(name = "podcast_thumbnail", columnDefinition = "TEXT")
    private String podcastThumbnail;

//    @OneToMany(mappedBy = "podcast", cascade = CascadeType.ALL)
//    private List<PodcastEpisode> podcastEpisodes;

    @OneToMany(
            mappedBy = "podcast",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonManagedReference
    private List<PodcastEpisode> podcastEpisodes = new ArrayList<>();

    public Podcast() {
    }

    public Podcast(String artist, String image, String podcastTitle, String podcastThumbnail) {
        this.artist = artist;
        this.image = image;
        this.podcastTitle = podcastTitle;
        this.podcastThumbnail = podcastThumbnail;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }


    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public String getPodcastTitle() {
        return podcastTitle;
    }

    public void setPodcastTitle(String podcastTitle) {
        this.podcastTitle = podcastTitle;
    }

    public String getPodcastThumbnail() {
        return podcastThumbnail;
    }

    public void setPodcastThumbnail(String podcastThumbnail) {
        this.podcastThumbnail = podcastThumbnail;
    }

    public List<PodcastEpisode> getPodcastEpisodes() {
        return podcastEpisodes;
    }

    public void setPodcastEpisodes(List<PodcastEpisode> podcastEpisodes) {
        this.podcastEpisodes = podcastEpisodes;
    }
    public void addEpisode(PodcastEpisode episode){
        if(!this.podcastEpisodes.contains(episode))
            this.podcastEpisodes.add(episode);
    }
}
