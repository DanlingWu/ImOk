  document.addEventListener('deviceready', onDeviceReady, false);

  function onDeviceReady(){
    console.log("Device ready...")
  }
    //checking the setup, if setup, then first page is check in page, otherwise welcome page.
  $(document).on('pagebeforeshow', '#welcome-page', function (e) {
        if(localStorage.getItem('isSetup')==='true'){
          $("body").pagecontainer("change", "#check-in-page", {

          });
        }
      } );
  $(document).ready(function(){
    //checking the setup, if setup, then fill the settingPage form.
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

    $('#save-setting-btn').click(function(event){
      event.preventDefault();
      localStorage.setItem("settings-data", $('form').serialize());
      localStorage.setItem("isSetup", true);
      $("body").pagecontainer("change", "#check-in-page", {

      });
    });

     $('#check-in-btn').click(function(){
       var result = connectServer();

       if(result){
         // success msg sent
         if(localStorage.isSetup === 'true'){
             var setupSent = serverSendSettings(localStorage.getItem('settings-data'));
             if(setupSent != null){
               if($('#send-gps-yes').is(':checked')){
                 doSendGPS();
                 $('#latitude').val(localStorage.getItem('Latitude'));
                 $('#longitude').val(localStorage.getItem('Longitude'));
               }
               else{
                 $('#latitude').val('');
                 $('#longitude').val('');
               }
               checkin = serverCheckIn();
              $('#check-in-success').popup('open');
            }else {
              alert("Sorry, the server didn't respond.");
            }

         }else {
           $(':mobile-pagecontainer').pagecontainer('change', '#setting-page');
         }

       }else{
         alert('Sorry, can not connect!')
       }
     });

     $('#emergency-btn').click(function(){
       var result = connectServer();

       if(result){
         // success msg sent
         if(localStorage.isSetup === 'true'){
             var setupSent = serverSendSettings(localStorage.getItem('settings-data'));
             if(setupSent != null){
               emergencyCheckIn = serverEmergencyCheckIn();
               doSendGPS();

              $('#emergency-check-in-success').popup('open');
            }else {
              alert("Sorry, the server didn't respond.");
            }

         }else {
           $(':mobile-pagecontainer').pagecontainer('change', '#setting-page');
         }

       }else{
         alert('Sorry, can not connect!')
       }
     });
    // onSuccess Callback
// This method accepts a Position object, which contains the
// current GPS coordinates
//
function doSendGPS(){
  saveGPS();
  serverSendGPS(
    localStorage.getItem('Latitude'),
    localStorage.getItem('Longitude'),
    localStorage.getItem('GPSTimeStamp')
  );
}
function saveGPS(){
  console.log('GPS');
  var onSuccess = function(position) {
/*
      console.log('Latitude: '          + position.coords.latitude          + '\n' +
            'Longitude: '         + position.coords.longitude         + '\n' +
            'Altitude: '          + position.coords.altitude          + '\n' +
            'Accuracy: '          + position.coords.accuracy          + '\n' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
            'Heading: '           + position.coords.heading           + '\n' +
            'Speed: '             + position.coords.speed             + '\n' +
            'Timestamp: '         + position.timestamp                + '\n');*/
            // save location
            localStorage.setItem('Latitude', position.coords.latitude);
            localStorage.setItem('Longitude', position.coords.longitude);
            //unix time in miliseconds.
            localStorage.setItem('GPSTimeStamp', new Date(position.timestamp));

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
