// Dependencies
var ParseFlowComponent = require("./flow-component")
  , IterateObject = require("iterate-object")
  , SetOrGet = require("set-or-get")
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
module.exports = function (_input, instName, arr) {

    var out = {};
    if (arr) {
        out = [];
    }

    if (arr) {
        out.push({ event: _input[0] });
        IterateObject(_input.slice(1), function (comp) {
            out.push(ParseFlowComponent(comp, instName));
        });
    } else {
        IterateObject(_input, function (elm) {
            var ev = SetOrGet(out, elm[0], []);
            var p = [];
            IterateObject(elm.slice(1), function (comp) {
                p.push(ParseFlowComponent(comp, instName));
            });
            ev.push(p);
        });
    }

    return out;
};