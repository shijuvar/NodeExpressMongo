exports.setup = function(params) {
    var app = params.app;
    var controllers = params.controllers;

    // Routes for Tasks
    app.get('/', controllers.index);   
    app.get('/tasks/list', controllers.list);   
    app.get('/tasks/add', controllers.newTask);   
    app.post('/tasks/addTask', controllers.addTask);   
    app.get('/tasks/edit/:id', controllers.editTask);
    app.post('/tasks/updateTask', controllers.updateTask);  
    app.get('/tasks/delete/:id', controllers.deleteTask); 
};
