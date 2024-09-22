import 'phaser';
import config from '../Config/config';
import API from '../Objects/api';
import Button from '../Objects/Button';

export default class LeaderBoardScene extends Phaser.Scene {
  constructor() {
    super('LeaderBoardScene');
  }

  preload() {
    this.load.image('bg', 'assets/entities/logo-big.png');
  }

  create() {
    this.add.image(config.width / 2, config.height / 2, 'bg').setOrigin(0.5); // Center background image

    API.getScores().then((response) => {
      console.log(response); // Ensure you are getting the correct data
      const sortedResponse = response.sort((a, b) => b.score - a.score); // Sort by score in descending order

      // Create a DOM element for the scrollable area
      const containerDiv = document.createElement('div');
      containerDiv.style.width = '400px';
      containerDiv.style.height = '300px';
      containerDiv.style.overflowY = 'scroll';  // Enable vertical scrolling
      containerDiv.style.border = '1px solid #fff';  // Optional: add border
      containerDiv.style.padding = '10px';
      containerDiv.style.fontSize = '20px';
      containerDiv.style.color = '#fff';
      containerDiv.style.background = 'rgba(0, 0, 0, 0.5)';  // Semi-transparent background
      containerDiv.style.textAlign = 'center';  // Center text inside the div

      let namesToDisplay = '';

      // Ensure we don't access out-of-bounds indices
      for (let i = 0; i < sortedResponse.length; i += 1) {
        namesToDisplay += `${i + 1}. ${sortedResponse[i].user}: ${sortedResponse[i].score}\n`;
      }

      containerDiv.innerHTML = `<pre>${namesToDisplay}</pre>`;  // Use <pre> to preserve newlines and formatting

      // Add the DOM element to Phaser and center it
      const domElement = this.add.dom(config.width / 2, config.height / 2, containerDiv);
      domElement.setOrigin(0.5);  // Center the element horizontally and vertically

      // Add and position the "Top Scores" text
      this.creditsText = this.add.text(config.width / 2, config.height / 2 - 200, 'Top Scores', {
        fontSize: '32px',
        fill: '#fff',
      }).setOrigin(0.5);  // Center the text horizontally
    });

    // Create the back button and position it at the bottom center
    this.titleButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 200,
      'blueButton1',
      'blueButton2',
      'Back',
      'Title',
    );
  }
}
