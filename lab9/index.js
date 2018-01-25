/* jshint esversion: 6 */
/* jshint browser: true */

$(() => {
    "use strict";

    const userView = new UserView();
    const userCtrl = new UserController(userView);

    const postView = new PostView();
    const postCtrl = new PostController(postView);

    const commentView = new CommentView();
    const commentCtrl = new CommentController(commentView);

    userCtrl.subscribe(userView.details);
    userCtrl.subscribe(postCtrl.get);

    postCtrl.subscribe(postView.details);
    postCtrl.subscribe(commentCtrl.get);

    commentCtrl.subscribe(commentView.details);

    userCtrl.get();
});