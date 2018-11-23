// add an event listener to the form to submit Dave's message
const chatForm = document.querySelector('#chatForm');
const chatInput = chatForm.querySelector('#chatInput');
const chatArea = document.querySelector('.chat-area');
const davePane = chatForm.querySelector('#dave');
const halPane = chatForm.querySelector('#hal');

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = chatInput.value;
  chatInput.value = '';
  if (input.length > 0) {
    chatArea.innerHTML += `<div class="dave"><p>${input}</p></div>`;
    processResponse(input);
  }
});

// create a function for HAL to respond to Dave's messages with variable logic based upon
// Dave's inputs
const processResponse = (input) => {
  const sanitizedInput = input.toLowerCase();
  if (sanitizedInput.indexOf('hi') > -1 || sanitizedInput.indexOf('hello') > -1) {
    halResponds(`How are you today, Dave?`);
  } else if (sanitizedInput.indexOf('not dave') > -1) {
    halResponds(`Oh, you're not Dave? What is your name then?`);
  } else if (sanitizedInput.indexOf('my name is') > -1) {
    const name = input.split('is')[1];
    halResponds(`Oh, nice to meet you, ${name}.`);
  } else if (sanitizedInput.indexOf('not morning') > -1){
    halResponds(`Oh, really? What time is it?`);
  } else {
    halResponds(`What? You're talking nonsense.`);
  }
};

const halResponds = (input) => {
  chatArea.innerHTML +=  `<div class="hal">
                            <p>${input}</p>
                          </div>`;
};

// create a function for HAL to open the chat with "Good morning, Dave"
function beginConversation() {
  halResponds(`Good Morning, Dave.`);
};

// invoke the opening message 
beginConversation();
