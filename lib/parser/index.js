"use strict"

// Dependencies
const Enny = require("enny")
    , ParseFlow = require("engine-parser/lib/composition/parsers/flow")
    , IterateObject = require("iterate-object")
    ;

class EngineParser {
    constructor (instances) {
        this.instances = instances;
    }
    parse (cb) {
        this.data = new Enny();
        IterateObject(this.instances, cInstance => {
            var inst = this.data.addInstance(cInstance);
            cInstance.client = Object(cInstance.client);
            var addFlow = function (flow, isServer) {
                if (!Array.isArray(flow)) { return; }
                var pFlow = ParseFlow(flow, cInstance.name);
                inst.addFlow(pFlow, { client: !isServer });
                return false;
            };

            addFlow(cInstance.flow, true);
            return addFlow(cInstance.client.flow, false);
        });
        this.data.toObject();
        debugger
        cb(null, this.data);
    }
}

module.exports = EngineParser;
