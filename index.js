//here youre creating a web server
require('dotenv').config();
const getDB = require('./getDB');
const express = require('express');
const app = express();
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();
const msg = "Happy birthday!";
const country_code = '1';
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))



app.use(express.json())

const contacts = require('./models/contacts');

const contactsRouter = require('./routes/contact')
app.use('/contact', contactsRouter)

app.listen(3000, () => console.log('Server Started'))

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

// client.on('ready', () => {
//     console.log('Client is ready!');
// });

client.initialize();

getDB.catch(console.error).then(val => {
    client.on('ready', () => {
    console.log("Client is ready!");
val.forEach(contact => {
    console.log(contact.name + contact.phone);
    const chatId = country_code + contact.phone + "@c.us";
    client.sendMessage(chatId, msg + contact.name);
    });
 });
});
// module.exports = client;