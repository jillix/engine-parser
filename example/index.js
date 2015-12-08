// Dpendencies
var EngineParser = require("../lib");

// Initialize the parser-generator
var ep = new EngineParser(`${__dirname}/engine-test`);

// Parse the input json
ep.parse(err => {
    if (err) { return console.log(err); }

    // Rename layout->another_layout
    ep.renameInstance("layout", "another_layout", (err, toBeSaved, toBeDeleted) => {
        if (err) { return console.log(err); }

        // Save the changes on the disk
        ep.save({

            // Delete these ones
            delete: toBeDeleted

            // Override these ones
          , save: toBeSaved
        }, function (err) {
            console.log(err || "Saved");
        });
    });
});

