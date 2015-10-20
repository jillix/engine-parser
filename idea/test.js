"use strict"

class Foo {
    constructor () {
        // ...
    }
    setName (name, fn) {
        setTimeout(() => {
            this.name = name;
            fn();
        }, 1000);
    }
    getName (fn) {
        setTimeout(() => {
            fn(this.name);
        }, 1000);
    }
    sayHelloTo (name, fn) {
        setTimeout(() => {
            this.setName(name, () => {
                this.getName(() => {
                    fn("Hello " + this.name + "!");
                });
            })
        }, 1000);
    }
}

var f = new Foo();
f.sayHelloTo("Alice", function (c) {
    console.log(c);
});
