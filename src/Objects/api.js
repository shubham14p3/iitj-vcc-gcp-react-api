const fs = require('fs');
const path = require('path');

const API = (() => {
  const filePath = path.join(__dirname, 'scores.json');

  function readScores() {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  async function postScores(name, score) {
    try {
      let scores = readScores();
      scores.push({ user: name, score });
      fs.writeFileSync(filePath, JSON.stringify(scores, null, 2));
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }

  async function getScores() {
    try {
      return readScores();
    } catch (error) {
      return { success: false, error };
    }
  }

  return { getScores, postScores };
})();

export default API;
