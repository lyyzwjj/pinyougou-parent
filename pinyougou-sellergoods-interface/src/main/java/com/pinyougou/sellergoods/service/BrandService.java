package com.pinyougou.sellergoods.service;

import java.util.List;
import java.util.Map;

import com.pinyougou.pojo.TbBrand;

import entity.PageResult;

public interface BrandService {
	List<TbBrand> findAll();

	/**
	 * 查询一页
	 * 
	 * @param pageNum
	 *            当前页面
	 * @param pageSize
	 *            每页纪录数
	 * @return
	 */
	PageResult findPage(int pageNum, int pageSize);
	/**
	 *根据条件查询页面
	 * 
	 * @param brand
	 * @param pageNum
	 * @param pageSize
	 * @return
	 */
	PageResult findPage(TbBrand brand,int pageNum, int pageSize);

	/**
	 * 新增
	 * 
	 * @param brand
	 */
	void add(TbBrand brand);

	/**
	 * 查询单个
	 * 
	 * @param id
	 * @return
	 */
	TbBrand findOne(Long id);

	/**
	 * 修改
	 * 
	 * @param brand
	 */
	void update(TbBrand brand);
	
	/**
	 * 根据id删除
	 * 
	 * @param ids
	 */
	void delete(Long[] ids);

	public List<Map> selectOptionList();
}
