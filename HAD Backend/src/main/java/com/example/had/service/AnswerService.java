package com.example.had.service;

import com.example.had.entity.Answers;
import com.example.had.entity.User;
import com.example.had.repository.AnswerRepository;
import com.example.had.repository.QuestionRepository;
import com.example.had.repository.UserRepository;
import com.example.had.request.AnswersBody;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;

    public AnswerService(AnswerRepository answerRepository,
                         UserRepository userRepository,
                         QuestionRepository questionRepository) {
        this.answerRepository = answerRepository;
        this.userRepository = userRepository;
        this.questionRepository = questionRepository;
    }
    @Transactional
    public boolean addAnswer(AnswersBody answersBody) {
        try {
            Answers answers = new Answers(
                    answersBody.getWeekNumber(),
                    answersBody.getSessionNumber(),
                    answersBody.getAnswer_value(),
                    answersBody.getAnswer_options()
            );
            User user = userRepository.findById(answersBody.getPatientId()).get();

            float depressionValue = 0;
            for (Float val : answersBody.getAnswer_value()) {
                depressionValue += val;
            }
            answers.setUser(user);
            answerRepository.save(answers);

            List<Answers> answersList = user.getAnswers();
            answersList.add(answers);
            user.setAnswers(answersList);
            user.setWeekDone(answersBody.getWeekNumber());
            user.setSessionDone(answersBody.getSessionNumber());
            user.setDepressionSeverity(depressionValue/5);
            userRepository.save(user);

            System.out.println("Answer added for week "+answersBody.getWeekNumber()+" session "+answersBody.getSessionNumber());

            return true;
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return false;
    }
}
