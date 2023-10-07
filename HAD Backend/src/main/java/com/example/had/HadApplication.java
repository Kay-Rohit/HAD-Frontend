package com.example.had;

import com.example.had.sample.Actualdata;
import com.example.had.sample.Dummydata;
import com.example.had.sample.PreData;
import com.example.had.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class HadApplication {

    private Dummydata dummydata;
    private Actualdata actualdata;
    private PreData preData;

    public HadApplication(Dummydata dummydata, Actualdata actualdata,PreData preData)
    {
//        this.dummydata = dummydata;
//        this.actualdata = actualdata;
//        this.preData = preData;
    }

    public static void main(String[] args) {

        SpringApplication.run(HadApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner() {
        return args ->
        {
//            dummydata.generateData();
//            actualdata.generateData();
//            preData.generateData();
        };
    }
}