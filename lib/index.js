"use strict"

// Dependencies
const EngineTools = require("engine-tools")
    , SameTime = require("same-time")
    , EngineParser = require("engine-parser")
    , Parser = require("./parser")
    , IterateObject = require("iterate-object")
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
            this.parser = new Parser(data);
            cb(null, this.parser.parse());
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
        this.parse((err, data) => {
            if (err) { return cb(err); }
            this.parser.data.renameInstance(oldName, newName, (err, changedInstances) => {
                if (err) { return cb(err); }
                this.parser.instances = this.parser.data.toObject();
                cb(null, changedInstances, this.parser.instances);
            });
        });
        return this;
    }
}

module.exports = EngineParserGen;
