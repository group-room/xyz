package com.grouproom.xyz.domain.azt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;

@Component
public class ProcedureInitializer {

    private final JdbcTemplate jdbcTemplate;
    private final Resource sqlScript;


    @Autowired
    public ProcedureInitializer(JdbcTemplate jdbcTemplate, @Value("classpath:db/migration/V1__Create_Procedure.sql") Resource sqlScript) {
        this.jdbcTemplate = jdbcTemplate;
        this.sqlScript = sqlScript;
    }

    @PostConstruct
    public void initialize() throws IOException {
        try (Reader reader = new InputStreamReader(sqlScript.getInputStream(), StandardCharsets.UTF_8)) {
            String sql = FileCopyUtils.copyToString(reader);
            String[] sqlStatements = sql.split("//");
            for (String statement : sqlStatements) {
                if (!statement.trim().isEmpty()) {
                    jdbcTemplate.execute(statement);
                }
            }
        }
    }
}
