status = "";
objects = [];
input = "";

function setup(){
    canvas = createCanvas(450 , 450);
    canvas.center();

    video = createCapture(VIDEO);
    
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    input = document.getElementById("object_name_input").value;

}
function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}


function draw(){
    image(video , 0 , 0 , 450 , 450);
    if(status != ""){
        objectDetector.detect(video,gotResult);
        for(i = 0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            console.log(objects.length);
            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FFFF00");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
            
            if(objects[i].label == input){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_detector").innerHTML = input + " Found";
                synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(input+" found");
                synth.speak(utterThis);
                            
                    
            }
            else{
                document.getElementById("object_detector").innerHTML = "Object Not Found";
            }
         
        

    }
}
}



function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
     
    }
    
}
