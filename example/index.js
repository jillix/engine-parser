// Dpeendencies
var EngineParserGen = require("../lib");

// "test-app" should be a valid Engine app in $ENGINE_APPS dir
var epg = new EngineParserGen("test-app");
epg.renameInstance("A", "B", function () {
    debugger
});
