// ---------- SETUP HTML DYNAMICALLY ----------
document.body.style.fontFamily = "'Comic Sans MS', cursive, sans-serif";
document.body.style.backgroundColor = "#fef3e0";
document.body.style.textAlign = "center";
document.body.style.margin = "45px";
document.body.style.padding = "40px";

// Title
const h1 = document.createElement('h1');
h1.textContent = "🎨 Cartoon Task Dashboard";
h1.style.color = "#ff6f61";
h1.style.fontSize = "2em";
h1.style.textShadow = "2px 2px #fff";
document.body.appendChild(h1);

// ---------- CONTROLS ----------
const controls = document.createElement('div');
controls.style.margin = '10px';
document.body.appendChild(controls);

// Task input
const taskInput = document.createElement('input');
taskInput.type = 'text';
taskInput.placeholder = 'Add a new task';
taskInput.style.padding = '10px';
taskInput.style.width = '200px';
taskInput.style.borderRadius = '10px';
taskInput.style.border = '2px solid #ffcc00';
controls.appendChild(taskInput);

// Buttons
const addTaskBtn = document.createElement('button');
addTaskBtn.textContent = 'Add Task';
addTaskBtn.style.marginLeft = '5px';
addTaskBtn.style.borderRadius = '8px';
addTaskBtn.style.padding = '8px';
addTaskBtn.style.background = 'linear-gradient(45deg, #ff9a9e, #fad0c4)';
controls.appendChild(addTaskBtn);

const existingDashboard = document.getElementById('dashboard-root');
if(existingDashboard) existingDashboard.remove();

// Then create dashboard inside a single container
const dashboardRoot = document.createElement('div');
dashboardRoot.id = 'dashboard-root';
document.body.appendChild(dashboardRoot);

const clearBtn = document.createElement('button');
clearBtn.textContent = 'Clear All';
clearBtn.style.marginLeft = '5px';
clearBtn.style.borderRadius = '8px';
clearBtn.style.padding = '8px';
clearBtn.style.background = 'linear-gradient(45deg, #a1c4fd, #c2e9fb)';
controls.appendChild(clearBtn);

const toggleDarkBtn = document.createElement('button');
toggleDarkBtn.textContent = '🌙 Dark Mode';
toggleDarkBtn.style.marginLeft = '5px';
toggleDarkBtn.style.borderRadius = '8px';
toggleDarkBtn.style.padding = '8px';
toggleDarkBtn.style.background = 'linear-gradient(45deg, #fbc2eb, #a6c1ee)';
controls.appendChild(toggleDarkBtn);

// ---------- FILTERS ----------
const filters = document.createElement('div');
filters.style.marginTop = '10px';
document.body.appendChild(filters);

['All','Completed','Pending'].forEach(f => {
  const btn = document.createElement('button');
  btn.textContent = f;
  btn.style.margin = '0 5px';
  btn.style.padding = '6px 12px';
  btn.style.borderRadius = '8px';
  btn.style.background = '#fff0f5';
  btn.addEventListener('click',()=>{
    currentFilter = f.toLowerCase();
    displayTasks();
  });
  filters.appendChild(btn);
});

// ---------- TASK LIST ----------
const taskList = document.createElement('ul');
taskList.style.listStyle = 'none';
taskList.style.padding = '0';
taskList.style.maxWidth = '500px';
taskList.style.margin = '20px auto';
document.body.appendChild(taskList);

// ---------- STATS ----------
const statsContainer = document.createElement('div');
statsContainer.style.fontWeight='bold';
statsContainer.style.fontSize='1.1em';
document.body.appendChild(statsContainer);

// ---------- JOKE ----------
const jokeContainer = document.createElement('div');
jokeContainer.style.marginTop='20px';
jokeContainer.style.padding='10px';
jokeContainer.style.backgroundColor='#ffe4e1';
jokeContainer.style.borderRadius='15px';
document.body.appendChild(jokeContainer);

const newJokeBtn = document.createElement('button');
newJokeBtn.textContent='🎭 New Joke';
newJokeBtn.style.borderRadius='8px';
newJokeBtn.style.padding='6px 12px';
newJokeBtn.style.marginBottom='10px';
jokeContainer.appendChild(newJokeBtn);

const jokeText = document.createElement('p');
jokeContainer.appendChild(jokeText);

// ---------- JS LOGIC ----------
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';
const avatars = ['🐶','🐱','🦊','🐼','🐨','🦄','🐵','🐸','🦁','🐧'];

// Display tasks
function displayTasks(){
  taskList.innerHTML = ''; // clear old tasks

  tasks.forEach((task,index)=>{
    if(currentFilter==='completed' && !task.completed) return;
    if(currentFilter==='pending' && task.completed) return;

    const li = document.createElement('li');
    li.style.background = '#ffd1dc';
    li.style.margin = '10px 0';
    li.style.padding = '15px';
    li.style.borderRadius = '15px';
    li.style.display = 'flex';
    li.style.alignItems = 'center';
    li.style.justifyContent = 'flex-start';
    li.style.boxShadow = '3px 3px 8px #aaa';
    li.style.transition = 'transform 0.3s, opacity 0.3s';
    li.style.opacity = '0';
    setTimeout(()=>li.style.opacity='1',50); // fade in animation

    li.addEventListener('mouseenter',()=>li.style.transform='translateY(-5px)');
    li.addEventListener('mouseleave',()=>li.style.transform='translateY(0)');

    // Avatar
    const avatar = document.createElement('span');
    avatar.textContent = task.avatar;
    avatar.style.fontSize='2em';
    avatar.style.marginRight='10px';
    avatar.style.transition='transform 0.3s';
    li.appendChild(avatar);
    li.addEventListener('mouseenter',()=>avatar.style.transform='rotate(-15deg) scale(1.2)');
    li.addEventListener('mouseleave',()=>avatar.style.transform='rotate(0deg) scale(1)');

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type='checkbox';
    checkbox.checked=task.completed;
    checkbox.addEventListener('change',()=>{
      task.completed=checkbox.checked;
      localStorage.setItem('tasks',JSON.stringify(tasks));
      displayTasks();
    });
    li.appendChild(checkbox);

    // Text
    const spanText = document.createElement('span');
    spanText.textContent = task.text;
    spanText.style.marginLeft='10px';
    li.appendChild(spanText);

    // Priority
    const priority = document.createElement('span');
    priority.textContent = task.priority;
    priority.style.padding='2px 6px';
    priority.style.borderRadius='5px';
    priority.style.fontWeight='bold';
    priority.style.marginLeft='10px';
    if(task.priority==='High') priority.style.background='#ff4d4d';
    else if(task.priority==='Medium') priority.style.background='#ffa500';
    else priority.style.background='#4caf50';
    priority.style.color='white';
    li.appendChild(priority);

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent='Edit';
    editBtn.style.marginLeft='10px';
    editBtn.addEventListener('click',(e)=>{
      e.stopPropagation();
      const newText = prompt('Edit task:',task.text);
      const newPriority = prompt('Priority: High, Medium, Low',task.priority);
      if(newText){
        task.text=newText;
        task.priority = newPriority || task.priority;
        localStorage.setItem('tasks',JSON.stringify(tasks));
        displayTasks();
      }
    });
    li.appendChild(editBtn);

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent='Delete';
    deleteBtn.style.marginLeft='5px';
    deleteBtn.addEventListener('click',(e)=>{
      e.stopPropagation();
      tasks.splice(index,1);
      localStorage.setItem('tasks',JSON.stringify(tasks));
      displayTasks();
    });
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });

  displayStats();
}

// Display stats
function displayStats(){
  const total = tasks.length;
  const completed = tasks.filter(t=>t.completed).length;
  const pending = total-completed;
  statsContainer.innerHTML=`Total: ${total} | Completed: ${completed} | Pending: ${pending}`;
}

// Add task
addTaskBtn.addEventListener('click',()=>{
  const text = taskInput.value.trim();
  if(!text) return alert('Enter a task!');
  const priority = prompt('Priority: High, Medium, Low','Medium')||'Medium';
  const avatar = avatars[Math.floor(Math.random()*avatars.length)];
  tasks.push({text,completed:false,priority,avatar}); // assign avatar once here
  localStorage.setItem('tasks',JSON.stringify(tasks));
  taskInput.value='';
  displayTasks();
});

// Clear all
clearBtn.addEventListener('click',()=>{
  if(confirm('Clear all tasks?')){
    tasks=[];
    localStorage.setItem('tasks',JSON.stringify(tasks));
    displayTasks();
  }
});

// Dark mode
toggleDarkBtn.addEventListener('click',()=>{
  document.body.classList.toggle('dark-mode');
  if(document.body.classList.contains('dark-mode')){
    document.body.style.background='#2e2e2e';
    document.body.style.color='#fff';
  }else{
    document.body.style.background='#fef3e0';
    document.body.style.color='#000';
  }
});

// Joke
async function fetchJoke(){
  try{
    const res = await fetch('https://official-joke-api.appspot.com/random_joke');
    const data = await res.json();
    jokeText.textContent=`${data.setup} - ${data.punchline}`;
  }catch(err){
    jokeText.textContent='Failed to fetch joke';
  }
}
newJokeBtn.addEventListener('click',fetchJoke);

// ---------- INITIAL LOAD ----------
displayTasks();
fetchJoke();
