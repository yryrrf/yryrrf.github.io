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