function controllers(params) {    
    var mongoose = params.mongoose;      
    var Tasks = mongoose.model('Tasks');
    controllers.index = function (req, res) {  
            Tasks.find({}).nor([{ status: 'Completed' }, { completion: 100 }]).sort('-startDate').exec(function (err, tasks) {
            res.render('index', {
                page: 'index',
                title: 'Task Manager - ToDo List',
                tasks: tasks
            });
        });
    };
     controllers.list = function (req, res) {   

        Tasks.find({}, function (err, tasks) {        
            res.render('list', {
                page: 'list',
                title: 'Task List',
                tasks: tasks
            });
        });
    };
    controllers.newTask = function (req, res) { 
            res.render('add', {
                page: 'add',
                title: 'Task Manager - Add ToDO Task'
            });      
    };  
    controllers.addTask = function (req, res) { 
            
         var form=req.body;
         var task=new Tasks({
             name: form.name,
             description: form.description,
             status: form.status,
             startDate: form.startdate,
             dueDate: form.duedate,
             completion: form.completion
         });  
          
          task.save(function(err) {
            if(!err) {
                 res.redirect("/");
              } 
        });             
    };
    controllers.editTask = function (req, res) {

        Tasks.findById(req.params.id, function (err, task) {
             res.render('edit', {
                page: 'add',
                title: 'Task Manager - ToDo List',
                task: task
            });
       });
    };
    controllers.updateTask = function (req, res) {
        var form = req.body;
        Tasks.findById(form.id, function (err, task) {
            task.name = form.name;
            task.description = form.description;
            task.status = form.status;
            task.startDate = form.startdate;
            task.dueDate = form.duedate;
            task.completion = form.completion;
            task.save(function (err) {
            if (!err) {
                 res.redirect("/");
            }  
             });             
        });
    };
    controllers.deleteTask = function (req, res) {
        Tasks.findById(req.params.id, function (err, task) {
            if (!err) {
                if (task) {
                    task.remove();
                    res.redirect("/");
                }
            }
        });
    };        
    return controllers;
};

module.exports = controllers;