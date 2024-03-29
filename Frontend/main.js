// Add new Category Function
const AddCategory = document.querySelector("#adding-catagory-btn");
const AddCategoryInput = document.querySelector("#adding-catagory-input-value");
const CategoryZone = document.querySelector("#all-catagories");
const selectCategories = document.querySelector("#Catagories");
const reminderContainerZone = document.querySelector(
  "#all-learning-container-zone"
);
const deleteReminderContainer = document.querySelector(
  "#delete-reminder-conatainer"
);

// color selection
const root = document.documentElement;
const redColor = getComputedStyle(root).getPropertyValue("--primary-color-red");
const greenColor = getComputedStyle(root).getPropertyValue(
  "--primary-color-green"
);

// select inputHeader
const inputHeader = document.querySelector("#whats-new>input");
// select the alert text content
const alertTextContent = document.querySelector(".alert>span:nth-child(2");

AddCategory.addEventListener("click", (e) => {
  // Check if the input value is empty
  if (AddCategoryInput.value.trim() === "") {
    showAlert();
    alertBar.style.backgroundColor = redColor;
    alertTextContent.textContent = "Plx create a catagory first";
    // alertBar.classList.add('hide')
    return;
  } 

  // Reset background color if input is not empty
  AddCategory.style.backgroundColor = "";

  // Category Add
  const newCategoryelemnt = document.createElement("button");
  newCategoryelemnt.classList.add("catagory-button");
  const newCategoryInnerHTML = `<p>${AddCategoryInput.value}</p>`;
  newCategoryelemnt.innerHTML = newCategoryInnerHTML;
  CategoryZone.append(newCategoryelemnt);

  // Add the category to the select zone
  const optionCreateElemen = document.createElement("option");
  optionCreateElemen.value = AddCategoryInput.value;
  const optionInnerHTML = `${AddCategoryInput.value}`;
  optionCreateElemen.innerHTML = optionInnerHTML;
  selectCategories.append(optionCreateElemen);

  const reminderContainer = document.createElement("div");
  reminderContainer.classList.add(
    "all-learning-containers",
    AddCategoryInput.value
  );
  reminderContainerZone.append(reminderContainer);
  AddCategoryInput.value = "";
    showAlert();
    alertBar.style.backgroundColor = greenColor;
    alertTextContent.textContent = "Catagory created";
});

// Add event listener for deleting the category
deleteReminderContainer.addEventListener("click", () => {
  const selectedCategory = selectCategories.value;

  // Remove the category button
  const categoryButtons = document.querySelectorAll(".catagory-button");
  categoryButtons.forEach((button) => {
    if (containsText(button, selectedCategory)) {
      button.remove();
    }
  });

  // Remove the category from the select zone
  const optionToRemove = selectCategories.querySelector(
    `option[value='${selectedCategory}']`
  );
  if (optionToRemove) {
    optionToRemove.remove();
  }

  // Remove the category div and its content
  const categoryDivToRemove = reminderContainerZone.querySelector(
    `.${selectedCategory}`
  );
  if (categoryDivToRemove) {
    categoryDivToRemove.remove();
    showAlert();
    alertBar.style.backgroundColor = greenColor;
    alertTextContent.textContent = "Catagory removed";
  }
});

// select the div and elements
const whatsNew = document.querySelector("#whats-new input[type=text]");
const whatsAbout = document.querySelector("#more-about input[type=text]");
const addButton = document.querySelector("#add");

const remimderDataField = document.querySelector(
  "#all-learning-container-zone"
);

remimderDataField.addEventListener("click", (e) => {
  const deleteButton = e.target.closest(".container-deleteUpdate");
  if (deleteButton) {
    const deleteItem = deleteButton.closest(".reminder-container");
    if (deleteItem) {
      deleteItem.remove();
      showAlert();
      alertBar.style.backgroundColor = greenColor;
      alertTextContent.textContent = "Remainder removed";
    }
  }
});

console.log(CategoryZone.hasChildNodes());
addButton.addEventListener("click", () => {
  if (selectCategories.selectedIndex == -1) {
    showAlert();
  }
  if (inputHeader.value.trim() === "" && CategoryZone.hasChildNodes()) {
    while (true) {
      inputHeader.style.borderColor = redColor;
      showAlert();
      alertBar.style.backgroundColor = redColor;
      alertTextContent.textContent = "create a catagory first";
      setTimeout(() => {
        inputHeader.style.borderColor = "";
      }, 5000);
      break;
    }
    return;
  }
  else if(inputHeader.value.trim() === "" && CategoryZone.hasChildNodes()){
    while (true) {
      inputHeader.style.borderColor = redColor;
      showAlert();
      alertBar.style.backgroundColor = redColor;
      alertTextContent.textContent = "give a remainder heading";
      setTimeout(() => {
        inputHeader.style.borderColor = "";
      }, 5000);
      break;
    }
    return;
  }
  
  
  else {
    inputHeader.style.borderColor = "";
  }
  const parentDiv = document.createElement("div");
  parentDiv.classList.add("reminder-container");

  const remainderContainer = `
    <div class="remainder-details">
      <div class="container-heading">
        <p>${whatsNew.value}</p>
      </div>
      <div class="container-subHeading">
        <p><span>${whatsAbout.value}</span></p>
      </div>
      <div class="container-remimdTime">
        <p>Reminds <span>on</span></p>
        <p>
          <span>23 FEB,2024</span>
          <span>23:45</span>
        </p>
        
      </div>
    </div>
    <div class="container-deleteUpdate">
      <img src="./assets/delete.png" alt="">
    </div>`;

  whatsNew.value = "";
  whatsAbout.value = "";
  parentDiv.innerHTML = remainderContainer;
  const remainderDataField = document.querySelectorAll(
    ".all-learning-containers"
  );
  remainderDataField.forEach((container) => {
    if (container.classList.contains(selectCategories.value)) {
      container.appendChild(parentDiv);
      showAlert();
      alertBar.style.backgroundColor = greenColor;
      alertTextContent.textContent = "Remainder created";
    }
  });
});

// Showing the container as per category
CategoryZone.addEventListener("click", (e) => {
  const clickedCategoryButton = e.target.closest(".catagory-button");

  if (clickedCategoryButton) {
    const categoryClassName = clickedCategoryButton.textContent;

    // Iterate through reminder containers
    const reminderContainers = reminderContainerZone.querySelectorAll(
      ".all-learning-containers"
    );
    reminderContainers.forEach((container) => {
      if (container.classList.contains(categoryClassName)) {
        container.classList.add("visible");
      } else {
        container.classList.remove("visible");
      }
    });
  }
});

// Custom function to check if an element contains specific text
function containsText(element, text) {
  return element.innerText.includes(text);
}

// Showing Alert massege
// create a function for displaying the alert
const alertBar = document.querySelector(".alert");
const showAlert = () => {
  alertBar.classList.remove("hide");
  alertBar.classList.add("show");
  setTimeout(() => {
    alertBar.classList.remove("show");
    alertBar.classList.add("hide");
  }, 3000);
};
// add feature to the close button
const alertClosebtn = document.querySelector(".alert>span:nth-child(3)");
alertClosebtn.addEventListener("click", () => {
  alertBar.classList.remove("show");
  alertBar.classList.add("hide");
});





// Function to schedule a push notification
function schedulePushNotification(title, options) {
  if ("Notification" in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        const notification = new Notification(title, options);
        // You can customize the notification further if needed
      }
    });
  }
}

// Modify the addButton click event to schedule push notification
addButton.addEventListener("click", () => {
  const reminderDataField = document.querySelectorAll(
    ".all-learning-containers"
  );
  reminderDataField.forEach((container) => {
    if (container.classList.contains(selectCategories.value)) {
      // Schedule push notification
      const reminderTime = document.getElementById("custom-time").value;
      const reminderDate = document.getElementById("custom-date").value;

      if (reminderTime && reminderDate) {
        const notificationTitle = whatsNew.value;
        const notificationOptions = {
          body: whatsAbout.value,
          
        };

        const notificationDateTime = new Date(
          `${reminderDate}T${reminderTime}`
        );
        const currentTime = new Date();

        // Check if the scheduled time is in the future
        if (notificationDateTime > currentTime) {
          const timeDifference = notificationDateTime - currentTime;
          setTimeout(() => {
            schedulePushNotification(notificationTitle, notificationOptions);
          }, timeDifference);
        }
      }
    }
  });
});

