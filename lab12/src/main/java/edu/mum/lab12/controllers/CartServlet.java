package edu.mum.lab12.controllers;

import com.google.gson.Gson;
import edu.mum.lab12.dto.IdParameter;
import edu.mum.lab12.models.CartItem;
import edu.mum.lab12.models.Product;
import edu.mum.lab12.storage.ApplicationStorage;
import edu.mum.lab12.storage.StorageType;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/cart")
public class CartServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<CartItem> cart = ApplicationStorage.getInstance(request, response).getValue(StorageType.Session, "cart");
        if(cart == null){
            cart = new ArrayList<>();
        }

        String jsonCart = new Gson().toJson(cart);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        out.print(jsonCart);
        out.flush();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ApplicationStorage storage = ApplicationStorage.getInstance(request, response);

        List<CartItem> cart = storage.getValue(StorageType.Session, "cart");
        if(cart == null){
            cart = new ArrayList<>();
        }

        int prodId = IdParameter.getIdFromRequest(request);

        if(cart.stream().anyMatch(c -> c.getProductId() == prodId)){
            CartItem match = cart.stream().filter(c -> c.getProductId() == prodId).findFirst().get();
            match.setQuantity(match.getQuantity() + 1);
        }else{
            CartItem newItem = new CartItem();
            newItem.setProductId(prodId);
            newItem.setQuantity(1);
            cart.add(newItem);
        }

        storage.setValue(StorageType.Session, "cart", cart);
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ApplicationStorage storage = ApplicationStorage.getInstance(request, response);

        int prodId = Integer.parseInt(request.getQueryString().replace("id=",""));

        List<CartItem> cart = storage.getValue(StorageType.Session, "cart");
        cart.remove(cart.stream().filter(c -> c.getProductId() == prodId).findFirst().get());

        storage.setValue(StorageType.Session, "cart", cart);
    }
}
