// Dpeendencies
var EngineParserGen = require("../lib");

// "test-app" should be a valid Engine app in $ENGINE_APPS dir
var epg = new EngineParserGen("test-app");
epg.parse(function (err, parsed) {
    debugger
});

//epg.renameInstance("A", "B", function (err) {
//    if (err) {
//        return console.log(err);
//    }
//    epg.save(function (err) {
//        console.log(err || "Saved");
//    });
//});
