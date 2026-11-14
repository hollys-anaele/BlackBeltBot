package com.blackbeltbot.item;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Beans {
    @Bean
    public String helloWorld() {
        System.out.println("hello world");
        return "hello world";
    }
}
