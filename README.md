# engine-parser [![Version](https://img.shields.io/npm/v/engine-parser.svg)](https://www.npmjs.com/package/engine-parser) [![Downloads](https://img.shields.io/npm/dt/engine-parser.svg)](https://www.npmjs.com/package/engine-parser)

> Parse and generate Engine compositions using helper functions.

## Installation

```sh
$ npm i --save engine-parser
```

## Example

```js
// Dpendencies
var EngineParser = require("engine-parser");

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
```

## Documentation

### `EngineParser(adapter)`
Creates a new instance of `EngineParser`.

#### Params
- **String|CompositionAdapter** `adapter`: The path to the application or the adapter object.

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
- **EngineParser** The `EngineParser` instance.

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

 - [`engine-builder`](https://github.com/IonicaBizau/engine-parser) by jillix

## License

[MIT][license] © [jillix][website]

[license]: http://showalicense.com/?fullname=jillix%20%3Ccontact%40jillix.com%3E%20(http%3A%2F%2Fjillix.com)&year=2015#license-mit
[website]: http://jillix.com
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md