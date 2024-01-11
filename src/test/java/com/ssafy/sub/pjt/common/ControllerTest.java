package com.ssafy.sub.pjt.common;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.sub.pjt.controller.UserController;
import com.ssafy.sub.pjt.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest({UserController.class})
public abstract class ControllerTest {

    @MockBean protected UserService userService;

    @Autowired protected MockMvc mockMvc;

    @Autowired protected ObjectMapper objectMapper;
}
