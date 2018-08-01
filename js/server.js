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
function serverSendSettings(data){
  if(server){
      console.log(data);
      return '{"result":"success"}';
  }else{
    return null;
  }
}
function serverCheckIn(){
  if(server){
      return '{"result":"success"}';
  }else{
    return null;
  }
}
function serverEmergencyCheckIn(){
  if(server){
      return '{"result":"success"}';
  }else{
    return null;
  }
}
function serverSendGPS(lat, lon, time) {
  console.log('GPS sent. ' + lat + lon + time);
}
