#!/usr/bin/env node
const fs = require('fs');
const lib = require('./lib');

const makeDir = () => new Promise((resolve, reject) => {
  resolve(lib.makeWebDir(err => {
    console.log(err);
  }));
});

makeDir()
  .then(() => {
    lib.create("index.html",
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
  <script src="main.js"></script>
</body>
</html>`, (err) => {
      console.log(err);
    });
    lib.create("styles.css",
`body, html {
  padding: 0;
  margin: 0;
}`, (err) => {
      console.log(err);
    });
    lib.create('main.js', "", (err) => {
      console.log(err);
    });
  });