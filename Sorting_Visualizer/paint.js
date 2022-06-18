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

    clearCanvas(){
        ctx.clearRect(0, 0, rectRight, rectBottom);
      }
}