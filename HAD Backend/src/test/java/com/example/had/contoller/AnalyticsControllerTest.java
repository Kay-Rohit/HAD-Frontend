package com.example.had.contoller;

import static org.mockito.Mockito.anyInt;
import static org.mockito.Mockito.when;

import com.example.had.response.PlotWeekScore;
import com.example.had.service.DoctorService;
import com.example.had.service.UserService;

import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@ContextConfiguration(classes = {AnalyticsController.class})
@ExtendWith(SpringExtension.class)
class AnalyticsControllerTest {
    @Autowired
    private AnalyticsController analyticsController;

    @MockBean
    private DoctorService doctorService;

    @MockBean
    private UserService userService;

    /**
     * Method under test: {@link AnalyticsController#getWeekScore(UUID, int)}
     */
    @Test
    void testGetWeekScore() throws Exception {
        // Arrange
        when(userService.getWeekScore(Mockito.<UUID>any(), anyInt())).thenReturn(new PlotWeekScore("Name", 10, 10.0f));
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/analytics/plot-line-chart/{patientId}/week/{weekNumber}", UUID.randomUUID(), 10);

        // Act and Assert
        MockMvcBuilders.standaloneSetup(analyticsController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content().string("{\"name\":\"Name\",\"weekNumber\":10,\"score\":10.0}"));
    }

    /**
     * Method under test: {@link AnalyticsController#getWeekScore(UUID, int)}
     */
    @Test
    void testGetWeekScore2() throws Exception {
        // Arrange
        when(userService.getWeekScore(Mockito.<UUID>any(), anyInt())).thenReturn(null);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/analytics/plot-line-chart/{patientId}/week/{weekNumber}", UUID.randomUUID(), 10);

        // Act
        ResultActions actualPerformResult = MockMvcBuilders.standaloneSetup(analyticsController)
                .build()
                .perform(requestBuilder);

        // Assert
        actualPerformResult.andExpect(MockMvcResultMatchers.status().isNoContent());
    }
}

