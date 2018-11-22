// add an event listener to the form to submit Dave's message
const chatForm = document.querySelector('#chatForm');
const chatInput = chatForm.querySelector('#chatInput');
const davePane = chatForm.querySelector('#dave');
const halPane = chatForm.querySelector('#hal');

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = chatInput.value;
  davePane.innerHTML += `<p>${input}</p>`;
  halResponds(input);
});

// create a function for HAL to respond to Dave's messages with variable logic based upon
// Dave's inputs
const halResponds = (input) => {
  const sanitizedInput = input.toLowerCase();
  if (sanitizedInput.indexOf('hi') > -1 || sanitizedInput.indexOf('hello') > -1) {
    halPane.innerHTML += `<p>How are you today, Dave?</p>`;
  } else if (sanitizedInput.indexOf('not dave')) {
    halPane.innerHTML += `<p>Oh, you're not Dave?</p>`;
  }
};

// create a function for HAL to open the chat with "Good morning, Dave"
function beginConversation() {
  halPane.innerHTML = `<p>Good Morning, Dave.</p>`
};

// invoke the opening message 
beginConversation();
