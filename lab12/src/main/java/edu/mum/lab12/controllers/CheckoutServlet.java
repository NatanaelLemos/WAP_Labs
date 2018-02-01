package edu.mum.lab12.controllers;

import edu.mum.lab12.models.CartItem;
import edu.mum.lab12.models.Product;
import edu.mum.lab12.models.User;
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

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String address1 = request.getParameter("address1");
        String address2 = request.getParameter("address2");
        String cardNumber = request.getParameter("cardNumber");
        String totalCart = request.getParameter("totalCart");

        ApplicationStorage storage = ApplicationStorage.getInstance(request, response);
        User user = storage.getValue(StorageType.Session, "user");
        List<CartItem> cart = storage.getValue(StorageType.Session, "cart");

        if(cart == null){
            cart = new ArrayList<>();
        }

        String[] cardParts = cardNumber.split("-");

        request.setAttribute("username", user.getUsername());
        request.setAttribute("cart", cart);
        request.setAttribute("totalPrice", totalCart);
        request.setAttribute("address1", address1);
        request.setAttribute("address2", address2);
        request.setAttribute("cardNumber", cardParts[cardParts.length - 1]);

        //Clear the cart after confirmation
        storage.setValue(StorageType.Session, "cart", new ArrayList<CartItem>());

        request.getRequestDispatcher("/jsp/confirmation.jsp").forward(request, response);
    }
}