package edu.mum.lab11.filters;

import edu.mum.lab11.models.User;
import edu.mum.lab11.storage.ApplicationStorage;
import edu.mum.lab11.storage.StorageType;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import java.util.ArrayList;
import java.util.List;

@WebListener
public class ContextListener implements ServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent arg0) {
        List<User> users = new ArrayList<>();
        User u = new User();
        u.setUsername("u1");
        u.setPassword("p1");
        users.add(u);

        u = new User();
        u.setUsername("u2");
        u.setPassword("p2");
        users.add(u);

        u = new User();
        u.setUsername("u3");
        u.setPassword("p3");
        users.add(u);

        ApplicationStorage
            .getInstance(arg0.getServletContext())
            .setValue(
                StorageType.Application,
                "users",
                users);
    }

    @Override
    public void contextDestroyed(ServletContextEvent arg0) {
    }
}
