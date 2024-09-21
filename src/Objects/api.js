const API = (() => {
  async function getScores() {
    try {
      const scores = await fetch('http://35.208.121.32:8080/api/scores', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return scores.json();
    } catch (error) {
      return error.json();
    }
  }

  async function postScores(name, score) {
    try {
      const result = await fetch('http://35.208.121.32:8080/api/scores', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: name,
          score,
        }),
      });
      return result.json();
    } catch (error) {
      return error.json();
    }
  }

  return { getScores, postScores };
})();
export default API;
