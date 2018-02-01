/* jshint esversion: 6 */
/* jshint browser: true */

$(() => {
    "use strict";

    $('.product button, .featured button').click(addItemToCart);
    $('.checkout-item').each(fillProductInfo);
    $('.btn-remove-item').click(removeItemFromCart);

    loadCartItems();

    function loadCartItems(){
        $.get('/cart')
            .done((c) => {
                let qty = 0;

                for(const i of c){
                    qty += i.quantity;
                }

                $('.shopping-cart span').html(qty);
            })
            .fail((xhr, err, status) => {
                alert('Error: ' + err);
        })
    }

    function addItemToCart(e){
        const prodId = $(this).attr('data-id');
        const prodDiv = $(this).parent();

        showLoading(prodDiv);

        $.post('/cart', JSON.stringify({ id: prodId }))
            .done(() => {
                loadCartItems();
            })
            .fail((xhr, err, status) => {
                alert('Error: ' + err);
            })
            .always(() => {
                hideLoading(prodDiv);
            });
    }

    function removeItemFromCart(e){
        if(!confirm('Are you sure?')){
            return;
        }

        showLoading($('main'));

        const id = $(this).attr('data-id');
        $.ajax({
            url: `/cart?id=${id}`,
            type: 'DELETE'
        })
        .done(() => {
            location.reload();
        })
        .fail((xhr, err, status) => {
            hideLoading($('main'));
            alert(err);
        });
    }

    function fillProductInfo(idx, el){
        const id = $(el).attr('data-id');
        showLoading($(el));

        $.get('/product',{id: id})
            .done((prod) => {
                $(`#name${id}`).html(prod.name);
                $(`#unit${id}`).html(prod.price);
                const totalProdTag = $(`#total${id}`);
                const totalProd = parseFloat(prod.price) * parseFloat(totalProdTag.attr('data-quantity'));
                totalProdTag.html(totalProd);
                incrementTotalCart(totalProd);
            })
            .fail((xhr, err, status) => {
                alert('Error: ' + err);
            })
            .always(() => {
                hideLoading($(el));
            });
    }

    function showLoading(parent) {
        const loading = $('.loading-original').clone();
        parent.attr('disabled', 'disabled');
        parent.append(loading);
        loading.removeClass('hide');
        loading.removeClass('loading-original');
    }

    function hideLoading(parent) {
        //Just to make the loading appear :D
        setTimeout(() => {
            parent.removeAttr('disabled');
            parent.find('.loading').remove();
        }, 400);
    }

    let totalCart = 0;
    function incrementTotalCart(value){
        totalCart += value;
        $('#totalCart').val(totalCart);
    }
});