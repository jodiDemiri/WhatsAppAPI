const http = require("http");
var qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();
const personNumber = 12428025623;
const msg = "Happy birthday!";




client.on('qr', (qr) => {
    console.log('QR RECEIVED', qrcode.generate(qr, { small: true }));
});

client.initialize();

client.on('ready', () => {
    console.log('Client is ready!');
    let chatId = personNumber + "@c.us";
    client.sendMessage(chatId, msg)
    .then(response => {
        if (response.id.fromMe) 
        {
            console.log("Your message was sent");
        }
    })
});