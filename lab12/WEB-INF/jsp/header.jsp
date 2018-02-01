<header>
    <a href="/home"><h1>Store</h1></a>

    <a href="/checkout" class="shopping-cart">
        <span></span>
        <i class="fas fa-shopping-cart"></i>
    </a>
    ${sessionScope.user == null ? "" : "<a class='logout' href='/logout'>Logout</a>"}

</header>


<div class="loading hide loading-original">
    &nbsp;
    <img src="../res/img/loading.gif" alt="Loading" />
</div>