"use strict";

// Dependencies
const EngineTools = require("engine-tools")
    , SameTime = require("same-time")
    , EngineParser = require("engine-parser")
    , Parser = require("./parser")
    , IterateObject = require("iterate-object")
    , Typpy = require("typpy")
    ;

/**
 * EngineParserGen
 * Creates a new instance of `EngineParserGen`.
 *
 *
 * @name EngineParserGen
 * @function
 * @param {String} app The application name.
 * @return {EngineParserGen} The `EngineParserGen` instance.
 */
class EngineParserGen {

    constructor (app) {
        if (typeof app !== "string" || !app) {
            throw new TypeError("The app parameter should be a string.");
        }
        this.app = app;
        this.path = EngineTools.getAppPath(this.app);
    }

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
        IterateObject(options.delete, (_, cDelete) => {
            foos.push(done => {
                EngineTools.deleteInstance(this.app, cDelete, done);
            });
        });

        // Collect save
        IterateObject(options.save, (_, _cSave) => {
            var cSave = this.parser.instances[_cSave] || _cSave;

            // Validate the instance to save
            if (!Typpy(cSave, Object)) {
                foos.push(done => {
                    done(new Error("Instance doesn't exist: " + _cSave));
                });
                return;
            }

            // Push the new function
            foos.push(done => {
                EngineTools.saveInstance(this.app, cSave, done);
            });
        });

        SameTime(foos, cb);
    }
}

module.exports = EngineParserGen;
