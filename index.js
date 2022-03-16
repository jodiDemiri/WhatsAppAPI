const http = require("http");
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    
});

const PORT = process.env.PORT || 3000 ;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));