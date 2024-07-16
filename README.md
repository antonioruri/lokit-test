# Applicazione di Controllo LED

Questa applicazione, sviluppata con Electron e Node.js, simula il controllo di LED tramite una porta seriale virtuale. Permette agli utenti di cliccare su pulsanti che rappresentano i LED, inviando comandi per accenderli o spegnerli. I comandi vengono inviati tramite IPC (Inter-Process Communication) da un processo renderer a un processo main. Il processo main gestisce la comunicazione con la porta seriale virtuale e invia le risposte al processo renderer.

## Architettura

L'applicazione è composta da due file principali:
1. `index.ts` (processo main)
2. `render.ts` (processo renderer)

### 1. `index.ts` (Processo Main)

Questo file si occupa di creare la finestra dell'applicazione, inizializzare la porta seriale e gestire i comandi inviati dal processo renderer.

#### Funzioni Principali:
- **`createWindow()`**: Crea la finestra principale dell'applicazione.
- **`app.on('ready', createWindow)`**: Avvia la creazione della finestra quando l'applicazione è pronta.
- **Inizializzazione della Porta Seriale**: Configura la porta seriale virtuale e prepara il parser per leggere i dati.
- **`ipcMain.on('send-command')`**: Gestisce i comandi inviati dal processo renderer, simula una risposta dopo un timeout di 1 secondo e invia la risposta al processo renderer.

### 2. `render.ts` (Processo Renderer)

Questo file gestisce l'interfaccia utente e la logica per inviare comandi al processo main tramite IPC.

#### Funzioni Principali:
- **`sendCommand(command: string)`**: Invia un comando al processo main utilizzando `ipcRenderer.send`.
- **`toggleLed(ledNumber: string)`**: Gestisce il clic sui pulsanti LED, invia i comandi appropriati e ascolta le risposte dal processo main.
- **`handleResponse(event: IpcRendererEvent, comando: string)`**: Gestisce le risposte ricevute dal processo main, aggiornando l'interfaccia utente in base allo stato del LED.

## Installazione e Configurazione

### Prerequisiti

Assicurati di avere installato Node.js e npm (Node Package Manager) sul tuo sistema.
 
### Installazione delle Dipendenze

1. **Clona il repository**:
    ```bash
    git clone https://github.com/antonioruri/lokitTest
    cd lokitTest
    ```
 
2. **Installa le dipendenze**:
    ```bash
    npm install
    ```

### Avvio dell'Applicazione

 **Avvia l'applicazione**:
    ```bash
    npm start
    ```



