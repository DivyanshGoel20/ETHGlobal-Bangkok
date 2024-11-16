import { WebSocket } from "ws";
import { GAME_OVER, INIT_GAME } from "./messages";

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  private moves: string[];
  private startTime: Date;
  private moveCount: number = 0;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.moves = [];
    this.startTime = new Date();
    this.player1.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "white",
        },
      })
    );
    this.player2.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "black",
        },
      })
    );
  }

  makeMove(
    socket: WebSocket,
    move: string
  ) {
    try {
      if(move == "hit"){
        // SEND TRANS FOR HIT
      } else if (move=="stand"){
        // SEND TRANS FOR STAND
      }
    } catch (err) {
      console.error(err);
      return;
    }
    // check if game over or not
    // check game end
    // send uodated boar dot both players
  }
}
