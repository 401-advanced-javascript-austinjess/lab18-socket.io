'use strict';

const fs = require('fs');
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');
const { promisify } = require('util');
const fsReadFile = promisify(fs.readFile);
const fsWriteFile = promisify(fs.writeFile);

const alterFile = async (file) => {
  try {
    let fileData = await fsReadFile(file);
    let text = fileData.toString().toUpperCase();
    await fsWriteFile(file, Buffer.from(text));
    socket.emit('save', `${file} saved`);
  } catch (err) {
    socket.emit('error', `Error in file`);
  }
};

let file = process.argv.slice(2).shift();
alterFile(file);
