//import library
const request = require('request');
const fs = require('fs');

//get commit message
const jsonObject = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
console.log('---commit message---');
console.log(jsonObject.commits[0].message);
console.log('------');

try {
  //set issueID
  let issueID = null;
  const jsonObjectSplit = jsonObject.commits[0].message.split(' ', 3);
  if (jsonObjectSplit[0].match(process.env.RETAIL)) {
      issueID = jsonObjectSplit[0];
  };
    
  //set commit message
  let commitMessage = null;
  commitMessage = jsonObjectSplit[1];
    
  //set statusId
  let statusID = null;
  const fixMessage = ['#fix', '#fixes', '#fixed'];
  const closeMessage = ['#close', '#closes', '#closed'];

  for (let i = 0; i < fixMessage.length; i++) {
      if (jsonObjectSplit[2].match(fixMessage[i])) {
        statusID = 3;
        break;
      }
  }

  for (let j = 0; j < closeMessage.length; i++) {
      if (jsonObjectSplit[2].match(closeMessage[j])) {
        statusID = 4;
        break;
      }
  }
    
  // if issue id and commit message exist, add comment to backlog task
  if (issueID && commitMessage) {
    const baseUrlComment = 'https://' + process.env.API_HOST + '/api/v2/issues/' + issueID + '/comments?apiKey=' + process.env.API_KEY;
    
    const postDataCommet = {
      'content': commitMessage
    };
    
    const optionsComment = {
      url: baseUrlComment,
      method: 'POST',
      json: postDataCommet
    };
    
    request(
      optionsComment,
      (error, res, body) => {
        if (error) {
          console.error(error)
          return
        }
        console.log(`statusCode: ${res.statusCode}`)
        console.log(body)
      }
    );
  };

  // if issue id and status id exist, update backlog task status
  if (issueID && statusID) {
    const baseUrlStatus = 'https://' + process.env.API_HOST + '/api/v2/issues/' + issueID + '?apiKey=' + process.env.API_KEY;
    
    const postDataStatus = {
      'statusId': statusID
    };
    
    const optionsStatus = {
      url: baseUrlStatus,
      method: 'PATCH',
      json: postDataStatus
    };
    
    request(
      optionsStatus,
      (error, res, body) => {
        if (error) {
          console.error(error)
          return
        }
        console.log(`statusCode: ${res.statusCode}`)
        console.log(body)
      }
    );
  };
} catch (err) {
  console.log(err.name + ': ' + err.message);
};
