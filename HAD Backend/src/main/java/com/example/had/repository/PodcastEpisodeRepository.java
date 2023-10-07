package com.example.had.repository;

import com.example.had.entity.PodcastEpisode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface PodcastEpisodeRepository extends JpaRepository<PodcastEpisode,UUID> {
}
