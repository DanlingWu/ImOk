/**
This is a mock server

**/

function connectServer(){
  return '{"result":"success"}';
}

function sendMessage(){
  return '{"result":"success"}';
}

function serverCheckIn(stringData){
  console.log(stringData);
}
