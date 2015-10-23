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

        if (typeof oldName !== "string") {
            return cb(new TypeError("The old instance name should be a string."));
        }

        if (typeof newName !== "string") {
            return cb(new TypeError("The new instance name should be a string."));
        }

        this.parse((err, data) => {
            if (err) { return cb(err); }
            var instanceToRename = this.parser.getInstance(oldName);
            if (!instanceToRename) {
                return cb(new Error("There is no such instance."));
            }

            // Change the instance name
            instanceToRename.name = newName;
            var renameFlow = function (flow) {
                if (!Array.isArray(flow)) { return; }
                IterateObject(flow, cElement =>  {
                    IterateObject(cElement._, cComponent =>  {
                        if (cComponent.data.instance === oldName) {
                            cComponent.data.to = newName;
                        }
                    });
                });
            };

            // Change the instance name in flows
            IterateObject(this.parser.data.instances, cInstance => {
                if (cInstance._.name === oldName) { return; }
                renameFlow(cInstance._.flow);
                renameFlow(Object(cInstance._.client).flow);
            });
        });
        return this;
    }
}

module.exports = EngineParserGen;
