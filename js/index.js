  document.addEventListener('deviceready', onDeviceReady, false);

  function onDeviceReady(){
    console.log("Device ready...")
  }

  $(document).ready(function(){

    if (localStorage.getItem('isSetup')) {
      var serialized = localStorage.getItem('settings-data');

     $.each(serialized.split('&'), function (index, elem) {
         var vals = elem.split('=');
         console.log(vals[0]);
         if (vals[0]==='send-gps') {
           $("[value='" + vals[1] + "']").prop('checked',true);
         }
         else {
           $("[name='" + vals[0] + "']").val(decodeURIComponent(vals[1].replace(/\+/g, ' ')));
         }

      });
    }

    $('#save-setting-btn').click(function(){
      alert($('form').serialize());
      localStorage.setItem("settings-data", $('form').serialize());
      localStorage.setItem("isSetup", true);

    });

     $('#check-in-btn').click(function(){
       ///sa
       serverCheckIn('foo');
     });
    // onSuccess Callback
// This method accepts a Position object, which contains the
// current GPS coordinates
//
function saveGPS(){
  console.log('in save GPS');
  var onSuccess = function(position) {
      console.log('Latitude: '          + position.coords.latitude          + '\n' +
            'Longitude: '         + position.coords.longitude         + '\n' +
            'Altitude: '          + position.coords.altitude          + '\n' +
            'Accuracy: '          + position.coords.accuracy          + '\n' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
            'Heading: '           + position.coords.heading           + '\n' +
            'Speed: '             + position.coords.speed             + '\n' +
            'Timestamp: '         + position.timestamp                + '\n');
            // save location
            localStorage.setItem('Latitude', position.coords.latitude);
            localStorage.setItem('Longitude', position.coords.longitude);

  };

  // onError Callback receives a PositionError object
  //
  function onError(error) {
      alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
  }

  navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

  });
