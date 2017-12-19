$(document).ready(function() {



// global variables
let userCorrect = 0;
let userWrong = 0;
let unansweredQuestions = 0;
let questionsLeft = 0;
let timer = 30;
let clock;
let selecterAnswer;
let startScreen;
let gameHTML;


// all trivia questions, answers, and images
let triviaQuestions = ['English is not the only language spoken in the Firefly Verse. Terms from what other language are frequently used?', 'Captain Malcolm Reynolds finds himself "married" to a woman with several aliases. Which name was NOT used by Mals "wife"?', 'A terrible tasting yet popular beverage is widely consumed in the city of Canton on Higgins Moon. What is this drink called?', 'What personal item belonging to Shepherd Book does River Tam attempt to fix?', 'Malcolm Reynolds is sometimes called Captain Tightpants. Which crew member gives Mal this nickname?', 'Mal and Zoe are shown meeting Wash for the first time in the episode "Out of Gas". What was different about Washs appearance in that flashback scene?', ' In War Stories, who was being tortured?', 'What is the cargo the crew are smuggling at the end of Shindig?', 'On what planet was Mal born?', 'What maneuver did the crew come up with to lose the Reavers after dealing with Patience?'];

let triviaOptions = [['Spanish', 'Mandarin', 'Japanese', 'Russian'], ['Yolanda', 'Bridget', 'Lenore', 'Saffron'], ['Canton Tea', 'Mudders Milk', 'Jaynes Java', 'Moon Shine'], ['His Bible', 'His Camera', 'His Identity Card', 'His Journal'], ['Inara', 'Simon', 'Jayne', 'Kaylee'], ['He had a beard', 'He was bald', 'He had a mustache', 'He had black hair'], ['Wash and Zoe', 'Mal and Jayne', 'Mal and Wash', 'Mal and Zoe'], ['Gold', 'Nutrition Bars', 'People', 'Cattle'], ['Shadow', 'Osiris', 'Ariel', 'Persephone'], ['Ivan Thrust', 'Pete Thrust', 'Crazy Pete', 'Crazy Ivan']];

let triviaAnswers = ['Mandarin', 'Lenore', 'Mudders Milk', 'His Journal', 'Kaylee', 'He had a mustache', 'Mal and Wash', 'Cattle', 'Shadow', 'Crazy Ivan'];

let answerImages = ["<img class='center-block img-right' src='assets/images/answer1.png'>", "<img class='center-block img-right' src='assets/images/answer2.jpg'>", "<img class='center-block img-right' src='assets/images/answer3.jpg'>", "<img class='center-block img-right' src='assets/images/answer4.jpg'>", "<img class='center-block img-right' src='assets/images/answer5.jpg'>", "<img class='center-block img-right' src='assets/images/answer6.jpg'>", "<img class='center-block img-right' src='assets/images/answer7.png'>", "<img class='center-block img-right' src='assets/images/answer8.jpg'>", "<img class='center-block img-right' src='assets/images/answer9.jpg'>", "<img class='center-block img-right' src='assets/images/answer10.jpeg'>"]


	

	// starting screen function with button
	function openingScreen() {
		startScreen = '<button id="startButton" type="button" class="btn btn-secondary btn-lg btn-block">Start the Quiz!</button>';
		$('#gameArea').html(startScreen);
	};


	openingScreen();



	// adding questions into the html
	function gameWords() {
		gameHTML = "<p id='time-remaining' class='text-center'>Time Remaining: <span class='timer'>30</span> </p> <p class='text-center'>" + triviaQuestions[questionsLeft] + "</p> <p class='answer'> " + triviaOptions[questionsLeft][0] + "</p><p class='answer'> " + triviaOptions[questionsLeft][1] + "</p> <p class='answer'> " + triviaOptions[questionsLeft][2] + "</p> <p class='answer'> " + triviaOptions[questionsLeft][3] + "</p>";
		$("#gameArea").html(gameHTML);
	};

	
	// setting up the timer for each question
	function questionTimer() {
		clock = setInterval(thirtySeconds, 1000);
		function thirtySeconds() {
			if (timer === 0) {
				clearInterval(clock);
				// add to unanswered questions
			}
			if (timer > 0) {
				timer--;
			}
			$(".timer").html(timer)
		}
	}

	$("#startButton").on("click", function(e) {
		gameWords();
		questionTimer();
	})






























// closing tag for document ready
}); 