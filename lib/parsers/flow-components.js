// Dependencies
const parseComponent = require("./flow-component");

/**
 * parseComponents
 *
 * @name parseComponents
 * @function
 * @param {Arrayt} input Raw engine-syntax flow elements.
 * @param {String} instName The instance name.
 * @return {Array} The parsed flow components.
 */
module.exports = function (input, instName) {
    return input.map(c => parseComponent(c, instName));
};
