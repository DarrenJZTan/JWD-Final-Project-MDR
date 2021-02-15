class TaskManager {
  constructor(taskList = [], currentId = 0) {
    this.taskList = taskList;
    this.currentId = currentId;
  }
  addTask(taskName, description, assignedTo, dueDate, status) {
    this.currentId++;
    this.taskList.push({
      id: this.currentId,
      taskName: taskName,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,
      status: status,
    });
  }
  createTaskHtml(taskName, description, assignedTo, dueDate, status, taskId) {
    //grab container
    const container = document.querySelector("#card-container");
    //convert date
    const dateSplittest = dueDate.split(/\D/);
    const dateValuetest = new Date(
      dateSplittest[0],
      --dateSplittest[1],
      ++dateSplittest[2]
    );
    const convertedDate = dateValuetest.toString().split("00:00:00");

    let sliderValue;
    if (status == "Complete") {
      sliderValue = 2;
    } else if (status == "In Progress") {
      sliderValue = 1;
    } else {
      sliderValue = 0;
    }

    //create card info
    const cardInfo = `
    <div class="col-10">
      <h2 class="card-title mb-3 display-4 fw-bold">${taskName}</h2>
      <p class="card-text">${description}</p>
      <h6 class="card-subtitle pb-3 fw-bold">Assigned To: <span class="card-text notbold">${assignedTo}</span></h6>
      <h6 class="card-subtitle pb-3 fw-bold">Due Date: <span class="card-text notbold">${convertedDate[0]}</span></h6>
      <h6 class="card-subtitle pb-3 fw-bold">Status: <span class="card-text notbold">${status}</span></h6>
    </div>
    <div class="col">
      <div class="row">
        <div class="col text-end">
          <button class="btn-close btn-close delete-btn"></button>
        </div>
      </div>
    </div>
    <input type="range" class="form-range slider" min="0" max="2" step="1" value="${sliderValue}" id="status-slider">`;
    //create card and add card info
    const card = document.createElement("div");
    card.classList.add("row", "bg-info", "mb-4", "p-3", "task-card");
    //https://code-boxx.com/html-custom-data-attribute/
    card.dataset.taskId = taskId;
    card.innerHTML = cardInfo;

    //add card to container
    container.append(card);
  }

  deleteTaskHtml(event) {
    if (event.target.classList.contains("delete-btn")) {
      event.target.parentElement.parentElement.parentElement.parentElement.remove();
    }
  }

  deleteTaskObject(event) {
    // If Delete button is pressed
    if (event.target.classList.contains("delete-btn")) {
      const cardTaskId =
        event.target.parentElement.parentElement.parentElement.parentElement
          .dataset.taskId;

      tasks.taskList.forEach((element, index) => {
        console.log(element);
        if (element.id == cardTaskId) {
          tasks.taskList.splice(index, 1);
        }
      });
      this.save();
    }
  }

  changeStatusHTML(event) {
    if (event.target.classList.contains("slider")) {
      const parentTask =
        event.target.previousElementSibling.previousElementSibling
          .lastElementChild.firstElementChild;
      if (event.target.value == 2) {
        parentTask.innerText = "Complete";
      } else if (event.target.value == 0) {
        parentTask.innerText = "Pending";
      } else {
        parentTask.innerText = "In Progress";
      }
    }
  }

  changeStatusObject(event) {
    if (event.target.classList.contains("slider")) {
      const cardTaskId = event.target.parentElement.dataset.taskId;

      tasks.taskList.forEach((element, index) => {
        if (element.id == cardTaskId) {
          if (event.target.value == 2) {
            tasks.taskList[index].status = "Complete";
          } else if (event.target.value == 0) {
            tasks.taskList[index].status = "Pending";
          } else {
            tasks.taskList[index].status = "In Progress";
          }
        }
        //console.log(tasks.taskList);
      });
      this.save();
    }
  }

  save() {
    localStorage.setItem("taskList", JSON.stringify(this.taskList));
    localStorage.setItem("currentId", JSON.stringify(this.currentId));
  }

  fucntionName() {
    // for tasks
    //if red overdue, orange 1-2, yellow 3-5 green 5 or more days, blue done
    this.taskList.forEach((task) => {
      // convert date to ms
      const dateSplit = task.dueDate.split(/\D/);
      const dateValue = new Date(dateSplit[0], --dateSplit[1], ++dateSplit[2]);
      const dateNow = Date.now();
      // convert and compare ms to days
      const milsec = dateValue - dateNow;
      const daysTillDue = milsec / 86400000;
      // grab cards
      const cardsList = document.querySelector("#card-container");

      if (daysTillDue <= 0) {
      } else if (daysTillDue <= 2) {
      } else if (daysTillDue <= 5) {
      } else {
      }
    });
  }
}
