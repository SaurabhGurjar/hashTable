class HashMap {
    static hash(key, capacity) {
        if (capacity <= 0) return;
        let hashCode = 0;

        const PRIME_NUM = 41;
        for(let i = 0; i < key.length; i++) {
            hashCode = (PRIME_NUM * hashCode + key.charCodeAt(i)) % capacity;
        }
        return hashCode;
    }

    constructor() {
        this.buckets = [];
        this.capacity = 16;
        this.loadFactor = 0.75;
    }

    _increaseBucketscapacity() {
        let currentcapacity = 0;
        for(let i = 0; i < this.buckets.length; i++) {
            if(this.buckets[i]) currentcapacity += 1;
        }
        if(currentcapacity / this.capacity >= this.loadFactor) {
            this.capacity = this.capacity * 2;
            this._reindexTable();
        }
    }
    _reindexTable() {
        const bucketsCopy = [...this.buckets];
        this.buckets = [];
        for(let i = 0; i < bucketsCopy.length; i++) {
            if(bucketsCopy[i]) {
                for (let j = 0; j < bucketsCopy[i].length; j++) {
                    this.set(bucketsCopy[i][j][0], bucketsCopy[i][j][1]);
                }
            }
        }
    }

    _search(key) {
        if(!key) return;
        const keyStr = String(key);
        const index = HashMap.hash(keyStr, this.capacity);
        if(!this.buckets[index]) return undefined;
        else {
            for(let i = 0; i < this.buckets[index].length; i++) {
                if(this.buckets[index][i][0] === keyStr) {
                    return [index, i];
                }
            }
            return null;
        }
    }

    _iterator() {
        const allkeys = [];
        const allValues = [];
        const allEntries = [];
        for(let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i]) {
                for(let j = 0; j < this.buckets[i].length; j++) {
                    allkeys.push(this.buckets[i][j][0]);
                    allValues.push(this.buckets[i][j][1]);
                    allEntries.push(this.buckets[i][j]);
                }
            }
        }
        return [allkeys, allValues, allEntries];
    }

    set(key, value) {
        if(!key) return;
        const keyStr = String(key);
        this._increaseBucketscapacity();
        const index = HashMap.hash(keyStr, this.capacity);
        if (!this.buckets[index]) {
            this.buckets[index] = [[keyStr, value]];
        } else {
            let keyFound = false;
            for(let i = 0; i < this.buckets[index].length; i++) {
                if(this.buckets[index][i][0] === keyStr) {
                    this.buckets[index][i][1] = value;
                    keyFound = true; 
                    return;
                }
            }
            if(!keyFound) {
                this.buckets[index].push([keyStr, value]);
            }
        }
        
    }

    get(key) {
        const address = this._search(key);
        return  address ? this.buckets[address[0]][address[1]][1]: null;
    }

    has(key) {
        return this._search(key) ? true : false; 
    }

    remove(key) {
        const data = this._search(key);
        if(!data) return false;
        this.buckets[data[0]].splice(data[1], 1);
        return true;
    }
    
    length() {
        let len = 0
        for(let i = 0; i < this.buckets.length; i++) {
            if(this.buckets[i]) {
                len += this.buckets[i].length;
            }
        }
        return len;
    }
    
    clear() {
        this.buckets = [];
        this.capacity = 16;
    }

    keys() {
        return this._iterator()[0]; // return array of all keys.
    }

    values() {
       return this._iterator()[1]; // return array of all values.
    }

    entries() {
        return this._iterator()[2]; // return array of all [key, value] pair.
    }
}

const hashTable = new HashMap();
hashTable.set("name", "saurabh");
hashTable.set("surname", "choudhary");
console.log(hashTable.keys());
console.log(hashTable.values());
console.log(hashTable.entries());