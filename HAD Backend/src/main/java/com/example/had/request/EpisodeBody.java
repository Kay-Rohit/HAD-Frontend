package com.example.had.request;

public class EpisodeBody {
    private int episodeNumber;
    private String episodeTitle;
    private String episodeDescription;
    private String episodeURL;
    private boolean isCompleted;

    public int getEpisodeNumber() {
        return episodeNumber;
    }

    public String getEpisodeTitle() {
        return episodeTitle;
    }

    public String getEpisodeDescription() {
        return episodeDescription;
    }

    public String getEpisodeURL() {
        return episodeURL;
    }

    public boolean isCompleted() {
        return isCompleted;
    }
}
