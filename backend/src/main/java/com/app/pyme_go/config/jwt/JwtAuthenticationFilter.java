package com.app.pyme_go.config.jwt;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.app.pyme_go.model.entity.User;
import com.app.pyme_go.service.UserService;

import java.io.IOException;
import java.util.List;

@NoArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        final String authorizationHeader = request.getHeader("Authorization");

        String gmail = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            gmail = jwtUtil.extractGmail(jwt);
        }

        if (gmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userService.loadUserByUsername(gmail);

            if (jwtUtil.validateToken(jwt, userDetails)) {

                String role = jwtUtil.extractRole(jwt);  
                SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role);


                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, List.of(authority));
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);

                User user = userService.findByGmail(gmail);
                if (user != null) {
                    request.setAttribute("user_id", user.getId());
                }
            }
        }
        filterChain.doFilter(request, response);
    }
}