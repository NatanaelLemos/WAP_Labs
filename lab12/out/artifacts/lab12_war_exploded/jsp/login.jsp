<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
    <meta charset="UTF-8"/>
    <link href="<c:url value='https://fonts.googleapis.com/css?family=Montserrat'/>" rel="stylesheet" />
    <link href="<c:url value='/res/css/styles.css'/>" rel="stylesheet"/>
</head>
<body>
<form action="/login" method="post" class="login-form">
    <div class="input-box">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username"/>
    </div>
    <div class="input-box">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password"/>
    </div>
    <div>
        <button type="submit">Submit</button>
    </div>
    <div>
        <label class="checkbox"><input type="checkbox" id="remember" name="remember"/><span></span>Remember me</label>
    </div>
</form>
</body>
</html>
