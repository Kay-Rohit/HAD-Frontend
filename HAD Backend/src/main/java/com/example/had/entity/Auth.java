package com.example.had.entity;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Entity(name = "Auth")
@Table(
        name = "auth_master"
)
public class Auth {
    @Id
    @GeneratedValue(generator = "uuid4")
    @GenericGenerator(name = "UUID", strategy = "uuid4")
    @Type(type = "org.hibernate.type.UUIDCharType")
    @Column(
            name = "user_id"
    )
    private UUID id;
    @Column(
            name = "username",
            nullable = false
    )
    private String username;

    @Column(
            name = "password",
            nullable = false
    )
    private String password;
    @Column(
            name = "role",
            nullable = false
    )
    private String role;
    @Column(
            name = "last_login"
    )
    private String lastLogin;

    public Auth() {
    }

    public String getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(String lastLogin) {
        this.lastLogin = lastLogin;
    }

    public Auth(String username, String password, String role, String lastLogin) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.lastLogin = lastLogin;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "Auth{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
