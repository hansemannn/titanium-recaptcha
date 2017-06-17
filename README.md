# reCAPTCHA in Appcelerator Titanium

Use the native [reCAPTCHA API](https://developer.android.com/training/safetynet/recaptcha.html) (currently Android-only) in Appcelerator Titanium with Hyperloop.

## Example
```js
var reCAPTCHA = require('ti.recaptcha');

reCAPTCHA.verify(win, '<YOUR_SITE_KEY>', function(e) {
    if (e.success === false) {
        Ti.API.error('Error verifying current window: ' + e.error);
        return;
    }

    alert('GOOD BOY!');
});
```
Please check [Resources/app.js](./Resources/app.js) for a full example.

## Authors
- Hans Knöchel ([@hansemannnn](https://twitter.com/hansemannnn) / [Web](http://hans-knoechel.de))

## License
MIT

## Contributing
Code contributions are greatly appreciated, please submit a new [pull request](https://github.com/hansemannn/titanium-recaptcha/pull/new/master)!
