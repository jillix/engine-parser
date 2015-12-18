// Dependencies
const ParseMethod = require("./method")
    , Enny = require("enny")
    , Ul = require("ul")
    , Typpy = require("typpy")
    , flowTypes = require("engine-flow-types")
    , parseCommand = require("./flow-command")
    , deffy = require("deffy")
    ;

/**
 * flowComponent
 * Parses the flow components.
 *
 * @name flowComponent
 * @function
 * @param {Object} _input Raw engine-syntax flow component.
 * @param {String} instName The instance name.
 * @return {FlowComponent} The parsed input.
 */
module.exports = function (_input, instName) {
    var input = Ul.clone(_input);

    if (Typpy(input, String)) {
        input = [input];
    }

    var pInput = parseCommand(input[0]);
    if (pInput.error) {
        // TODO Not sure how to handle such errors
        throw pInput.error;
    }

    pInput.instance = deffy(pInput.instance, instName);

    switch (pInput.type.func) {
        case flowTypes.DataHandler:
        case flowTypes.StreamHandler:
            return new pInput.type.func(
                pInput.command
              , {
                    to: pInput.instance
                  , once: pInput.type.type === "once"
                  , leaking: pInput.type.type === "leaking"
                }
              , input[1]
            );
        case flowTypes.Emit:
            pInput.instance = deffy(input[1] && input[1].to, pInput.instance)
            return new flowTypes.Emit(
                pInput.command
              , {
                    to: pInput.instance
                  , net: pInput.type.type === "net"
                  , leaking: pInput.type.type === "leaking"
                }
            );
        default:
            throw new Error("Unsupported type.");
    }
};
