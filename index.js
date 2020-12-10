const express = require('express');
const app = express();
const { exec } = require('child_process');


app.get('/', (req, res) => {
    res.send('Index! Please hit /test/byos and test/default to test the execute child process function on default volumen and BYOS');
});

app.get('/test/default', (req, res) => {
    exec('cd /usr/src/app && mkdir index', (error, stdout, stderr) => {
        if(error){
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
    res.send('Result: Done executing! Check logs for result.');
});

app.get('/test/byos', (req, res) => {
    exec('cd /usr/src/app/byos && touch test.txt', (error, stdout, stderr) => {
        if(error){
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
    res.send('Result: Done executing! Check logs for result.');
});

app.listen(process.env.PORT || 5000, () => console.log('App is up and running!'));