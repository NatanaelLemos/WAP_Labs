package edu.mum.lab10;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.UUID;

@WebServlet(
    urlPatterns = "/support",
    initParams = {
        @WebInitParam(name = "supportEmail", value = "cstech@mum.edu")
    }
)
public class SupportServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.getWriter().println(
            String.format("Thank you! %s for contacting us. We should receive reply from us with in 24 hrs in " +
                "your email address %s. Let us know in our support email %s if " +
                "you don't receive reply within 24 hrs. Please be sure to attach your reference " +
                "%s in your email.",
                request.getParameter("name"),
                request.getParameter("email"),
                getServletConfig().getInitParameter("supportEmail"),
                UUID.randomUUID().toString()
            )
        );
        /*
i. Support_email should come from context param.
ii. Support_ticket_id is generated automatically for every request.
        */
    }
}
