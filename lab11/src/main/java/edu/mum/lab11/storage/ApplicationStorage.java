package edu.mum.lab11.storage;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class ApplicationStorage {
    private HttpServletRequest request;
    private ServletContext context;

    private ApplicationStorage() {
    }

    public static ApplicationStorage getInstance(HttpServletRequest request){
        ApplicationStorage storage = new ApplicationStorage();
        storage.request = request;
        return storage;
    }

    public static ApplicationStorage getInstance(ServletContext context){
        ApplicationStorage storage = new ApplicationStorage();
        storage.context = context;
        return storage;
    }

    public void setValue(StorageType storageType, String key, Object value) {
        switch (storageType) {
            case Session:
                setSessionValue(key, value);
                break;
            default:
                setSessionValue(key, value);
                break;
        }
    }

    private void setSessionValue(String key, Object value) {
        request.getSession().setAttribute(key, value);
    }

    public <T> T getValue(StorageType storageType, String key, Class<T> returnType) {
        Object result = null;

        switch (storageType) {
            case Session:
                result = getSessionValue(key);
                break;
            default:
                result = getSessionValue(key);
                break;
        }

        if (result == null) {
            return null;
        }

        return returnType.cast(result);
    }

    private Object getSessionValue(String key) {
        HttpSession session = request.getSession();

        if (session == null) return null;

        return session.getAttribute(key);
    }

    public void cleanValue(StorageType storageType, String key){
        switch (storageType) {
            case Session:
                cleanSession(key);
                break;
            default:
                cleanSession(key);
                break;
        }
    }

    private void cleanSession(String key){
        request.getSession().invalidate();
    }
}
