console.log("Hello, World!");
console.log(process.env.GITHUB_EVENT_PATH);

const fs = require('fs');
const jsonObject = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
console.log(jsonObject.commits[0].message);

const https = require('https');
const issueID = 'RETAIL-125'
const baseUrl = 'https://' + process.env.API_HOST + '/api/v2/issues/' + issueID + '/comments?apiKey=' + process.env.API_KEY
console.log(baseUrl);
console.log('----------');

const request = require('request');
const postData = {
    "content": jsonObject.commits[0].message
};
const postDataStr = JSON.stringify(postData);

request.post(
  baseUrl,
  {
    json: postDataStr
  },
  (error, res, body) => {
    if (error) {
      console.error(error)
      return
    }
    console.log(`statusCode: ${res.statusCode}`)
    console.log(body)
  }
);


