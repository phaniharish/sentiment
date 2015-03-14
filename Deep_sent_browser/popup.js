var socket = new WebSocket('ws://localhost:8080/events/');
console.log("ws://localhost:8080/events/");

socket.onmessage = function (event) {
  console.log(event.data);
}
function pauseBrowser(millis) {
    var date = Date.now();
    var curDate = null;
    do {
        curDate = Date.now();
    } while (curDate-date < millis);
}

function register() {
      function createCanvas(divName) {
      
      var div = document.getElementById(divName);
      var canvas = document.createElement('canvas');
      div.appendChild(canvas);
      if (typeof G_vmlCanvasManager != 'undefined') {
        canvas = G_vmlCanvasManager.initElement(canvas);
      } 
      var ctx = canvas.getContext("2d");
      return ctx;
    }
    
   // var ctx = createCanvas("graphDiv1");
    var c = document.getElementById("graphDiv1");
    var ctx = c.getContext("2d");
    
    var graph = new BarGraph(ctx);
    graph.maxValue = 30;
    graph.margin = 10;
    graph.width = 450;
    graph.height = 150;
    graph.colors = ["#49a0d8", "#d353a0", "#ffc527", "#df4c27", "#df4c27"];
    graph.xAxisLabelArr = ["Extreme-Ve", "-Ve", "Neutral", "+Ve", "Extreme+Ve"];
    graph.yAxisLabelArr = ["twitter"];

   // var ctx2 = createCanvas("graphDiv2");
    var c2 = document.getElementById("graphDiv2");
    var ctx2 = c2.getContext("2d");
    
    var graph2 = new BarGraph(ctx2);
    graph2.maxValue = 30;
    graph2.margin = 10;
    graph.width = 450;
    graph.height = 150;
    graph2.colors = ["#49a0d8", "#d353a0", "#ffc527", "#df4c27", "#df4c27"];
    graph2.xAxisLabelArr = ["Extreme-Ve", "-Ve", "Neutral", "+Ve", "Extreme+Ve"];
    graph2.yAxisLabelArr = ["Facebook"];
    //setInterval(function () {
    //  graph.update([Math.random() * 30, Math.random() * 30, Math.random() * 30, Math.random() * 30, Math.random() * 30]);
    //}, 1000);


  var senderId = document.getElementById("age_group").value;
  //chrome.gcm.register([senderId], registerCallback);

  // Prevent register button from being click again before the registration
  // finishes.
  //document.getElementById("register").disabled = true;
    var d = new Date();
    console.log("here");
    var send_data =  senderId ;

    if(typeof socket === 'undefined') {

    var socket = new WebSocket('ws://localhost:8080/events/');
    setTimeout(function(){
      socket.send(send_data);
    }, 1000);

    }

    if(socket.readyState == socket.CLOSED) {
      //var socket = new WebSocket('ws://10.136.3.237:8080/events/');
      //setTimeout(function(){
        socket.send(send_data);
      //}, 1000);
        //console.log('WebSocket Error: socket closed' );
    }
    if(socket.readyState == socket.OPEN) {
      socket.send(send_data);
    }
    document.getElementById("age_group").style.display = 'none';
    document.getElementById("divtext").style.display = 'none';
  document.getElementById("register").style.display = 'none';
  var element = document.createElement('div');
    element.id = "someID";
    document.body.appendChild(element);

    element.appendChild(document.createTextNode
     ('Facebook      Twitter'));
    
    var tfb = d.getTime();
    var ttwi = d.getTime();
    var a = "false";
socket.onmessage = function (event) {

//  console.log('time_first: ');
  var myArray = event.data.split(" ");
    if((myArray[0] == "mean2:")||(myArray[0] == "mean:")){
      var myArray2 = myArray.slice(1,myArray.length);
      if((a=="false")&&(myArray[0] == "mean2:")){
        document.getElementById("someID").firstChild.nodeValue=event.data.substring(7);
       // pauseBrowser(300);
      }
      if(myArray[0] == "mean:"){
      
     document.getElementById("someID").firstChild.nodeValue=event.data.substring(7);

   }
   }
  for(var i=1; i<myArray.length; i++) { myArray[i] = parseInt(myArray[i]); }
    var myArray2 = myArray.slice(1,1+5);
  if(myArray[0]=="fb:"){
    graph.update(myArray2);
    console.log("fb_time: " + (tfb - d.getTime()));
    tfb = d.getTime();
  }

  if(myArray[0]=="tw:"){
    graph2.update(myArray2);
    console.log("twit_time" + (ttwi - d.getTime()))
    ttwi = d.getTime();
  }
 

}

}

window.onload = function() {
  document.getElementById("register").onclick = register;
}
