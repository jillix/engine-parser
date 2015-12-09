const flowTypes = require("engine-flow-types")
    , Err = require("err")
    ;

module.exports = input => {
    var prefix = input.match(flowTypes._prefixesRegex)[1] || ""
      , output = {
            error: null
          , prefix: prefix
          , instance: undefined
          , type: flowTypes._prefixes[prefix]
        }
      ;

    input = input.substring(prefix.length);
    output.command = input;
    var splits = input.split("/");
    if (splits.length === 2) {
        output.instance = splits[0];
        output.command = splits[1];
    }

    if (!prefix) {
        output.error = new Err("The prefix is missing.", "MISSING_PREFIX");
    } else if (!output.type) {
        output.error = new Err("The prefix is invalid.", "INVALID_PREFIX");
    }

    return output;
};
