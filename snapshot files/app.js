async function getWebCam(){
    try{
        const videoSrc = await navigator.mediaDevices.getUserMedia({video:true});
        var video=document.getElementById("video");
        video.srcObject=videoSrc;
    }
    catch(e){
        console.log(e);
    }
}
getWebCam();
var capture=document.getElementById("capture");
var canvas=document.getElementById("canvas");
var context=canvas.getContext('2d');
var blur=document.getElementById("blur");
var brightness=document.getElementById("brightness");
var contrast=document.getElementById("contrast");
var invert=document.getElementById("invert");
var saturate=document.getElementById("saturate");
var sepia=document.getElementById("sepia");


capture.addEventListener("click",function(){
    context.drawImage(video,0,0,650,490);
});
noeffect.addEventListener("click",function(){
    canvas.style.filter="none"
})
blur.addEventListener("click",function(){
    canvas.style.filter="blur(5px)";
});
brightness.addEventListener("click",function(){
    canvas.style.filter="brigthness(0.4)";
});
contrast.addEventListener("click",function(){
    canvas.style.filter="contrast(200%)";
});
invert.addEventListener("click",function(){
    canvas.style.filter="invert(50%)";
});
saturate.addEventListener("click",function(){
    canvas.style.filter="saturate(30%)";
});
sepia.addEventListener("click",function(){
    canvas.style.filter="sepia(60%)";
});