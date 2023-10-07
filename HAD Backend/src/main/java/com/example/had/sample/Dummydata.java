package com.example.had.sample;

import com.example.had.entity.*;
import com.example.had.repository.*;
import com.github.javafaker.Faker;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class Dummydata {

    private final PasswordEncoder passwordEncoder;
    public static AnswerRepository answerRepository;
    public static AuthRepository authRepository;
    public static DoctorConnectionRequestRepository doctorConnectionRequestRepository;
    public static DoctorRepository doctorRepository;
    public static QuestionRepository questionRepository;

    public static UserRepository userRepository;

    public static PersonalArticleRepository personalArticleRepository;

    public static ArticleRepository articleRepository;

    public static ReportRepository reportRepository;

    public Dummydata(PasswordEncoder passwordEncoder,
                     AnswerRepository answerRepository,
                     AuthRepository authRepository,
                     DoctorConnectionRequestRepository doctorConnectionRequestRepository,
                     DoctorRepository doctorRepository,
                     QuestionRepository questionRepository,
                     UserRepository userRepository,
                     PersonalArticleRepository personalArticleRepository,
                     ArticleRepository articleRepository,
                     ReportRepository reportRepository)
    {
        this.passwordEncoder = passwordEncoder;
        this.answerRepository = answerRepository;
        this.authRepository = authRepository;
        this.doctorConnectionRequestRepository = doctorConnectionRequestRepository;
        this.doctorRepository = doctorRepository;
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
        this.personalArticleRepository = personalArticleRepository;
        this.articleRepository = articleRepository;
        this.reportRepository = reportRepository;

    }

    public void generateData()
    {
        Faker faker = new Faker();
//        for (int i = 0; i < 20; i++)
//        {
//            User user = new User(
//                    faker.internet().emailAddress(),
//                    faker.name().firstName(),
//                    faker.name().lastName(),
//                    faker.name().firstName(),
//                    faker.demographic().sex(),
//                    faker.date().birthday().toString(),
//                    faker.phoneNumber().cellPhone().substring(0, 12),
//                    faker.address().fullAddress(),
//                    faker.date().birthday().toString(),
//                    faker.number().numberBetween(1, 100)
//            );
//
//            Doctor doctor = new Doctor(
//                    faker.internet().emailAddress(),
//                    faker.name().firstName(),
//                    faker.name().lastName(),
//                    faker.name().firstName(),
//                    faker.demographic().sex(),
//                    faker.number().numberBetween(18, 80),
//                    "MBBS",
//                    faker.job().keySkills(),
//                    faker.number().numberBetween(1, 14),
//                    faker.address().fullAddress(),
//                    faker.phoneNumber().cellPhone().substring(0, 12),
//                    faker.internet().url(),
//                    faker.number().numberBetween(1, 5),
//                    faker.number().numberBetween(15, 20),
//                    faker.number().numberBetween(1, 15),
//                    new Timestamp(System.currentTimeMillis()).toString(),
//                    faker.date().birthday().toString()
//            );
//
//            List<String> articleList = new ArrayList<>();
//            articleList.add("Audio");
//            articleList.add("Video");
//            articleList.add("Text");
//            articleList.add("Youtube");
//
//            int week = faker.random().nextInt(1, 8);
//            int session = faker.random().nextInt(1, 7);
//
//            Articles articles = new Articles(
//                    articleList.get(faker.random().nextInt(0,3)),
//                    faker.numerify(String.valueOf(week)),
//                    faker.numerify(String.valueOf(session)),
//                    faker.internet().url(),
//                    faker.lorem().sentence(10)
//            );
//
//
//            PersonalArticle personalArticle = new PersonalArticle(
//                    articleList.get(faker.random().nextInt(0,3)),
//                    faker.name().firstName(),
//                    faker.internet().image(),
//                    null,
//                    null,
//                    faker.internet().url(),
//                    faker.lorem().sentence(10)
//            );
//
//
//            Question question = new Question(
//                    faker.lorem().sentence() + "?",
//                    "MCQ",
//                    faker.lorem().word(),
//                    faker.lorem().word(),
//                    faker.lorem().word(),
//                    faker.lorem().word(),
//                    faker.number().numberBetween(0,10),
//                    faker.number().numberBetween(0,10),
//                    faker.number().numberBetween(0,10),
//                    faker.number().numberBetween(0,10),
//                    faker.number().numberBetween(1,6),
//                    faker.number().numberBetween(1,5)
//            );
//
//
//            Report report = new Report(
//                    faker.number().numberBetween(1,6),
//                    faker.number().numberBetween(1,5),
//                    faker.number().numberBetween(1,101),
//                    faker.date().birthday().toString(),
//                    String.valueOf(faker.number().numberBetween(1,5)),
//                    faker.number().numberBetween(1,5),
//                    faker.number().numberBetween(1,6)
//            );
//
//
//            Date startDate = Date.from(Instant.parse("2022-01-01T00:00:00Z"));
//            Date endDate = Date.from(Instant.parse("2022-12-31T23:59:59Z"));
//
//            Auth auth = new Auth(
//                    user.getEmail(),
//                    passwordEncoder.encode("password"),
//                    "USER",
//                    faker.date().between(startDate, endDate).toString()
//            );

//            userRepository.save(user);
//            doctorRepository.save(doctor);
//            personalArticleRepository.save(personalArticle);
//            articleRepository.save(articles);
//            authRepository.save(auth);
//            questionRepository.save(question);
//            reportRepository.save(report);
//            questionRepository.save(question);

//        }



//        ADD ANSWER
//        List<User> userList = userRepository.findAll();
//        for (int j = 0; j < 10; j++) {
//            Answers answer = new Answers(
//                    faker.number().numberBetween(0, 4),
//                    faker.number().numberBetween(0, 5),
//                    new ArrayList<Float>() {{
//                        add((float) faker.number().randomDouble(2, 1, 100));
//                        add((float) faker.number().randomDouble(2, 1, 100));
//                        add((float) faker.number().randomDouble(2, 1, 100));
//                        add((float) faker.number().randomDouble(2, 1, 100));
//                    }},
//                    new ArrayList<String>() {{
//                        add(faker.shakespeare().kingRichardIIIQuote());
//                        add(faker.shakespeare().kingRichardIIIQuote());
//                        add(faker.shakespeare().kingRichardIIIQuote());
//                        add(faker.shakespeare().kingRichardIIIQuote());
//                    }}
//            );
//            answer.setUser(userList.get(faker.number().numberBetween(0,20)));
//            answerRepository.save(answer);
//        }
    }
}