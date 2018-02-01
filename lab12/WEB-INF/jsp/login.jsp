<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
    <meta charset="UTF-8"/>
    <link href="<c:url value='https://fonts.googleapis.com/css?family=Montserrat'/>" rel="stylesheet" />
    <link href="<c:url value='/res/css/styles.css'/>" rel="stylesheet"/>
    <link href="<c:url value='/res/css/login.css'/>" rel="stylesheet"/>
</head>
<body>
<jsp:include page="header.jsp" />

<form action="/login" method="post" class="login-form">
    <div class="input-box">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" value="${username}"/>
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

<script src="<c:url value='http://code.jquery.com/jquery-3.3.1.min.js'/>"
        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
        crossorigin="anonymous"></script>
<script src="<c:url value='/res/js/store.js'/>"></script>
<script defer src="<c:url value='https://use.fontawesome.com/releases/v5.0.6/js/all.js'/>"></script>
</body>
</html>
