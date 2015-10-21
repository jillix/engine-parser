"use strict"

const Enny = require("enny")
  , IterateObject = require("iterate-object")
  ;

class EngineParser {
    constructor (instances) {
        this.instances = instances;
    }
    parse (cb) {
        this.data = new Enny();
        IterateObject(this.instances, cInstance => {
            debugger
        });
        cb(null, this.data);
    }
}

module.exports = EngineParser;
