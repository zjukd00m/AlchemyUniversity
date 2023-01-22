const axios = require('axios');
const niceList = require('../utils/niceList.json');

const serverUrl = 'http://localhost:1225';

async function amIInTheList(name) {
  // Send the request to the server with:
  // - name
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name,
  }, {
    headers: {
      "Content-Type": "application/json"
    }
  });

  return gift;
}

async function main() {
  await Promise.all(niceList
    ?.slice(0, 10)
    ?.map((name) => amIInTheList(name)))
    .then((value) => console.log(value))
}

main();