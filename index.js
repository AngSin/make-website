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
    fs.readFile("./index.html", "utf-8", (err, data) => {
      lib.create("index.html", data, (err) => {
        console.log(err);
      });
    });
    fs.readFile("./styles.css", "utf-8", (err, data) => {
      lib.create("styles.css", data, (err) => {
        console.log(err);
      });
    });
    lib.create('main.js', "", (err) => {
      console.log(err);
    });
  });

