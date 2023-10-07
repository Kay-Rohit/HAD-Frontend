package com.example.had.repository;

import com.example.had.entity.PrepopulatedArticle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PrepopulatedArticleRepository extends JpaRepository<PrepopulatedArticle, UUID> {
}
