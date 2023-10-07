package com.example.had.response;

import java.util.List;
import java.util.UUID;

public class WeekQuestions {
    private String session_id;
    private int session_number;
    private String session_image_url;
    private String session_title;
    private List<SessionQuestion> sessionQuestions;

    public WeekQuestions(String session_id,
                         int session_number,
                         String session_image_url,
                         String session_title,
                         List<SessionQuestion> sessionQuestions) {
        this.session_id = session_id;
        this.session_number = session_number;
        this.session_image_url = session_image_url;
        this.session_title = session_title;
        this.sessionQuestions = sessionQuestions;
    }

    public String getSession_id() {
        return session_id;
    }

    public void setSession_id(String session_id) {
        this.session_id = session_id;
    }

    public int getSession_number() {
        return session_number;
    }

    public void setSession_number(int session_number) {
        this.session_number = session_number;
    }

    public String getSession_image_url() {
        return session_image_url;
    }

    public void setSession_image_url(String session_image_url) {
        this.session_image_url = session_image_url;
    }

    public String getSession_title() {
        return session_title;
    }

    public void setSession_title(String session_title) {
        this.session_title = session_title;
    }

    public List<SessionQuestion> getSessionQuestions() {
        return sessionQuestions;
    }

    public void setSessionQuestions(List<SessionQuestion> sessionQuestions) {
        this.sessionQuestions = sessionQuestions;
    }
}
