import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager";
import { START_GAME } from "./messages";

const wss = new WebSocketServer({ port: 8080 });

const gameManager = new GameManager();

wss.on("connection", function connection(ws) {
  gameManager.addUser(ws);
  ws.on("disconnect", () => gameManager.removeUser(ws));
});

wss.on("message", function startGame(ws, data){
    const message = JSON.parse(data.toString())
    if(message.type === START_GAME){
        gameManager.startGame(ws);
    }
})
