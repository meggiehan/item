(function(angular){
    var myApp=angular.module('todos.service',[]);
    myApp.service('Todos',['$window',function($window){
        // this.name='meggie';

        var storage=$window.localStorage;
        var str=storage.getItem('todos');
        var tasks=JSON.parse(str||'[]');

        this.get=function(){
            return tasks;
        }
        //保存任务的代码
        this.save=function(){
            storage.setItem('todos',JSON.stringify(tasks));
        }

        this.add=function(newTask){
        var id;
        if(tasks.length===0){
            id=1;
        }else{
        id=tasks[tasks.length-1].id+1;
        }
        tasks.push({id:id,name:newTask,completed:false});
        this.save();
        }

        this.remove=function(id){
            for(var i=0;i<tasks.length;i++){
            var item=tasks[i];
            if(item.id==id){
                tasks.splice(i,1);
                this.save();
                return;
            }
          }
        }

        this.toggleAll=function(isSelected){
            for(var i=0;i<tasks.length;i++){
            var item=tasks[i];
                item.completed=isSelected;
            }
            this.save();
        }

        this.clearComplated=function(){
            var tmp=[];
            for(var i=0;i<tasks.length;i++){
                var item=tasks[i];
                if(!item.completed){
                    tmp.push(item);
                }
            }
            tasks=tmp;
           // 第二种方法
           // tasks.length=0;
           // Array.prototype.push.apply(tasks,tmp);
            this.save();
            }

        this.hascomplated=function(){
            for(var i=0;i<tasks.length;i++){
            var item=tasks[i];
            if(item.completed){
                return true;
            }
        }
        return false;
        }

        this.upcomplated=function(){
            var count=0;
        for(var i=0;i<tasks.length;i++){
        var item=tasks[i];
        if(!item.completed){
            count++;
        }
      }
      return count;
        }
    }])
})(angular);