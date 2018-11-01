app.service('uploadService', function ($http) {
    //上传文件
    this.uploadFile = function () {
        var formdata = new FormData();
        formdata.append('file', file.files[0]);
        return $http({
            url: "../upload.do",
            method: 'post',
            data: formdata,
            headers: {'Content-Type': undefined},//指定上传格式是multipart 上传文件类型
            transformRequest: angular.identity
        });
    }
});