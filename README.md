# engine-parser-gen

Parse and generate Engine compositions using helper functions.

## Installation

```sh
$ npm i engine-parser-gen
```

## Example

```js
// Dpendencies
var EngineParserGen = require("engine-parser-gen");

// Initialize the parser-generator
var epg = new EngineParserGen("test-app");

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
```

## Documentation

### `EngineParserGen(app)`
Creates a new instance of `EngineParserGen`.

#### Params
- **String** `app`: The application name.

#### Return
- **EngineParserGen** The `EngineParserGen` instance.

### `parse(cb)`
Parses the instances in a format that Enny can understand and stringify.

#### Params
- **Function** `cb`: The callback function.

### `renameInstance(oldName, newName, cb)`
Renames an instance.

#### Params
- **String** `oldName`: The old instance name.
- **String** `newName`: The new instance name.
- **Function** `cb`: The callback function.

#### Return
- **EngineParserGen** The `EngineParserGen` instance.

### `save(options, cb)`

#### Params
- **Object** `options`: An object containing the following fields:
 - `save` (Object|String): The instance name to save or an object with the instance names (e.g. `{ "layout": true }`).
 - `delete` (Object|String): The instance name to delete or an object with the instance names (e.g. `{ "layout": true }`).
- **Function** `cb`: The callback function.

## How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:

## License

See the [LICENSE](/LICENSE) file.

[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md