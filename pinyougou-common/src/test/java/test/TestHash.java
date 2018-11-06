package test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;
import java.util.Set;

/**
 * Created by WangZhe on 2018年10月30日.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:spring/applicationContext-redis.xml")
public class TestHash {
    @Autowired
    private RedisTemplate redisTemplate;
    @Test
    public void setValue(){
        redisTemplate.boundHashOps("nameHash").put("a","曹操");
        redisTemplate.boundHashOps("nameHash").put("b","刘备");
        redisTemplate.boundHashOps("nameHash").put("c","孙权");
    }
    @Test
    public void getKeys(){
        Set keys = redisTemplate.boundHashOps("nameHash").keys();
        System.out.println(keys);
    }
    @Test
    public void getValues(){
        List values = redisTemplate.boundHashOps("nameHash").values();
        System.out.println(values);
    }
    @Test
    public void searchValueByKey(){
        String str = (String) redisTemplate.boundHashOps("nameHash").get("a");
        System.out.println(str);
    }
    @Test
    public void removeValue(){
        redisTemplate.boundHashOps("nameHash").delete("a");
    }
}
