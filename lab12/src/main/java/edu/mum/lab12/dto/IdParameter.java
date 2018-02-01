package edu.mum.lab12.dto;

import com.google.gson.Gson;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;

public class IdParameter {
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    private int id;

    public static int getIdFromRequest(HttpServletRequest request){
        StringBuffer jb = new StringBuffer();
        String line = null;

        try {
            BufferedReader reader = request.getReader();
            while ((line = reader.readLine()) != null)
                jb.append(line);
        } catch (Exception e) {
            return -1;
        }

        try {
            String json = jb.toString();
            Gson gson = new Gson();
            IdParameter parameter = gson.fromJson(json, IdParameter.class);
            return parameter.getId();
        } catch (Exception e) {
            return -1;
        }
    }
}
