package com.example.had.repository;

import com.example.had.entity.Auth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.UUID;
@Repository("auth")
public interface AuthRepository extends JpaRepository<Auth, UUID> {
    @Transactional
    @Modifying
    @Query("delete from Auth a where a.username = ?1")
    int deleteByUsername(String username);

    @Query("select a from Auth a where a.username = ?1")
    Auth findByUsername(String username);
    @Transactional
    @Modifying
    @Query("update Auth a set a.lastLogin = ?1 where a.username = ?2")
    int updateLastLoginByUsername(String lastLogin, String username);
    @Transactional
    @Modifying
    @Query("update Auth a set a.password = ?1 where a.username = ?2")
    int updatePasswordByUsername(String password, String username);
    Auth findFirstByUsernameAndPassword(String username, String password);
    Auth findFirstByUsername(String username);
}
