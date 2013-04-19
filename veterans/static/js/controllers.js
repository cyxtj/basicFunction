'use strict';

/* Controllers */
function SidebarCtrl($scope) {//{{{
    $scope.basicdata_group = [{"url":"#/drug-list", "name":"药品维护"},
                              {"url":"#/fixedrecipe", "name":"处方库维护"},
                              {"url":"#/chinese_disease", "name":"中医疾病维护"},
                              {"url":"#/western_disease", "name":"西医疾病维护"},
                              {"url":"#/semiotic", "name":"症候库维护"},
                              {"url":"#/dmethod", "name":"治法库维护"},
                              {"url":"#/symptom", "name":"症状库维护"},
                              {"url":"#dtemplate", "name":"问诊模板维护"},
                              {"url":"#/examination", "name":"检查项目维护"}
                            ];
}//}}}

function DrugListCtrl($scope, $http) {//{{{
    angular.element(".breadcrumb").css("background-color", "#f9f9f9");
    $scope.pagination = {};
    $scope.pagination.maxSize = 5; 
    $scope.msg = "";
    //@scope.selected_drug_id 只在controller里使用
    //在html要对一个药品进行修改时， 返回一个drug_id作为para
    //controller把para赋给selected_drug_id, 用来查询和提交
    $scope.selected_drug_id = null;
    $scope.view_or_not = null;
    $scope.queryStr = null;

    //get成功时调用的函数， 用于显示数据
    var listSuccess = function(data, status) { 
        $scope.drug_list = data.objects;
        $scope.pagination.noOfPages = data.total_pages;
        $scope.pagination.currentPage = data.page;
        $scope.pagination.numResults = data.num_results;
    }

    //查询显示drug列表
    $http.get('api/drug').success(listSuccess);

    //点击“1” or "跳至“ 查询显示特定页数的drug列表
    $scope.pagination.setPage = function (page) {
        if(angular.isNumber(page) && page>0) {
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
        $scope.view_or_not = view_or_not;
        $scope.selected_drug_id = para;
        //若是点击“修改”or"详细"
        if (para != null) {
            $http.get('api/drug/'+para).success(function(data, status) { 
                //new_drug在弹出的表单中使用
                $scope.new_drug = data;
            });
            if (view_or_not == true) {//若“详细”
                $scope.form_head = "详细";
            } else {//若“修改”
                $scope.form_head = "修改";
            }
        } else {//若“添加药品”
            $scope.form_head = "添加药品";
            $scope.new_drug = null;
        }
        $scope.msg = '';
    };

    //点击“关闭” 关闭弹出窗口
    $scope.close = function () {
        $scope.shouldBeOpen = false;
    };

    //点击“提交” 提交新建或修改的drug
    $scope.submit = function () {
        //若是点击“修改”
        if ($scope.selected_drug_id != null) {
            $http.put('api/drug/'+$scope.selected_drug_id, $scope.new_drug).success(function(data, status) { 
                $scope.msg = status;
            });
        }else {//若是点击“新建药品”
            $http.post('api/drug', $scope.new_drug).success(function(data, status) { 
                $scope.msg = status;
            });
        }
        $scope.msg = '';
    }; 

    //点击“删除” 弹出警示窗口 删除相应的drug
    $scope.delete = function (para) {
        $scope.close_alert();
        $http.delete('api/drug/'+para).success(function(data) { 
            $scope.pagination.setPage($scope.pagination.currentPage);
        });
    }

    $scope.alert = function(para){
        $scope.open_delete_alert = true;
        $scope.drug_to_delete = para;
    };

    $scope.close_alert= function(){
        $scope.open_delete_alert = false;
    };

    //这儿的标点很奇特
    $scope.opts = {
        backdropFade:true,
        dialogFade:true
    };

}//}}}

function FixedrecipeCtrl($scope, $http) {//{{{
    angular.element(".breadcrumb").css("background-color", "#f9f9f9");
    $scope.pagination = {};
    $scope.pagination.maxSize = 5; 
    $scope.msg = "";
    $scope.selected_fixedrecipe_id = null;
    $scope.view_or_not = null;
    $scope.form_head = "添加处方";
    $scope.queryStr = null;

    //get成功时调用的函数， 用于显示数据
    var listSuccess = function(data, status) { 
        $scope.fixedrecipe_list = data.objects;
        $scope.pagination.noOfPages = data.total_pages;
        $scope.pagination.currentPage = data.page;
        $scope.pagination.numResults = data.num_results;
    };

    //查询显示fixedrecipe列表
    $http.get('api/fixedrecipe').success(listSuccess);

    //点击“1” or "跳至“ 查询显示特定页数的fixedrecipe列表
    $scope.pagination.setPage = function (page) {
        if(angular.isNumber(page) && page>0) {
            $http({method:"GET", url:"api/fixedrecipe", params:{"q":$scope.queryStr, "page":page}}).success(listSuccess);
        }
    };

    //点击“查找” 查找关键字, 显示返回的fixedrecipe列表
    $scope.search = function(para){
        var filters = [{"name": "name", "op": "like", "val": "%"+$scope.searchStr+"%"}];
        $scope.queryStr = JSON.stringify({"filters": filters});
        $http({method:"GET", url:"api/fixedrecipe", params:{"q":$scope.queryStr}}).success(listSuccess);
    };
    
    //点击按钮“修改”or“详细”or“新建”， 弹出页面，修改or显示or新建表单
    //para是fixedrecipeid or null， view_or_not 是控制仅查看还是可以修改
    $scope.open = function (para, view_or_not) {
        $scope.shouldBeOpen = true;
        $scope.view_or_not = view_or_not;
        $scope.selected_fixedrecipe_id = para;
        //若是点击“修改”
        if (para != null) {
            $http.get('api/fixedrecipe/'+para).success(function(data, status) { 
                $scope.new_fixedrecipe = data;
            });
            if (view_or_not == true) {
                $scope.form_head = "详细"
            } else {
                $scope.form_head = "修改"
            }
        } else {//若是点击“添加处方”
            $scope.form_head = "添加处方";
            $scope.new_fixedrecipe = null
        };
        $scope.msg = '';
    };

    //点击“关闭” 关闭弹出窗口
    $scope.close = function () {
        $scope.shouldBeOpen = false;
    };

    //点击“提交” 提交新建或修改的fixedrecipe
    $scope.submit = function () {
        //若是点击“修改”
        if ($scope.selected_fixedrecipe_id != null) {
            $http.put('api/fixedrecipe/'+$scope.selected_fixedrecipe_id, $scope.new_fixedrecipe).success(function(data, status) { 
                $scope.msg = status
            });
        }else {//若是点击“新建处方”
            $http.post('api/fixedrecipe', $scope.new_fixedrecipe).success(function(data, status) { 
                $scope.msg = status
            });
        };
        $scope.msg = null
    }; 

    //点击“删除” 弹出警示窗口 删除相应的fixedrecipe
    $scope.alert = function(para){
        $scope.open_delete_alert = true
        $scope.fixedrecipe_to_delete = para
    }

    $scope.close_alert= function(){
        $scope.open_delete_alert = false
    }

    $scope.delete = function (para) {
        $scope.close_alert()
        $http.delete('api/fixedrecipe/'+para).success(function(data) { 
            $scope.pagination.setPage($scope.pagination.currentPage);
        });
    }

    //在弹出框中点击“删除” 删除相应的fixedrecipe
//    $scope.delete_fixedrecipe_item = function (FREPid, FRITid) {
//        $http.delete('api/fixedrecipe_item/'+FRITid).success(function(data) { 
//            $http.get('api/fixedrecipe/'+FREPid).success(function(data) { 
//                $scope.new_fixedrecipe = data;
//            });
//        });
//    }
    $scope.delete_fixedrecipe_item = function (FRITid, hashkey) {
        console.log($scope.new_fixedrecipe['fixedrecipeItems'])
        console.log($$hashkey)
    }

    $scope.opts = {
        backdropFade: true,
        dialogFade:true
    };

} //}}}

function ChineseDiseaseCtrl($scope, $http) {//{{{
    angular.element(".breadcrumb").css("background-color", "#f9f9f9")
    $scope.pagination = {}
    $scope.pagination.maxSize = 5; 
    $scope.msg = "";
    $scope.selected_chinese_disease_id= null;
    $scope.view_or_not = null;
    $scope.form_head = "添加中医疾病";
    $scope.queryStr = null;

    //get成功时调用的函数， 用于显示数据
    var listSuccess = function(data, status) { 
        $scope.chinese_disease_list = data.objects
        $scope.pagination.noOfPages = data.total_pages
        $scope.pagination.currentPage = data.page;
        $scope.pagination.numResults = data.num_results;
    }

    //查询显示chinese_disease列表
    $http.get('api/chinese_disease').success(listSuccess);

    //点击“1” or "跳至“ 查询显示特定页数的chinese_disease列表
    $scope.pagination.setPage = function (page) {
        if(angular.isNumber(page) && page>0) {
            $http({method:"GET", url:"api/chinese_disease", params:{"q":$scope.queryStr, "page":page}}).success(listSuccess);
        }
    };

    //点击“查找” 查找关键字, 显示返回的chinese_disease列表
    $scope.search = function(para){
        var filters = [{"name": "name", "op": "like", "val": "%"+$scope.searchStr+"%"}];
        $scope.queryStr = JSON.stringify({"filters": filters});
        $http({method:"GET", url:"api/chinese_disease", params:{"q":$scope.queryStr}}).success(listSuccess);
    }

    //点击按钮“修改”or“详细”or“新建”， 弹出页面，修改or显示or新建表单
    //para是CDISid or null， view_or_not 是控制仅查看还是可以修改
    $scope.open = function (para, view_or_not) {
        $scope.shouldBeOpen = true;
        $scope.selected_chinese_disease_id = para
        $scope.view_or_not = view_or_not;
        //若是点击“修改”
        if (para != null) {
            $http.get('api/chinese_disease/'+para).success(function(data, status) { 
                $scope.new_chinese_disease= data
            });
            if (view_or_not == true) {
                $scope.form_head = "详细"
            } else {
                $scope.form_head = "修改"
            }
        } else {//若是点击“添加药品”
            $scope.form_head = "添加中医疾病"
            $scope.new_chinese_disease = null
        }
            $scope.msg = ''
    };
    //点击“关闭” 关闭弹出窗口
    $scope.close = function () {
        $scope.shouldBeOpen = false;
    };
    //点击“提交” 提交新建或修改的chinese_disease
    $scope.submit = function () {
        console.log($scope.new_chinese_disease)
        //若是点击“修改”
        if ($scope.selected_chinese_disease_id!= null) {
            $http.put('api/chinese_disease/'+$scope.selected_chinese_disease_id, $scope.new_chinese_disease).success(function(data, status) { 
                $scope.msg = status
            });
        }else {//若是点击“新建药品”
            $http.post('api/chinese_disease', $scope.new_chinese_disease).success(function(data, status) { 
                $scope.msg = status
            });
        }
        $scope.msg = null
    }; 

    //点击“删除” 弹出警示窗口 删除相应的chinese_disease
    $scope.alert = function(para){
        $scope.open_delete_alert = true
        $scope.chinese_disease_to_delete = para
    }
    $scope.delete = function (para) {
        $scope.close_alert()
        $http.delete('api/chinese_disease/'+para).success(function(data) { 
            $scope.pagination.setPage($scope.pagination.currentPage);
        });
    }
    $scope.close_alert= function(){
        $scope.open_delete_alert = false
    }
}

function WesternDiseaseCtrl($scope, $http) {
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
    

function SemioticCtrl($scope, $routeParams) {
    $scope.semiotic_list = [ {"code":"5", "name":"5", "isClassical":"5", "SPETid":"5",  "state":"5"}]
}

function DmethodCtrl($scope, $routeParams) {
    $scope.dmethod_list = [ {"method":"6", "code":"6","level":"6", "isClassical":"6", "SPETid":"6",  "state":"6"}]
}

function SymptomCtrl($scope, $routeParams) {
    $scope.symptom_list = [ {"name":"7","method":"7", "code":"7","level":"7","class":"7", "isClassical":"7", "SPETid":"7",  "state":"7"}]
}

function DtemplateCtrl($scope, $routeParams) {
    $scope.dtemplate_list = [ {"name":"8", "code":"8","SPETid":"8","WDISid":"8","state":"8"}]
}

function ExaminationCtrl($scope, $routeParams) {
    $scope. examination_list = [ {"name":"9", "code":"9","class":"9","isClassical":"9","SPETid":"9","state":"9"}]
}//}}}
