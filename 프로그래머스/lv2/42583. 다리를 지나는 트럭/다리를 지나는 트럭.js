class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this._size = 0;
        this.head = null;
        this.tail = null;
    }
    
    push(val) {
        const node = new Node(val);
        this.head ? (this.tail.next = node) : (this.head = node);
        this.tail = node;
        this._size++;
    }
    
    poll() {
        if (!this.head) return null;
        const polled = this.head;
        this.head = polled.next;
        if (!this.head) this.tail = null;
        polled.next = null;
        this._size--;
        return polled.val;
    }
    
    isEmpty() {
        return !this._size;
    }
    
    size() {
        return this._size;
    }
    
    peek() {
        return this.head.val;
    }
}

class Bridge extends Queue {
    constructor(length, limit) {
        super();
        this.length = length;
        this.limit = limit;
        this.weight = 0;
    }
    
    checkPossible(val) {
        return (this.weight + val[0]) <= this.limit;
    }
    
    push(val) {
        if (this.checkPossible(val)) {
        	this.weight += val[0];
        	super.push(val);
        }
    }
    
    poll() {
        const [w, t] = super.poll();
        this.weight -= w;
        return [w, t];
    }
}

function solution(bridge_length, weight, truck_weights) {
    const n = truck_weights.length;
    const bridge = new Bridge(bridge_length, weight);
    let time = truck_weights.reduce((time, truck)=>{
        if (bridge.isEmpty()) {
            time += 1;
        } else {
            if (bridge.checkPossible([truck, time])) {
                time += 1;
            } else {
                while (!bridge.isEmpty() && !bridge.checkPossible([truck, time])) {
                    const [, startTime] = bridge.poll();
                    time = startTime + bridge_length;
                }
            }
        }
        bridge.push([truck, time]);
        if (time - bridge.peek()[1] >= bridge_length) bridge.poll();
        return time;
    }, 0);
    
    while (!bridge.isEmpty()) {
        time = bridge.poll()[1] + bridge_length;
    }
    
    return time;
}