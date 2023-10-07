package com.example.had.sample;

import com.example.had.entity.PrepopulatedArticle;
import com.example.had.entity.Subarticle;
import com.example.had.repository.PrepopulatedArticleRepository;
import com.example.had.repository.SubarticleRepository;
import com.github.javafaker.Faker;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class PreData {
    private final PrepopulatedArticleRepository prepopulatedArticleRepository;
    private final SubarticleRepository subarticleRepository;

    public PreData(PrepopulatedArticleRepository prepopulatedArticleRepository,
                   SubarticleRepository subarticleRepository) {
        this.prepopulatedArticleRepository = prepopulatedArticleRepository;
        this.subarticleRepository = subarticleRepository;
    }
    public void generateData(){
        Faker faker = new Faker();
        for (int i = 0; i < 2; i++)
        {
            PrepopulatedArticle preArticle = new PrepopulatedArticle(
                    faker.book().title(),
                    faker.avatar().image(),
                    faker.superhero().descriptor(),
                    faker.color().name()
            );

            ArrayList<String> imageUrl = new ArrayList<>();
            imageUrl.add(faker.company().url());
            imageUrl.add(faker.internet().url());
            imageUrl.add(faker.internet().url());

            ArrayList<String> textData = new ArrayList<>();
            textData.add("EVERYTHING IS ALRIGHT");
            textData.add("ALL IS WELL");
            textData.add("YOU'LL BE FINE");

            Subarticle subarticle = new Subarticle(
                    faker.book().title(),
                    faker.weather().description(),
                    imageUrl,
                    textData
            );

            subarticle.setPrepopulatedArticle(preArticle);
            preArticle.setSubarticle(subarticle);
            subarticleRepository.save(subarticle);
            prepopulatedArticleRepository.save(preArticle);

        }
    }
}
