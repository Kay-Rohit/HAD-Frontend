package com.example.had.service;

import com.example.had.entity.PersonalArticle;
import com.example.had.repository.DoctorRepository;
import com.example.had.repository.PersonalArticleRepository;
import com.example.had.repository.UserRepository;
import com.example.had.request.PersonalizedArticle;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PersonalizedArticleService {
    private final PersonalArticleRepository personalArticleRepository;
    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;

    public PersonalizedArticleService(PersonalArticleRepository personalArticleRepository,
                                      DoctorRepository doctorRepository,
                                      UserRepository userRepository) {
        this.personalArticleRepository = personalArticleRepository;
        this.doctorRepository = doctorRepository;
        this.userRepository = userRepository;
    }

    public boolean add(List<PersonalizedArticle> personalizedArticles) {
        try {
            for (PersonalizedArticle article : personalizedArticles) {
                personalArticleRepository.save(
                        new PersonalArticle(
                                article.getArticleType(),
                                article.getArticleAuthor(),
                                article.getArticleThumbnail(),
                                doctorRepository.findById(article.getDoctorId()).get(),
                                userRepository.findById(article.getUserId()).get(),
                                article.getArticleUrl(),
                                article.getArticleTitle()
                        )
                );
            }

            System.out.println("DOCTOR added some personalized articles");

            return true;
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return false;
    }

    public boolean delete(UUID articleId) {
        try {
            personalArticleRepository.deleteById(articleId);

            System.out.println("DOCTOR deleted personalized article");

            return true;
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return false;
    }

    public List<PersonalArticle> getByUser(UUID patientId) {
        List<PersonalArticle> personalArticles = null;
        try {
            personalArticles = personalArticleRepository.findByUser_Id(patientId);
            for (PersonalArticle personalArticle : personalArticles) {
                personalArticle.setDoctor(null);
                personalArticle.setUser(null);
            }

            System.out.println("USER fetched personalized articles");

        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return personalArticles;
    }
}
