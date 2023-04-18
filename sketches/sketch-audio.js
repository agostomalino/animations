const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true,
};

let audio;
let audioContext, audioData, sourceNode, analyserNode;
let manager;

const sketch = () => {

  // ////////////descomentar para dibujar corazon//////////////

  // const heartPath = new Path2D();
  // const centerX = settings.dimensions[0] / 2;
  // const centerY = settings.dimensions[1] / 2;
  // let heartSize = Math.min(centerX, centerY) * 0.8;
  
  // heartPath.moveTo(centerX, centerY);
  // heartPath.bezierCurveTo(centerX + heartSize/2, centerY - heartSize/2, centerX + heartSize/2, centerY + heartSize/4, centerX, centerY + heartSize/2);
  // heartPath.bezierCurveTo(centerX - heartSize/2, centerY + heartSize/4, centerX - heartSize/2, centerY - heartSize/2, centerX, centerY);

  // heartPath.closePath();


  // //////////////////////////
  
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    if (!audioContext) return;

    analyserNode.getFloatFrequencyData(audioData);

    const avg = getAverage(audioData);

    /////////////descomentar para dibujar corazon//////////////
    // heartSize = Math.min(centerX, centerY) * 0.8 + avg;
    
    // context.save();
    // context.translate(width * 0.5, height * 0.5);
    // context.fillStyle = 'red';
    // context.scale(heartSize / Math.min(centerX, centerY), heartSize / Math.min(centerX, centerY));
    // context.fill(heartPath);
    // context.restore();
    ////////////////////////////

    context.save();
    context.translate(width * 0.5, height * 0.5);
    context.lineWidth = 10;

    context.beginPath();
    context.arc(0, 0, Math.abs(avg), 0, Math.PI * 2);
    context.stroke();

    context.restore();




  };
};

const addListeners = () =>{
  window.addEventListener('mouseup', () => {
    if (!audioContext) createAudio();

    if(audio.paused){
      audio.play();
      manager.play()
    } 
    else {
      audio.pause();
      manager.pause();
    }
  })
};

const createAudio = () => {
  audio = document.createElement('audio');
  audio.src = 'audio/malisimo.mp3';  

  audioContext = new AudioContext();

  sourceNode = audioContext.createMediaElementSource(audio);
  sourceNode.connect(audioContext.destination);

  analyserNode = audioContext.createAnalyser();
  sourceNode.connect(analyserNode);

  audioData = new Float32Array(analyserNode.frequencyBinCount)

};

const getAverage = (data) => {
  let sum = 0; 

  for (let i = 0; i < data.length; i++){
    sum += data[i];

  }
  return sum / data.length;
}

const start = async ()=>{
  addListeners();
  
  manager = await canvasSketch(sketch, settings);

  manager.pause();
}

start();



