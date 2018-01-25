/* jshint esversion: 6 */
/* jshint browser: true */

function showLoading(parent) {
    const loading = $('.loading').clone();
    parent.attr('disabled', 'disabled');
    parent.append(loading);
    loading.removeClass('hide');
}

function hideLoading(parent) {
    parent.removeAttr('disabled');
    parent.find('.loading').remove();
}

class UserView {
    showLoading() { showLoading($('#users')); }
    hideLoading() { hideLoading($('#users')); }

    fill(data, observers) {
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
        $('#comments').removeClass('hide');
        $('#cName').text(comment.name);
        $('#cEmail').text(comment.email);
        $('#cBody').text(comment.body);
    }
}