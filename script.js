var speechrecognition=window.webkitSpeechRecognition;
var recognition= new speechrecognition();
var Textbox=document.getElementById('textbox');
var camera=document.getElementById("camera");
let classifier;


Webcam.set({
    width: 500,
    height:350,
    image_format: 'jpeg',
    jpeg_quality: 90
})
function take_pic(){
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML='<img id="image" src="'+data_uri+'"/>'
    })
}

function start() {
    Textbox.innerHTML="";
    recognition.start();
}

 function cam_on(){
    var synth= window.speechSynthesis;
    Webcam.attach(camera);
    setTimeout(function(){
        
    },5000)
 }

recognition.onresult=function(event){
    console.log(event);
    var content=event.results[0][0].transcript;
    Textbox.innerHTML=content;
    console.log(content);
    if(content=="open camera"){
        cam_on();
    }
}

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/MuiwAKMeg/model.json",modelLoaded);

function modelLoaded() {
    console.log('Model ready');
}
function identify(){
    let selfie=document.getElementById("image");
    classifier.classify(selfie, gotResult);
}
function gotResult(results){
    console.log(results)
    document.getElementById("object").innerHTML=results[0].label;
}