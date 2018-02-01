<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <title>Confirmation</title>
    <meta charset="UTF-8"/>
    <link href="<c:url value='https://fonts.googleapis.com/css?family=Montserrat'/>" rel="stylesheet" />
    <link href="<c:url value='/res/css/styles.css'/>" rel="stylesheet"/>
</head>
<body>
<jsp:include page="header.jsp" />

<main>
    <br />
    <h2>Thank you</h2>
    <h3>Your order has been placed</h3>

    <div>User: ${username}</div>
    <div>Total Price: ${totalPrice}</div>
    <div>Shipped to: ${address1} ${address2}</div>
    <div>Payed by card: XXXX-XXXX-XXXX-${cardNumber}</div>

    <br />
    <h3>Products:</h3>
    <table>
        <thead>
        <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total Price</th>
        </tr>
        </thead>
        <tbody>
        <c:forEach items="${cart}" var="item">
            <tr class="checkout-item" data-id="${item.productId}">
                <td id="name${item.productId}"></td>
                <td>${item.quantity}</td>
                <td id="unit${item.productId}"></td>
                <td id="total${item.productId}" data-quantity="${item.quantity}"></td>
            </tr>
        </c:forEach>
        </tbody>
    </table>
</main>

<script src="<c:url value='http://code.jquery.com/jquery-3.3.1.min.js'/>"
        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
        crossorigin="anonymous"></script>
<script src="<c:url value='/res/js/store.js'/>"></script>
<script defer src="<c:url value='https://use.fontawesome.com/releases/v5.0.6/js/all.js'/>"></script>
</body>
</html>