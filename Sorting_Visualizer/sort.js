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

    quickSort(array) {
        infoCounter.initCounter();
        async function quick_Sort(arr, low, high) {
            infoCounter.updateComparisons(1);
            if(low<high) {
                let pi = await partition(arr, low, high);
                await quick_Sort(arr, low, pi-1);
                await sleep(delaySecond);
                await quick_Sort(arr, pi+1, high);
                
            }
            await sleep(delaySecond);
        }
        async function partition(arr, low, high) {
            let pivot = array.getByIndex(high);
            let i = low-1;
            for(let j=low; j<high; j++) {
                infoCounter.updateComparisons(1);
                paint.highLight(j);
                await sleep(delaySecond);

                infoCounter.updateComparisons(1);
                if(array.getByIndex(j)<=pivot) {
                    i++;
                    array.swapByIndex(i,j);
                }
                paint.cancelHighLight(j);
            }
            array.swapByIndex(i+1,high);
            return i+1;
        }
        
        quick_Sort(array.data, 0, array.data.length-1);
        infoCounter.resetCounter();
    }
  
    sortingStop(){
      stop=true;
      paint.draw();
  
    }
  
  }