(function () {

	var easyQuestions = [{
			question: "HTML stands for?",
			choices: ["High Text Markdown Language", "Hyper Text Markup Language", "Hyper Tabular Markup Language", "None of these"],
			correctAnswer: 1
  }, {
			question: "The common element which describe the web page, is ?",
			choices: ["heading", "paragraph", "list", "All of these"],
			correctAnswer: 3
  }, {
			question: "which of the following tag is used to mark a begining of paragraph ?",
			choices: ["<TD>", "<br>", "<P>", "<TR>"],
			correctAnswer: 2
  }, {
			question: "From which tag descriptive list starts ?",
			choices: ["<LL>", "<DL>", "<DD>", "<DS>"],
			correctAnswer: 1
  }, {
			question: "Correct HTML tag for the largest heading is",
			choices: ["<h1>", "<heading>", "<h6>", "<head>"],
			correctAnswer: 0
  }],

		mediumQuestions = [{
			question: "What is James Bond's secret agent number?",
			choices: ["911", "80", "4", "007"],
			correctAnswer: 3
  }, {
			question: "Which of the following attributes of text box control allow to limit the maximum character?",
			choices: ["maxlength", "size", "len", "all of these"],
			correctAnswer: 0
  }, {
			question: "www is based on which model?",
			choices: ["Local-server", "Client-server", "3-tier", "None of these"],
			correctAnswer: 1
  }, {
			question: "The attribute of <form> tag",
			choices: ["Method", "Action", "Both (a)&(b)", "None of these"],
			correctAnswer: 2
  }, {
			question: "Markup tags tell the web browser",
			choices: ["How to display the page", "How to organise the page", "How to display message box on page", "None of these"],
			correctAnswer: 0
  }],

		hardQuestions = [{
			question: "HTML is a subset of",
			choices: ["SGMT", "SGML", "SGMD", "None of these"],
			correctAnswer: 1
  }, {
			question: "Which of the following is a container?",
			choices: ["<Value>", "<INPUT>", "<BODY>", "<SELECT>"],
			correctAnswer: 3
  }, {
			question: "The attribute, which define the relationship between current document and HREF'ed URL is",
			choices: ["URL", "REV", "REL", "all of these"],
			correctAnswer: 2
  }, {
			question: "<DT> tag is designed to fit a single line of our web page but <DD> tag will accept a",
			choices: ["full paragraph", "line of text", "word", "request"],
			correctAnswer: 0
  }, {
			question: "The tag which allows you to rest other HTML tags within the description is",
			choices: ["<TH>", "<TD>", "<TR>", "<CAPTION>"],
			correctAnswer: 3
  }],

		diff = 0, //difficulty
		right = 0,
		wrong = 0,
		counter = 0, // keep track of which question the user is on
		diffButtons = document.getElementsByClassName("diff"),
		answerButtons = document.getElementsByClassName("answer"),
		resetButton = document.getElementById("reset"),
		start = document.getElementById("start"),
		question = document.getElementById("question"),
		correct = document.getElementById("correct"),
		missed = document.getElementById("missed"),
		check = document.getElementById("submit"),
		next = document.getElementById("next"),
		label = document.getElementsByClassName("guessLabel"),
		guessForm = document.getElementById("guessForm"),
		caution = document.getElementById("caution"),
		gameContainer = document.getElementById("container"), // container for questions and answers
		previous = document.getElementById("previous"), // to set previous score
		directions = document.getElementById('directions'),
		directionList = document.getElementById('directionList'),
		toggleDirections = document.getElementById('toggleDirections'),
		score = document.getElementById('score'),
		answers = [];


	for (var i = 0; i < 4; i++) {
		answerButtons[i].style.visibility = "hidden";
	}

	check.disabled = true;

	right = 0;
	wrong = 0;
	correct.textContent = right;
	missed.textContent = wrong;

	start.addEventListener("click", startQuiz);
	check.addEventListener("click", submitAnswer);
	resetButton.addEventListener("click", resetAll);
	toggleDirections.addEventListener("click", toggleDirect);

	function getDifficulty() { //sets difficulty of questions

		diff = 0;

		if (diffButtons[2].checked === true) {
			diff = 3;
		} else if (diffButtons[1].checked === true) {
			diff = 2;
		} else {
			diff = 1;
		}

	}

	function radioHidden() {

		for (var i = 0; i < 4; i++) {
			answerButtons[i].style.visibility = "hidden";
		}

	}

	function radioVis() {

		for (var i = 0; i < 4; i++) {
			answerButtons[i].style.visibility = "visible";
		}

	}

	function radioGuess() {

		if (diff === 3) {
			question.textContent = hardQuestions[counter]["question"];

			for (var i = 0; i < 4; i++) {
				label[i].textContent = hardQuestions[counter]["choices"][i];
			}

		} else if (diff === 2) {
			question.textContent = mediumQuestions[counter]["question"];

			for (var i = 0; i < 4; i++) {
				label[i].textContent = mediumQuestions[counter]["choices"][i];
			}

		} else {
			diffButtons[0].checked = true;
			question.textContent = easyQuestions[counter]["question"];

			for (var i = 0; i < 4; i++) {
				label[i].textContent = easyQuestions[counter]["choices"][i];
			}

		}

	}

	function hideDirections() {
		directionList.classList.add('hide');
	}
	function showDirections() {
		directionList.classList.remove('hide');
	}

	function toggleDirect() {
		if (directionList.classList.contains('hide')) {
			showDirections();
			toggleDirections.textContent = "Hide Directions";
		} else {
			hideDirections();
			toggleDirections.textContent = "Show Directions";
		}
	}

	function startQuiz() {

		hideDirections();

		start.disabled = true;
		check.disabled = false;

		getDifficulty();
		radioVis();
		radioGuess();

		if (localStorage.score >= 0) {
			var score = localStorage.getItem("score");
			var myDiff = localStorage.getItem("diff");
			previous.textContent = myDiff + " : " + score + " / " + easyQuestions.length; // in case number of questions change
		} else {
			previous.textContent = "No Score Saved";
		}

	}

	function submitAnswer() { //check user answer vs. correct answer

		var wrongGuess = 0;
		var didAnswer = 0; // to check if user chose an answer

		for (var i = 0; i < 4; i++) {
			if (answerButtons[i].checked === true) {
				didAnswer = 1;
				if (diff === 1) {
					if (Number(answerButtons[i].value) === easyQuestions[counter]["correctAnswer"]) {
						right++;
					} else {
						wrongGuess++;
					}
				} else if (diff === 2) {
					if (Number(answerButtons[i].value) === mediumQuestions[counter]["correctAnswer"]) {
						right++;
					} else {
						wrongGuess++;
					}
				} else {
					if (Number(answerButtons[i].value) === hardQuestions[counter]["correctAnswer"]) {
						right++;
					} else {
						wrongGuess++;
					}
				}
			} else {
				continue;
			}

		}

		if (wrongGuess > 0) {
			wrong++;
		}

		// check if answer was submitted
		if (didAnswer === 1) {
			check.disabled = true; // disable when answer is chosen
			guessForm.classList.remove("cautionBorder");
			caution.style.visibility = "hidden";
			correct.textContent = right;
			missed.textContent = wrong;
			nextQuestion();
		} else {
			caution.style.visibility = "visible";
			guessForm.classList.add("cautionBorder");
		}

	}

	function nextQuestion() {

		counter++;

		check.disabled = false;

		for (var i = 0; i < 4; i++) {
			answerButtons[i].checked = false;
		}

		if (counter < easyQuestions.length) {
			radioGuess();
		} else {
			question.textContent = "Congratulations! You have reached the end of the quiz!";
			check.disabled = true;

			for (var i = 0; i < 4; i++) {
				label[i].textContent = ""
			}

			radioHidden();

			if (storageAvailable("localStorage")) {
				localStorage.setItem("score", right);
				if (diff == 1) {
					localStorage.setItem("diff", "Easy");
				} else if (diff == 2) {
					localStorage.setItem("diff", "Medium");
				} else {
					localStorage.setItem("diff", "Hard");
				}
			}
		}

	}

	function resetAll() {

		right = 0;
		wrong = 0;
		diff = 0;
		counter = 0;

		question.textContent = "";
		correct.textContent = right;
		missed.textContent = wrong;
		caution.style.visibility = "hidden";
		guessForm.classList.remove("cautionBorder");

		radioHidden();

		for (var i = 0; i < 4; i++) {
			answerButtons[i].checked = false;
			label[i].textContent = "";
		}

		for (var i = 0; i < 3; i++) {
			diffButtons[i].checked = false;
		}

		start.disabled = false;
		check.disabled = true;

	}

	// check if local storage is available
	function storageAvailable(type) {

		try {
			var storage = window[type];
			var x = "__storage_test__";
			storage.setItem(x, x);
			storage.removeItem(x);
			return true;
		} catch (e) {
			return false;
		}

	}


})();
