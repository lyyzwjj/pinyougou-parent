package test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

/**
 * Created by WangZhe on 2018年10月30日.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:spring/applicationContext-redis.xml")
public class TestList {
    @Autowired
    private RedisTemplate redisTemplate;
    @Test
    public void setValue1(){
        redisTemplate.boundListOps("nameList").rightPush("曹操");
        redisTemplate.boundListOps("nameList").rightPush("刘备");
        redisTemplate.boundListOps("nameList").rightPush("孙权");
    }
    @Test
    public void setValue2(){
        redisTemplate.boundListOps("nameList1").leftPush("曹操");
        redisTemplate.boundListOps("nameList1").leftPush("刘备");
        redisTemplate.boundListOps("nameList1").leftPush("孙权");
    }
    @Test
    public void getValue1(){
        List list = redisTemplate.boundListOps("nameList").range(0, -1);
        System.out.println(list);
    }
    @Test
    public void getValue2(){
        List list = redisTemplate.boundListOps("nameList1").range(0, -1);
        System.out.println(list);
    }
    @Test
    public void searchByIndex(){
        String str = (String) redisTemplate.boundListOps("nameList").index(0);
        System.out.println(str);
    }
    @Test
    public void removeValue(){
        redisTemplate.boundListOps("nameList").remove(2,"曹操");
    }
    @Test
    public void deleteValue(){
        redisTemplate.delete("nameList");
    }
}
