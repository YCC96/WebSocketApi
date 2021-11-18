function enviarTexto(event) {
  event.preventDefault();
  event.stopPropagation();
  var campo = event.target.texto;
  doSend(campo.value);
  campo.value = "";
}

function init(){
  wsConnect();
}

function wsConnect() {
  websocket = new WebSocket("ws://localhost:3000");

  websocket.onopen = function(evt) {
    onOpen(evt)
  };
  
  websocket.onmessage = function(evt) {
    onMessage(evt);
  };
  
  websocket.onclose = function(evt) {
    onClose(evt)
  };
  
  websocket.onerror = function(evt) {
    onError(evt);
  };
}

function onOpen(evt) {
  document.getElementById("enviar").disabled = false;
  doSend("Saludos del cliente");
}

function onMessage(evt) {
  var area = document.getElementById("mensajes");
  area.innerHTML += evt.data + "\n";
}

function onClose(evt) {
  document.getElementById("enviar").disabled = true;
  document.getElementById("mensajes").innerHTML = "";
  setTimeout(() => {
    wsConnect();
  }, 2000);
}

function onError(evt) {
  console.log("*_* ocurrio un error. ", evt);
}

function doSend(mensaje) {
  websocket.send(mensaje);
}

window.addEventListener("load", init, false);