package edu.mum.lab12.filters;

import edu.mum.lab12.models.User;
import edu.mum.lab12.storage.ApplicationStorage;
import edu.mum.lab12.storage.StorageType;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(filterName = "emptyPathFilter", urlPatterns = { "/" })
public class EmptyPathFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) {

    }

    @Override
    public void destroy() {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        response.sendRedirect("/home");
    }
}
