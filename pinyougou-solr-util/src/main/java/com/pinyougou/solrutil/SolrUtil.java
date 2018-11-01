package com.pinyougou.solrutil;

import com.alibaba.fastjson.JSON;
import com.pinyougou.mapper.TbItemMapper;
import com.pinyougou.pojo.TbItem;
import com.pinyougou.pojo.TbItemExample;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.data.solr.core.SolrTemplate;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * Created by WangZhe on 2018年10月31日.
 */
@Component
public class SolrUtil {
    @Autowired
    private SolrTemplate solrTemplate;
    @Autowired
    private TbItemMapper tbItemMapper;

    public void importItemData() {
        TbItemExample example = new TbItemExample();
        TbItemExample.Criteria criteria = example.createCriteria();
        criteria.andStatusEqualTo("1");
        List<TbItem> items = tbItemMapper.selectByExample(example);
        for (TbItem item : items) {
            Map map = JSON.parseObject(item.getSpec(), Map.class);//从数据库中提取json的字符串转换为map
            item.setSpecMap(map);
        }
        solrTemplate.saveBeans(items);
        solrTemplate.commit();
    }

    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("classpath*:spring/applicationContext*.xml");
        SolrUtil solrUtil = (SolrUtil) context.getBean("solrUtil");
        solrUtil.importItemData();
    }
}
