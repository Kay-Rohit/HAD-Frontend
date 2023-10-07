package com.example.had.repository;

import com.example.had.entity.Articles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository("article")
public interface ArticleRepository extends JpaRepository<Articles, UUID>
{

}
