// Dpendencies
var EngineParser = require("../lib");

// Initialize the parser-generator
var ep = new EngineParser(`${__dirname}/engine-test`);

// Rename layout->another_layout
epg.renameInstance("layout", "another_layout", (err, toBeSaved, toBeDeleted) => {
    if (err) { return console.log(err); }

    // Save the changes on the disk
    epg.save({

        // Delete these ones
        delete: toBeDeleted

        // Override these ones
      , save: toBeSaved
    }, function (err) {
        console.log(err || "Saved");
    });
});
