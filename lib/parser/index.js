"use strict";

// Dependencies
const Enny = require("enny")
    , ParseFlow = require("../parsers/flow")
    , iterateObject = require("iterate-object")
    ;

/**
 * EngineParser
 * Creates a new instance of `EngineParser`.
 *
 * @name EngineParser
 * @function
 * @param {Object} instances An object with the instances' raw content.
 * @return {EngineParser} The `EngineParser` instance.
 */
class EngineParser {

    constructor (instances) {
        this.instances = instances;
    }

    /**
     * parse
     * Parses the instances.
     *
     * @name parse
     * @function
     * @return {Enny} The `Enny` instance.
     */
    parse () {
        this.data = new Enny();
        iterateObject(this.instances, cInstance => {
            var inst = this.data.addInstance(cInstance);
            var pFlow = ParseFlow(cInstance.flow, cInstance.name);
            iterateObject(pFlow, ev => inst.on(ev));
        });
        return this.data;
    }

    /**
     * getInstance
     * Gets the specified instance.
     *
     * @name getInstance
     * @function
     * @param {String} input The instance name.
     * @return {Object} The instance object (note this is in the Enny format).
     */
    getInstance (input) {
        return this.data.instances[input];
    }
}

module.exports = EngineParser;
