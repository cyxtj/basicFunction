'use strict';

/* Controllers */
function SidebarCtrl($scope) {
    $scope.basicdata_group = [{"url":"#/drug-list", "name":"药品维护"},
                              {"url":"#/fixedrecipe", "name":"处方库维护"},
                              {"url":"#/cdisease", "name":"中医疾病维护"},
                              {"url":"#/western_disease", "name":"西医疾病维护"},
                              {"url":"#/semiotic", "name":"症候库维护"},
                              {"url":"#/dmethod", "name":"治法库维护"},
                              {"url":"#/symptom", "name":"症状库维护"},
                              {"url":"#dtemplate", "name":"问诊模板维护"},
                              {"url":"#/examination", "name":"检查项目维护"}
                            ];
}

function DrugListCtrl($scope, $http) {
    angular.element(".breadcrumb").css("background-color", "#f9f9f9")
    $scope.pagination = {}
    $scope.pagination.maxSize = 5; 
    $scope.msg = "";
    $scope.drug_id = null;
    $scope.view_or_not = null;
    $scope.form_head = "添加药品";
    $scope.queryStr = null;

    //get成功时调用的函数， 用于显示数据
    var listSuccess = function(data, status) { 
        $scope.drug_list = data.objects
        $scope.pagination.noOfPages = data.total_pages
        $scope.pagination.currentPage = data.page;
        $scope.pagination.numResults = data.num_results;
    }

    //查询显示drug列表
    $http.get('api/drug').success(listSuccess);

    //点击“1” or "跳至“ 查询显示特定页数的drug列表
    $scope.pagination.setPage = function (page) {
        if(angular.isNumber(page)) {
            $http({method:"GET", url:"api/drug", params:{"q":$scope.queryStr, "page":page}}).success(listSuccess);
        }
    };

    //点击“查找” 查找关键字, 显示返回的drug列表
    $scope.search = function(para){
        var filters = [{"name": "name", "op": "like", "val": "%"+$scope.searchStr+"%"}];
        $scope.queryStr = JSON.stringify({"filters": filters});
        $http({method:"GET", url:"api/drug", params:{"q":$scope.queryStr}}).success(listSuccess);
    }
    
    //点击按钮“修改”or“详细”or“新建”， 弹出页面，修改or显示or新建表单
    //para是DRUGid or null， view_or_not 是控制仅查看还是可以修改
    $scope.open = function (para, view_or_not) {
        $scope.shouldBeOpen = true;
        //若是点击“修改”
        if (para != null) {
            $http.get('api/drug/'+para).success(function(data, status) { 
                $scope.new_drug = data
            });
            $scope.drug_id = para
            $scope.form_head = "修改"
            $scope.view_or_not = view_or_not;
        } else {//若是点击“添加药品”
            $scope.drug_id = null
            $scope.new_drug = null
            $scope.msg = ''
            $scope.view_or_not = view_or_not;
        }
    }

    //点击“关闭” 关闭弹出窗口
    $scope.close = function () {
        $scope.shouldBeOpen = false;
    };

    //点击“提交” 提交新建或修改的drug
    $scope.submit = function () {
        //若是点击“修改”
        if ($scope.drug_id != null) {
            $http.put('api/drug/'+$scope.drug_id, $scope.new_drug).success(function(data, status) { 
                $scope.msg = status
            });
        }else {//若是点击“详细”
            $http.post('api/drug', $scope.new_drug).success(function(data, status) { 
                $scope.msg = status
            });
        }
    }; 

    //点击“删除” 删除相应的drug
    $scope.delete = function (para) {
        $http.delete('api/drug/'+para).success(function(data) { 
            $scope.pagination.setPage($scope.pagination.currentPage);
        });
    }

    $scope.opts = {
        backdropFade: true,
        dialogFade:true
    };

}


function fixedrecipeCtrl($scope, $routeParams) {
    $scope.fixedrecipe_list = [ {"name":"2", "code":"2", "effect":"2",  "isClassical":"2", "SPETid":"2", "py":"2", "wb":"2", "state":"2"}]
} 

function cdiseaseCtrl($scope, $routeParams) {
    $scope.cdisease_list = [ {"name":"3", "code":"3", "level":"3" ,"isClassical":"3", "SPETid":"3",  "state":"3"}]
}

function western_disease_Ctrl($scope, $http) {
    angular.element(".breadcrumb").css("background-color", "#f9f9f9")
    $scope.pagination = {}
    $scope.pagination.maxSize = 5; 
    $scope.msg = "";
    $scope.western_disease_id = null;
    $scope.western_disease_name ="该数据";
    $scope.view_or_not = null;
    $scope.form_head = "添加西医病症";
    $scope.queryStr = null;

    //get成功时调用的函数， 用于显示数据
    var listSuccess = function(data, status) { 
        $scope.western_disease_list = data.objects
        $scope.pagination.noOfPages = data.total_pages
        $scope.pagination.currentPage = data.page;
        $scope.pagination.numResults = data.num_results;
    }

    //查询显示western_disease列表
    $http.get('api/western_disease').success(listSuccess);

    //点击“1” or "跳至“ 查询显示特定页数的western_disease列表
    $scope.pagination.setPage = function (page) {
        if(angular.isNumber(page)) {
            $http({method:"GET", url:"api/western_disease", params:{"q":$scope.queryStr, "page":page}}).success(listSuccess);
        }
    };

    //点击“查找” 查找关键字, 显示返回的western_disease列表
    $scope.search = function(para){
        var filters = [{"name": "name", "op": "like", "val": "%"+$scope.searchStr+"%"}];
        $scope.queryStr = JSON.stringify({"filters": filters});
        $http({method:"GET", url:"api/western_disease", params:{"q":$scope.queryStr}}).success(listSuccess);
    }
    
    //点击按钮“修改”or“详细”or“新建”， 弹出页面，修改or显示or新建表单
    //para是western_diseaseid or null， view_or_not 是控制仅查看还是可以修改
    $scope.open = function (para, view_or_not) {
        $scope.shouldBeOpen = true;
        //若是点击“修改”
        if (para != null) {
            $http.get('api/western_disease/'+para).success(function(data, status) { 
                $scope.new_western_disease = data
            });
            $scope.western_disease_id = para
            $scope.form_head = "修改病症"
            $scope.view_or_not = view_or_not;
        } else {//若是点击“添加药品”
            $scope.western_disease_id = null
            $scope.new_western_disease = null
            $scope.msg = ''
            $scope.view_or_not = view_or_not;
        }
    };

    //点击“关闭” 关闭弹出窗口
    $scope.close = function () {
        $scope.shouldBeOpen = false;
        $scope.shouldBeDelete = false;
    };

    //点击“提交” 提交新建或修改的western_disease
    $scope.submit = function () {
        //若是点击“修改”
        if ($scope.western_disease_id != null) {
            $http.put('api/western_disease/'+$scope.western_disease_id, $scope.new_western_disease).success(function(data, status) { 
                $scope.msg = status
            });
        }else {//若是点击“详细”
            $http.post('api/western_disease', $scope.new_western_disease).success(function(data, status) { 
                $scope.msg = status
            });
        }
    }; 

    //点击“删除” 删除相应的western_disease
     
    $scope.delete = function (para) {
        $http.delete('api/western_disease/'+para).success(function(data,status) {
            $scope.msg = status;
            $scope.pagination.setPage($scope.pagination.currentPage);

        });
    }
    
    $scope.makeSure = function (para,name) {
            $scope.shouldBeDelete = true;
            $scope.western_disease_id = para;
            $scope.western_disease_name =name ;

        }
   

    $scope.opts = {
        backdropFade: true,
        dialogFade:true
    };

}


function semioticCtrl($scope, $routeParams) {
    $scope.semiotic_list = [ {"code":"5", "name":"5", "isClassical":"5", "SPETid":"5",  "state":"5"}]
}

function dmethodCtrl($scope, $routeParams) {
    $scope.dmethod_list = [ {"method":"6", "code":"6","level":"6", "isClassical":"6", "SPETid":"6",  "state":"6"}]
}

function symptomCtrl($scope, $routeParams) {
    $scope.symptom_list = [ {"name":"7","method":"7", "code":"7","level":"7","class":"7", "isClassical":"7", "SPETid":"7",  "state":"7"}]
}

function dtemplateCtrl($scope, $routeParams) {
    $scope.dtemplate_list = [ {"name":"8", "code":"8","SPETid":"8","WDISid":"8","state":"8"}]
}

function examinationCtrl($scope, $routeParams) {
    $scope. examination_list = [ {"name":"9", "code":"9","class":"9","isClassical":"9","SPETid":"9","state":"9"}]
}


