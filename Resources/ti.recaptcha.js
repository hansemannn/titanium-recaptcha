var GoogleApiClient = require('com.google.android.gms.common.api.GoogleApiClient'),
    ResultCallback = require('com.google.android.gms.common.api.ResultCallback'),
    SafetyNet = require('com.google.android.gms.safetynet.SafetyNet'),
    Activity = require('android.app.Activity'),
    _mGoogleApiClient = null,
    _siteKey = null;

/*
 * Initializes the Google Play Services with a given site key.
 *
 * @param siteKey {String} The site-key used to verify the window.
 */
exports.initialize = function(siteKey) {    
  _siteKey = _siteKey;
  
  _mGoogleApiClient = new GoogleApiClient.Builder(new Activity(Ti.Android.currentActivity))
      .addConnectionCallbacks(new GoogleApiClient.ConnectionCallbacks({
          onConnected: function(bundle) { /* NO-OP */ },
          onConnectionSuspended: function(i) { /* NO-OP */ }
      }))
      .addOnConnectionFailedListener(new GoogleApiClient.OnConnectionFailedListener({
          onConnectionFailed: function(connectionResult) { /* NO-OP */ }
      }))
      .addApi(SafetyNet.API)
      .build();

  _mGoogleApiClient.connect();
};

/*
 * Verifies the current window and returns the result inside a callback.
 *
 * @param callback {Function} The callback to invoked after verifying the request.
 */
exports.verify = function(callback) {  
    Ti.API.warn(_mGoogleApiClient);

    SafetyNet.SafetyNetApi.verifyWithRecaptcha(_mGoogleApiClient, _siteKey).setResultCallback(new ResultCallback({
        onResult: function(result) {
            var status = result.getStatus();

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
};
