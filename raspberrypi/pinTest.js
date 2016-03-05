var GpioStream = require('gpio-stream'),
    button = GpioStream.readable(17);

// pipe the button presses to stdout
button.pipe(process.stdout);
