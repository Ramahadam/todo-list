// let tasks = [];
// let counter = 0;
// let output;

// addTask.addEventListener("click", addNewTask);

// //Add new task
// function addNewTask() {
// if (!userInput.value) return;

// //Insert task into the task array
// tasks.push({ subject: userInput.value, time: "00:00" });

// //Display tasks into UI
// displayTasks();

// counter++;
// }

// //Display taks on UI
// function displayTasks() {
// console.log(tasks);
// article.innerHTML = "";
// tasks.forEach((task, i) => {
// if (!tasks.length) return;
// output += `<div class="card">
//    <div class="card-head">
//     <h3>Course</h3>
//     <h3>Time</h3>
//     <h3>Update</h3>
//   </div>
//   <div class="card-body">
//     <span class="course">${task.subject}</span>
//     <span class="time">
//       <span> ${task.time} Hrs</span>
//       <img src="./img/alarm-clock.png" alt="" id="clock-img" />
//     </span>
//     <span class="update${i}">
//       <img src="./img/edit.png" alt="" id="edit" />
//       <img src="./img/trash.svg" alt="" id="delete" class="${i}"/>
//     </span>
//   </div>
//   </div>`;
// });
// //Display tasks in the page
// article.insertAdjacentHTML("afterbegin", output);
// }

// // //Delete a tasks
// // btnDelete.addEventListener("click", function (e) {});
