/**
This is a mock server

**/
var network = true;
var server = true;
function connectServer(){
  if(network){
      return true;
  }else{
      return false;
  }
}

function sendMessage(){
  return '{"result":"success"}';
}

function serverCheckIn(stringData){
  if(server){
      console.log(stringData);
      return '{"result":"success"}';
  }else{
    return null;
  }

}

function serverSendGPS(gpsData) {
  console.log('GPS sent. ' + gpsData);
}
