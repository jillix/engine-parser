"use strict"

class Foo {

    constructor (app) {
        this.app = app;
    }

    fn1 (cb) {
        setTimeout(() => {
            setTimeout(() => {
                this.foo = 42;
                cb(null, this.foo, this.app);
            }, 100);
        }, 100);
    }

    fn2 () {
        this.fn1(() => {
            console.log(this.foo);
        });
    }
}

module.exports = Foo;
