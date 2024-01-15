package com.ssafy.sub.pjt.util;

import java.time.Duration;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RedisUtil {

    private final RedisTemplate redisTemplate;

    public String getData(String key) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        return valueOperations.get(key);
    }

    public void setData(String key, String value) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(key, value);
    }

    public void setDataExpire(String key, String value, int duration) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        Duration expiredDuration = Duration.ofSeconds(duration);
        valueOperations.set(key, value, expiredDuration);
    }

    public void deleteData(String key) {
        redisTemplate.delete(key);
    }
}
