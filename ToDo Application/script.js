let todo = [];
fetch("https://jsonplaceholder.typicode.com/todos")
  .then((res) => res.json())
  .then((value) => {
    value.forEach((item) => {
      todo.push(item);
    });
    return todo;
  })
  .then((item) => {
    const check = localStorage.getItem("to-do-list");
    if (!check){
      localStorage.setItem("to-do-list",JSON.stringify(item));
    }; 
    return JSON.parse(check);
  });

// Display Title
function display() {
  document.getElementsByTagName("ul")[0].style.cssText = "display: block;";
}
let my_todo_list = JSON.parse(localStorage.getItem("to-do-list"));
const list_item = my_todo_list.forEach((item) => {
  const li = document.createElement("li");
  li.innerText = item.title;
  const ul = document.querySelector("ul");
  ul.appendChild(li);
});

// Add New ToDo
function add() {
  document.getElementById("add-todo-form").style.cssText = "display: block;";
}

const add_user_form = document.querySelector("#add-todo-form");
add_user_form.addEventListener("submit", (event) => {

  const UId = document.querySelector(".userId").value;
  const name = document.querySelector(".title").value;
  let done = document.getElementById("completed").checked;

  const data = {
    userId: parseInt(UId),
    id: my_todo_list.length > 0 ? my_todo_list[my_todo_list.length - 1].id + 1 : 1,
    title: name,
    completed: done,
  };

  console.log(data);
  my_todo_list.unshift(data);
  console.log(my_todo_list);
  localStorage.setItem("to-do-list", JSON.stringify(my_todo_list));
});

// Mark
my_todo_list.forEach((item) => {
  const mark_div = document.getElementById('titles');
  const mark_p = document.createElement('p');
  mark_p.innerText = item.title;
  mark_div.append(mark_p);
  const checkbox_mark = document.createElement('input');
  checkbox_mark.type = 'checkbox';
  checkbox_mark.name = 'mark';
  checkbox_mark.id = 'mark';
  mark_p.append(checkbox_mark);

  if(item.completed == true){
    mark_p.style.cssText = 'background-color: #F66666'; //red
    checkbox_mark.checked = true;
  }
  else{
    mark_p.style.cssText = 'background-color: #96FB96'; //green
    checkbox_mark.checked = false;
  }

  checkbox_mark.addEventListener('change', function() {
    if(this.checked){
      mark_p.style.cssText = 'background-color: #F66666'; //red
      item.completed = true;
    }
    else{
      mark_p.style.cssText = 'background-color: #96FB96'; //green
      item.completed = false;
    }
    localStorage.setItem("to-do-list", JSON.stringify(my_todo_list));
  })
});

// Search
function search(){
  document.getElementById('search-form').style.cssText='display: block;';
}

const search_form = document.querySelector('#search-form');
search_form.addEventListener("submit", (event) => {
  event.preventDefault();
  const search_title = document.querySelector('.search-title');
  
  my_todo_list.forEach((item) => {
    if(item.title.toLowerCase().includes(search_title.value.toLowerCase())){
      console.log(`\nUser Id: ${item.userId}`);
      console.log(`Id: ${item.id}`);
      console.log(`Title: ${item.title}`);
      console.log(`Completed: ${item.completed}`);
    }
  })
})

// Delete
const mark_p = document.querySelectorAll('#titles p');
mark_p.forEach((para) => {
  const delete_button = document.createElement('button');
  delete_button.textContent = "Delete";
  delete_button.id = "delete";
  para.append(delete_button);
  
delete_button.addEventListener('click', (event) => {
  event.preventDefault();
  const delete_index = event.target.getAttribute("id");
  para.remove();
  my_todo_list.splice(delete_index,1);
  localStorage.setItem("to-do-list", JSON.stringify(my_todo_list));
});
});

// Edit
mark_p.forEach((para, index) => {
  const edit_button = document.createElement('button');
  edit_button.textContent = "Edit";
  edit_button.id = "edit";
  para.append(edit_button);

  edit_button.addEventListener('click', function() {
    const delete_button = document.createElement('button');
    delete_button.textContent = "Delete";
    delete_button.id = "delete";

    const checkbox_mark = document.createElement('input');
    checkbox_mark.type = "checkbox";
    checkbox_mark.id = "mark";

    const edit_f_check = document.querySelector('#edit-form');
    if(edit_f_check){
      edit_f_check.remove();
    }
    else{
    const edit_form = document.createElement('form');
    edit_form.id = "edit-form";

    const edit_label = document.createElement('label');
    edit_label.textContent = "New title: ";
    edit_label.setAttribute("for", "edit-title");

    const edit_title = document.createElement('input');
    edit_title.type = "text";
    edit_title.className = "edit-title";

    const submit_button = document.createElement('button');
    submit_button.textContent = "Confirm Changes";

    edit_form.append(edit_label, edit_title, submit_button);

    para.append(edit_form);

    edit_form.addEventListener('submit', function(event) {
      event.preventDefault();
      const edited_title = document.querySelector('.edit-title');
      let title = Array.from(para.childNodes)
        .filter((node) => node.nodeType == Node.TEXT_NODE)
        .map((item) => item.textContent)
        .join('');
      title = edited_title.value;
      my_todo_list[index].title = title;
      console.log(my_todo_list);
      para.textContent = title;

      para.append(checkbox_mark, delete_button, edit_button);

      delete_button.addEventListener('click', (event) => {
        event.preventDefault();
        para.remove();
        my_todo_list.splice(index, 1);
        localStorage.setItem("to-do-list", JSON.stringify(my_todo_list));
      });
      
      checkbox_mark.checked = my_todo_list[index].completed;
      if(checkbox_mark.checked){
        para.style.cssText = 'background-color: #F66666'; //red
      }
      else{
        para.style.cssText = 'background-color: #96FB96'; //green
      }
      checkbox_mark.addEventListener('change', function() {
        if(this.checked){
          para.style.cssText = 'background-color: #F66666'; //red
          my_todo_list[index].completed = true;
        }
        else{
          para.style.cssText = 'background-color: #96FB96'; //green
          my_todo_list[index].completed = false;
        }
        localStorage.setItem("to-do-list", JSON.stringify(my_todo_list));
      });

      localStorage.setItem("to-do-list", JSON.stringify(my_todo_list));
    });
  }
  });
});
