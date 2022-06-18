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