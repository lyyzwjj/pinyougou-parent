app.controller('searchController', function ($scope, searchService) {
    //定义搜索对象的结构
    $scope.searchMap = {
        'keywords': '',
        'category': '',
        'brand': '',
        'price': '',
        'pageNo': 1,
        'pageSize': 10,
        'spec': {}
    }
    //搜索
    $scope.search = function () {
        $scope.searchMap.pageNo = parseInt($scope.searchMap.pageNo);
        searchService.search($scope.searchMap).success(
            function (response) {
                $scope.resultMap = response;
                buildPageLabel();
            });
    }
    //构建分页栏
    buildPageLabel = function () {
        $scope.pageLabel = [];
        var firstPage = 1;//开始页码
        var lastPage = $scope.resultMap.totalPages;//截止页码
        $scope.firstDot = true;//前面有点
        $scope.lastDot = true;//后面有点
        if (lastPage > 5) {
            if ($scope.searchMap.pageNo <= 3) {//如果当前页码小于3显示前5页
                lastPage = 5;
                $scope.firstDot = false;//前面没点
            } else if ($scope.searchMap.pageNo >= lastPage - 2) {
                firstPage = lastPage - 4;
                $scope.lastDot = false;//后面没点
            } else {
                firstPage = $scope.searchMap.pageNo - 2;
                lastPage = $scope.searchMap.pageNo + 2;
            }
        }else{
            $scope.firstDot = false;//前面无点
            $scope.lastDot = false;//后面无点
        }
        for (var i = firstPage; i <= lastPage; i++) {
            $scope.pageLabel.push(i);
        }
    }
    //分页查询
    $scope.queryByPage = function (pageNo) {
        if (pageNo < 1 || pageNo > $scope.resultMap.totalPages) {//页码在范围内
            return;
        }
        $scope.searchMap.pageNo = pageNo;
        $scope.search();//查询
    }
    //判断当前页是否为第一页
    $scope.isTopPage = function () {
        if ($scope.searchMap.pageNo == 1) {
            return true;
        } else {
            return false;
        }
    }
    //判断当前页是否为最后一页
    $scope.isEndPage = function () {
        if ($scope.searchMap.pageNo == $scope.resultMap.totalPages) {
            return true;
        } else {
            return false;
        }
    }
    //添加搜索项 改变searchMap的值
    $scope.addSearchItem = function (key, value) {
        if (key == 'category' || key == 'brand' || key == 'price') {
            $scope.searchMap[key] = value;
        } else {//用户点击是规格
            $scope.searchMap.spec[key] = value;
        }
        $scope.search();
    }
    //撤销搜索项
    $scope.removeSearchItem = function (key) {
        if (key == 'category' || key == 'brand' || key == 'price') {
            $scope.searchMap[key] = '';
        } else {//用户点击是规格
            delete $scope.searchMap.spec[key];
        }
        $scope.search();
    }
})
