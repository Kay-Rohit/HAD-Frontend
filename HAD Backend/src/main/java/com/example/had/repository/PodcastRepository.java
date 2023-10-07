package com.example.had.repository;

import com.example.had.entity.Podcast;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository("podcast")
public interface PodcastRepository extends JpaRepository<Podcast,UUID> {
    @Query("select p from Podcast p where p.artist = ?1")
    List<Podcast> findByArtist(String artist);
}