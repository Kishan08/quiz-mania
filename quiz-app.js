// Quiz Application Main Logic
class QuizApp {
  constructor() {
    this.currentCategory = null;
    this.currentQuestions = [];
    this.currentQuestionIndex = 0;
    this.userAnswers = [];
    this.timer = null;
    this.timeLeft = 10;
    this.participantName = '';
    this.score = {
      correct: 0,
      incorrect: 0,
      unanswered: 0
    };

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.showPage('category-page');
  }

  setupEventListeners() {
    // Start quiz form submission
    const startForm = document.getElementById('quiz-form');
    if (startForm) {
      startForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmit();
      });
    }

    // Quiz rules modal
    const rulesLink = document.getElementById('quiz-rules-link');
    const modal = document.getElementById('quiz-rules-modal');
    const closeBtn = document.getElementById('close-modal');

    if (rulesLink && modal) {
      rulesLink.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
      });
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }

    // Global event listeners for modal
    if (modal) {
      window.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
          modal.style.display = 'none';
        }
      });
    }

    // Option selection
    document.querySelectorAll('.option').forEach(option => {
      option.addEventListener('click', () => {
        this.selectOption(parseInt(option.dataset.option));
      });
    });

    // Next button
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.nextQuestion();
      });
    }

    // Skip button
    const skipBtn = document.getElementById('skip-btn');
    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        this.skipQuestion();
      });
    }

    // Exit quiz button
    const exitBtn = document.getElementById('exit-quiz-btn');
    if (exitBtn) {
      exitBtn.addEventListener('click', () => {
        this.exitQuiz();
      });
    }

    // Results buttons will be set up when results page is shown
  }

  setupResultsEventListeners() {
    const retakeBtn = document.getElementById('restart-btn');
    if (retakeBtn) {
      retakeBtn.addEventListener('click', () => {
        this.resetQuiz();
      });
    }
  }

  showModal() {
    const modal = document.getElementById('quiz-rules-modal');
    modal.classList.add('active');
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }

  hideModal() {
    const modal = document.getElementById('quiz-rules-modal');
    modal.classList.remove('active');
    // Restore body scroll
    document.body.style.overflow = 'auto';
  }

  handleFormSubmit() {
    const nameInput = document.getElementById('full-name');
    const selectedCategory = document.querySelector('input[name="category"]:checked');
    
    if (!nameInput.value.trim()) {
      alert('Please enter your full name');
      nameInput.focus();
      return;
    }
    
    if (!selectedCategory) {
      alert('Please select a quiz category');
      return;
    }
    
    this.participantName = nameInput.value.trim();
    this.startQuiz(selectedCategory.value);
  }

  showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    
    // Show/hide exit button based on current page
    if (pageId === 'quiz-page') {
      document.body.classList.add('quiz-active');
    } else {
      document.body.classList.remove('quiz-active');
    }
  }

  startQuiz(category) {
    this.currentCategory = category;
    this.currentQuestions = [...QUIZ_DATA[category].questions];
    this.currentQuestionIndex = 0;
    this.userAnswers = [];
    this.score = {
      correct: 0,
      incorrect: 0,
      unanswered: 0
    };

    // Show quiz page first
    this.showPage('quiz-page');
    
    // Load first question
    setTimeout(() => {
      this.loadQuestion();
    }, 50);
  }

  loadQuestion() {
    if (this.currentQuestionIndex >= this.currentQuestions.length) {
      this.endQuiz();
      return;
    }

    const currentQuestion = this.currentQuestions[this.currentQuestionIndex];

    // Update progress information
    document.getElementById('question-progress').textContent =
      `${this.currentQuestionIndex + 1} /${this.currentQuestions.length}`;

    // Update progress bar
    const progress = ((this.currentQuestionIndex) / this.currentQuestions.length) * 100;
    document.querySelector('.progress-fill').style.width = `${progress}%`;

    // Load question text with number
    document.getElementById('question-text').textContent = `${this.currentQuestionIndex + 1}. ${currentQuestion.question}`;

    // Load options
    const optionElements = document.querySelectorAll('.option');
    optionElements.forEach((option, index) => {
      const optionText = option.querySelector('.option-text');
      optionText.textContent = currentQuestion.options[index];

      // Reset option styles
      option.classList.remove('selected', 'correct', 'incorrect');
      option.style.pointerEvents = 'auto';
    });

    // Reset next button
    document.getElementById('next-btn').disabled = true;

    // Start timer
    this.startTimer();
  }

  startTimer() {
    this.timeLeft = 10;
    this.updateTimerDisplay();

    this.timer = setInterval(() => {
      this.timeLeft--;
      this.updateTimerDisplay();

      if (this.timeLeft <= 0) {
        this.timeUp();
      }
    }, 1000);
  }

  updateTimerDisplay() {
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) {
      timerDisplay.textContent = `0:${this.timeLeft.toString().padStart(2, '0')}`;
    }
  }

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  timeUp() {
    this.stopTimer();
    this.userAnswers[this.currentQuestionIndex] = null; // Unanswered
    this.score.unanswered++;

    // Show correct answer
    this.showCorrectAnswer();

    // Auto advance after 2 seconds
    setTimeout(() => {
      this.nextQuestion();
    }, 2000);
  }

  selectOption(selectedIndex) {
    // Stop timer when user selects an answer
    this.stopTimer();

    // Remove selection from all options
    document.querySelectorAll('.option').forEach(option => {
      option.classList.remove('selected');
    });

    // Mark selected option
    document.querySelectorAll('.option')[selectedIndex].classList.add('selected');

    // Store user answer
    this.userAnswers[this.currentQuestionIndex] = selectedIndex;

    // Update score
    const correctIndex = this.currentQuestions[this.currentQuestionIndex].correct;
    if (selectedIndex === correctIndex) {
      this.score.correct++;
      document.querySelectorAll('.option')[selectedIndex].classList.add('correct');
    } else {
      this.score.incorrect++;
      document.querySelectorAll('.option')[selectedIndex].classList.add('incorrect');
      // Also show the correct answer
      document.querySelectorAll('.option')[correctIndex].classList.add('correct');
    }

    // Disable all options
    document.querySelectorAll('.option').forEach(option => {
      option.style.pointerEvents = 'none';
    });

    // Enable next button
    document.getElementById('next-btn').disabled = false;
  }

  showCorrectAnswer() {
    const correctIndex = this.currentQuestions[this.currentQuestionIndex].correct;
    document.querySelectorAll('.option')[correctIndex].classList.add('correct');

    // Disable all options
    document.querySelectorAll('.option').forEach(option => {
      option.style.pointerEvents = 'none';
    });

    // Enable next button
    document.getElementById('next-btn').disabled = false;
  }

  nextQuestion() {
    this.stopTimer();
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= this.currentQuestions.length) {
      this.endQuiz();
    } else {
      this.loadQuestion();
    }
  }

  endQuiz() {
    this.stopTimer();

    // Update progress bar to 100%
    document.querySelector('.progress-fill').style.width = '100%';

    // Calculate and display results
    this.displayResults();
    this.showPage('results-page');
    
    // Setup results page event listeners
    setTimeout(() => {
      this.setupResultsEventListeners();
    }, 100);
  }

  displayResults() {
    const totalQuestions = this.currentQuestions.length;
    const percentage = Math.round((this.score.correct / totalQuestions) * 100);

    // Update results details
    document.getElementById('total-questions').textContent = totalQuestions;
    document.getElementById('correct-count').textContent = this.score.correct;
    document.getElementById('incorrect-count').textContent = this.score.incorrect;
    document.getElementById('unanswered-count').textContent = this.score.unanswered;

    // Update score percentage
    document.getElementById('score-percentage').textContent = `${percentage}%`;

    // Generate feedback and update layout based on performance
    this.generateFeedback(percentage);
  }

  generateFeedback(percentage) {
    const performanceIcon = document.getElementById('performance-icon');
    const resultsTitle = document.getElementById('results-title');
    const resultsSubtitle = document.getElementById('results-subtitle');
    const scorePercentage = document.getElementById('score-percentage');
    const scoreMessage = document.getElementById('score-message');

    if (percentage >= 80) {
      // High performance layout (like Quiz Screen 7)
      performanceIcon.innerHTML = '<div class="success-icon">✓</div>';
      resultsTitle.innerHTML = '<h1>CONGRATULATION</h1>';
      resultsTitle.classList.remove('keep-practicing');
      resultsSubtitle.innerHTML = '<p>You successfully completed the Quiz and holds</p>';
      scorePercentage.classList.remove('poor');
      scorePercentage.style.color = '#28a745';
      scoreMessage.textContent = 'Great job!';
    } else if (percentage >= 60) {
      // Medium performance layout
      performanceIcon.innerHTML = '<div class="success-icon">✓</div>';
      resultsTitle.innerHTML = '<h1>WELL DONE</h1>';
      resultsTitle.classList.remove('keep-practicing');
      resultsSubtitle.innerHTML = '<p>You successfully completed the Quiz but you can do better</p>';
      scorePercentage.classList.remove('poor');
      scorePercentage.style.color = '#f39c12';
      scoreMessage.textContent = 'Keep improving!';
    } else {
      // Low performance layout (like Quiz Screen 8)
      performanceIcon.innerHTML = '<div class="sad-icon">😞</div>';
      resultsTitle.innerHTML = '<h1>KEEP<br>PRACTICING!</h1>';
      resultsTitle.classList.add('keep-practicing');
      resultsSubtitle.innerHTML = '<p>Better luck next time!</p>';
      scorePercentage.classList.add('poor');
      scoreMessage.textContent = '';
    }
  }

  

  restartQuiz() {
    // Reset form
    document.getElementById('full-name').value = '';
    document.querySelector('input[name="category"]:checked').checked = false;
    document.getElementById('javascript').checked = true;
    
    this.participantName = '';
    this.showPage('category-page');
  }

      skipQuestion() {
        // Stop the timer
        this.stopTimer();
        
        // Mark as skipped (no answer recorded)
        this.userAnswers[this.currentQuestionIndex] = null;
        this.score.unanswered++;
        
        // Move to next question after a short delay
        setTimeout(() => {
            this.nextQuestion();
        }, 500);
    }

    exitQuiz() {
        // Confirm with user
        if (confirm('Are you sure you want to exit the quiz? Your progress will be lost.')) {
            this.stopTimer();
            this.resetQuizData();
            this.showPage('category-page');
        }
    }

    resetQuizData() {
        this.currentQuestionIndex = 0;
        this.score = { correct: 0, incorrect: 0, unanswered: 0 };
        this.userAnswers = [];
        this.currentQuestions = [];
        this.participantName = '';
        this.selectedCategory = '';
    }

    resetQuiz() {
        this.resetQuizData();
        this.showPage('category-page');
    }

    showResults() {
        this.showPage('results-page');
    }
}

// Initialize the quiz app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new QuizApp();
}); 