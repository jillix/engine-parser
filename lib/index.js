"use strict";

// Dependencies
const EngineApp = require("engine-app")
    , flowTypes = require("engine-flow-types")
    , Parser = require("./parser")
    , iterateObject = require("iterate-object")
    , typpy = require("typpy")
    , sameTime = require("same-time")
    , enny = require("enny")
    ;

enny.protoGenerators(flowTypes);

/**
 * EngineParser
 * Creates a new instance of `EngineParser`.
 *
 * @name EngineParser
 * @function
 * @param {String|CompositionAdapter} adapter The path to the application or the adapter object.
 */
class EngineParser extends EngineApp {

    /**
     * parse
     * Parses the instances in a format that Enny can understand and stringify.
     *
     * @name parse
     * @function
     * @param {Function} cb The callback function.
     */
    parse (cb) {

        // Read the instances
        this.getAllInstances((err, data) => {

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
     * @return {EngineParser} The `EngineParser` instance.
     */
    renameInstance (oldName, newName, cb) {
        if (typeof oldName !== "string") {
            return cb(new TypeError("The old name should be a string."));
        }
        if (typeof newName !== "string") {
            return cb(new TypeError("The new name should be a string."));
        }
        this.parse((err, data) => {
            if (err) { return cb(err); }
            this.parser.data.renameInstance(oldName, newName, (err, changedInstances) => {
                if (err) { return cb(err); }
                this.parser.instances = this.parser.data.toObject();
                changedInstances[newName] = true;
                cb(null, changedInstances, oldName);
            });
        });
        return this;
    }

    /**
     * save
     *
     * @name save
     * @function
     * @param {Object} options An object containing the following fields:
     *
     *  - `save` (Object|String): The instance name to save or an object with the instance names (e.g. `{ "layout": true }`).
     *  - `delete` (Object|String): The instance name to delete or an object with the instance names (e.g. `{ "layout": true }`).
     *
     * @param {Function} cb The callback function.
     */
    save (options, cb) {
        var foos = [];

        if (!options.save && !options.delete) {
            return cb(null, null);
        }

        // { save: "layout" }
        if (typeof options.save === "string") {
            let s = options.save;
            options.save = {};
            options.save[s] = true;
        }

        // { delete: "layout" }
        if (typeof options.delete === "string") {
            let d = options.delete;
            options.delete = {};
            options.delete[d] = true;
        }

        // Collect delete
        iterateObject(options.delete, (_, cDelete) => {
            foos.push(done => {
                this.removeInstance(cDelete, done);
            });
        });

        // Collect save
        iterateObject(options.save, (_, _cSave) => {
            var cSave = this.parser.instances[_cSave] || _cSave;

            // Push the new function
            foos.push(done => {
                this.upsertInstance(cSave.name, cSave, done);
            });
        });

        sameTime(foos, cb);
    }
}

module.exports = EngineParser;
