// Dpeendencies
var EngineParserGen = require("../lib");

// "test-app" should be a valid Engine app in $ENGINE_APPS dir
var epg = new EngineParserGen("test-app");
//epg.parse(function (err, parsed) {
//    debugger
//});

epg.renameInstance("layout", "another_layout", (err, toBeSaved, toBeDeleted) => {
    if (err) {
        return console.log(err);
    }
    epg.save({
        delete: toBeDeleted
      , save: toBeSaved
    }, function (err) {
        console.log(err || "Saved");
    });
});
