"use strict"

// Dependencies
const EngineTools = require("engine-tools")
    , SameTime = require("same-time")
    , EngineParser = require("engine-parser")
    , Parser = require("./parser")
    ;

class EngineParserGen {

    constructor (app) {
        if (typeof app !== "string" || !app) {
            throw new TypeError("The app parameter should be a string.");
        }
        this.app = app;
        this.path = EngineTools.getAppPath(this.app);
    }

    // Read the instances
    parse (cb) {

        // Read the instances
        EngineTools.getComposition(this.app, { iName: true }, (err, data) => {
            if (err) { return cb(err); }

            // Parse the raw json
            this.p = new Parser(data);
            this.p.parse((err, data) => {
                this.parsed = data;
                cb(err, data, this.parsed);
            });
        });
    }

    /**
     * renameInstance
     * Renames an instance.
     *
     * @name renameInstance
     * @function
     * @param {String} oldName The old instance name.
     * @param {String} newName The new instance name.
     * @param {Function} cb The callback function.
     * @return {EngineParserGen} The `EngineParserGen` instance.
     */
    renameInstance (oldName, newName, cb) {
        this.parse((err) => {
            if (err) { return cb(err); }
            console.log(this);
            debugger
            debugger
        });
        return this;
    }
}

module.exports = EngineParserGen;
