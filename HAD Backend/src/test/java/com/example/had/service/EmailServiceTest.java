package com.example.had.service;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.internet.MimeMessage;

import org.junit.jupiter.api.Disabled;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ContextConfiguration(classes = {EmailService.class})
@ExtendWith(SpringExtension.class)
class EmailServiceTest {
    @Autowired
    private EmailService emailService;

    @MockBean
    private JavaMailSender javaMailSender;

    /**
     * Method under test: {@link EmailService#forgetMail(String, String, String)}
     */
    @Test
    void testForgetMail() throws MessagingException, MailException {
        // Arrange
        doNothing().when(javaMailSender).send(Mockito.<MimeMessage>any());
        when(javaMailSender.createMimeMessage()).thenReturn(new MimeMessage((Session) null));

        // Act
        emailService.forgetMail("alice.liddell@example.org", "Hello from the Dreaming Spires", "iloveyou");

        // Assert
        verify(javaMailSender).createMimeMessage();
        verify(javaMailSender).send(Mockito.<MimeMessage>any());
    }

    /**
     * Method under test: {@link EmailService#forgetMail(String, String, String)}
     */
    @Test
    @Disabled("TODO: Complete this test")
    void testForgetMail2() throws MessagingException, MailException {
        // TODO: Complete this test.
        //   Reason: R013 No inputs found that don't throw a trivial exception.
        //   Diffblue Cover tried to run the arrange/act section, but the method under
        //   test threw
        //   java.lang.NullPointerException
        //       at com.example.had.service.EmailService.forgetMail(EmailService.java:20)
        //   See https://diff.blue/R013 to resolve this issue.

        // Arrange
        doNothing().when(javaMailSender).send(Mockito.<MimeMessage>any());
        when(javaMailSender.createMimeMessage()).thenReturn(null);

        // Act
        try{
            emailService.forgetMail("ys8484529@gmail.com", "Hello from the Dreaming Spires", "iloveyou");
        }catch (Exception ex)
        {
            ex.printStackTrace();
        }

    }

    /**
     * Method under test: {@link EmailService#forgetMail(String, String, String)}
     */
    @Test
    @Disabled("TODO: Complete this test")
    void testForgetMail3() throws MessagingException, MailException {
        // TODO: Complete this test.
        //   Reason: R013 No inputs found that don't throw a trivial exception.
        //   Diffblue Cover tried to run the arrange/act section, but the method under
        //   test threw
        //   javax.mail.internet.AddressException: Illegal address
        //       at com.example.had.service.EmailService.forgetMail(EmailService.java:22)
        //   See https://diff.blue/R013 to resolve this issue.

        // Arrange
        doNothing().when(javaMailSender).send(Mockito.<MimeMessage>any());
        when(javaMailSender.createMimeMessage()).thenReturn(new MimeMessage((Session) null));

        // Act
        emailService.forgetMail("", "Hello from the Dreaming Spires", "iloveyou");
    }
}

