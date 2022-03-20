
const notCompleted = document.querySelector('#tasks_not-completed'),
   completed = document.querySelector('#tasks-completed'),
   form = document.querySelector('#new-task-form'),
   input = document.querySelector('#new-task-input'),
   toggle = document.querySelector('.form-toggle');

let todos = localStorage.getItem('todos') === null ? [] : JSON.parse(localStorage.getItem('todos'));
let todosDone = localStorage.getItem('todosDone') === null ? [] : JSON.parse(localStorage.getItem('todosDone'));


window.addEventListener('load', () => {
   form.addEventListener('submit', addTask);
   toggle.addEventListener('click', toggleBackground);
   getTodos(todos);
   getTodosCompleted(todosDone);
})

function addTask(event) {
   event.preventDefault();
   const task = input.value.trim();
   if (!task) {
      alert('Please enter the task first');
      return;
   }
   createTask(task);
   input.value = '';
}

function createTask(inp) {
   const randomId = Math.random() * 15.75;

   const task_el = document.createElement('div'),
      task_content_el = document.createElement('div'),
      task_input_el = document.createElement('input'),
      task_actions_el = document.createElement('div'),
      task_edit_el = document.createElement('button'),
      task_delete_el = document.createElement('button'),
      task_delete_completed = document.createElement('button');

   task_el.id = randomId.toFixed(2);
   task_el.classList.add('task');

   task_content_el.classList.add('content');

   task_input_el.classList.add('text');
   task_input_el.type = 'text';
   task_input_el.value = inp;
   task_input_el.setAttribute('readonly', 'readonly');

   task_actions_el.classList.add('actions');

   task_edit_el.classList.add('edit');
   task_edit_el.innerHTML = 'Edit';

   task_delete_el.classList.add('delete');
   task_delete_el.innerHTML = '<span class="icon-bin2"></span>';

   task_delete_completed.classList.add('delete-completed');
   task_delete_completed.innerHTML = '<span class="icon-bin2"></span>';

   task_el.appendChild(task_content_el);
   task_content_el.appendChild(task_input_el);
   task_actions_el.appendChild(task_edit_el);
   task_actions_el.appendChild(task_delete_el);
   task_el.appendChild(task_actions_el);
   notCompleted.appendChild(task_el);

   saveLocalTodos(todos, task_input_el.value);

   task_edit_el.addEventListener('click', () => editTask(task_edit_el, task_input_el));
   task_delete_el.addEventListener('click', () => deleteTask(task_el, task_input_el));
   task_delete_completed.addEventListener('click', () => deleteTaskCompleted(task_el, task_input_el));
   task_input_el.addEventListener('dblclick', () => {

      task_el.appendChild(task_content_el);
      task_content_el.appendChild(task_input_el);
      task_actions_el.appendChild(task_delete_completed);
      task_actions_el.removeChild(task_edit_el);
      task_actions_el.removeChild(task_delete_el);
      task_el.appendChild(task_actions_el);
      completed.appendChild(task_el);

      saveLocalTodosCompleted(todosDone, task_input_el);
      removeLocalTodos(todos, task_input_el);
   })
}

function editTask(btn, inp) {
   if (btn.innerText.toLocaleLowerCase() == 'edit') {
      inp.removeAttribute('readonly');
      inp.focus();
      btn.innerText = 'Save';
   } else {
      inp.setAttribute('readonly', 'readonly');
      btn.innerHTML = 'Edit';
   }
   editTaskLocalTodos(todos, inp);
}

function deleteTask(elem, task) {
   if (elem.parentNode) {
      elem.parentNode.removeChild(elem);
   }
   removeLocalTodos(todos, task);
}

function deleteTaskCompleted(elem, task) {
   if (elem.parentNode) {
      elem.parentNode.removeChild(elem);
   }
   removeLocalTodosCompleted(todosDone, task);
}

function toggleBackground(event) {
   if (event.target.value === 'off') {
      document.body.style.background = `url(${document.querySelector('#fid-2').dataset.color})`;
      document.body.style.backgroundSize = 'cover';
   } else if (event.target.value === 'on') {
      document.body.style.background = `url(${document.querySelector('#fid-1').dataset.color})`;
      document.body.style.backgroundSize = 'cover';
   }
}

function saveLocalTodos(array, todo) {
   array.push(todo);
   localStorage.setItem('todos', JSON.stringify(array));
}

function saveLocalTodosCompleted(array, todo) {
   array.push(todo.value);
   localStorage.setItem('todosDone', JSON.stringify(array));
}

function getTodos(array) {
   array.forEach(function (todo) {
      const randomId = Math.random() * 15.75;

      const task_el = document.createElement('div'),
         task_content_el = document.createElement('div'),
         task_input_el = document.createElement('input'),
         task_actions_el = document.createElement('div'),
         task_delete_el = document.createElement('button');
      task_delete_completed = document.createElement('button');
      task_edit_el = document.createElement('button'),


         task_el.id = randomId.toFixed(2);
      task_el.classList.add('task');
      task_el.style.transform = 'translateX(0)';
      task_el.style.animation = 0;

      task_content_el.classList.add('content');

      task_input_el.classList.add('text');
      task_input_el.type = 'text';
      task_input_el.value = todo;
      task_input_el.setAttribute('readonly', 'readonly');

      task_actions_el.classList.add('actions');

      task_edit_el.classList.add('edit');
      task_edit_el.innerHTML = 'Edit';

      task_delete_el.classList.add('delete');
      task_delete_el.innerHTML = '<span class="icon-bin2"></span>';

      task_delete_completed.classList.add('delete-completed');
      task_delete_completed.innerHTML = '<span class="icon-bin2"></span>';

      task_el.appendChild(task_content_el);
      task_content_el.appendChild(task_input_el);
      task_actions_el.appendChild(task_edit_el);
      task_actions_el.appendChild(task_delete_el);
      task_el.appendChild(task_actions_el);
      notCompleted.appendChild(task_el);

      task_edit_el.addEventListener('click', () => editTask(task_edit_el, task_input_el));
      task_delete_el.addEventListener('click', () => deleteTask(task_el, task_input_el));
      task_input_el.addEventListener('dblclick', () => {
         task_el.appendChild(task_content_el);
         task_content_el.appendChild(task_input_el);
         task_actions_el.removeChild(task_edit_el);
         task_actions_el.removeChild(task_delete_el);
         task_actions_el.appendChild(task_delete_completed);
         task_el.appendChild(task_actions_el);
         completed.appendChild(task_el);

         task_el.style.transform = '';
         task_el.style.animation = '';

         task_delete_completed.addEventListener('click', () => deleteTaskCompleted(task_el, task_input_el));

         saveLocalTodosCompleted(todosDone, task_input_el);
         removeLocalTodos(todos, task_input_el);
      })
   })
}

function getTodosCompleted(array) {
   array.forEach(function (todo) {
      const randomId = Math.random() * 15.75;

      const task_el = document.createElement('div'),
         task_content_el = document.createElement('div'),
         task_input_el = document.createElement('input'),
         task_actions_el = document.createElement('div'),
         task_delete_completed = document.createElement('button');

      task_el.id = randomId.toFixed(2);
      task_el.classList.add('task');
      task_el.style.transform = 'translateX(0)';
      task_el.style.animation = 0;

      task_content_el.classList.add('content');

      task_input_el.classList.add('text');
      task_input_el.type = 'text';
      task_input_el.value = todo;
      task_input_el.setAttribute('readonly', 'readonly');

      task_actions_el.classList.add('actions');

      task_delete_completed.classList.add('delete-completed');
      task_delete_completed.innerHTML = '<span class="icon-bin2"></span>';

      task_el.appendChild(task_content_el);
      task_content_el.appendChild(task_input_el);
      task_actions_el.appendChild(task_delete_completed);
      task_el.appendChild(task_actions_el);
      completed.appendChild(task_el);

      task_delete_completed.addEventListener('click', () => deleteTaskCompleted(task_el, task_input_el));
   })
}

function removeLocalTodos(array, todo) {
   const todoIndex = todo.value;
   array.splice(array.indexOf(todoIndex), 1);
   localStorage.setItem('todos', JSON.stringify(array));
}

function removeLocalTodosCompleted(array, todo) {
   const todoIndex = todo.value;
   array.splice(array.indexOf(todoIndex), 1);
   localStorage.setItem('todosDone', JSON.stringify(array));
}

function editTaskLocalTodos(array, todo) {
   const task = todo.value;
   if (task === task) {
      array.splice(array.indexOf(task), 1);
   }
   array.push(task);
   localStorage.setItem('todos', JSON.stringify(array));
}

