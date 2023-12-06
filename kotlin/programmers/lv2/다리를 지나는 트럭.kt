import java.util.*

/*
 * 1. 논리적으로 따졌을 때, 큐에 가까운 문제. 
 * 2. 맨 처음 들어갈 때 큐에 넣고 카운팅한다.
 * 3. 다른 것을 들어갈 때 현재 들어가 있는 트럭들의 weight를 비교한다.
 * 3-1. weight <= total(truck_weights + weight)라면 다리를 건너게 하고, .
 * 3-2. 아니라면 다리를 건너게 하지 않고 큐에서 빠져나갈 때까지 기다린다.
 * 4. 큐의 길이는 계속 보전되어야 한다. 따라서 큐에서는 계속해서 초마다 0을 집어넣어준다.
 * 5. 모두 다 지나갔을 때의 결과를 반영한다.
 * 
 * 설계는 어떻게 할까?
 * 
 * - 브릿지
 * - 브릿지의 트래픽을 검사하는 함수
 * - 시간을 재서 결과를 반환하는 함수
 */
class Solution {
    fun solution(bridge_length: Int, weight: Int, truck_weights: IntArray): Int {
        var answer = 0
        
        var bridge = Bridge(bridge_length, weight);

        var timer = Timer(0);
        
        var trafficChecker = TrafficChecker(bridge, timer, truck_weights);
        
        return trafficChecker.simulate();
    }
}


class TrafficChecker(target: Bridge, timer: Timer, truck_weights: IntArray) {
  var entry: Queue<Int> = LinkedList();
  
  var timer: Timer = timer;
    
  var target: Bridge = target;
    

  init {
    truck_weights.forEach { value ->
      entry.add(value)
    }    
  }

  fun simulate(): Int {
    while (this.entry.isNotEmpty()) {
      this.timer.tick();
      this.target.update(this.entry);
    }
    
    return this.timer.stop() + this.target.getLength();
  }
}

class Timer(time: Int) {
    var time: Int = 0;
    
    init {
        this.time = time;
    }
    
    public fun tick(): Unit {
      this.time += 1;
    }

    public fun stop(): Int {
      return this.time;
    }
}

class Bridge(bridgeLength: Int, limitWeight: Int) {
    var bridge: Queue<Int> = LinkedList();
    var limitWeight: Int = 0;
    var nowWeight: Int = 0;
    
    init {
        for (i in 1..bridgeLength) {
            this.bridge.add(0)
            this.limitWeight = limitWeight;
        }
    }
    
    private fun leave(): Unit {
        var leavedTruckWeight = this.bridge.poll();
        this.nowWeight -= leavedTruckWeight;
    }
    
    private fun enter(weight: Int): Unit {
        this.bridge.add(weight);
        this.nowWeight += weight;
    }
    
    public fun isEmpty(): Boolean {
        return this.nowWeight == 0;
    }
    
    public fun getLength(): Int {
        return this.bridge.size;
    }
    
    
    public fun isPassPossible(weight: Int): Boolean {
        return this.nowWeight + weight <= this.limitWeight;
    }

    public fun update(entry: Queue<Int>): Unit {
        if (entry.size == 0) {
            this.enter(0);
            return;
        }
        
        var now = entry.peek();
        
        this.leave();
        
        var enteredTruckWeight = if (this.isPassPossible(now)) entry.poll() else 0;
        
        this.enter(enteredTruckWeight);
    }
}