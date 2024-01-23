package com.ssafy.sub.pjt.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ApiImageUrlUtil {

    public static String prefix;

    @Value("${image.prefix}")
    public void setPrefix(String value) {
        prefix = value;
    }
}
