/* jshint esversion: 6 */
/* jshint browser: true */

function showLoading(parent) {
    const loading = $('.loading').clone();
    parent.attr('disabled', 'disabled');
    parent.append(loading);
    loading.removeClass('hide');
}

function hideLoading(parent) {
    //Just to make the loading appear :D
    setTimeout(() => {
        parent.removeAttr('disabled');
        parent.find('.loading').remove();
    }, 400);
}

class UserView {
    showLoading() { showLoading($('#users')); }
    hideLoading() { hideLoading($('#users')); }

    fill(data, observers) {
        $('#user').addClass('hide');
        $('#post').addClass('hide');
        $('#comment').addClass('hide');
        $('#users').html('');
        $('#posts').html('');
        $('#comments').html('');

        $(data).each(function(i, e) {
            $('#users').append(
                $('<li>')
                    .append(`${e.name} - ${e.email}`)
                    .click(() => {
                        for(const observer of observers){
                            observer(e);
                        }
                    })
            );
        });
    }

    details(user) {
        $('#user').removeClass('hide');
        $('#name').text(user.name);
        $('#username').text(user.username);
        $('#email').text(user.email);
        $('#phone').text(user.phone);
    }
}

class PostView {
    showLoading() { showLoading($('#posts')); }
    hideLoading() { hideLoading($('#posts')); }

    fill(data, observers) {
        $('#post').addClass('hide');
        $('#comment').addClass('hide');
        $('#posts').html('');
        $('#comments').html('');

        $(data).each((i, e) => {
            $('#posts').append(
                $('<li>')
                    .append(e.title)
                    .click(() => {
                        for(const observer of observers){
                            observer(e);
                        }
                    })
            );
        });
    }

    details(post) {
        $('#post').removeClass('hide');
        $('#title').text(post.title);
        $('#body').text(post.body);
    }
}

class CommentView {
    showLoading() { showLoading($('#comments')); }
    hideLoading() { hideLoading($('#comments')); }

    fill(data, observers) {
        $('#comment').addClass('hide');
        $('#comments').html('');

        $(data).each((i, e) => {
            $('#comments').append(
                $('<li>')
                    .append(e.name)
                    .click(() => {
                        for(const observer of observers){
                            observer(e);
                        }
                    })
            );
        });
    }

    details(comment) {
        $('#comment').removeClass('hide');
        $('#cName').text(comment.name);
        $('#cEmail').text(comment.email);
        $('#cBody').text(comment.body);
    }
}