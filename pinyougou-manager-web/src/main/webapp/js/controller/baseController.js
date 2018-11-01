app.controller('baseController', function ($scope) {
    // 分页控件
    $scope.paginationConf = {
        currentPage: 1,
        totalItems: 10,
        itemsPerPage: 10,
        perPageOptions: [5, 10, 20, 30, 40, 50],
        onChange: function () {
            $scope.reloadList();
        }
    };
    // 刷新列表
    $scope.reloadList = function () {
        $scope.search($scope.paginationConf.currentPage,
            $scope.paginationConf.itemsPerPage);
    };
    // 用户勾选id集合
    $scope.selectIds = [];
    $scope.updateSelection = function ($event, id) {
        if ($event.target.checked) {
            $scope.selectIds.push(id);// push向集合添加元素
        } else {
            // 删除id
            var index = $scope.selectIds.indexOf(id);// 查找值的位置
            $scope.selectIds.splice(index, 1);// 参数1移除位置,参数2移除个数
        }
    }
    $scope.jsonToString = function (jsonString, key) {
        var json = JSON.parse(jsonString);
        var value = "";
        for (var i = 0; i < json.length; i++) {
            if (i > 0) {
                value += ",";
            }
            value += json[i][key];
        }
        return value;
    }
})


