# reCAPTCHA in Appcelerator Titanium

Use the native Android [reCAPTCHA API](https://developer.android.com/training/safetynet/recaptcha.html) in Appcelerator Titanium with Hyperloop.

⚠️ This module is still in development and cannot be used, yet! Feel free to check-out the 
remaining "TODO" comments to address those.

## Example
```js
var reCAPTCHA = require('ti.recaptcha');

// Initialize service
reCAPTCHA.initialize('<YOUR_SITE_KEY>');

// Verify current activity
reCAPTCHA.verify(function(e) {
    if (e.success === false) {
        Ti.API.error('Error verifying current window: ' + e.error);
        return;
    }

    alert('YEY!');
});
```
Please check [Resources/app.js](./Resources/app.js) for a full example.

## Authors
- Hans Knöchel ([@hansemannnn](https://twitter.com/hansemannnn) / [Web](http://hans-knoechel.de))

## License
MIT

## Contributing
Code contributions are greatly appreciated, please submit a new [pull request](https://github.com/hansemannn/titanium-recaptcha/pull/new/master)!
