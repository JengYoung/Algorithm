import java.util.*

class Genre {
    private var albums = PriorityQueue<Pair<Int, Int>>(Comparator { a, b -> 
            if (b.first - a.first !== 0) b.first - a.first else a.second - b.second
    });
    
    private var playCount = 0;
    
    fun add(album: Pair<Int, Int>) {
        val nowPlayCount = album.second;
        
        playCount += album.first;
        albums.add(album);
    }
    
    val playTotal get() = playCount;
    
    val bestAlbum: IntArray
        get() {
            val first = albums.poll();
            val second = albums.poll();
            
            return if (second !== null) intArrayOf(first.second, second.second) else intArrayOf(first.second);
        }
}

class Solution {
    fun solution(genres: Array<String>, plays: IntArray): IntArray {
        val result = mutableListOf<Int>();
        
        val 인기차트 = PriorityQueue<Genre>(Comparator { a, b -> b.playTotal - a.playTotal })
        
        val 인기차트데이터: MutableMap<String, Genre> = mutableMapOf() 
        
        for (i in 0..genres.size - 1) {
            val genre = genres[i];
            val play = plays[i];
            
            if (인기차트데이터.containsKey(genre)) {
                val now = 인기차트데이터.get(genre);
                
                if (now !== null) {
                    now.add(Pair(play, i));   
                }
            } else {
                val now = Genre();
                now.add(Pair(play, i));
                
                인기차트데이터.set(genre, now);
            }
        }
        
        인기차트데이터.values.forEach { 인기차트.add(it) };
        
        while (인기차트.isNotEmpty()) {
            val now = 인기차트.poll().bestAlbum;
            
            for (index in now) {
                result.add(index)
            }
        }
        
        return result.toIntArray();
    }
}