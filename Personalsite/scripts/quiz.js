// ===== Quiz JavaScript Module =====

// DOM Elements
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const quizFeedback = document.getElementById('quizFeedback');
const currentQuestionSpan = document.getElementById('currentQuestion');
const totalQuestionsSpan = document.getElementById('totalQuestions');
const currentScoreSpan = document.getElementById('currentScore');
const maxScoreSpan = document.getElementById('maxScore');
const progressFill = document.getElementById('progressFill');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const scorePercentage = document.getElementById('scorePercentage');
const scoreMessage = document.getElementById('scoreMessage');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const resetTimerBtn = document.getElementById('resetTimerBtn');
const resultsSection = document.getElementById('resultsSection');
const finalScoreSpan = document.getElementById('finalScore');
const finalPercentageSpan = document.getElementById('finalPercentage');
const resultsMessage = document.getElementById('resultsMessage');
const recommendationsList = document.getElementById('recommendationsList');
const retakeQuizBtn = document.getElementById('retakeQuiz');
const shareResultsBtn = document.getElementById('shareResults');
const startQuizBtn = document.getElementById('startQuizBtn');
const pauseQuizBtn = document.getElementById('pauseQuizBtn');
const restartQuizBtn = document.getElementById('restartQuizBtn');

// Quiz Questions
const quizQuestions = [
    {
        id: 1,
        question: "What is phishing?",
        options: [
            "A fishing hobby",
            "A fraudulent attempt to obtain sensitive information by disguising as a trustworthy entity",
            "A type of computer virus",
            "A security protocol for websites"
        ],
        correctAnswer: 1,
        explanation: "Phishing is a cyber attack that uses disguised email as a weapon. The goal is to trick the email recipient into believing that the message is something they want or need."
    },
    {
        id: 2,
        question: "What is the minimum recommended length for a strong password?",
        options: [
            "6 characters",
            "8 characters",
            "12 characters",
            "16 characters"
        ],
        correctAnswer: 2,
        explanation: "Security experts recommend using passwords with at least 12 characters to provide adequate protection against brute-force attacks."
    },
    {
        id: 3,
        question: "What does HTTPS in a website URL indicate?",
        options: [
            "The website has high traffic",
            "The connection between your browser and the website is encrypted",
            "The website is government-owned",
            "The website is free to use"
        ],
        correctAnswer: 1,
        explanation: "HTTPS (Hypertext Transfer Protocol Secure) indicates that the connection between your browser and the website is encrypted, protecting your data from interception."
    },
    {
        id: 4,
        question: "What is two-factor authentication (2FA)?",
        options: [
            "Using two different passwords",
            "A security process where users provide two different authentication factors",
            "Logging in from two different devices",
            "Having two email addresses for verification"
        ],
        correctAnswer: 1,
        explanation: "Two-factor authentication adds an extra layer of security by requiring two different types of credentials before granting access."
    },
    {
        id: 5,
        question: "What should you do if you receive a suspicious email asking for personal information?",
        options: [
            "Reply with the requested information",
            "Click on any links to verify the sender",
            "Delete it without opening",
            "Report it as phishing and delete it"
        ],
        correctAnswer: 3,
        explanation: "Suspicious emails should be reported as phishing to your email provider and then deleted without opening any attachments or clicking any links."
    },
    {
        id: 6,
        question: "What is a VPN used for?",
        options: [
            "To increase internet speed",
            "To encrypt internet traffic and hide your IP address",
            "To block all advertisements",
            "To share files with friends"
        ],
        correctAnswer: 1,
        explanation: "A VPN (Virtual Private Network) encrypts your internet connection and masks your IP address, providing privacy and security online."
    },
    {
        id: 7,
        question: "What is the purpose of a password manager?",
        options: [
            "To remember passwords for you",
            "To generate and store strong, unique passwords for each account",
            "To share passwords with family members",
            "To recover forgotten passwords"
        ],
        correctAnswer: 1,
        explanation: "Password managers generate, store, and autofill strong, unique passwords for all your accounts, eliminating the need to remember them."
    },
    {
        id: 8,
        question: "What does 'social engineering' refer to in cybersecurity?",
        options: [
            "Engineering social media platforms",
            "Psychological manipulation to trick people into revealing confidential information",
            "Creating social networks for security professionals",
            "Studying social behavior patterns"
        ],
        correctAnswer: 1,
        explanation: "Social engineering uses psychological manipulation to trick users into making security mistakes or giving away sensitive information."
    },
    {
        id: 9,
        question: "What is the safest way to use public Wi-Fi?",
        options: [
            "Use it for all activities",
            "Avoid accessing sensitive information and use a VPN",
            "Only use it during off-peak hours",
            "Change your passwords immediately after use"
        ],
        correctAnswer: 1,
        explanation: "When using public Wi-Fi, avoid accessing sensitive accounts and always use a VPN to encrypt your connection."
    },
    {
        id: 10,
        question: "What should you do regularly to protect your devices?",
        options: [
            "Restart them daily",
            "Install software updates and security patches",
            "Change their physical location",
            "Clean them with disinfectant"
        ],
        correctAnswer: 1,
        explanation: "Regularly installing software updates and security patches is crucial for protecting your devices from known vulnerabilities."
    }
];

// Quiz State
let quizState = {
    currentQuestion: 0,
    score: 0,
    userAnswers: [],
    quizCompleted: false,
    quizStarted: false,
    isPaused: false,
    startTime: null,
    elapsedTime: 0,
    timerInterval: null
};

// Shuffle helper function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Quiz Timer
class QuizTimer {
    constructor() {
        this.startTime = null;
        this.elapsedTime = 0;
        this.timerInterval = null;
        this.isRunning = false;
    }

    start() {
        if (this.isRunning) return;
        this.startTime = Date.now() - (this.elapsedTime * 1000);
        this.isRunning = true;
        this.timerInterval = setInterval(() => {
            this.updateDisplay();
        }, 1000);
        this.updateDisplay();
    }

    pause() {
        if (!this.isRunning) return;
        clearInterval(this.timerInterval);
        this.isRunning = false;
    }

    resume() {
        if (this.isRunning) return;
        this.start();
    }

    reset() {
        clearInterval(this.timerInterval);
        this.startTime = Date.now();
        this.elapsedTime = 0;
        this.isRunning = false;
        minutesDisplay.textContent = '00';
        secondsDisplay.textContent = '00';
    }

    stop() {
        clearInterval(this.timerInterval);
        this.isRunning = false;
    }

    updateDisplay() {
        const now = Date.now();
        this.elapsedTime = Math.floor((now - this.startTime) / 1000);
        const minutes = Math.floor(this.elapsedTime / 60);
        const seconds = this.elapsedTime % 60;
        minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    }

    getTime() {
        return this.elapsedTime;
    }
}

// Initialize Timer
const timer = new QuizTimer();

// Quiz Functions
function loadQuestion() {
    const question = quizQuestions[quizState.currentQuestion];
    questionText.textContent = question.question;
    optionsContainer.innerHTML = '';

    // Create array of option objects with original index
    let options = question.options.map((opt, idx) => ({
        text: opt,
        index: idx
    }));

    // Shuffle the options
    options = shuffleArray(options);

    options.forEach((optionObj) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.dataset.index = optionObj.index;

        const userAnswer = quizState.userAnswers[quizState.currentQuestion];
        if (userAnswer !== undefined) {
            if (optionObj.index === userAnswer) {
                optionElement.classList.add('selected');
                if (userAnswer === question.correctAnswer) {
                    optionElement.classList.add('correct');
                } else {
                    optionElement.classList.add('incorrect');
                }
            } else if (optionObj.index === question.correctAnswer) {
                optionElement.classList.add('correct');
            }
        }

        optionElement.innerHTML = `
            <span class="option-number">${String.fromCharCode(65 + optionObj.index)}</span>
            <span class="option-text">${optionObj.text}</span>
        `;

        optionElement.addEventListener('click', () => selectOption(optionObj.index));
        optionsContainer.appendChild(optionElement);
    });

    currentQuestionSpan.textContent = quizState.currentQuestion + 1;
    totalQuestionsSpan.textContent = quizQuestions.length;
    maxScoreSpan.textContent = quizQuestions.length;
    
    prevBtn.disabled = quizState.currentQuestion === 0;

    if (quizState.userAnswers[quizState.currentQuestion] !== undefined) {
        showFeedback();
    } else {
        quizFeedback.style.display = 'none';
    }

    updateScoreDisplay();
    updateScoreCircle();
    updateProgress();
    updateQuizControls();
}

function selectOption(optionIndex) {
    if (!quizState.quizStarted || quizState.isPaused) {
        alert('Please start or resume the quiz first.');
        return;
    }
    if (quizState.userAnswers[quizState.currentQuestion] !== undefined) return;

    const question = quizQuestions[quizState.currentQuestion];
    quizState.userAnswers[quizState.currentQuestion] = optionIndex;

    if (optionIndex === question.correctAnswer) {
        quizState.score++;
    }

    loadQuestion();
    showFeedback();

    if (quizState.currentQuestion < quizQuestions.length - 1) {
        setTimeout(() => {
            if (quizState.userAnswers[quizState.currentQuestion] !== undefined) {
                nextQuestion();
            }
        }, 2000);
    } else {
        setTimeout(() => {
            showResults();
        }, 2000);
    }
}

function showFeedback() {
    const question = quizQuestions[quizState.currentQuestion];
    const userAnswer = quizState.userAnswers[quizState.currentQuestion];

    let feedbackText = '';
    if (userAnswer === question.correctAnswer) {
        feedbackText = `<strong>Correct!</strong> ${question.explanation}`;
        quizFeedback.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
        quizFeedback.style.borderLeftColor = '#4CAF50';
    } else {
        const correctAnswer = question.options[question.correctAnswer];
        feedbackText = `<strong>Incorrect.</strong> ${question.explanation}<br><br>
                       <strong>Correct answer:</strong> ${correctAnswer}`;
        quizFeedback.style.backgroundColor = 'rgba(244, 67, 54, 0.1)';
        quizFeedback.style.borderLeftColor = '#f44336';
    }

    quizFeedback.innerHTML = feedbackText;
    quizFeedback.style.display = 'block';
}

function nextQuestion() {
    if (quizState.currentQuestion < quizQuestions.length - 1) {
        quizState.currentQuestion++;
        loadQuestion();
    } else {
        showResults();
    }
}

function previousQuestion() {
    if (quizState.currentQuestion > 0) {
        quizState.currentQuestion--;
        loadQuestion();
    }
}

function updateProgress() {
    const progress = ((quizState.currentQuestion + 1) / quizQuestions.length) * 100;
    progressFill.style.width = `${progress}%`;
}

function updateScoreDisplay() {
    currentScoreSpan.textContent = quizState.score;
}

function updateScoreCircle() {
    const answeredQuestions = quizState.userAnswers.filter(a => a !== undefined).length;
    const percentage = answeredQuestions > 0 
        ? Math.round((quizState.score / answeredQuestions) * 100)
        : 0;
    
    scorePercentage.textContent = percentage;
    
    if (percentage >= 80) {
        scoreMessage.textContent = 'Excellent! Keep it up!';
        scoreMessage.style.color = '#4CAF50';
    } else if (percentage >= 60) {
        scoreMessage.textContent = 'Good job! Keep going!';
        scoreMessage.style.color = '#FF9800';
    } else if (percentage > 0) {
        scoreMessage.textContent = 'Keep learning!';
        scoreMessage.style.color = '#f44336';
    } else {
        scoreMessage.textContent = 'Start the quiz to see your score!';
        scoreMessage.style.color = '#666';
    }
}

function showResults() {
    timer.stop();
    quizState.quizCompleted = true;
    quizState.isPaused = true;

    document.querySelector('.quiz-content-simple').style.display = 'none';
    resultsSection.style.display = 'block';

    const finalScore = quizState.score;
    const percentage = Math.round((finalScore / quizQuestions.length) * 100);

    finalScoreSpan.textContent = finalScore;
    finalPercentageSpan.textContent = percentage;

    let message = '';
    let recommendations = [];

    if (percentage >= 90) {
        message = 'Outstanding! You have excellent cybersecurity knowledge.';
        recommendations = [
            'Consider advanced cybersecurity certifications',
            'Help educate others about online safety',
            'Stay updated with the latest security trends'
        ];
    } else if (percentage >= 70) {
        message = 'Great job! You have good cybersecurity awareness.';
        recommendations = [
            'Review areas where you missed questions',
            'Implement security best practices consistently',
            'Consider using additional security tools'
        ];
    } else if (percentage >= 50) {
        message = 'Good effort! You have basic cybersecurity knowledge.';
        recommendations = [
            'Review the quiz explanations carefully',
            'Focus on password security and phishing awareness',
            'Take a beginner cybersecurity course'
        ];
    } else {
        message = 'Keep learning! Cybersecurity is important for everyone.';
        recommendations = [
            'Start with our beginner resources on the Resources page',
            'Focus on basic password security and email safety',
            'Take this quiz again after studying our materials'
        ];
    }

    resultsMessage.textContent = message;
    recommendationsList.innerHTML = '';
    recommendations.forEach(rec => {
        const li = document.createElement('li');
        li.textContent = rec;
        recommendationsList.appendChild(li);
    });

    updateQuizControls();
}

function startQuiz() {
    if (!quizState.quizStarted) {
        quizState.quizStarted = true;
        quizState.isPaused = false;
        timer.start();
        loadQuestion();
    } else if (quizState.isPaused) {
        quizState.isPaused = false;
        timer.resume();
        updateQuizControls();
    }
}

function pauseQuiz() {
    if (!quizState.quizStarted || quizState.quizCompleted) return;
    
    quizState.isPaused = !quizState.isPaused;
    if (quizState.isPaused) {
        timer.pause();
        pauseQuizBtn.innerHTML = '<i class="fas fa-play me-2"></i>Resume';
    } else {
        timer.resume();
        pauseQuizBtn.innerHTML = '<i class="fas fa-pause me-2"></i>Pause';
    }
    updateQuizControls();
}

function restartQuiz() {
    if (confirm("Are you sure you want to restart the quiz? Your current progress will be lost.")) {
        quizState = {
            currentQuestion: 0,
            score: 0,
            userAnswers: [],
            quizCompleted: false,
            quizStarted: false,
            isPaused: false,
            startTime: null,
            elapsedTime: 0,
            timerInterval: null
        };

        document.querySelector('.quiz-content-simple').style.display = 'grid';
        resultsSection.style.display = 'none';
        quizFeedback.style.display = 'none';

        timer.reset();
        updateQuizControls();
        loadQuestion();
    }
}

function updateQuizControls() {
    if (!quizState.quizStarted) {
        startQuizBtn.innerHTML = '<i class="fas fa-play me-2"></i>Start Quiz';
        startQuizBtn.disabled = false;
        pauseQuizBtn.disabled = true;
        pauseQuizBtn.innerHTML = '<i class="fas fa-pause me-2"></i>Pause';
        restartQuizBtn.disabled = false;
    } else if (quizState.isPaused) {
        startQuizBtn.innerHTML = '<i class="fas fa-play me-2"></i>Resume';
        startQuizBtn.disabled = false;
        pauseQuizBtn.innerHTML = '<i class="fas fa-play me-2"></i>Resume';
        restartQuizBtn.disabled = false;
    } else if (quizState.quizCompleted) {
        startQuizBtn.disabled = true;
        startQuizBtn.innerHTML = '<i class="fas fa-check me-2"></i>Quiz Completed';
        pauseQuizBtn.disabled = true;
        restartQuizBtn.disabled = false;
    } else {
        startQuizBtn.innerHTML = '<i class="fas fa-running me-2"></i>Quiz in Progress';
        startQuizBtn.disabled = true;
        pauseQuizBtn.disabled = false;
        pauseQuizBtn.innerHTML = '<i class="fas fa-pause me-2"></i>Pause';
        restartQuizBtn.disabled = false;
    }
}

function shareResults() {
    const score = quizState.score;
    const total = quizQuestions.length;
    const percentage = Math.round((score / total) * 100);
    const shareText = `I scored ${score}/${total} (${percentage}%) on the CyberSafe Advocacy cybersecurity quiz! Test your knowledge at ${window.location.origin}`;

    if (navigator.share) {
        navigator.share({
            title: 'My Cybersecurity Quiz Results',
            text: shareText,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Results copied to clipboard! You can now paste and share them.');
        });
    }
}

// Event Listeners
function initializeQuiz() {
    // Set up initial display
    totalQuestionsSpan.textContent = quizQuestions.length;
    maxScoreSpan.textContent = quizQuestions.length;
    
    // Load first question
    loadQuestion();
    
    // Set current year in footer
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Event Listeners
    prevBtn.addEventListener('click', previousQuestion);
    
    nextBtn.addEventListener('click', () => {
        if (!quizState.quizStarted || quizState.isPaused) {
            alert('Please start or resume the quiz first.');
            return;
        }
        if (quizState.userAnswers[quizState.currentQuestion] !== undefined) {
            nextQuestion();
        } else {
            alert('Please select an answer before proceeding.');
        }
    });
    
    resetTimerBtn.addEventListener('click', () => {
        if (quizState.quizStarted && !quizState.quizCompleted) {
            timer.reset();
        }
    });
    
    startQuizBtn.addEventListener('click', startQuiz);
    pauseQuizBtn.addEventListener('click', pauseQuiz);
    restartQuizBtn.addEventListener('click', restartQuiz);
    retakeQuizBtn.addEventListener('click', restartQuiz);
    shareResultsBtn.addEventListener('click', shareResults);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!quizState.quizStarted || quizState.isPaused) return;
        
        if (e.key >= '1' && e.key <= '4' && !quizState.quizCompleted) {
            const optionIndex = parseInt(e.key) - 1;
            selectOption(optionIndex);
        } else if (e.key === 'ArrowRight' && !quizState.quizCompleted) {
            nextQuestion();
        } else if (e.key === 'ArrowLeft' && !quizState.quizCompleted) {
            previousQuestion();
        } else if (e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
            pauseQuiz();
        } else if (e.key === 'r' || e.key === 'R') {
            restartQuiz();
        }
    });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeQuiz);
} else {
    initializeQuiz();
}