package edu.mum.lab12.filters;

import edu.mum.lab12.models.Product;
import edu.mum.lab12.models.User;
import edu.mum.lab12.storage.ApplicationStorage;
import edu.mum.lab12.storage.StorageType;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import java.util.ArrayList;
import java.util.List;

@WebListener
public class ContextListener implements ServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent arg0) {
        List<User> users = getUsersDb();
        List<Product> products = getProductsDb();

        ApplicationStorage storage = ApplicationStorage.getInstance(arg0.getServletContext());
        storage.setValue(StorageType.Application, "users", users);
        storage.setValue(StorageType.Application, "products", products);
    }

    private List<User> getUsersDb() {
        List<User> users = new ArrayList<>();
        User u = new User();
        u.setUsername("user1");
        u.setPassword("p1");
        users.add(u);

        u = new User();
        u.setUsername("user2");
        u.setPassword("p2");
        users.add(u);

        u = new User();
        u.setUsername("user3");
        u.setPassword("p3");
        users.add(u);

        return users;
    }

    private List<Product> getProductsDb() {
        String lipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel velit id dui scelerisque semper. Sed turpis augue, molestie id lacus nec, convallis iaculis purus. Fusce tempor malesuada molestie.";
        List<Product> products = new ArrayList<>();

        Product p = new Product();
        p.setId(1);
        p.setName("Xbox One X");
        p.setPrice(500);
        p.setDescription(lipsum);
        p.setImg("xbox");
        products.add(p);

        p = new Product();
        p.setId(2);
        p.setName("Nintendo Switch");
        p.setPrice(200);
        p.setDescription(lipsum);
        p.setImg("switch");
        products.add(p);

        p = new Product();
        p.setId(3);
        p.setName("Playstation 4 Pro");
        p.setPrice(400);
        p.setDescription(lipsum);
        p.setImg("ps4");
        products.add(p);

        return products;
    }

    @Override
    public void contextDestroyed(ServletContextEvent arg0) {
    }
}