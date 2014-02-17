var app = angular.module("todoApp", []);

app.directive('myItem', function() {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    templateUrl: 'myItem.html',
    link: function(scope, element, attrs) {
    }
  };
});

app.factory('Todos', function($http) {
  return {
    todos: [],
    addItem: function(item) {
      var now = new Date();
      this.todos.unshift({index: this.todos.length, createdOn: now, text: item, done: false});
    },
    getTodos: function() {
      var self = this;
      $http.get('/todos')
      .then(function(results) {
        self.todos = results.data;
      });
    },
    postTodos: function() {
      var self = this;
      $http.post('/todos/update', self.todos[0])
      .success(function(data) {
        console.log(data);
      });
    },
    updateTodo: function(updatedStatus) {
      $http.put('/todos', updatedStatus)
        .success(function(data) {
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
    Todos.postTodos();
    $scope.formTodoText = "";
  };

  $scope.toggle = function(todo) {
    todo.done = !todo.done;
    var update = {index: todo.index, done: todo.done, createdOn: todo.createdOn};
    Todos.updateTodo(update);
  };

}
