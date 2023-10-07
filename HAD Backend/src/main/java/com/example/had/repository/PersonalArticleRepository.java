package com.example.had.repository;

import com.example.had.entity.Doctor;
import com.example.had.entity.PersonalArticle;
import com.example.had.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Repository
public interface PersonalArticleRepository extends JpaRepository<PersonalArticle, UUID>
{
    @Query("select p from Personal_Article p where p.user.id = ?1")
    List<PersonalArticle> findByUser_Id(UUID id);
    @Transactional
    @Modifying
    @Query("delete from Personal_Article p where p.doctor = ?1 and p.user = ?2")
    int deleteByDoctorAndUser(Doctor doctor, User user);
}
