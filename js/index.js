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

  });
