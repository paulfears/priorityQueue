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
          let checkIndex = Math.floor((start+end)/2)
          if(ranking === this.queue[checkIndex].value){
            if(checkIndex === 0){
              return checkIndex
            }
            while(checkIndex>0 && this.queue[checkIndex-1].value == ranking){
              checkIndex -= 1
            }
            return checkIndex
          }
          if(this.queue[checkIndex].value > ranking){
            end = checkIndex;
            continue;
          }
          if(this.queue[checkIndex].value < ranking){
            start = checkIndex;
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
      this.getItemByKey(lookupid){
        return this.items[lookupid];
      }
      this.getitemByIndex = function (index){
        return this.queue[index];
      }
      this.getIndex = function(lookupid){
        let ranking = this.items[lookupid].value
        let index = this._binarySearch(ranking)
        while(this.queue[index].value== ranking && index+1 < this.queue.length){
          
          if(this.queue[index].lookupid === lookupid){
            return index
          }
          index+=1
        }
        return -1;

      }
      this.replace = function(newItem, newValue, lookupid){
        this.delete(lookupid);
        this.insert(newItem, newValue, lookupid);
      }
      this.delete = function(lookupid){
        if(this.hasItem(lookupid)){
          let index = this.getIndex(lookupid)
          this.queue.splice(index, 1)
          delete this.items[lookupid]
        }

      }

      this.dequeue = function(){
        let output = this.queue.shift();
        if(this.items[output.lookupid]){
          delete this.items[output.lookupid];
        }
        return output;
      }
      
}



