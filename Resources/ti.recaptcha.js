var GoogleApiClient = require('com.google.android.gms.common.api.GoogleApiClient'),
    ResultCallback = require('com.google.android.gms.common.api.ResultCallback'),
    SafetyNet = require('com.google.android.gms.safetynet.SafetyNet'),
    Activity = require('android.app.Activity');

/*
 * Verifies the current window regarding the given client-ID.
 *
 * @param siteKey {String} The site-key used to verify the window.
 * @param callback {Function} The callback to invoked after verifying the request.
 */
exports.verify = function(siteKey, callback) {
    
    // Receive the current activity
    // TODO: Use this one or Ti.Android.currentActivity?
    var activity = new Activity(Ti.App.Android.getTopActivity());
    
    var googleApiClient = new GoogleApiClient.Builder(activity)
        .addApi(SafetyNet.API)
        .addConnectionCallbacks(activity)
        .addOnConnectionFailedListener(activity)
        .build();
        
    SafetyNet.SafetyNetApi.verifyWithRecaptcha(googleApiClient, siteKey).setResultCallback(new ResultCallback({
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
    }));

    googleApiClient.connect();
};
