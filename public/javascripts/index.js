var app = angular.module("todoApp", []);

app.factory('Todos', function($http) {
  return {
    todos: [],
    addItem: function(item) {
      var now = new Date();
      this.todos.unshift({text: item, done: false, createdOn: now});
    },
    getTodos: function() {
      var self = this;
      $http.get('/todos')
      .then(function(results) {
        self.todos = results.data;
      });
    },
    postTodos: function(items) {
      $http.post('/todos', items)
      .success(function(data) {
        console.log(data);
      });
    }
  };
});

function TodoCtrl($scope, Todos) {

  $scope.$watch(function() { return Todos.todos;  }, function(todos) {
    $scope.todos = todos;
  }, true);

  Todos.getTodos();

  $scope.$watch(function() {  return Todos.todos; }, function(todos) {
    $scope.incompleteCount = todos.filter(function(t) { return !t.done;  }).length;
  }, true);

  $scope.addTodoItem = function() {
    Todos.addItem($scope.formTodoText);
    Todos.postTodos(Todos.todos);
    $scope.formTodoText = "";
  };
}

