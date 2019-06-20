/* jshint esversion: 6 */

class Simon {
  constructor() {
    this.selectDifficulty = this.selectDifficulty.bind(this);
    this.addEventListeners();
  }

  addEventListeners() {
    $(".difficultybtn").on("click", (event) => { this.handleClick(event); });
  }

  handleClick(event) {
    let difficulty = event.target.id;
    $("#" + difficulty).addClass("pressed");
    let gameOverSound = new Audio("sounds/start.mp3");
    gameOverSound.play();
    setTimeout(this.selectDifficulty, 200, difficulty);
  }

  selectDifficulty(difficulty) {
    $("#" + difficulty).removeClass("pressed");
    if(difficulty === "easy") {
      this.startGame();
      let newGame = new Easy();
    } else if (difficulty === "hard") {
      this.startGame();
      let newGame = new Hard();
    }
  }

  startGame() {
    $(".gameContainer").removeClass("hidden");
    $("#simon").addClass("slideUp");
    //setTimeout(() => { $(".mainTitleContainter").addClass("hidden"); }, 1990);
  }
}

class Easy {
  constructor() {
      this.buttonColors = ["red", "blue", "green", "yellow"];
      this.gamePattern = [];
      this.userClickedPattern = [];
      this.gameStarted = false;
      this.level = 0;
      this.indexOfPattern = 0;

      this.nextSequence = this.nextSequence.bind(this);
      this.flashButton = this.flashButton.bind(this);
      this.playSound = this.playSound.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.gameOver = this.gameOver.bind(this);

      this.addEventListeners();
    }

    addEventListeners() {
      $(".btn").on("click", (event) => { this.handleClick(event); });
      $(document).on("keydown", () => { if(!this.gameStarted) {
        this.nextSequence();
        this.gameStarted = true;
      }});
    }

    nextSequence() {
      //reset index and user pattern
      this.indexOfPattern = 0;
      this.userClickedPattern = [];

      //increase level
      this.level++;
      $("#level-title").text("Level " + this.level);

      //select new color
      let nextSquare = Math.floor(Math.random() * 4);
      let randomChosenColor = this.buttonColors[nextSquare];
      this.gamePattern.push(randomChosenColor);

      //loop through the game patten showing each color
      for (let i = 0, time = 200; i < this.gamePattern.length; i++, time += 500) {
        setTimeout((i) => {
          this.flashButton(this.gamePattern[i]);
          this.playSound(this.gamePattern[i]);
        }, time, i);
      }
    }

    flashButton(colorName) {
      $("#" + colorName).addClass("pressed");
      setTimeout(() => { $("#" + colorName).removeClass("pressed");}, 100, colorName);
    }

    playSound(colorName) {
      let buttonSound = new Audio("sounds/" + colorName + ".mp3");
      buttonSound.play();
    }

    handleClick(event) {
      let userChosenColor = event.target.id;
      this.userClickedPattern.push(userChosenColor);

      if(this.userClickedPattern[this.indexOfPattern] === this.gamePattern[this.indexOfPattern]) {
        this.playSound(userChosenColor);
        this.flashButton(userChosenColor);
        if(this.gamePattern.length - 1 === this.indexOfPattern)
          setTimeout(this.nextSequence, 500);
        this.indexOfPattern++;
      } else {
        this.gameOver();
      }
    }

    gameOver() {
      let gameOverSound = new Audio("sounds/wrong.mp3");
      gameOverSound.play();
      $("body").addClass("game-over");
      setTimeout(() => {$("body").removeClass("game-over"); }, 200);
      $("#level-title").text("Game Over! Press Any Key to Restart.");
      this.gamePattern = [];
      this.level = 0;
      this.gameStarted = false;
    }
}

class Hard {
  constructor() {
      this.buttonColors = ["red", "blue", "green", "yellow"];
      this.gamePattern = [];
      this.userClickedPattern = [];
      this.gameStarted = false;
      this.level = 0;
      this.indexOfPattern = 0;

      this.nextSequence = this.nextSequence.bind(this);
      this.flashButton = this.flashButton.bind(this);
      this.playSound = this.playSound.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.gameOver = this.gameOver.bind(this);

      this.addEventListeners();
    }

    addEventListeners() {
      $(".btn").on("click", (event) => { this.handleClick(event); });
      $(document).on("keydown", () => { if(!this.gameStarted) {
        this.nextSequence();
        this.gameStarted = true;
      }});
    }

    nextSequence() {
      //reset index and user pattern
      this.indexOfPattern = 0;
      this.userClickedPattern = [];

      //increase level
      this.level++;
      $("#level-title").text("Level " + this.level);

      //select new color
      let nextSquare = Math.floor(Math.random() * 4);
      let randomChosenColor = this.buttonColors[nextSquare];
      this.gamePattern.push(randomChosenColor);
      this.flashButton(randomChosenColor);
      this.playSound(randomChosenColor);
    }

    flashButton(colorName) {
      $("#" + colorName).addClass("pressed");
      setTimeout(() => { $("#" + colorName).removeClass("pressed");}, 100, colorName);
    }

    playSound(colorName) {
      let buttonSound = new Audio("sounds/" + colorName + ".mp3");
      buttonSound.play();
    }

    handleClick(event) {
      let userChosenColor = event.target.id;
      this.userClickedPattern.push(userChosenColor);

      if(this.userClickedPattern[this.indexOfPattern] === this.gamePattern[this.indexOfPattern]) {
        this.playSound(userChosenColor);
        this.flashButton(userChosenColor);
        if(this.gamePattern.length - 1 === this.indexOfPattern)
          setTimeout(this.nextSequence, 500);
        this.indexOfPattern++;
      } else {
        this.gameOver();
      }
    }

    gameOver() {
      let gameOverSound = new Audio("sounds/wrong.mp3");
      gameOverSound.play();
      $("body").addClass("game-over");
      setTimeout(() => {$("body").removeClass("game-over"); }, 200);
      $("#level-title").text("Game Over! Press Any Key to Restart.");
      this.gamePattern = [];
      this.level = 0;
      this.gameStarted = false;
    }
}

let simonGame;
window.onload = () => { simonGame = new Simon(); };
