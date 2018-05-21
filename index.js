#!/usr/bin/env node
const fs = require('fs');
const readLine = require('readline');
const lib = require('./lib');

let additions = [
  { name: "jQuery", link: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"},
  { name: "lodash", link: "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.10/lodash.min.js"}
];

let step = 0;

let html = 
`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Page Title</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" type="text/css" media="screen" href="styles.css" />
</head>
<body>
`;

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const getInput = () => {
  rl.question(`Would you like to add ${additions[step].name} to your project? `, (answer) => {
    if (String(answer).toLowerCase().startsWith("ye")) {
      html += `
  <script src="${additions[step].link}"></script>`;
    }
    step++;
    if (step < additions.length) {
      getInput();
    }
    else {
      rl.close();
      html +=   `  
  <script src="main.js"></script>
</body>
</html>`;
      makeWebsite();
    }
  });
};

getInput();

const makeDir = () => new Promise((resolve, reject) => {
  resolve(lib.makeWebDir(err => {
    console.log(err);
  }));
});

const makeWebsite = () => {
  makeDir()
  .then(() => {
    lib.create("index.html", html, (err) => {
      console.log(err);
    });
    lib.create("styles.css",
`body, html {
  padding: 0;
  margin: 0;
}`, (err) => {
      console.log(err);
    });
    lib.create('main.js', ``, (err) => {
      console.log(err);
    });
  });
}