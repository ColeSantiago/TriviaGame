$(document).ready(function() {



// global variables
let userCorrect = 0;
let userWrong = 0;
let unansweredQuestions = 0;
let questionsLeft = 0;
let timer = 30;
let clock;


// audio files
let mouseClick = new Audio('assets/audio/click.wav');
mouseClick.volume = 0.2;
let mouseHover = new Audio('assets/audio/hover.mp3');

let warningSound = new Audio('assets/audio/warning.wav')
warningSound.volume = 0.2;


// all trivia questions, answers, and images
let triviaQuestions = ['English is not the only language spoken in the Firefly Verse. Terms from what other language are frequently used?', 
						'Captain Malcolm Reynolds finds himself "married" to a woman with several aliases. Which name was NOT used by Mals "wife"?', 
						'A terrible tasting yet popular beverage is widely consumed in the city of Canton on Higgins Moon. What is this drink called?', 
						'What personal item belonging to Shepherd Book does River Tam attempt to fix?', 
						'Malcolm Reynolds is sometimes called Captain Tightpants. Which crew member gives Mal this nickname?', 
						'Mal and Zoe are shown meeting Wash for the first time in the episode "Out of Gas". What was different about Washs appearance in that flashback scene?', 
						' In War Stories, who was being tortured?', 'What is the cargo the crew are smuggling at the end of Shindig?', 
						'On what planet was Mal born?', 'What maneuver did the crew come up with to lose the Reavers after dealing with Patience?'];

let triviaOptions = [['Spanish', 'Mandarin', 'Japanese', 'Russian'], 
					['Yolanda', 'Bridget', 'Lenore', 'Saffron'], 
					['Canton Tea', 'Mudders Milk', 'Jaynes Java', 'Moon Shine'], 
					['His Bible', 'His Camera', 'His Identity Card', 'His Journal'], 
					['Inara', 'Simon', 'Jayne', 'Kaylee'], 
					['He had a beard', 'He was bald', 'He had a mustache', 'He had black hair'], 
					['Wash and Zoe', 'Mal and Jayne', 'Mal and Wash', 'Mal and Zoe'], 
					['Gold', 'Nutrition Bars', 'People', 'Cattle'], 
					['Shadow', 'Osiris', 'Ariel', 'Persephone'], 
					['Ivan Thrust', 'Pete Thrust', 'Crazy Pete', 'Crazy Ivan']];

let triviaAnswers = ['Mandarin', 'Lenore', 'Mudders Milk', 'His Bible', 'Kaylee', 'He had a mustache', 'Mal and Wash', 'Cattle', 'Shadow', 'Crazy Ivan'];

let answerImages = ["<img src='assets/images/answer1.png'>", 
					"<img src='assets/images/answer2.jpg'>", 
					"<img src='assets/images/answer3.jpg'>", 
					"<img src='assets/images/answer4.jpg'>", 
					"<img src='assets/images/answer5.jpg'>", 
					"<img src='assets/images/answer6.jpg'>", 
					"<img src='assets/images/answer7.png'>", 
					"<img src='assets/images/answer8.jpg'>", 
					"<img src='assets/images/answer9.jpg'>", 
					"<img src='assets/images/answer10.jpeg'>"]


	

	// starting screen function with button
	function openingScreen() {
		let startScreen = "<p id='startButton' style='background-color: orange; padding: 10px;'>Start the Quiz!</p>";
		$('#gameArea').html(startScreen);
	};


	openingScreen();



	// adding questions into the html
	function gameHTML() {
		let gameWords = "<p id='time-remaining'>Time Remaining: <span class='timer'>30</span> </p> <p>" +triviaQuestions[questionsLeft] + "</p> <p class='answer'>" + triviaOptions[questionsLeft][0] + "</p><p class='answer'>" + triviaOptions[questionsLeft][1] + "</p> <p class='answer'>" + triviaOptions[questionsLeft][2] + "</p> <p class='answer'>" + triviaOptions[questionsLeft][3] + "</p>";
		$("#gameArea").html(gameWords);
	};

	
	// setting up the timer for each question. the timer is already 30, if the timer = 0 you're out of time, if it's greater then 0 keep counting down
	function questionTimer() {
		clock = setInterval(thirtySeconds, 1000);
		function thirtySeconds() {
			if (timer === 0) {
				clearInterval(clock);
				outOfTime();
			}
			if (timer > 0) {
				timer--;
			}
			if (timer === 3) {
			warningSound.play();
		}
			$(".timer").html(timer)
		}

		
	};

	
	// click event to start the game

	$("#startButton").on("click", function(e) {
		gameHTML();
		questionTimer();
		mouseClick.play();
	});

	$("#startButton").mouseenter(function() {
		$("#startButton").css("opacity", "0.9");
		$("#startButton").css("cursor", "pointer");
		mouseHover.play();

	})

	$("#startButton").mouseleave(function() {
		$("#startButton").css("opacity", "1");
		$("#startButton").css("cursor", " ");
		
	})


	// functions for when correct, wrong, or unanswered. Inset html, add appropiate numbers, and go to the next question
	function correctAnswer() {
		let gameWords = "<p id='time-remaining'>Time Remaining: <span class='timer'>" + timer + "</span> </p>" + "<p>Correct! The answer is: " + triviaAnswers[questionsLeft] + "</p>" + answerImages[questionsLeft];
		$("#gameArea").html(gameWords);
		userCorrect++;
		setTimeout(nextQuestion, 1000);
	};

	function wrongAnswer() {
		let gameWords = "<p id='time-remaining'>Time Remaining: <span class='timer'>" + timer + "</span> </p>" + "<p>Nope! The answer is: " + triviaAnswers[questionsLeft] + "</p>" + answerImages[questionsLeft];
		$("#gameArea").html(gameWords);
		userWrong++;
		setTimeout(nextQuestion, 1000);
	};

	function outOfTime() {
		let gameWords = "<p id='time-remaining'>Time Remaining: <span class='timer'>" + timer + "</span> </p>" + "<p>Times up! The answer was: " + triviaAnswers[questionsLeft] + "</p>" + answerImages[questionsLeft];
		$("#gameArea").html(gameWords);
		unansweredQuestions++;
		setTimeout(nextQuestion, 1000);
	};

	

	// click events to determine if the answer is correct or not
	$("body").on("click", ".answer", function(e) {
		let selectedAnswer = $(this).text();
		console.log(this);

		if ( selectedAnswer === triviaAnswers[questionsLeft]) {
			correctAnswer();
			clearInterval(clock);
			console.log(triviaAnswers[questionsLeft]);
			console.log("correct!");
			mouseClick.play();
		} else {
			wrongAnswer();
			clearInterval(clock);
			console.log(triviaAnswers[questionsLeft]);
			console.log("nope");
			mouseClick.play();
		}
	});

	$("body").on("mouseenter", ".answer", function() {
		mouseHover.play();

	})


	// if there are less then 10 questions left, go to the next question and reset the timer, else end the game
	function nextQuestion() {
		if (questionsLeft < 9) {
			questionsLeft++;
			gameHTML();
			questionTimer();
			timer = 30;
		} else {
			gameOver();
		}
	};




	// game over function
	function gameOver() {

		if (userCorrect >= 6) {
			let gameWords = "<p id='time-remaining'>Time Remaining: <span class='timer'>" + timer + "</span></p>" + "<p class='game-over'>Game Over! No power in the Verse can stop you! Your results: " + "</p>" + "<p class='correct'>Correct Answers: " + userCorrect + "</p>" + "<p class='wrong'>Wrong Answers: " + userWrong + "</p>" + "<p class='unanswered'>Unanswered: " + unansweredQuestions + "<img src='assets/images/win.gif'>" + "</p>" + "<p id='resetButton'>Take the quiz again!</p>";
			$("#gameArea").html(gameWords);
		}

		else {
			let gameWords = "<p id='time-remaining'>Time Remaining: <span class='timer'>" + timer + "</span></p>" + "<p class='game-over'>Game Over! Curse your sudden but inevitable betrayal! Your results: " + "</p>" + "<p class='correct'>Correct Answers: " + userCorrect + "</p>" + "<p class='wrong'>Wrong Answers: " + userWrong + "</p>" + "<p class='unanswered'>Unanswered: " + unansweredQuestions + "<img src='assets/images/lose.gif'>" + "</p>" + "<p id='resetButton'>Take the quiz again!</p>";
			$("#gameArea").html(gameWords);

		}
	};


	

	// reset function for the button with the click event
	function reset() {
		userCorrect = 0;
		userWrong = 0;
		unansweredQuestions = 0;
		questionsLeft = 0;
		timer = 30;
		gameHTML();
		questionTimer();
	};

	$('body').on("click", "#resetButton", function(e) {
		reset();
		mouseClick.play();
	});

	$("body").on("mouseenter", "#resetButton", function() {
		$("#resetButton").css("opacity", "0.9");
		$("#resetButton").css("cursor", "pointer");
		mouseHover.play();

	})

	$("body").on("mouseleave", "#resetButton", function() {
		$("#resetButton").css("opacity", "1");
		$("#resetButton").css("cursor", " ");
		
	})



	



// closing tag for document ready
}); 
