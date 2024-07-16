const { app, ipcMain } = require ('electron');
import {BrowserWindow} from 'electron'
import { SerialPort } from 'serialport';
const Readline = require('@serialport/parser-readline')

let mainWindow: BrowserWindow | null = null;
let port: SerialPort;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true, // Percorso al file di preload
            contextIsolation: false, // Raccomandato impostarlo su false per motivi di sicurezza
        }
    });

    mainWindow.loadFile(__dirname + '/index.html'); // Carica il file HTML dell'interfaccia utente

}

app.on('ready', () => {
    createWindow();
});


// Inizializzazione della porta seriale
port = new SerialPort( {
    path:'/dev/ttys005',
    baudRate: 9600
});

const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

port.on('open', () => {
    console.log('Simulatore della porta seriale virtuale avviato.');
});


// Gestione dei comandi inviati dal renderer process tramite IPC
ipcMain.on('send-command', (event, command) => {
    console.log('Comando ricevuto dal frontend:', command);

    const response = `${command}+OK`;
    setTimeout(() => {
        port.write(response + '\n', (err) => {
            if (err) {
                console.error('Errore durante l\'invio della risposta:', err.message);
            } else {
                console.log('Risposta inviata al renderer process:', response);
                event.reply('serial-response',response);
                //console.log('serial.response inviata');
            }
        });
    }, 1000);

});


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
