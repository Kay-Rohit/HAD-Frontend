package com.example.had.repository;

import com.example.had.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository("question")
public interface QuestionRepository extends JpaRepository<Question, UUID> {
    @Query("select q from QuestionBank q where q.sessionNumber = ?1 and q.weekNumber = ?2 order by q.sessionNumber")
    List<Question> findBySessionNumberAndWeekNumberOrderBySessionNumberAsc(int sessionNumber, int weekNumber);
    @Query("select q from QuestionBank q where q.weekNumber = ?1 order by q.sessionNumber")
    List<Question> findByWeekNumberOrderBySessionNumberAsc(int weekNumber);
    @Query("SELECT q FROM QuestionBank q WHERE q.weekNumber = ?1 GROUP BY q.sessionNumber ORDER BY q.sessionNumber")
    List<Question> findByWeekNumberGroupBySessionNumberOrderBySessionNumberAsc(int weekNumber);

    @Query("select q from QuestionBank q where q.weekNumber = ?1 and q.sessionNumber = ?2")
    List<Question> findByWeekNumberAndSessionNumber(int weekNumber, int sessionNumber);
}