/* jshint esversion: 6 */
/* jshint browser: true */

$(() => {
    "use strict";

    const users = $('#users');
    const posts = $('#posts');
    const comments = $('#comments');
    const root = 'http://jsonplaceholder.typicode.com';

    const userCtrl = {
        get: (id) => {
            const data = id ? { 'id' : id } : null;
            $.get(root + '/users', data)
                .done((data) => {
                    
                })
                .fail((xhr, err, status) => {
                    alert(`Error: (${status}) ${err}`);
                })
                .always(() => {

                });
        }
    };
});