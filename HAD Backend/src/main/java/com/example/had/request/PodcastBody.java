package com.example.had.request;

import java.util.List;
import java.util.UUID;

public class PodcastBody {
    private String artist;
    private String podcastTitle;
    private String podcastThumbnail;
    private String image;

    private List<EpisodeBody> podcastEpisodes;

    public String getArtist() {
        return artist;
    }

    public String getPodcastTitle() {
        return podcastTitle;
    }

    public String getPodcastThumbnail() {
        return podcastThumbnail;
    }

    public List<EpisodeBody> getPodcastEpisodes() {
        return podcastEpisodes;
    }

    public String getImage() {
        return image;
    }
}
