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
var delaySecond = 1;


class InfoCounter{
  constructor(){
    this.info_vis = document.getElementById('info-vis');
    this.infoCtx = this.info_vis.getContext('2d');
    this.arrayAccess = 0;
    this.comparisons = 0;
    this.infoCtx.font = "20px Arial";
  }

  resetCounter(){
    this.arrayAccess = 0;
    this.comparisons = 0;
  }

  initCounter(){
    this.arrayAccess = 0;
    this.comparisons = 0;
  }

  updateArrayAccess(num){
    this.arrayAccess += num;
    this.updateInfo();
  }

  updateComparisons(num){
    this.comparisons += num;
    this.updateInfo();
  }

  clearInfo(){
    this.infoCtx.clearRect (0, 0, 500, 30);
  }

  updateInfo(){
    this.clearInfo();
    this.infoCtx.fillText("Array Access: "+this.arrayAccess+" Comparisons: "+this.comparisons,10,20);
  }
}
var infoCounter = new InfoCounter();

class Paint {
  draw() {
    if (array_vis.getContext) {
      ctx.fillStyle="rgb(200,0,0)";
        let eleWidth = Math.floor(rectRight/array.length);
        let eleHeight = -rectBottom/max;
        for(var i = 0; i < array.length; i++){
          ctx.fillRect (0+i*eleWidth, rectBottom, eleWidth, eleHeight*array[i]);
        }
      }
  }

  highLight(index){
    this.updateBar(index,"rgb(0,0,200)");
  }

  cancelHighLight(index){
    this.updateBar(index);
  }

  updateBar(index,color= "rgb(200,0,0)"){
    ctx.fillStyle = color;
    let eleWidth = Math.floor(rectRight/array.length);
    let eleHeight =  -rectBottom/max;
    ctx.clearRect (0+index*eleWidth, rectBottom, eleWidth, -rectBottom);
    ctx.fillRect (0+index*eleWidth, rectBottom, eleWidth, eleHeight*array[index]);
  }
}

var paint = new Paint();

class Sort {
  bubbleSort(array) {
    infoCounter.initCounter();

    async function bubbleSort(array) {
      for(var i = 0; i < array.length; i++){
        let has_swapped = false;
        for(var j = 0; j < array.length-i-1; j++){
          paint.highLight(j);
          infoCounter.updateInfo();

          if(stop){
            stop = false;
            paint.draw();
            return;
          }
          
          if(array[j] > array[j+1]){
            has_swapped = true;
            var temp = array[j];
            array[j] = array[j+1];
            array[j+1] = temp;
            infoCounter.updateArrayAccess(2);
            await sleep(delaySecond);

            paint.updateBar(j);
            paint.updateBar(j+1);
          }else{
            paint.cancelHighLight(j);
          }
          infoCounter.updateComparisons(1);
          infoCounter.updateArrayAccess(2);
          
        }
        if(has_swapped == false){
          break;
        }
      }
      paint.draw();
      return array;
    
    }
    bubbleSort(array);
    infoCounter.resetCounter();
  }

  insertionSort(array) {
    infoCounter.initCounter();

    async function insertionSort(array) {
      for(var i = 0; i < array.length; i++){
        paint.highLight(i);
        if(stop){
          stop = false;
          paint.draw();
          return;
        }

        var temp = array[i];
        infoCounter.updateArrayAccess(1);

        let j = i-1;

        while(j >= 0 && temp<array[j]){
          paint.highLight(i);
          paint.updateBar(j,"rgb(0,255,0)");
          infoCounter.updateComparisons(1);
          infoCounter.updateArrayAccess(1);

          array[j+1] = array[j]
          infoCounter.updateArrayAccess(2);

          await sleep(delaySecond);
          paint.cancelHighLight(j+1);
          paint.updateBar(j);
          paint.updateBar(j+1);
          j--;
        }
        infoCounter.updateComparisons(1);
        infoCounter.updateArrayAccess(1);

        array[j+1] = temp;
        infoCounter.updateArrayAccess(1);

        paint.updateBar(i);
        paint.updateBar(j+1);
      }
      paint.draw();
      return array;
    }
    insertionSort(array);
    infoCounter.resetCounter();
  }

  selectionSort(array) {
    infoCounter.initCounter();

    async function selectionSort(array) {
      for(var i = 0; i < array.length; i++){
        paint.highLight(i);
        if(stop){
          stop = false;
          paint.draw();
          return;
        }
        var min = i;
        for(var j = i+1; j < array.length; j++){
          paint.highLight(j);
          if(stop){
            stop = false;
            paint.draw();
            return;
          }

          if(array[j] < array[min]){
            min = j;
          }
          infoCounter.updateComparisons(1);
          infoCounter.updateArrayAccess(2);

          await sleep(delaySecond);
          paint.cancelHighLight(j);
        }
        if(min != i){
          var temp = array[i];
          infoCounter.updateArrayAccess(1);

          array[i] = array[min];
          infoCounter.updateArrayAccess(1);

          array[min] = temp;
          await sleep(delaySecond);
          paint.cancelHighLight(min);
          paint.updateBar(min);
        }
        infoCounter.updateComparisons(1);

        paint.cancelHighLight(i);
      }
      paint.draw();
      return array;
    }
    selectionSort(array);
    infoCounter.resetCounter();
  }

  sortingStop(){
    stop=true;
    paint.draw();

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
  paint.draw();
  return array;
}

function clearCanvas(){
  ctx.clearRect(0, 0, rectRight, rectBottom);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

