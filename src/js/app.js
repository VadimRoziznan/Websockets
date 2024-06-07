const formContainer = document.querySelector(".form-container");
const userNameForm = formContainer.querySelector(".authentication-form");
const chatContainer = document.querySelector(".chat-container");
const chatSend = document.querySelector(".chat-send");
const chatMessage = document.querySelector(".chat-message");

const chatField = document.querySelector(".chat-field ");
const usersOnlineBlock = document.querySelector(".users-online-container");
const date = new Date();

let userName;
let usersOnline;

class SubscriptionApi {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async add(user) {
    const request = fetch(this.apiUrl + "users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const result = await request;
    /*const json = await result.json();*/

    const status = result.status;

    console.log(status);
    if (status !== 200) {
      alert("Такой псевдоним уже существует! Придумайте другой!");
    } else {
      formContainer.style.display = "none";
      chatContainer.style.display = "flex";

      const spanElements = usersOnlineBlock.querySelectorAll('span');

      spanElements.forEach((span) => {
        span.remove();
      });
      
      let index = usersOnline.indexOf(userName);
      if (index > -1) {
        usersOnline.splice(index, 1);  // Удаляем элемент из текущей позиции
        usersOnline.unshift(userName); // Добавляем его в начало
      }

      usersOnline.forEach((userNameOnLine) => {
        const userBlock = document.createElement("span");
        userBlock.classList.add("user-block");
        if (userNameOnLine === userName) {
          userNameOnLine = "You";
          userBlock.style.color = "Red";
        }
        userBlock.textContent = userNameOnLine;
        usersOnlineBlock.appendChild(userBlock);
      });
    }
  }
}

const api = new SubscriptionApi("http://localhost:7070/");

userNameForm.addEventListener("submit", (event) => {
  event.preventDefault();

  userName = event.target.name.value;
  api.add({ name: userName });
});






const ws = new WebSocket("ws://localhost:3000/ws"); // Подключаемся к серверу WebSocket

const chatMessageInput = document.querySelector('.chat-message');
const chatSendButton = document.querySelector('.chat-send');
const chatDiv = document.querySelector('.chat');

// Отправка сообщения по нажатию кнопки
/*chatSendButton.addEventListener('click', () => {*/
chatMessage.addEventListener('keyup', (event) => {

  if (event.key === 'Enter') {
    const dateString = date.toLocaleString(); // 2023-02-20 14:30:00
    const data = { name: userName, message: chatMessageInput.value };
    const message = JSON.stringify(data);
    ws.send(message); // Отправляем сообщение на сервер

    const messageElement = document.createElement('div');
    messageElement.classList.add("message-element");

    const messageText = document.createElement('span');
    const dateBlock = document.createElement("span");

    


    messageText.classList.add("message-text");
    dateBlock.classList.add("date-block");

    messageText.textContent = chatMessageInput.value;
    dateBlock.textContent = "You " + dateString;

    messageElement.appendChild(dateBlock);
    messageElement.appendChild(messageText);

    chatDiv.appendChild(messageElement);

    chatMessageInput.value = ""; // Очищаем поле ввода
  }
});

// Получение сообщений от сервера
ws.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  if (data.users) {
    console.log('Received users list:', data.users);

    usersOnline = data.users;
    const spanElements = usersOnlineBlock.querySelectorAll('span');

    spanElements.forEach((span) => {
      span.remove();
    });

    let index = usersOnline.indexOf(userName);
    if (index > -1) {
      usersOnline.splice(index, 1);  // Удаляем элемент из текущей позиции
      usersOnline.unshift(userName); // Добавляем его в начало
    }

    usersOnline.forEach((userNameOnLine) => {
      const userBlock = document.createElement("span");
      userBlock.classList.add("user-block");
      if (userNameOnLine === userName) {
        userNameOnLine = "You";
        userBlock.style.color = "Red";
      }
      userBlock.textContent = userNameOnLine;
      usersOnlineBlock.appendChild(userBlock);
    });
  } else {
    const { name, message } = data; // Парсим JSON-строку в объект
    const dateString = date.toLocaleString(); // 2023-02-20 14:30:00

    const messageElement = document.createElement('div');
    messageElement.classList.add("message-element-server");

    const messageText = document.createElement('span');
    const dateBlock = document.createElement("span");

    messageText.classList.add("message-text-server");
    dateBlock.classList.add("date-block-server");

    messageText.textContent = message;
    dateBlock.textContent = name + ", " + dateString;

    messageElement.appendChild(dateBlock);
    messageElement.appendChild(messageText);

    chatDiv.appendChild(messageElement);
  }
});



