prediction = "";

Webcam.set({
    width:350,
    height:300,
    img_format: "png",
    png_quality: 100
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function takeSnapshot(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'">';
    });
}

console.log("ml5.version", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/woGWHbl9k/model.json", modelReady);

function modelReady(){
    console.log("model loaded");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = "My prediction is"+prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function checkSnapshot(){
    img = document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_image").innerHTML = results[0].label;

        prediction = results[0].label;

        speak();

        if(results[0].label == "ok"){
            document.getElementById("update_gesture").innerHTML = "&#128076"; 
        }

        if(results[0].label == "thumbs up"){
            document.getElementById("update_gesture").innerHTML = "&#128077"; 
        }

        if(results[0].label == "thumbs down"){
            document.getElementById("update_gesture").innerHTML = "&#128078"; 
        }

        if(results[0].label == "peace"){
            document.getElementById("update_gesture").innerHTML = "&#9996"; 
        }

        if(results[0].label == "fist bump"){
            document.getElementById("update_gesture").innerHTML = "&#9994"; 
        }
    }
}