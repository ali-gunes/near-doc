import { RNG, context, u128, PersistentUnorderedMap, Context, logging, storage } from 'near-sdk-as';


// Game States
export enum State {
    Created,
    InProgress,
    Completed
  }

@nearBindgen
export class Game {
    id: string;
    state: State;
    player1: string;
    player1Health: i16;
    player1Race: string;
    poneOverall: u16;
    player1Atk: u16;
    player1Dfs: u16;
    player2: string;
    player2Health: i16;
    player2Race: string;
    ptwoOverall: u16;
    player2Atk: u16;
    player2Dfs: u16;
    nextPlayer: string;
    roundsPlayed: u8;
    totalAmount: u128;
    creationAmount: u128;
  
    constructor() {
      this.id = context.blockIndex.toString().slice(2, 8);
    
      this.player1Health = 100 
      this.player2Health = 100 

      this.player1Race = readValue("Player1")
      this.player2Race = readValue("Player2")

      this.poneOverall = playerAtr("1")
      this.ptwoOverall = playerAtr("2")


      if (readValue("Player1") == "Knight"){
        this.player1Atk = (playerAtr("1") / 10) * 4 
        this.player1Dfs = (playerAtr("1") / 10) * 6 
      }
      else if (readValue("Player1") == "Rogue"){
        this.player1Atk = (playerAtr("1") / 10) * 6 
        this.player1Dfs = (playerAtr("1") / 10) * 4
      }
      else if (readValue("Player1") == "Wizard"){
        this.player1Atk = (playerAtr("1") / 10) * 7 
        this.player1Dfs = (playerAtr("1") / 10) * 3 
      }
      else(
        logging.log("ERROR!")
      )
    
      if (readValue("Player2") == "Knight"){
        this.player2Atk = (playerAtr("2") / 10) * 4 
        this.player2Dfs = (playerAtr("2") / 10) * 6 
      }
      else if (readValue("Player2") == "Rogue"){
        this.player2Atk = (playerAtr("2") / 10) * 6 
        this.player2Dfs = (playerAtr("2") / 10) * 4 
      }
      else if (readValue("Player2") == "Wizard"){
        this.player2Atk = (playerAtr("2") / 10) * 7
        this.player2Dfs = (playerAtr("2") / 10) * 3 
      }
      else(
        logging.log("ERROR!")
      )
  
      this.state = State.Created;
      this.player1 = context.sender;
      this.nextPlayer = this.player1;
      this.player2 = '';
      this.roundsPlayed = 0;
      this.totalAmount = context.attachedDeposit;
      this.creationAmount = context.attachedDeposit;
    }
  }

// Player's Attributes
function playerAtr(player: string): u16 {
    var atr = new Array<u8>(6);
    var skills:string[]; 
    skills = ["Strength", "Dexterity", "Intelligence", "Wisdom", "Charisma", "Constitution"]
  
    for (let i = 0; i < 6; i++){
      //Creating Random Numbers in u8 form within range 1 - 10 (0 included)
      const randomNumber = new RNG<u8>(1, 10);
      const randomNum = randomNumber.next();
      
      atr[i] = randomNum
      //write(skills[i], atr[i].toString())
      //logging.log(skills[i] + ": " + atr[i].toString())
      
    }
  
    // Find the biggest value in Array
    var maxa = atr.reduce(function(a, b) {
      return Math.max(a, b);
    }, -Infinity);
    
    let maxS = maxa as u8 // Casting from f64 to u8
    
    let sysClass = skills[atr.indexOf(maxS)]
  
    // Wizard: 1 2 4 3 2 2
    // Knight: 4 2 1 2 3 2
    // Rogue: 2 4 1 2 3 2
    if(sysClass == "Intelligence" || sysClass == "Wisdom"){
      let sysRace = "Wizard"
  
      const overallScore = 1 * atr[0] + 2 * atr[1] + 4 * atr[2] + 3 * atr[3] + 2 * atr[4] + 2 * atr[5]
      
      write("Player"+player, sysRace)
      
      return overallScore as u16
    }
    else if (sysClass == "Strength" || sysClass == "Charisma"){
      let sysRace = "Knight"
      
      const overallScore = 4 * atr[0] + 2 * atr[1] + 1 * atr[2] + 2 * atr[3] + 3 * atr[4] + 2 * atr[5]
      
      write("Player"+player, sysRace)
      
      return overallScore as u16
    }
    else if (sysClass == "Dexterity" || sysClass == "Constitution"){
      let sysRace = "Rogue"
      
      const overallScore = 2 * atr[0] + 4 * atr[1] + 1 * atr[2] + 2 * atr[3] + 3 * atr[4] + 2 * atr[5]
      
      write("Player"+player, sysRace)
      
      return overallScore as u16
    }
    else{
        return 1
    }
  }


// private only give Value of the Key
function readValue(key: string): string {
    if (storage.hasKey(key)) {
      return `${storage.getString(key)!}`
    } else {
      return `🚫 Key [ ${key} ] not found in storage. ( ${storageReport()} )`
    }
  }

// private write the given value at the given key to account (contract) storage
function write(key: string, value: string): string {
    storage.set(key, value)
    return `✅ Data saved. ( ${storageReport()} )`
  }
  
// private helper method used by read() and write() above
function storageReport(): string {
    return `storage [ ${Context.storageUsage} bytes ]`
  }

export const games = new PersistentUnorderedMap<string, Game>('g');
