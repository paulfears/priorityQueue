priorityQueue = function(){
      this.items = {}
      this.queue = []
      this.insert = function(item, value, lookupid=null){
        if(lookupid !== null){
          this.items[lookupid] = {item:item, value:value};
        }
        
        if(value == Infinity){
          this.queue.push({value:value, item:item, lookupid:lookupid});
          return;
        }
        if(value == -Infinity){
          this.queue.unshift({value:value, item:item, lookupid:lookupid})
        }
        if(this.queue.length === 0){
          this.queue.push({value:value, item:item, lookupid:lookupid});
          return;
        }
        let index = this._binarySearch(value)
        this.queue.splice(index, 0, {value:value, item:item, lookupid:lookupid})
      }
      this._binarySearch =function(ranking){
        let start = 0
        let end = this.queue.length
        while(end-start > 1){
          console.log("end index is"+end)
          console.log("start index is"+start)
          let checkIndex = Math.floor((start+end)/2)
          if(ranking === this.queue[checkIndex].value){
            if(checkIndex === 0){
              return checkIndex
            }
            while(checkIndex>0 && this.queue[checkIndex-1].value == ranking){
              console.log("trapped")
              checkIndex -= 1
            }
            return checkIndex
          }
          if(this.queue[checkIndex].value > ranking){
            console.log("end before update"+end)
            end = checkIndex;
            console.log("end after update"+end)
            continue;
          }
          if(this.queue[checkIndex].value < ranking){
            console.log("start before update "+start)
            start = checkIndex;
            console.log("start after update "+start)
          }
        }
        if(ranking > this.queue[start].value){
          return end;
        }else{
          return start;
        }
      }

      this.hasItem = function(lookupid){
        if(this.items[lookupid] != undefined){
          return true;
        }
        return false;
      }
      this.getitem = function (index){
        return this.queue[index];
      }
      this.getIndex = function(lookupid){
        console.log("here")
        let ranking = this.items[lookupid].value
        console.log("here")
        let index = this._binarySearch(ranking)
        console.log("here")
        console.log("_binarySearch says index is "+index);
        while(this.queue[index].value== ranking && index+1 < this.queue.length){
          
          if(this.queue[index].lookupid === lookupid){
            return index
          }
          index+=1
        }
        return -1;

      }
      this.deleteItem = function(lookupid){

      }

      this.dequeue = function(){
        let output = this.queue.shift();
        if(this.items[output.lookupid]){
          delete this.items[output.lookupid];
        }
        return output;
      }
      
}


/*
testing
console.log("here")
function a(){
  console.log("here")
  a = new graph.priorityQueue();
  a.insert("hello", 5);
  a.insert("yo", 0);
  a.insert("yup", 3, "mouse");
  a.insert("give", 4);
  a.insert("go", 1000)
  a.insert("yes", 3);
  a.insert("tiny", -5);
  a.insert("8", 8);
  a.insert("yes", Infinity)
  a.insert("okay", 3);
  a.insert("go", 3);
  a.insert("yesplease", 3)
  a.insert("yum", 3)
  a.insert("bang", 3, "yes")

  console.log(a.queue)
  console.log("okay")
  console.log(a.getIndex("yes"))
  console.log(a.getIndex("mouse"))
}
//a()
*//
