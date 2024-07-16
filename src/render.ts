import { ipcRenderer } from 'electron';
import IpcRendererEvent = Electron.IpcRendererEvent;

// Funzione per inviare un comando al processo principale
function sendCommand(command: string) {
    const { ipcRenderer } = require ('electron');
    ipcRenderer.send('send-command', command);
}

// Funzione per gestire il clic sui LED
function toggleLed(ledNumber: string) {
    console.log(`Toggle LED ${ledNumber}`);
    const { ipcRenderer } = require ('electron');
    const ledElement = document.getElementById(`led${ledNumber}`);
    if (ledElement) {
        if (ledElement.classList.contains('led-off')) {
           // console.log(`Il LED ${ledNumber} non è acceso, lo accendo.`);
            sendCommand(`LED${ledNumber}1`);

        } else {
            //console.log(`Il LED ${ledNumber} è acceso, lo spengo.`);
            ledElement.classList.remove('led-on');
            sendCommand(`LED${ledNumber}0`);

        }
    }
    ipcRenderer.on('serial-response', handleResponse);

}

function handleResponse(event: IpcRendererEvent, comando:string) {
    const { ipcRenderer } = require ('electron');
    let onoff = comando;
    console.log(comando);
    ipcRenderer.removeListener('serial-response', handleResponse)


    let number = onoff[3];
    //console.log("number:" + number);
    let elem = document.getElementById(`led${number}`);
    if (elem) {
        let secondNumber = onoff[4];
        //console.log("on1off0:" + secondNumber);
        if (secondNumber === '1') {
            elem.classList.remove('led-off');
            elem.classList.add('led-on');
           // console.log("on1=:" + secondNumber);
            elem.style.backgroundColor = 'green';
        } else if (secondNumber === '0') {
            elem.classList.remove('led-on');
            elem.classList.add('led-off');
            //console.log("off0=:" + secondNumber);
            elem.style.backgroundColor = 'red';
        }
    }
};



// Gestisci il clic sui pulsanti per inviare comandi alla porta seriale
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button[data-command]');
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const command = button.getAttribute('data-command');
            if (command) {
                //sendCommand(command);
                toggleLed(command);
            }
        });
    });

});



