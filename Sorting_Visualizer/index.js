var array_vis = document.getElementById('array-vis');
var ctx = array_vis.getContext('2d');
var rectLeft = 0;
var rectTop = 0;
var rectRight = array_vis.width;
var rectBottom = array_vis.height;
var stop = false;
var delaySecond = 1;

class Array {
  constructor(array=[]){
    this.data = array;
    this.max = 0;
    this.min = 0;
  }
  
  init(){
    this.max = this.data[0];
    this.min = this.data[0];
      for(var i = 0; i < this.data.length; i++){
        console.log("dada");
          if(this.data[i] > this.max){
              this.max = this.data[i];
          }
          if(this.data[i] < this.min){
            this.min = this.data[i];
        }
      }
  }

  generateRandomArray(size,max){
    clearCanvas();
    this.data = [];
    for(var i = 0; i < size; i++){
      this.data.push(Math.floor(Math.random() * max));
    }
    console.log("da");
    this.init();
    paint.draw();
    return this.data;
  }

  getByIndex(index){
    infoCounter.updateArrayAccess(1);
    return this.data[index];
  }

  setByIndex(index,value){
    infoCounter.updateArrayAccess(1);
    this.data[index] = value;
    paint.updateBar(index);
  }

    swapByIndex(index1,index2){

    var temp = this.getByIndex(index1);
    this.setByIndex(index1 ,this.getByIndex(index2));
    this.setByIndex(index2,temp);
    paint.updateBar(index1);
    paint.updateBar(index2);

  }

   isLarger(index1,index2){
    infoCounter.updateComparisons(1);
    if(this.getByIndex(index1) > this.getByIndex(index2)){
      return true;
    }else{
      return false;
    }
  }

  isLargerByValue(index1,value2){
    infoCounter.updateComparisons(1);
    return (array.getByIndex(index1) > value2);
  }

}

var array = new Array();

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
        let eleWidth = Math.floor(rectRight/array.data.length);
        let eleHeight = -rectBottom/array.max;
        for(var i = 0; i < array.data.length; i++){
          ctx.fillRect (0+i*eleWidth, rectBottom, eleWidth, eleHeight*array.data[i]);
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
    let eleWidth = Math.floor(rectRight/array.data.length);
    let eleHeight =  -rectBottom/array.max;
    ctx.clearRect (0+index*eleWidth, rectBottom, eleWidth, -rectBottom);
    ctx.fillRect (0+index*eleWidth, rectBottom, eleWidth, eleHeight*array.data[index]);
  }
}

var paint = new Paint();

class Sort {
  bubbleSort() {
    infoCounter.initCounter();

    async function bubbleSort() {
      for(var i = 0; i < array.data.length; i++){
        let has_swapped = false;
        for(var j = 0; j < array.data.length-i-1; j++){
          infoCounter.updateInfo();

          if(stop){
            stop = false;
            paint.draw();
            return;
          }
          let highLightIndex = j;
          if(array.isLarger(j,j+1)){
            has_swapped = true;
            array.swapByIndex(j,j+1);
            highLightIndex = j+1;
          }
          paint.highLight(highLightIndex);
          await sleep(delaySecond);
          paint.cancelHighLight(highLightIndex);
               
        }
        if(has_swapped == false){
          break;
        }
      }
      paint.draw();
      return array.data;
    
    }
    bubbleSort();
    infoCounter.resetCounter();
  }

  insertionSort(array) {
    infoCounter.initCounter();

    async function insertionSort() {
      for(var i = 0; i < array.data.length; i++){
        paint.highLight(i);
        if(stop){
          stop = false;
          paint.draw();
          return;
        }

        var temp = array.getByIndex(i);

        let j = i-1;

        while(j >= 0 && array.isLargerByValue(j,temp)){
          paint.highLight(i);
          paint.updateBar(j,"rgb(0,255,0)");

          array.setByIndex(j+1,array.getByIndex(j));

          await sleep(delaySecond);
          paint.cancelHighLight(j+1);
          paint.updateBar(j);
          paint.updateBar(j+1);
          j--;
        }
        array.setByIndex(j+1,temp);


        paint.updateBar(i);
        paint.updateBar(j+1);
      }
      paint.draw();
      return array.data;
    }
    insertionSort();
    infoCounter.resetCounter();
  }

  selectionSort(array) {
    infoCounter.initCounter();

    async function selectionSort() {
      for(var i = 0; i < array.data.length; i++){
        paint.highLight(i);
        if(stop){
          stop = false;
          paint.draw();
          return;
        }
        var min = i;
        for(var j = i+1; j < array.data.length; j++){
          paint.highLight(j);
          if(stop){
            stop = false;
            paint.draw();
            return;
          }

          if(array.isLarger(min,j)){
            min = j;
          }
          await sleep(delaySecond);
          paint.cancelHighLight(j);
        }
        if(min != i){
          var temp = array.getByIndex(i);

          array.swapByIndex(i,min);
          array.setByIndex(min,temp);
          await sleep(delaySecond);
          paint.cancelHighLight(min);
          paint.updateBar(min);
        }
        infoCounter.updateComparisons(1);

        paint.cancelHighLight(i);
      }
      paint.draw();
      return array.data;
    }
    selectionSort();
    infoCounter.resetCounter();
  }

  mergeSort(array) {
    infoCounter.initCounter();

     async function mergeSort(l ,r) {
      if(l>=r){
        return;
      }
      var mid = Math.floor((l+r)/2);
      await mergeSort( l, mid);
      await mergeSort( mid+1, r);
      let left_sort = new Array(array.data.slice(l,mid+1));
      let right_sort = new Array(array.data.slice(mid+1,r+1));
      let i = 0, j = 0, k = l;
      while(i<left_sort.data.length && j<right_sort.data.length){
        infoCounter.updateComparisons(1);
        if(left_sort.getByIndex(i)<right_sort.getByIndex(j)){
          array.setByIndex(k,left_sort.getByIndex(i));
          i++;
        }else{
          array.setByIndex(k,right_sort.getByIndex(j));
          j++;
        }
        await sleep(delaySecond);
        k++;
        
      }

      while(i<left_sort.data.length){
        array.setByIndex(k,left_sort.getByIndex(i));
        i++;
        k++;
      }

      while(j<right_sort.data.length){
        array.setByIndex(k,right_sort.getByIndex(j));
        j++;
        k++;
      }
    }
    mergeSort(0,array.data.length);
    infoCounter.resetCounter();
  }

  sortingStop(){
    stop=true;
    paint.draw();

  }

}

var sort = new Sort();

function clearCanvas(){
  ctx.clearRect(0, 0, rectRight, rectBottom);
}

async function wait(ms){
  await sleep(ms);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


