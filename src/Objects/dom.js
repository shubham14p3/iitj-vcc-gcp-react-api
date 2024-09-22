import API from './api';

const Dom = (() => {
  function createForm() {
    const div = document.createElement('div');
    div.setAttribute('id', 'div');
    div.innerHTML = "<input type='search' id='input' placeholder='Write your name!' aria-label='Search' required/><br/><button type='submit' id='button'> Submit Score</button>";
    return div;
  }

  function addButtonFunctionality(score) {
    const button = document.getElementById('button');
    const input = document.getElementById('input');
    const div = document.getElementById('div');
    button.onclick = () => {
      if (input.value !== '') {
        div.classList.add('empty');
        div.innerHTML = '<p>Please wait... </p>';
        API.postScores(input.value, score).then((response) => {
          if (response.success) {
            // Update the UI with success message
            div.innerHTML = `<p>Score successfully submitted!</p>`;
          } else if (response.error) {
            // Display error message if something went wrong
            div.innerHTML = `<p>Error: ${response.error}</p>`;
          }
        }).catch((error) => {
          div.innerHTML = `<p>An error occurred: ${error.message}</p>`;
        });
      } else if (document.getElementsByTagName('p').length === 0) {
        const p = document.createElement('p');
        p.innerHTML = 'Name cannot be blank';
        div.appendChild(p);
      }
    };
  }

  function createStory() {
    const div = document.createElement('div');
    div.classList.add('story');
    div.innerHTML = "<p>The most famous fight in <strong>Dragon Ball</strong> history took place on the planet Namek.<br> Namek is a place between Earth’s adopted Saiyan Goku and the intergalactic criminal tyrant, Frieza. <br>Goku was heading towards defeat until the death of his best friend, Krillin, sparked the red-haired Super Saiyan transformation that would give him the power to win the battle and escape the exploding planet.</br></br></br><strong><b><i><u>HOW TO PLAY:</strong></b></i></u><br><strong>Use a/w/d/s to move, 'j' to launch Goku Destructo Disk, and <br> 'i' to call Picolo for aid against Beerus (God of Destruction).<br><br><strong><b><i><u>NOTE:</strong></b></i></u></br>Destructo Disk won't work on Beerus and the Picolo will have no effect on Frieza.</strong></p>";
    return div;
  }

  return { createForm, addButtonFunctionality, createStory };
})();

export default Dom;
