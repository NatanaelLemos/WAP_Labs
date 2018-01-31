package edu.mum.lab11.storage;

import edu.mum.lab11.models.User;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;

public class ApplicationStorage {
    private HttpServletRequest request;
    private HttpServletResponse response;
    private ServletContext context;

    private ApplicationStorage() {
    }

    public static ApplicationStorage getInstance(HttpServletRequest request, HttpServletResponse response){
        ApplicationStorage storage = new ApplicationStorage();
        storage.request = request;
        storage.response = response;
        storage.context = request.getServletContext();
        return storage;
    }

    public static ApplicationStorage getInstance(ServletContext context){
        ApplicationStorage storage = new ApplicationStorage();
        storage.context = context;
        return storage;
    }

    public void setValue(StorageType storageType, String key, Object value) {
        switch (storageType) {
            case Application:
                setApplicationValue(key, value);
                break;
            case Cookie:
                setCookieValue(key, value);
            default:
                setSessionValue(key, value);
                break;
        }
    }

    private void setApplicationValue(String key, Object value){
        context.setAttribute(key, value);
    }

    private void setCookieValue(String key, Object value){
        Cookie cookie = new Cookie(key, value.toString());
        cookie.setMaxAge(3600 * 24 * 30); //number of seconds in one month
        response.addCookie(cookie);
    }

    private void setSessionValue(String key, Object value) {
        request.getSession().setAttribute(key, value);
    }

    public <T> T getValue(StorageType storageType, String key) {
        Object result;

        switch (storageType) {
            case Application:
                result = getApplicationValue(key);
                break;
            case Cookie:
                result = getCookieValue(key);
                break;
            default:
                result = getSessionValue(key);
                break;
        }

        if (result == null) {
            return null;
        }

        return (T)result;
    }

    private Object getApplicationValue(String key){
        return context.getAttribute(key);
    }

    private Object getCookieValue(String key){
        for (Cookie cookie : request.getCookies()) {
            if (cookie.getName().equals(key)) {
                return cookie.getValue();
            }
        }

        return null;
    }

    private Object getSessionValue(String key) {
        HttpSession session = request.getSession();

        if (session == null) return null;

        return session.getAttribute(key);
    }

    public void clean(StorageType storageType){
        switch (storageType) {
            case Cookie:
                cleanCookie();
                break;
            default:
                cleanSession();
                break;
        }
    }

    private void cleanCookie(){
        for (Cookie cookie : request.getCookies()) {
            if (cookie.getName().equals("username")) {
                cookie.setMaxAge(-1);
                cookie.setValue("");
                response.addCookie(cookie);
            }
        }
    }

    private void cleanSession(){
        request.getSession().invalidate();
    }
}
