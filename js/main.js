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
    };
    xhr.onerror = () => {
      console.log('Oops there seems to be an error with the request.');
      botResponds('Oh no... I forgot EVERYTHING about Star Wars. Check back later. Hopefully I will remember by then.');
    };
  } else if (convoLevel === 2) {
    const { name, gender, home_planet, hair_color, height, eye_color, birth_year } = userData.favoriteCharacter;
    switch(sanitizedInput) {
      case 'gender':
        if (gender !== 'undefined') {
          botResponds(`${name} is a ${gender}.`);
        } else {
          botResponds(`I'm not sure what gender ${name} is, unfortunately.`);
        }
        break;
      case 'home planet':
        if (home_planet !== 'undefined' || typeof home_planet !== 'undefined') {
          botResponds(`${name} is from ${home_planet}.`);
        } else {
          botResponds(`Unfortunately, I don't know where ${name} is from.`);
        }
        break;
      case 'hair color':

        if (hair_color !== 'undefined') {
          botResponds(`${name} has ${hair_color} hair.`);
        } else {
          botResponds(`Oh, I'm not sure what ${name}'s hair color is.`);
        }
        break;
      case 'height':
        if (height !== 'undefined') {
          botResponds(`${name} is ${height}cm tall.`);
        } else {
          botResponds(`I don't know how tall ${name} is.`)
        }
        break;
      case 'eye color':
        
        if (eye_color !== 'undefined') {
          botResponds(`${name} has ${eye_color} eyes.`);
        } else {
          botResponds(`You got me. I have no idea what color ${name}'s eyes are!`)
        }
        break;
      case 'birth year':
        if (birth_year !== 'undefined') {
          botResponds(`${name} was born on ${birth_year}`);
        } else {
          botResponds(`I don't know how old ${name} is.`);
        }
        break;
      default:
        botResponds(`Oh, so I guess you want to talk about some other aspect?`);
        break;
    }

    setTimeout(() => {
      botResponds(`What else can I tell you about ${name}?`);
      presentOptions(['home planet', 'gender', 'hair color', 'height', 'eye color', 'birth year']);  
    }, 1000);
    
  } else {
    botResponds(`Aww, really? I guess we won't have much to talk about. I only care about Star Wars.`);
  }
};

const botResponds = (input) => {
  chatArea.innerHTML +=  `<div class="message bot"><p>${input}</p></div>`;
};

const presentOptions = (options) => {
  const random = `rando${Math.floor(Math.random())}`;
  chatArea.innerHTML += `<div class="optionButtons ${random}">${options.map(button => `<button data-value="${button}">${button}</button>`).join('')}</div>`;
  const optionButtons = document.querySelectorAll(`.${random} button`);
  optionButtons.forEach(button => button.addEventListener('click', e => {
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