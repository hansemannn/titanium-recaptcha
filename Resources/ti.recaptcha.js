// FIXME: Import classes

/*
 * Verifies the current window regarding the given client-ID.
 *
 * @param window {Ti.UI.Window} The current Titanium window (activity) to verify.
 * @param siteKey {String} The site-key used to verify the window.
 * @param callback {Function} The callback to invoked after verifying the request.
 */
exports.verify = function(window, siteKey, callback) {
    
    // FIXME: Change to Hyperloop-based arguments
    var googleApiClient = new GoogleApiClient.Builder(this)
        .addApi(SafetyNet.API)
        .addConnectionCallbacks(myMainActivity.this)
        .addOnConnectionFailedListener(myMainActivity.this)
        .build();
        
    SafetyNet.SafetyNetApi.verifyWithRecaptcha(googleApiClient, siteKey).setResultCallback(new ResultCallback() {
        onResult: function(result) {
            Status status = result.getStatus();

            if (status != null && status.isSuccess() === true) {
                callback({
                    success: true,
                    code: status.getStatusCode(),
                    empty: result.getTokenResult().isEmpty()
                });
            } else {
                callback({
                    success: false,
                    error: 'Error occurred when communicating with the reCAPTCHA service.',
                    code: status.getStatusCode()
                });
            }
        }
    });

    googleApiClient.connect();
};
