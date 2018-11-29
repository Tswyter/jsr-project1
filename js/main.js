// add an event listener to the form to submit Dave's message
const chatForm = document.querySelector('#chatForm');
const chatInput = chatForm.querySelector('#chatInput');
const chatArea = document.querySelector('.chat-area');

const classMates = [
  {
    name: 'Taylor'
  },
  {
    name: 'Courtney'
  },
  {
    name: 'Mikal'
  },
  {
    name: 'Sean'
  },
  {
    name: 'Heather'
  },
  {
    name: 'Dora'
  },
  {
    name: 'Sumit'
  },
  {
    name: 'Luis'
  },
  {
    name: 'Ann'
  }
]

const userData = {
  name: 'dave'
};

let convoLevel = 0;
const xhr = new XMLHttpRequest();

const processResponse = (input) => {
  // Sanitize input to make matching easier. (All data needs to be lowercase then?)
  const sanitizedInput = input.toLowerCase();

  const checkFor = text => sanitizedInput.indexOf(text) > -1;
  if (convoLevel === 0 && checkFor('yes') || checkFor('yep') || checkFor('absolutely') || checkFor('of course') || checkFor('you know it') || checkFor('sure')) {
    botResponds(`Awesome! So, who is your favorite character?`);
    convoLevel++;
  } else if (convoLevel === 1) {
    xhr.open('GET', `https://swapi.co/api/people/`);
    xhr.send();
    xhr.onload = () => {
      if (xhr.status < 300) {
        let data = JSON.parse(xhr.responseText).results;
        const foundChars = data.filter(d => d.name.toLowerCase().indexOf(sanitizedInput) > -1);
        if (foundChars.length > 1) {
          botResponds(`Oh, I found a few characters with that name! Which one did you mean specifically?`);
          const names = foundChars.map(d => d.name);
          presentOptions(names);
        } else if (foundChars.length === 1) {
          botResponds(`Oh, ${foundChars[0].name}! I know them! What can I tell you about them?`);
          userData.favoriteCharacter = foundChars[0];
          presentOptions(['home planet', 'gender', 'hair color', 'height', 'eye color', 'birth year']);
          convoLevel++;
        } else {
          botResponds(`I wasn't able to find a character by the name ${input}. Try a different name.`);
        }
      }
    }
  } else if (convoLevel === 2) {
    const { name, gender, home_planet, hair_color, height, eye_color, birth_year } = userData.favoriteCharacter;
    switch(sanitizedInput) {
      case 'gender':
        botResponds(`${name} is a ${gender}.`);
        break;
      case 'home planet':
        botResponds(`${name} is from ${home_planet}.`)
        break;
      case 'hair color':
        botResponds(`${name} has ${hair_color} hair.`);
        break;
      case 'height':
        botResponds(`${name} is ${height}cm tall.`)
        break;
      case 'eye color':
        botResponds(`${name} has ${eye_color} eyes.`);
        break;
      case 'birth year':
        botResponds(`${name} was born on ${birth_year}`);
        break;
      default:
        botResponds(`Oh, so I guess you want to talk about some other aspect?`);
        break;
    }
    
  } else {
    botResponds(`Aww, really? I guess we won't have much to talk about. I only care about Star Wars.`);
  
  }

  // if (checkFor('hi') || checkFor('hello') || checkFor('good morning') || checkFor('good evening') || checkFor('good day')) {
  //   botResponds(`How are you today, ${userData.name}?`);
  
  // } else if (checkFor(`not ${userData.name}`)) {
  //   botResponds(`Oh, you're not ${userData.name}? What is your name then?`);

  // } else if (checkFor('my name is')) {
  //   userData.name = input.split('is')[1];
  //   botResponds(`Oh, nice to meet you, ${userData.name}.`);
  
  // } else if (checkFor('not morning')) {
  //   botResponds(`Oh, really? What time is it?`);
  
  // } else if (checkFor('What is my name')) {
  //   botResponds(`Your name is ${userData.name}.`);

  // } else if (checkFor('What can you do')) {
  //   botResponds(`I can't do much at the moment. Check back later!`)
  
  // } else {
  //   botResponds(`What? You're talking nonsense.`);
  // }

};

const botResponds = (input) => {
  chatArea.innerHTML +=  `<div class="message bot"><p>${input}</p></div>`;
};

const presentOptions = (options) => {
  const random = `rando${Math.floor(Math.random())}`;
  chatArea.innerHTML += `<div class="optionButtons ${random}">${options.map(button => `<button data-value="${button}">${button}</button>`).join('')}</div>`;
  const optionButtons = document.querySelectorAll(`.${random} button`);
  optionButtons.forEach(button => button.addEventListener('click', e => {
    console.log(e.target.dataset);
    processResponse(e.target.dataset.value);
  }))
};

function beginConversation() {
  botResponds(`Hey ${userData.name}. Want to talk about Star Wars?`);
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // save the input value
    const input = chatInput.value;
    // clear the input value
    chatInput.value = '';
    // apply the input value
    if (input.length > 0) {
      chatArea.innerHTML += `<div class="message user"><p>${input}</p></div>`;
      // process the response
      processResponse(input);
    }
  });
};

// invoke the opening message 
beginConversation();



// star wars bot
  // ask about favorite star wars character
    // look up character. (if multiple results match, ask which one specifically)
    // when found, ask what they want to know about that character (suggest home planet, gender, hair color, height, eye color, birth year)