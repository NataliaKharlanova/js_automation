// app/index.js
const Converter = require("./converter");
const from = "./from/"; //pathToFolder from
const to = "./to/"; //pathToFolder to

const converter = new Converter();
converter.convertFromTo(from, to);


