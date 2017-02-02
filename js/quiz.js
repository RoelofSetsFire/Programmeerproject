/* by Roelof Konijnenberg
 ** Script for the quiz of the "Programmeerproject"
 */
var quiztitle = "(Pseu)do you know....";
var quiz = [{
	"question": "Q1:...what the ailments are chiropractors claim they can help with?",
	"choices": ["Back problems", "Headaches and migraines originating from the neck", "ADHD and Autism", "All of the above"],
	"correct": "All of the above",
	"explanation": "All of the above. Despite it only having been proven to work for back problems, a lot of chiropractors market themselves as primary care healers who can give aid for an amazing variety of disorders.",
}, {
	"question": "Q2: ...what the chance is of you getting the same personality type when doing the Myers-Briggs test twice, mere days apart?",
	"choices": ["80%", "70%", "50%", "30%", "20%"],
	"correct": "50%",
	"explanation": "50%. The Myers-Briggs test, used by some companies to evaluate a candidates suitability for a job, can have wildly varying results even when taken at relatively close intervals.",
}, {
	"question": "Q3: ...how much is annually spent on psychics in the US?",
	"choices": ["2 billion dollars", "1 billion dollars", "800 million dollars", "500 million dollars", "50 million dollars"],
	"correct": "2 billion dollars",
	"explanation": "2 billion dollars......I don't even know what to say about this one.",
}];
var currentquestion = 0,
	score = 0,
	submt = true,
	picked;
jQuery(document)
	.ready(function($) {
		function htmlEncode(value) {
			return $(document.createElement('div'))
				.text(value)
				.html();
		}

		function addChoices(choices) {
			if (typeof choices !== "undefined" && $.type(choices) == "array") {
				$('#choice-block')
					.empty();
				for (var i = 0; i < choices.length; i++) {
					$(document.createElement('li'))
						.addClass('choice choice-box')
						.attr('data-index', i)
						.text(choices[i])
						.appendTo('#choice-block');
				}
			}
		}

		function nextQuestion() {
			submt = true;
			$('#explanation')
				.empty();
			$('#question')
				.text(quiz[currentquestion]['question']);
			$('#pager')
				.text('Question ' + Number(currentquestion + 1) + ' of ' + quiz.length);
			addChoices(quiz[currentquestion]['choices']);
			setupButtons();
		}

		function processQuestion(choice) {
			if (quiz[currentquestion]['choices'][choice] == quiz[currentquestion]['correct']) {
				$('.choice')
					.eq(choice)
					.css({
						'background-color': '#50D943'
					});
				$('#explanation')
					.html('<strong>Correct!</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
				score++;
			} else {
				$('.choice')
					.eq(choice)
					.css({
						'background-color': '#D92623'
					});
				$('#explanation')
					.html('<strong>Incorrect.</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
			}
			currentquestion++;
			$('#submitbutton')
				.html('NEXT QUESTION &raquo;')
				.on('click', function() {
					if (currentquestion == quiz.length) {
						endQuiz();
					} else {
						$(this)
							.text('Check Answer')
							.css({
								'color': '#222'
							})
							.off('click');
						nextQuestion();
					}
				})
		}

		function setupButtons() {
			$('.choice')
				.on('mouseover', function() {
					$(this)
						.css({
							'background-color': '#e1e1e1'
						});
				});
			$('.choice')
				.on('mouseout', function() {
					$(this)
						.css({
							'background-color': '#fff'
						});
				})
			$('.choice')
				.on('click', function() {
					picked = $(this)
						.attr('data-index');
					$('.choice')
						.removeAttr('style')
						.off('mouseout mouseover');
					$(this)
						.css({
							'border-color': '#222',
							'font-weight': 700,
							'background-color': '#c1c1c1'
						});
					if (submt) {
						submt = false;
						$('#submitbutton')
							.css({
								'color': '#000'
							})
							.on('click', function() {
								$('.choice')
									.off('click');
								$(this)
									.off('click');
								processQuestion(picked);
							});
					}
				})
		}

		function endQuiz() {
			$('#explanation')
				.empty();
			$('#question')
				.empty();
			$('#choice-block')
				.empty();
			$('#submitbutton')
				.remove();
			$('#question')
				.text("You got " + score + " out of " + quiz.length + " correct.");
			$(document.createElement('h2'))
				.css({
					'text-align': 'center',
					'font-size': '4em'
				})
				.text(Math.round(score / quiz.length * 100) + '%')
				.insertAfter('#question');
			$('<a href="' + "main.html" + '">' + "Now explore the data for yourself" + '</a>')
				.appendTo($('#frame'));
		}

		function init() {
			//add title
			if (typeof quiztitle !== "undefined" && $.type(quiztitle) === "string") {
				$(document.createElement('h1'))
					.text(quiztitle)
					.appendTo('#frame');
			} else {
				$(document.createElement('h1'))
					.text("Quiz")
					.appendTo('#frame');
			}
			//add pager and questions
			if (typeof quiz !== "undefined" && $.type(quiz) === "array") {
				//add pager
				$(document.createElement('p'))
					.addClass('pager')
					.attr('id', 'pager')
					.text('Question 1 of ' + quiz.length)
					.appendTo('#frame');
				//add first question
				$(document.createElement('h3'))
					.addClass('question')
					.attr('id', 'question')
					.text(quiz[0]['question'])
					.appendTo('#frame');
				$(document.createElement('p'))
					.addClass('explanation')
					.attr('id', 'explanation')
					.html('&nbsp;')
					.appendTo('#frame');
				//questions holder
				$(document.createElement('ul'))
					.attr('id', 'choice-block')
					.appendTo('#frame');
				//add choices
				addChoices(quiz[0]['choices']);
				//add submit button
				$(document.createElement('div'))
					.addClass('choice-box')
					.attr('id', 'submitbutton')
					.text('Check Answer')
					.css({
						'font-weight': 700,
						'color': '#222',
						'padding': '30px 0'
					})
					.appendTo('#frame');
				setupButtons();
			}
		}
		init();
	});
