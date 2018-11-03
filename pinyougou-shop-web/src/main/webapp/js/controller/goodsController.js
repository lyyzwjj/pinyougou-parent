//控制层
app.controller('goodsController', function ($scope, $controller, $location, goodsService, uploadService, itemCatService, typeTemplateService) {

    $controller('baseController', {$scope: $scope});//继承

    //读取列表数据绑定到表单中  
    $scope.findAll = function () {
        goodsService.findAll().success(
            function (response) {
                $scope.list = response;
            }
        );
    }

    //分页
    $scope.findPage = function (page, rows) {
        goodsService.findPage(page, rows).success(
            function (response) {
                $scope.list = response.rows;
                $scope.paginationConf.totalItems = response.total;//更新总记录数
            }
        );
    }

    //查询实体
    $scope.findOne = function () {
        var id = $location.search()['id'];
        if (id == null) {
            return null;
        }
        goodsService.findOne(id).success(
            function (response) {
                $scope.entity = response;
                //商品介绍
                editor.html($scope.entity.goodsDesc.introduction);
                //商品图片
                $scope.entity.goodsDesc.itemImages = JSON.parse($scope.entity.goodsDesc.itemImages);
                //扩展属性
                $scope.entity.goodsDesc.customAttributeItems = JSON.parse($scope.entity.goodsDesc.customAttributeItems);
                //规格
                $scope.entity.goodsDesc.specificationItems = JSON.parse($scope.entity.goodsDesc.specificationItems)
                for (var i = 0; i < $scope.entity.itemList.length; i++) {
                    $scope.entity.itemList[i].spec = JSON.parse($scope.entity.itemList[i].spec);
                }
            }
        );
    }
    //增加
    $scope.add = function () {
        $scope.entity.goodsDesc.introduction = editor.html();
        goodsService.add($scope.entity).success(
            function (response) {
                if (response.success) {
                    alert("新增成功");
                    $scope.entity = {}
                    editor.html("");//清空富文本编辑器
                } else {
                    alert(response.message);
                }
            }
        );
    }
    //保存
    $scope.save = function () {
        $scope.entity.goodsDesc.introduction = editor.html();
        var serviceObject;//服务层对象
        if ($scope.entity.goods.id != null) {//如果有ID
            serviceObject = goodsService.update($scope.entity); //修改
        } else {
            serviceObject = goodsService.add($scope.entity);//增加
        }
        serviceObject.success(
            function (response) {
                if (response.success) {
                    alert("新增成功");
                    location.href = 'goods.html';
                } else {
                    alert(response.message);
                }
            }
        );
    }


    //批量删除
    $scope.dele = function () {
        //获取选中的复选框
        goodsService.dele($scope.selectIds).success(
            function (response) {
                if (response.success) {
                    $scope.reloadList();//刷新列表
                    $scope.selectIds = [];
                }
            }
        );
    }

    $scope.searchEntity = {};//定义搜索对象

    //搜索
    $scope.search = function (page, rows) {
        goodsService.search(page, rows, $scope.searchEntity).success(
            function (response) {
                $scope.list = response.rows;
                $scope.paginationConf.totalItems = response.total;//更新总记录数
            }
        );
    }
    $scope.image_entity = {}
    $scope.uploadFile = function () {
        uploadService.uploadFile().success(
            function (response) {
                if (response.success) {
                    $scope.image_entity.url = response.message;
                } else {
                    alert(response.message)
                }
            }
        )
    }
    $scope.entity = {goods: {}, goodsDesc: {itemImages: [], specificationItems: []}}
    $scope.add_image_entity = function () {
        //将当前上传的图片实体存入图片列表
        $scope.entity.goodsDesc.itemImages.push($scope.image_entity);
    }
    $scope.dele_image_entity = function (index) {
        //将当前上传的图片实体存入图片列表
        $scope.entity.goodsDesc.itemImages.splice(index, 1);
    }
    //查询一级商品分类列表
    $scope.selectItemCat1List = function () {
        itemCatService.findByParentId(0).success(
            function (response) {
                $scope.itemCat1List = response;
            }
        );
    }
    $scope.$watch('entity.goods.category1Id', function (newValue, oldValue) {
        itemCatService.findByParentId(newValue).success(
            function (response) {
                $scope.itemCat2List = response;
            }
        );
    })
    $scope.$watch('entity.goods.category2Id', function (newValue, oldValue) {
        itemCatService.findByParentId(newValue).success(
            function (response) {
                $scope.itemCat3List = response;
            }
        );
    })
    $scope.$watch('entity.goods.category3Id', function (newValue, oldValue) {
        itemCatService.findOne(newValue).success(
            function (response) {
                $scope.entity.goods.typeTemplateId = response.typeId;
            }
        );
    })
    //监控模板id
    $scope.$watch('entity.goods.typeTemplateId', function (newValue, oldValue) {
        typeTemplateService.findOne(newValue).success(
            function (response) {
                $scope.typeTemplate = response;
                //[{"id":1,"text":"联想"},{"id":3,"text":"三星"},{"id":2,"text":"华为"}]
                $scope.typeTemplate.brandIds = JSON.parse($scope.typeTemplate.brandIds)
                //customAttributeItems [{"text":"内存大小","value":"40M"},{"text":"颜色","value":"透明"}]
                if ($location.search()['id'] == null) {//如果没有增加id就是增加商品
                    $scope.entity.goodsDesc.customAttributeItems = JSON.parse($scope.typeTemplate.customAttributeItems)
                }

            }
        );
        typeTemplateService.findSpecList(newValue).success(
            function (response) {
                //specList [{"options":[{"id":98,"optionName":"移动3G","orders":1,"specId":27},{"id":99,"optionName":"移动4G","orders":2,"specId":27},{"id":100,"optionName":"联通3G","orders":3,"specId":27},{"id":101,"optionName":"联通4G","orders":4,"specId":27},{"id":112,"optionName":"电信3G","orders":5,"specId":27},{"id":113,"optionName":"电信4G","orders":6,"specId":27},{"id":114,"optionName":"移动2G","orders":7,"specId":27},{"id":115,"optionName":"联通2G","orders":8,"specId":27},{"id":116,"optionName":"电信2G","orders":9,"specId":27},{"id":117,"optionName":"双卡","orders":10,"specId":27}],
                //           "id":27,"text":"网络"},
                //          {"options":[{"id":118,"optionName":"16G","orders":1,"specId":32},{"id":119,"optionName":"32G","orders":2,"specId":32},{"id":120,"optionName":"64G","orders":3,"specId":32},{"id":121,"optionName":"128G","orders":4,"specId":32}],
                //           "id":32,"text":"机身内存"}]
                $scope.specList = response;
            }
        )
    })
    //
    $scope.updateSpecAttribute = function ($event, name, value) {
        //specificationItems: [{"attributeName":"网络制式","attributeValue":["移动4G"]},{"attributeName":"屏幕尺寸","attributeValue":["5.5寸","4.5寸"]}]
        var object = $scope.searchObjectByKey($scope.entity.goodsDesc.specificationItems, 'attributeName', name);
        if (object != null) {
            if ($event.target.checked) {
                object.attributeValue.push(value);
            } else {
                object.attributeValue.splice(object.attributeValue.indexOf(value), 1);
                if (object.attributeValue.length == 0) {
                    $scope.entity.goodsDesc.specificationItems.splice($scope.entity.goodsDesc.specificationItems.indexOf(object), 1);
                }
            }
        } else {
            $scope.entity.goodsDesc.specificationItems.push({"attributeName": name, "attributeValue": [value]});
        }
    }
    //创建SKU列表
    $scope.creatItemList = function () {
        $scope.entity.itemList = [{spec: {}, price: 0, num: 99999, status: '0', isDefault: '0'}];//列表初始化
        //specificationItems: [{"attributeName":"网络","attributeValue":["移动3G","移动4G"]},{"attributeName":"机身内存","attributeValue":["16G","32G"]}]
        var items = $scope.entity.goodsDesc.specificationItems;
        for (var i = 0; i < items.length; i++) {
            //返回这赋值给了$scope.entity.itemList
            $scope.entity.itemList = addColumn($scope.entity.itemList, items[i].attributeName, items[i].attributeValue)
        }
    }
    //specificationItems: [{"attributeName":"网络","attributeValue":["移动3G","移动4G"]},{"attributeName":"机身内存","attributeValue":["16G","32G"]}]
    //[{"spec":{"网络":"移动3G"},"price":0,"num":99999,"status":"0","isDefault":"0"}]
    //[{"spec":{"网络":"移动3G"},"price":0,"num":99999,"status":"0","isDefault":"0"},{"spec":{"网络":"移动4G"},"price":0,"num":99999,"status":"0","isDefault":"0"}]
    //[{"spec":{"网络":"移动3G","机身内存":"16G"},"price":0,"num":99999,"status":"0","isDefault":"0"},{"spec":{"网络":"移动4G","机身内存":"16G"},"price":0,"num":99999,"status":"0","isDefault":"0"}]
    //[{"spec":{"网络":"移动3G","机身内存":"16G"},"price":0,"num":99999,"status":"0","isDefault":"0"},{"spec":{"网络":"移动3G","机身内存":"32G"},"price":0,"num":99999,"status":"0","isDefault":"0"},{"spec":{"网络":"移动4G","机身内存":"16G"},"price":0,"num":99999,"status":"0","isDefault":"0"},{"spec":{"网络":"移动4G","机身内存":"32G"},"price":0,"num":99999,"status":"0","isDefault":"0"}]
    addColumn = function (list, columnName, columnValues) {
        var newList = [];
        for (var i = 0; i < list.length; i++) {
            var oldRow = list[i];
            for (var j = 0; j < columnValues.length; j++) {
                var newRow = JSON.parse(JSON.stringify(oldRow));//深克隆
                newRow.spec[columnName] = columnValues[j];//加属性
                newList.push(newRow);
            }
        }
        return newList;
    }
    $scope.status = ['未审核', '已审核', '审核未通过', '已关闭']
    $scope.itemCatList = []
    $scope.findItemCatList = function () {
        itemCatService.findAll().success(function (response) {
            for (var i = 0; i < response.length; i++) {
                $scope.itemCatList[response[i].id] = response[i].name;
            }
        });
    }
    $scope.checkAttributeValue = function (specName, optionName) {
        var items = $scope.entity.goodsDesc.specificationItems;
        var object = $scope.searchObjectByKey(items, 'attributeName', specName)
        if (object != null) {
            if (object.attributeValue.indexOf(optionName) >= 0) {//如果能查询到规格选项
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }


});
