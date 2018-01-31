<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <title>Store</title>
    <meta charset="UTF-8"/>
    <link href="<c:url value='https://fonts.googleapis.com/css?family=Montserrat'/>" rel="stylesheet" />
    <link href="<c:url value='/res/css/styles.css'/>" rel="stylesheet"/>
</head>
<body>
<jsp:include page="layout.jsp" />

<script src="<c:url value='http://code.jquery.com/jquery-3.3.1.min.js'/>"
        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
        crossorigin="anonymous"></script>
<script src="<c:url value='/res/js/store.js'/>"></script>
</body>
</html>
