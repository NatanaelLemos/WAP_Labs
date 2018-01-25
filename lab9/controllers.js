/* jshint esversion: 6 */
/* jshint browser: true */

const root = 'http://jsonplaceholder.typicode.com';

class ControllerBase {
    constructor(view) {
        if (new.target === ControllerBase) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }

        this._view = view;

        //"this" reference hack
        this.get = this.get.bind(this);
        this.subscribe = this.subscribe.bind(this);
    }

    get(url, data) {
        this._view.showLoading();
        const observers = this._observers;

        $.get(root + url, data)
            .done((data) => this._view.fill(data, observers))
            .fail((xhr, err, status) => alert(`Error: (${status}) ${err}`))
            .always(this._view.hideLoading);
    }

    subscribe(observer) {
        if(!this._observers){
            this._observers = [];
        }

        this._observers.push(observer);
    }
}

class UserController extends ControllerBase {
    constructor(view) {
        super(view);

        //"this" reference hack
        this.get = this.get.bind(this);
    }

    get() {
        super.get('/users', null);
    }
}

class PostController extends ControllerBase {
    constructor(view) {
        super(view);

        //"this" reference hack
        this.get = this.get.bind(this);
    }

    get(user) {
        super.get('/posts', {userId: user.id});
    }
}

class CommentController extends ControllerBase {
    constructor(view) {
        super(view);

        //"this" reference hack
        this.get = this.get.bind(this);
    }

    get(post) {
        super.get('/comments', {postId: post.id});
    }
}