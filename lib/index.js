"use strict"

// Dependencies
const EngineTools = require("engine-tools")
    , SameTime = require("same-time")
    , EngineParser = require("engine-parser")
    , Parser = require("./parser")
    , IterateObject = require("iterate-object")
    , Typpy = require("typpy")
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
                cb(null, changedInstances, oldName);
            });
        });
        return this;
    }

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
            var cSave = this.parser.instances[_cSave] || save;

            // Validate the instance to save
            if (!Typpy(cSave, Object)) {
                foos.push(done => {
                    done(new Error("Instance doesn't exist: " + _cSave));
                });
                return;
            }

            // Push the new function
            foos.push(function (done) {
                EngineTools.saveInstance(this.app, cSave, done);
            });
        });
    }
}

module.exports = EngineParserGen;
