
   
  
  'use strict';
  
  /* globals MediaRecorder */
  
  let mediaRecorder;
  let recordedBlobs;
  
  const errorMsgElement = document.querySelector('span#errorMsg');
  const recordedVideo = document.querySelector('video#recorded');
  const recordButton = document.querySelector('button#record');
  const playButton = document.querySelector('button#play');
  
  
  recordButton.addEventListener('click', () => {
    if (recordButton.textContent === 'Record') {
      startRecording();
    } else {
      stopRecording();
      recordButton.textContent = 'Record';
      playButton.disabled = false;
    }
  });
  
  
  playButton.addEventListener('click', () => {
    const superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
    recordedVideo.src = null;
    recordedVideo.srcObject = null;
    recordedVideo.src = window.URL.createObjectURL(superBuffer);
    recordedVideo.controls = true;
    recordedVideo.play();
  });
  
  
  
  function handleDataAvailable(event) {
    console.log('handleDataAvailable', event);
    if (event.data && event.data.size > 0) {
      recordedBlobs.push(event.data);
    }
  }
       // preload shutter audio clip
       var shutter = new Audio();
       shutter.autoplay = false;
       shutter.src = navigator.userAgent.match(/Firefox/) ? 'photo.ogg' : 'photo.mp3';

      
      
  function startRecording() {
  shutter.play();


    recordedBlobs = [];
    let options = {mimeType: 'video/webm;codecs=vp9,opus'};
    try {
      mediaRecorder = new MediaRecorder(window.stream, options);
    } catch (e) {
      console.error('Exception while creating MediaRecorder:', e);
      errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
      return;
    }
  
    console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
    recordButton.textContent = 'Stop Recording';
    playButton.disabled = true;
    mediaRecorder.onstop = (event) => {
      console.log('Recorder stopped: ', event);
      console.log('Recorded Blobs: ', recordedBlobs);
    };
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start();
    console.log('MediaRecorder started', mediaRecorder);
  }
  
  function stopRecording() {
    mediaRecorder.stop();
  }
  
  function handleSuccess(stream) {
    recordButton.disabled = false;
    console.log('getUserMedia() got stream:', stream);
    window.stream = stream;
  
    const gumVideo = document.querySelector('video#gum');
    gumVideo.srcObject = stream;
  }
  
  async function init(constraints) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      handleSuccess(stream);
    } catch (e) {
      console.error('navigator.getUserMedia error:', e);
      errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
    }
  }
  
  document.querySelector('button#start').addEventListener('click', async () => {
    const hasEchoCancellation = document.querySelector('#echoCancellation').checked;
    const constraints = {
      audio: {
        echoCancellation: {exact: hasEchoCancellation}
      },
      video: {
        width: 1280, height: 720
      }
    };
    console.log('Using media constraints:', constraints);
    await init(constraints);
  });




  var video = document.querySelector('#videoElement');
  navigator.getUserMedia=navigator.getUserMedia||navigator.
       webkitGetUserMedia||navigator.mozGetUserMedia||navigator.
       msGetUserMedia||navigator.oGetUserMedia;
       if(navigator.getUserMedia){
           navigator.getUserMedia({video:true},handleVideo,videoError);

       }
function handleVideo(stream){
video.srcObject = stream;
}
function videoError(e){

}
