package com.example.had.service;
import com.example.had.entity.PrepopulatedArticle;
import com.example.had.repository.PrepopulatedArticleRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class PrepopulatedArticleService {
    private final PrepopulatedArticleRepository prepopulatedArticleRepository;

    public PrepopulatedArticleService(PrepopulatedArticleRepository prepopulatedArticleRepository) {
        this.prepopulatedArticleRepository = prepopulatedArticleRepository;
    }

    public List<PrepopulatedArticle> getPreData() {
        List<PrepopulatedArticle> all = new ArrayList<>();
        try {
            all = prepopulatedArticleRepository.findAll();
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return all;
    }
}