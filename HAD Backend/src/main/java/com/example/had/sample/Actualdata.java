package com.example.had.sample;

import com.example.had.entity.Question;
import com.example.had.repository.QuestionRepository;
import com.github.javafaker.Faker;
import org.springframework.stereotype.Service;

@Service
public class Actualdata
{
    public static QuestionRepository questionRepository;

    public Actualdata(QuestionRepository questionRepository)
    {
        this.questionRepository = questionRepository;
    }

    public void generateData()
    {
        Faker faker = new Faker();

        Question question1 = new Question(
                "Are you suffering from feelings of sadness, hopelessness or emptiness?",
                "MCQ",
                "Never",
                "Occasionally",
                "Often(once a week or more)",
                "Everyday",
                25,
                50,
                75,
                100,
                0,
                0
        );
        Question question2 = new Question(
                "Do you find it hard to find pleasure in activities you used to enjoy?",
                "MCQ",
                "Never",
                "Occasionally",
                "Very often",
                "Always",
                25,
                50,
                75,
                100,
                0,
                0
        );
        Question question3 = new Question(
                "Has your appetite changed?",
                "MCQ",
                "No",
                "Somewhat",
                "Quite a lot",
                "I don't like the food I used to.",
                25,
                50,
                75,
                100,
                0,
                0
        );
        Question question4 = new Question(
                "Do you find yourself lacking energy and motivation?",
                "MCQ",
                "No",
                "Somewhat",
                "More than I used to",
                "Completely",
                25,
                50,
                75,
                100,
                0,
                0
        );

        Question question5 = new Question(
                "Has your sex drive reduced?",
                "MCQ",
                "No",
                "Somewhat",
                "Drastically",
                "Completely",
                25,
                50,
                75,
                100,
                0,
                0
        );

        Question question6 = new Question(
                "Are you having trouble getting to sleep and staying asleep? Or are you finding it hard to get up in the morning?",
                "MCQ",
                "Never",
                "Sometimes",
                "Frequently",
                "Nearly everyday",
                25,
                50,
                75,
                100,
                0,
                0
        );

        Question question7 = new Question(
                "Have you had thoughts about harming yourself or ending your life?",
                "MCQ",
                "Never",
                "Sometimes",
                "Frequently",
                "Nearly everyday",
                25,
                50,
                75,
                100,
                0,
                0
        );

        Question question8 = new Question(
                "Are you feeling bad about yourself - or that you are a failure or have let yourself or your family down?",
                "MCQ",
                "Never",
                "Sometimes",
                "Frequently",
                "Nearly everyday",
                25,
                50,
                75,
                100,
                0,
                0
        );

        Question question9 = new Question(
                "Do you have trouble concentrating on things, such as reading the newspaper or watching television?",
                "MCQ",
                "Never",
                "Sometimes",
                "Frequently",
                "Nearly everyday",
                25,
                50,
                75,
                100,
                0,
                0
        );

        Question question10 = new Question(
                "Have you found yourself moving or speaking so slowly that other people could have noticed?",
                "MCQ",
                "Never",
                "Sometimes",
                "Frequently",
                "Nearly everyday",
                25,
                50,
                75,
                100,
                0,
                0
        );






        questionRepository.save(question1);
        questionRepository.save(question2);
        questionRepository.save(question3);
        questionRepository.save(question4);
        questionRepository.save(question5);
        questionRepository.save(question6);
        questionRepository.save(question7);
        questionRepository.save(question8);
        questionRepository.save(question9);
        questionRepository.save(question10);




    }

}
