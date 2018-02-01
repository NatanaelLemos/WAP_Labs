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
<jsp:include page="header.jsp" />

<main>
    <div class="featured">
        <div>
            <img src="../res/img/${featured.img}-lg.jpg" alt="${featured.name}" />
        </div>
        <button data-id="${featured.id}">Add to cart</button>
        <div>
            <h2>${featured.name}</h2>
            <p>${featured.description}</p>
            <p class="price">$${featured.price}</p>
        </div>
    </div>

    <c:forEach items="${products}" var="product">
        <div class="product">
            <h2>${product.name}</h2>
            <img src="../res/img/${product.img}-sm.jpg" alt="${product.name}"/>
            <p>${product.description}</p>
            <p class="price">$${product.price}</p>
            <button data-id="${product.id}">Add to cart</button>
        </div>
    </c:forEach>
</main>

<script src="<c:url value='http://code.jquery.com/jquery-3.3.1.min.js'/>"
        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
        crossorigin="anonymous"></script>
<script src="<c:url value='/res/js/store.js'/>"></script>
<script defer src="<c:url value='https://use.fontawesome.com/releases/v5.0.6/js/all.js'/>"></script>
</body>
</html>
