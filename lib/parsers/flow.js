// Dependencies
const parseComponents = require("./flow-components")
    , iterateObject = require("iterate-object")
    , flowTypes = require("engine-flow-types");
    ;

/**
 * flowElements
 *
 * @name flowElements
 * @function
 * @param {Arrayt} _input Raw engine-syntax flow elements.
 * @param {String} instName The instance name.
 * @return {Object} The parsed flow elements.
 */
module.exports = function (_input, instName) {
    var parsed = {};
    _input = Object(_input);
    iterateObject(_input, (rawEvent, eventName) => {
        var listener = parsed[eventName] = new flowTypes.Listener(
            eventName,
            rawEvent.r,
            rawEvent.e
        );
        listener.addData(parseComponents(rawEvent.d, instName));
    });
    return parsed;
};
