var reCAPTCHA = require('ti.recaptcha');

var win = Ti.UI.createWindow({
    backgroundColor: '#fff'
});

win.addEventListener('open', function() {
  reCAPTCHA.initialize('AIzaSyCZSVOPyILoKeX-mLJUZgMdjnlTOgH7OfQ');
});

var btn = Ti.UI.createButton({
    title: 'Verify current Window'
});

btn.addEventListener('click', function() {
    reCAPTCHA.verify(function(e) {
        if (e.success === false) {
            Ti.API.error('Error verifying current window: ' + e.error);
            return;
        }
        
        alert('GOOD BOY!');
    });
});

win.add(btn);
win.open();
