// logs.js

Page({
  data: {
    inputValue: '',
    todos: []
  },
  onLoad() {
    // for test
    wx.setStorageSync('todos', []);

    this.setData({
      todos: (wx.getStorageSync('todos') || []).map(todo => {
        return {
          time: todo.time,
          content: todo.content,
          isdone: todo.isdone
        }
      })
    });
  },
  addTodo(e) {
    console.log('addTodo', e);

    const todos = wx.getStorageSync('todos') || [];
    todos.push({
        time: (new Date()).getTime(),
        content: e.detail.value,
        isdone: false
    });

    const sortedDodos = this.sortTodos(todos);
    wx.setStorageSync('todos', sortedDodos);

    this.setData({
        todos: sortedDodos,
        inputValue: ''
    });
  },
  checkboxgroupChangeHandler(e) {
    // FIXME: e.detail.value 取值只有选中的内容，若用户输入项内容一致，后续判断选中的逻辑就会错误
    const checkeds = e.detail.value;
    console.log('checkboxgroupChangeHandler', e, checkeds);

    const todos = wx.getStorageSync('todos') || [];
    for (let i = (todos.length - 1); i >= 0 ; i--) {
      const todo = todos[i];
      todo.isdone = false;
      for (let j = (checkeds.length - 1); j >= 0 ; j--) {
        const checked = checkeds[j];
        if (todo.content === checked) {
          todo.isdone = true;
          break;
        }
      }
    }
    const sortedDodos = this.sortTodos(todos);
    wx.setStorageSync('todos', sortedDodos);

    this.setData({
        todos: sortedDodos
    });
  },
  // FIXME: sort 后，checkboxgroud change 结果会有问题
  sortTodos(todos){
    // sort 内的函数返回值小于 0， firstElement 排在 secondElement 前面；
    // 返回值等于 0， firstElement，secondElement 相等顺序无关要紧； 
    // 返回值大于 0， firstElement 排在 secondElement 后面；
    return todos.sort(function(a, b){
      if (a.isdone && !b.isdone) {
        return 1;
      }
      if (!a.isdone && b.isdone) {
        return -1;
      }
      return a.time - b.time;
    });
  }
})
