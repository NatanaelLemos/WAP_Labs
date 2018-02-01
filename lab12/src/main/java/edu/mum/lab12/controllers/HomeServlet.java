package edu.mum.lab12.controllers;

import edu.mum.lab12.models.Product;
import edu.mum.lab12.storage.ApplicationStorage;
import edu.mum.lab12.storage.StorageType;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@WebServlet("/home")
public class HomeServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<Product> productsStore = ApplicationStorage.getInstance(request, response).getValue(StorageType.Application, "products");

        List<Product> products = new ArrayList<>(productsStore);
        products.addAll(productsStore);
        products.addAll(productsStore);
        products.addAll(productsStore);
        products.addAll(productsStore);
        products.addAll(productsStore);
        products.addAll(productsStore);
        products.addAll(productsStore);

        Random rand = new Random();
        int  n = rand.nextInt(23);

        request.setAttribute("featured", products.get(n));
        request.setAttribute("products", products);
        request.getRequestDispatcher("/jsp/home.jsp").forward(request, response);
    }
}