package edu.mum.lab12.filters;

import edu.mum.lab12.models.User;
import edu.mum.lab12.storage.ApplicationStorage;
import edu.mum.lab12.storage.StorageType;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(filterName = "myFilter", urlPatterns = { "/checkout" })
public class LoginFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) {

    }

    @Override
    public void destroy() {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        User user = ApplicationStorage
                .getInstance(request, response)
                .getValue(StorageType.Session, "user");

        if (user == null) {
            response.sendRedirect("/login");
            return;
        }

        filterChain.doFilter(servletRequest, servletResponse);
    }
}
