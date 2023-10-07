package com.example.had.repository;

import com.example.had.entity.Answers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository("answer")
public interface AnswerRepository extends JpaRepository<Answers, UUID> {
    @Query("select a from Answers a where a.user.id = ?1 and a.weekNumber = ?2 order by a.sessionNumber DESC")
    List<Answers> findByUser_IdAndWeekNumberOrderBySessionNumberDesc(UUID id, int weekNumber);
    @Query("select a from Answers a where a.user.id = ?1 and a.weekNumber = ?2")
    List<Answers> findByUser_IdAndWeekNumber(UUID id, int weekNumber);
}
