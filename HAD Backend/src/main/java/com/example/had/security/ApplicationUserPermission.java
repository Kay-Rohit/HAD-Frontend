package com.example.had.security;

public enum ApplicationUserPermission {
//    STUDENT_READ("student:read"),
//    STUDENT_WRITE("student:write"),
//    COURSE_READ("course:read"),
//    COURSE_WRITE("course:write");
    ANSWER_READ("answer:read"),
    ANSWER_WRITE("anser:write"),
    ARTICLE_READ("article:read"),
    ARTICLE_WRITE("article:write"),
    CHAT_READ("chat:read"),
    CHAT_WRITE("chat:write"),
    DOCTOR_READ("doctor:read"),
    DOCTOR_WRITE("doctor:write"),
    PERSONALARTICLE_READ("personal:read"),
    PERSONALARTICLE_WRITE("personal:write"),
    PREDATA_READ("predata:read"),
    PREDATA_WRITE("predata:write"),
    QUESTION_READ("question:read"),
    QUESTION_WRITE("question:write"),
    REPORT_READ("report:read"),
    REPORT_WRITE("report:write"),
    SUBARTICLE_READ("subarticle:read"),
    SUBARTICLE_WRITE("subarticle:write"),
    USER_READ("user:read"),
    USER_WRITE("user:write");


    private final String permission;

    ApplicationUserPermission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
