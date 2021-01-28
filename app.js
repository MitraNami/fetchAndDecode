/*
// Using promises

function fetchAndDecode(url, type) {
  let content;
  // Returning the top level promise, so the result of the entire chain is returned out of the function
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (type === 'blob') {
        content = response.blob(); //content is a pending promise
      } else if (type === 'text') {
        content = response.text(); //content is a pending promise
      }
      return content; 
    }); // a promise resolved with content
}


 // Call the fetchAndDecode() method to fetch the images and the text, and store their promises in variables
const tea = fetchAndDecode('./images/tea.jpg', 'blob');
const coffee = fetchAndDecode('./images/coffee.jpg', 'blob');
const test = fetchAndDecode('./test.txt', 'text');


// Use Promise.all() to run code only when all three function calls have resolved
Promise.all([tea, coffee, test])
  .then(data => {
    const [teaBlob, coffeeBlob, testText] = data;

    const objectURLTea = URL.createObjectURL(teaBlob);
    const teaPic = document.createElement('img');
    teaPic.src = objectURLTea;
    document.body.appendChild(teaPic);

    const objectURLCoffee = URL.createObjectURL(coffeeBlob);
    const coffeePic = document.createElement('img');
    coffeePic.src = objectURLCoffee;
    document.body.appendChild(coffeePic);

    const par = document.createElement('p');
    par.textContent = testText;
    document.body.appendChild(par);

  })
  .catch(e => console.log(e));


*/



// Using async/await which returns a promise resolved with content
// exactly like when we used promises

async function fetchAndDecode(url, type) {

  let content;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  if (type === 'blob') {
    content = await response.blob(); // contecnt is the blob
  } else if (type === 'text') {
    content = await response.text(); // content is the text
  }
  return content; //since the function has an async keyword on it, it will return a promise which is resolved with content 
  
}

// it's similar to what we did with then but since we want to use await for Promise.all we need to put the code block in an async function
async function displayContent () {

  const tea = fetchAndDecode('./images/tea.jpg', 'blob');
  const coffee = fetchAndDecode('./images/coffee.jpg', 'blob');
  const test = fetchAndDecode('./test.txt', 'text');

  const [teaBlob, coffeeBlob, testText] =
    await Promise.all([tea, coffee, test]);

    const objectURLTea = URL.createObjectURL(teaBlob);
    const teaPic = document.createElement('img');
    teaPic.src = objectURLTea;
    document.body.appendChild(teaPic);

    const objectURLCoffee = URL.createObjectURL(coffeeBlob);
    const coffeePic = document.createElement('img');
    coffeePic.src = objectURLCoffee;
    document.body.appendChild(coffeePic);

    const par = document.createElement('p');
    par.textContent = testText;
    document.body.appendChild(par);

}

displayContent()
  .catch(e => console.log(e))


