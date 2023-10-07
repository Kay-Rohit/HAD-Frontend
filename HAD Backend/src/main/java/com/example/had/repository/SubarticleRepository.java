package com.example.had.repository;

import com.example.had.entity.Subarticle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SubarticleRepository extends JpaRepository<Subarticle, UUID> {
}
