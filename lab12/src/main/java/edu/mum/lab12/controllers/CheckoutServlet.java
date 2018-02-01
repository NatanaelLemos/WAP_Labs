package edu.mum.lab12.controllers;

import edu.mum.lab12.models.CartItem;
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

@WebServlet("/checkout")
public class CheckoutServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<CartItem> cart = ApplicationStorage.getInstance(request, response).getValue(StorageType.Session, "cart");
        if(cart == null){
            cart = new ArrayList<>();
        }

        request.setAttribute("cart", cart);
        request.getRequestDispatcher("/jsp/checkout.jsp").forward(request, response);
    }
}