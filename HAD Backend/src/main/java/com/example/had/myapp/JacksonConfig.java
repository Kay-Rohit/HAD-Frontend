package com.example.had.myapp;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.util.UUID;

@Configuration
public class JacksonConfig {

    @Bean
    public Jackson2ObjectMapperBuilderCustomizer customJackson() {
        return builder -> {
            SimpleModule module = new SimpleModule();
            module.addDeserializer(UUID.class, new UUIDDeserializer());
            builder.modules(module);
        };
    }

    private static class UUIDDeserializer extends JsonDeserializer<UUID> {

        @Override
        public UUID deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
            String uuidString = p.getValueAsString();
            return uuidString != null ? UUID.fromString(uuidString) : null;
        }
    }
}
