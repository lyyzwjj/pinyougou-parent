app.controller('contentController', function ($scope, contentService) {
    //所有广告列表
    $scope.contentList = [];
    $scope.findByCategoryId = function (categoryId) {
        contentService.findByCategoryId(categoryId).success(
            function (response) {
                $scope.contentList[categoryId] = response;
            })
    }
})