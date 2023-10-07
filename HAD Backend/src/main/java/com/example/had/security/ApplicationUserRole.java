package com.example.had.security;

import com.google.common.collect.Sets;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;

import static com.example.had.security.ApplicationUserPermission.*;

public enum ApplicationUserRole {
//    STUDENT(Sets.newHashSet()),
//    ADMIN(Sets.newHashSet(COURSE_READ, COURSE_WRITE, STUDENT_READ, STUDENT_WRITE)),
//    ADMINTRAINEE(Sets.newHashSet(COURSE_READ, STUDENT_READ));

    DOCTOR(Sets.newHashSet(
        DOCTOR_READ,
        USER_READ,
        QUESTION_READ,
        ARTICLE_READ,
        CHAT_READ,
        CHAT_WRITE,
        REPORT_READ,
        REPORT_WRITE,
        PERSONALARTICLE_READ,
        PERSONALARTICLE_WRITE
    )),
    USER(Sets.newHashSet(
        DOCTOR_READ,
        USER_READ,
        QUESTION_READ,
        ARTICLE_READ,
        CHAT_READ,
        CHAT_WRITE,
        REPORT_READ,
        PERSONALARTICLE_READ,
        PREDATA_READ,
        SUBARTICLE_READ
    )),
    ADMIN(Sets.newHashSet(
        DOCTOR_READ,
        DOCTOR_WRITE,
        QUESTION_READ,
        QUESTION_WRITE,
        ARTICLE_READ,
        ARTICLE_WRITE,
        PREDATA_READ,
        PREDATA_WRITE,
        SUBARTICLE_READ,
        SUBARTICLE_WRITE
    ));
    private final Set<ApplicationUserPermission> permissions;

    ApplicationUserRole(Set<ApplicationUserPermission> permissions) {
        this.permissions = permissions;
    }

    public Set<ApplicationUserPermission> getPermissions() {
        return permissions;
    }

    public Set<SimpleGrantedAuthority> getGrantedAuthorities() {
        Set<SimpleGrantedAuthority> permissions = getPermissions().stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toSet());
        permissions.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return permissions;
    }
}
