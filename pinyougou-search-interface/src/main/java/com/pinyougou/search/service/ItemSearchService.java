package com.pinyougou.search.service;

import java.util.List;
import java.util.Map;

/**
 * Created by WangZhe on 2018年10月31日.
 */

public interface ItemSearchService {
    /**
     * 搜索方法
     *
     * @param searchMap
     * @return
     */
    Map search(Map searchMap);

    /**
     * 更新商品列表
     *
     * @param list
     */
    void importList(List list);

    /**
     * 删除根据ids删除
     *
     * @param goodsIds
     */
    void deleteByGoodsIds(List goodsIds);
}
