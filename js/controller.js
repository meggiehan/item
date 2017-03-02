(function(angular){

    var myApp=angular.module('todos.controller',['ngRoute']);

    myApp.config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/:status?',{
            templateUrl:'todoId',
            controller:'todosController'
    })
        }])

    myApp.controller('todosController',['$scope','$location','$window','$routeParams','Todos',function($scope,$location,$window,$routeParams,Todos){
        // console.log(Todos);
        // var tasks=[
        // {id:1,name:'eating',completed:true},
        // {id:2,name:'sleeping',completed:false},
        // {id:3,name:'playing',completed:true},
        // ];
        $scope.tasks=Todos.get();

//2添加任务-暴露数据模型
    $scope.newTask='';
    $scope.add=function(){
        if(!$scope.newTask){
            return;
        }
        Todos.add($scope.newTask);
        $scope.newTask='';
    }
//3点击删除任务
    $scope.remove=function(id){
        Todos.remove(id);
    }
//4修改任务功能
        $scope.isEditingId=-1;
    $scope.edit=function(id){
        $scope.isEditingId=id;
    }
    $scope.save=function(){
         $scope.isEditingId=-1;
    }

//5切换任务功能来改变状态
$scope.$watch('tasks',function(nowval,oldval){
    Todos.save();
},true)
//6批量切换任务是否完成的状态
    $scope.isSelected=false;
    $scope.toggleAll=function(){
        Todos.toggleAll($scope.isSelected);
        }

//7清除已完成的任务
    $scope.clearComplated=function(){
        Todos.clearComplated();
        $scope.tasks=Todos.get();
    }
//8控制清除已完成的任务按钮显示与否
$scope.isShow=Todos.hascomplated;
//9显示未完成的任务数
    $scope.unComplated=Todos.upcomplated;
//10切换不同状态任务的显示与否
    $scope.isCompleted={};

    // $scope.active=function(){
    //     // var tmp=[];
    //     // for(var i=0;i<$scope.tasks.length;i++){
    //     //     var item=$scope.tasks[i];
    //     //     if(!item.completed){
    //     //         tmp.push(item);
    //     //     }
    //     // }
    //     // $scope.tasks=tmp;这种遍历是不会达到要求的，因为数组的长度动态改变，导致无法完全遍历数组
    //     $scope.isCompleted={completed:false};
    //    }
    // $scope.completed=function(){
    //     $scope.isCompleted={completed:true};

    // }

    // $scope.all=function(){
    //     $scope.isCompleted={};
    // }
// var hash=$location.url();
    // $scope.location=$location;
    // $scope.$watch('location.url()',function(nowval,oldval){
    //     switch(nowval){
    //         case '/active':
    //         $scope.isCompleted={completed:false};
    //         break;
    //         case '/completed':
    //         $scope.isCompleted={completed:true};
    //         break;
    //         default:
    //         $scope.isCompleted={};
    //         break;
    //     }
    // })

            switch($routeParams.status){
            case 'active':
            $scope.isCompleted={completed:false};
            break;
            case 'completed':
            $scope.isCompleted={completed:true};
            break;
            default:
            $scope.isCompleted={};
            break;
        }

    }])

})(angular);