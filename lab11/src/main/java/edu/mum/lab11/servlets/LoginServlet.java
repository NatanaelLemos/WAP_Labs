package edu.mum.lab11.servlets;

import edu.mum.lab11.models.User;
import edu.mum.lab11.storage.ApplicationStorage;
import edu.mum.lab11.storage.StorageType;
import javafx.application.Application;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String username = ApplicationStorage
                .getInstance(request, response)
                .getValue(StorageType.Cookie, "username");

        if(username == null || username.isEmpty()){
            username = "";
        } else{
            username = "?username=" + username;
        }

        response.sendRedirect("login.html" + username);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ApplicationStorage storage = ApplicationStorage.getInstance(request, response);

        List<User> users = storage.getValue(StorageType.Application, "users");
        User user = GetUserFromRequest(request);

        if(users.stream().noneMatch(u ->
            u.getUsername().equals(user.getUsername()) &&
            u.getPassword().equals(user.getPassword())
        )){
            response.sendRedirect("login.html");
            return;
        }

        String rememberMe = request.getParameter("remember");

        if(rememberMe == null) {
            storage.clean(StorageType.Cookie);
        } else {
            storage.setValue(StorageType.Cookie, "username", user.getUsername());
        }

        storage.setValue(StorageType.Session, "user", user);
        response.sendRedirect("index.html?username=" + user.getUsername());
    }

    private User GetUserFromRequest(HttpServletRequest request) {
        User newUser = new User();
        newUser.setUsername(request.getParameter("username"));
        newUser.setPassword(request.getParameter("password"));
        return newUser;
    }
}
