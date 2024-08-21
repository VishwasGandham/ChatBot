const chatInput = document.querySelector(".chat-input textarea");
const sendChatbtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const gradientbutton= document.querySelector(".gradient-button");
const chatbotClosebtn = document.querySelector(".close-btn");

let userMessage;
const inputInitHeight = chatInput.scrollHeight;

const ChatLi = (message, className) => {
    const chLi = document.createElement("li");
    chLi.classList.add("chat", className);
    let ChatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chLi.innerHTML = ChatContent;
    return chLi;
}

const generateResponse = (message) => {
    message = message.toLowerCase();
    if (message === "hello") {
        return "Hi there!";
    } else if (message.includes("how are you")) {
        return "I'm doing well, thank you!";
    } else if (message.includes("what's your name")) {
        return "I'm Jarvis, Your chatbot assistant.";
    } else if (message.includes("date")) {
        // Generate current date in format: date/month/year
        const currentDate = new Date();
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        const date = currentDate.toLocaleDateString('en-GB', options);
        return `Today's date is ${date}`;
    } else if (message.includes("time")) {
        // Generate current time in 12-hour format with am/pm
        const currentDate = new Date();
        const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
        const time = currentDate.toLocaleTimeString('en-US', timeOptions);
        return `The current time is ${time}`;
    } else if (message.includes("good" || "nice")) {
        return "Thank You!";
    } else if (message.includes("thankyou" || "thank you")) {
        return "Your Welcome!";
    } else {
        return "I'm still learning! Could you ask me something else?";
    }
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatbox.appendChild(ChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        const response = generateResponse(userMessage);
        chatbox.appendChild(ChatLi(response, "incoming"));
        chatbox.scrollTo(0, chatbox.scrollHeight);
    }, 600);

    chatInput.value = ""; // Clear input after sending message
    chatInput.style.height = `${inputInitHeight}px`;
}

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    if (chatInput.scrollHeight > inputInitHeight) {
        chatInput.style.height = `${chatInput.scrollHeight}px`;
    }
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    } else if (e.key === "Enter" && e.shiftKey) {
        chatInput.style.height = `${inputInitHeight}px`;
        if (chatInput.scrollHeight > inputInitHeight) {
            chatInput.style.height = `${chatInput.scrollHeight}px`;
        }
    }
});

sendChatbtn.addEventListener("click", handleChat);
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
gradientbutton.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
chatbotClosebtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
