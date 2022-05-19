var array_vis = document.getElementById('array-vis');
var ctx = array_vis.getContext('2d');
var rectLeft = 0;
var rectTop = 0;
var rectRight = array_vis.width;
var rectBottom = array_vis.height;
var array =[1,5,6,8,6,4,98,9,41,1,5,1,3,6,8,5,46,3,9,5,2,74,73,76,9,36,3,52,96,46,8,71,42];
var max;
var min;
var delayInMilliseconds = 1000; //1 second
var stop = false;

class Sort {
  bubbleSort(array) {
    async function bubbleSort(array) {
      for(var i = 0; i < array.length; i++){
        let has_swapped = false;
        for(var j = 0; j < array.length-i-1; j++){
          if(stop){
            stop = false;
            draw();
            return;
          }
          if(array[j] > array[j+1]){
            has_swapped = true;
            var temp = array[j];
            array[j] = array[j+1];
            array[j+1] = temp;
            draw(); 
            await sleep(1);
            ctx.clearRect(0, 0, rectRight, rectBottom);
          }
        }
        if(has_swapped == false){
          break;
        }
      }
      draw();
      return array;
    
    }
    bubbleSort(array);
  }
  
  sortingStop(){
    stop=true;
    draw();

  }

}

var sort = new Sort();



function init(array){
  max = array[0];
  min = array[0];
    for(var i = 0; i < array.length; i++){
        if(array[i] > max){
            max = array[i];
        }
        if(array[i] < min){
          min = array[i];
      }
    }
}

function generateRandomArray(size,limit){
  clearCanvas();
  array = [];
  for(var i = 0; i < size; i++){
    array.push(Math.floor(Math.random()*limit));
  }
  init(array);
  draw();
  return array;
}

function clearCanvas(){
  ctx.clearRect(0, 0, rectRight, rectBottom);
}

function draw() {
    if (array_vis.getContext) {
        ctx.fillStyle = "rgb(200,0,0)";
        let eleWidth = rectRight/array.length;
        let eleHeight = -rectBottom/max;
        for(var i = 0; i < array.length; i++){
          ctx.fillRect (0+i*eleWidth, rectBottom, eleWidth, eleHeight*array[i]);
        }
      }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/*
async function bubbleSort(array) {
  for(var i = 0; i < array.length; i++){
    let has_swapped = false;
    for(var j = 0; j < array.length-i-1; j++){
        if(array[j] > array[j+1]){
          has_swapped = true;
          var temp = array[j];
          array[j] = array[j+1];
          array[j+1] = temp;
          draw(); 
          await sleep(1);
          ctx.clearRect(0, 0, rectRight, rectBottom);
        }
    }
    if(has_swapped == false){
      break;
    }
  }
  draw();
  return array;

}
*/

