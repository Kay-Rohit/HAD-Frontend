package com.example.had.service;

import com.example.had.entity.Podcast;
import com.example.had.entity.PodcastEpisode;
import com.example.had.repository.PodcastEpisodeRepository;
import com.example.had.repository.PodcastRepository;
import com.example.had.request.EpisodeBody;
import com.example.had.request.PodcastBody;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
public class PodcastService {
    private final PodcastRepository podcastRepository;
    private final PodcastEpisodeRepository episodeRepository;

    public PodcastService(PodcastRepository podcastRepository, PodcastEpisodeRepository episodeRepository) {
        this.podcastRepository = podcastRepository;
        this.episodeRepository = episodeRepository;
    }

    public List<Podcast> getAllPodcast(){
        try {
            List<Podcast> podcasts = podcastRepository.findAll();

            for (Podcast podcast : podcasts) {
                List<PodcastEpisode> episodes = podcast.getPodcastEpisodes();
                episodes.sort(Comparator.comparingInt(PodcastEpisode::getEpisodeNumber));
            }

            return podcasts;
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return null;
    }
    public List<Podcast> getPodcastByArtist(String artist){
        try {
            return podcastRepository.findByArtist(artist);
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return null;
    }
    @Transactional
    public boolean addPodcast(List<PodcastBody> podcastBody) {
        try {
            for (PodcastBody podcast : podcastBody) {

                Podcast podcast1 = new Podcast(
                        podcast.getArtist(),
                        podcast.getImage(),
                        podcast.getPodcastTitle(),
                        podcast.getPodcastThumbnail()
                );
                podcastRepository.save(podcast1);

                List<EpisodeBody> episodes = podcast.getPodcastEpisodes();
                for (EpisodeBody episode : episodes) {
                    PodcastEpisode episode1 = new PodcastEpisode(
                            episode.getEpisodeNumber(),
                            episode.getEpisodeTitle(),
                            episode.getEpisodeDescription(),
                            episode.getEpisodeURL(),
                            episode.isCompleted()
                    );
                    episode1.setPodcast(podcast1);
                    podcast1.addEpisode(episode1);
                    episodeRepository.save(episode1);
                }
            }

            return true;
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return false;
    }
}