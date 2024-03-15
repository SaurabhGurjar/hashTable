class HashSet {
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
                    this.append(bucketsCopy[i][j]);
                }
            }
        }
    }

    _search(key) {
        if(!key) return;
        const keyStr = String(key);
        const index = HashSet.hash(keyStr, this.capacity);
        if(!this.buckets[index]) return undefined;
        else {
            for(let i = 0; i < this.buckets[index].length; i++) {
                if(this.buckets[index][i] === keyStr) {
                    return [index, i];
                }
            }
            return null;
        }
    }

    _iterator() {
        const allEntries = [];
        for(let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i]) {
                for(let j = 0; j < this.buckets[i].length; j++) {
                    if(Number(this.buckets[i][j])) allEntries.push(Number(this.buckets[i][j]));
                    else allEntries.push(this.buckets[i][j]);
                }
            }
        }
        return allEntries;
    }

    append(key) {
        if(!key) return;
        const keyStr = String(key);
        this._increaseBucketscapacity();
        const index = HashSet.hash(keyStr, this.capacity);
        if (!this.buckets[index]) {
            this.buckets[index] = [keyStr];
        } else {
            let matched = false
            for(let i = 0; i < this.buckets[index].length; i++) {
                if(this.buckets[index][i] === keyStr) {
                    matched = true;
                    return;
                }
            }
            if(!matched) this.buckets[index].push(keyStr);
        }
        
    }

    index(key) {
        const address = this._search(key);
        return  address;
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

    entries() {
        return this._iterator(); // return array of all entries.
    }
}

const data = [
    23, 56, 78, 12, 45, 67, 89, 32, 55, 88,
    10, 43, 65, 76, 98, 21, 34, 67, 87, 54,
    33, 44, 57, 11, 46, 68, 90, 31, 56, 76,
    87, 97, 52, 20, 41, 63, 25, 48, 60, 81,
    10, 55, 78, 32, 56, 76, 87, 21, 43, 54,
    24, 59, 80, 19, 42, 64, 88, 33, 47, 66,
    86, 99, 22, 35, 58, 91, 13, 77, 68, 78,
    67, 45, 32, 10, 55, 33, 56, 76, 87, 99,
    15, 79, 100, 14, 66, 95, 92, 53, 69, 22,
    20, 22, 99, 81, -77, 76, 75, 74, 73, 72
];

const set = new HashSet();
set.append("saurabh");
console.log(set.entries());
set.clear();
data.forEach(item => set.append(item));
console.log(set.entries());
console.log(set.length());

