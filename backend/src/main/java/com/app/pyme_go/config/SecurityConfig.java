package com.app.pyme_go.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.app.pyme_go.config.jwt.JwtAuthenticationFilter;
import com.app.pyme_go.config.jwt.JwtEntryPoint;

import java.util.List;
import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

        @Value("${cors.allowed.origins}")
        private String allowedOrigin;

        @Bean
        protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
                http.cors(Customizer.withDefaults())
                                .csrf(AbstractHttpConfigurer::disable)
                                .authorizeHttpRequests(auth -> auth.requestMatchers(
                                                
                                                "/swagger-ui/**",
                                                "/v3/api-docs/**",
                                                "/swagger-resources/**",
                                                "/webjars/**",
                                                "/v1/api/login",
                                                "/v1/api/register", 
                                                "/"   
                                                ).permitAll()
                                                .requestMatchers("/v1/api/admin/**").hasRole("ADMIN")
                                                .anyRequest().authenticated()
                                )
                                .httpBasic(Customizer.withDefaults())
                                .exceptionHandling(exception -> exception.authenticationEntryPoint(jwtEntryPoint()))
                                .addFilterBefore(jwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
                return http.build();
        }

        @Bean
        public JwtAuthenticationFilter jwtTokenFilter() {
                return new JwtAuthenticationFilter();
        }

        @Bean
        public JwtEntryPoint jwtEntryPoint() {
                return new JwtEntryPoint();
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Bean
        CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();

                configuration.setAllowedOrigins(Arrays.asList(allowedOrigin, "http://localhost:3000"));
                configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
                configuration.setExposedHeaders(List.of("Authorization"));
                configuration.setAllowCredentials(true);

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                return source;
        }
}