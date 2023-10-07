package com.example.had.service;

import com.example.had.entity.Question;
import com.example.had.repository.QuestionRepository;
import com.example.had.request.QuestionAddBody;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {
    private final QuestionRepository questionRepository;

    public AdminService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public boolean addQuestion(List<QuestionAddBody> question) {
        try {
            for(int i=0; i<question.size(); i++)
            {
                questionRepository.save(
                        new Question(
                                question.get(i).getQuestion(),
                                question.get(i).getQuestionType(),
                                question.get(i).getOption1(),
                                question.get(i).getOption2(),
                                question.get(i).getOption3(),
                                question.get(i).getOption4(),
                                question.get(i).getValue1(),
                                question.get(i).getValue2(),
                                question.get(i).getValue3(),
                                question.get(i).getValue4(),
                                question.get(i).getWeekNumber(),
                                question.get(i).getSessionNumber()
                        )
                );
            }
            System.out.println("Admin Saved Questions");

            return true;

        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return false;
    }
}
