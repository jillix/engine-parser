# engine-parser-gen

Parse and generate Engine compositions using helper functions.

## Installation

```sh
$ npm i --save engine-parser-gen
```

## Example

```js
// Dpendencies
var EngineParser = require("engine-parser-gen");

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

## How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:

## License

[MIT][license] © [jillix][website]

[license]: http://showalicense.com/?fullname=jillix%20%3Ccontact%40jillix.com%3E%20(http%3A%2F%2Fjillix.com)&year=2015#license-mit
[website]: http://jillix.com
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md