package edu.mum.lab11.filters;

import edu.mum.lab11.models.User;
import edu.mum.lab11.storage.ApplicationStorage;
import edu.mum.lab11.storage.StorageType;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(filterName = "myFilter", urlPatterns = { "/*" })
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

        User user = ApplicationStorage.getInstance(request).getValue(
                StorageType.Session,
                "user",
                User.class
        );

        if ((user == null) && (!request.getServletPath().startsWith("/login"))) {
            response.sendRedirect("login.jsp");
            return;
        }

        if((user == null) && request.getServletPath().startsWith("/login")){
            response.sendRedirect("index.jsp");
            return;
        }

        filterChain.doFilter(servletRequest, servletResponse);
    }
}
