// File: src/pages/marvel-quiz.js

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/MarvelQuiz.module.css';

const questions = [
  {
    questionText: 'What is the name of Thor\'s enchanted hammer?',
    options: ['Mjolnir', 'Stormbreaker', 'Gungnir'],
    correctAnswer: 0,
  },
  {
    questionText: 'Who is the firstborn child of Odin?',
    options: ['Thor', 'Loki', 'Hela'],
    correctAnswer: 2,
  },
  {
    questionText: 'What type of doctor is Doctor Strange?',
    options: ['Cardiothoracic Surgeon', 'Neurosurgeon', 'Trauma Surgeon'],
    correctAnswer: 1,
  },
  {
    questionText: 'Before becoming Vision, what was the name of Iron Man’s A.I. butler?',
    options: ['J.A.R.V.I.S.', 'F.R.I.D.A.Y.', 'H.O.M.E.R.'],
    correctAnswer: 0,
  },
  {
    questionText: 'What is Captain America\'s shield made of?',
    options: ['Adamantium', 'Promethium', 'Vibranium'],
    correctAnswer: 2,
  },
  {
    questionText: 'What is the real name of the Black Panther?',
    options: ['T\'Challa', 'M\'Baku', 'N\'Jadaka'],
    correctAnswer: 0,
  },
  {
    questionText: 'Which of the Infinity Stones is hidden on Vormir?',
    options: ['The Power Stone', 'The Soul Stone', 'The Reality Stone'],
    correctAnswer: 1,
  },
  {
    questionText: 'Who was the last holder of the Space Stone before Thanos?',
    options: ['Thor', 'The Collector', 'Loki'],
    correctAnswer: 2,
  },
  {
    questionText: 'What is the name of Star-Lord\'s ship?',
    options: ['The Milano', 'The Benatar', 'The Sovereign'],
    correctAnswer: 0,
  },
  {
    questionText: 'How many Infinity Stones are there?',
    options: ['Five', 'Six', 'Seven'],
    correctAnswer: 1,
  },
];

export default function MarvelQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  
  const [startTime, setStartTime] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [totalTries, setTotalTries] = useState(0);

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const handleOptionClick = (index) => {
    if (!isAnswerChecked) {
      setSelectedAnswer(index);
    }
  };

  // --- CHANGE IS HERE ---
  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;
    if (!isAnswerChecked) {
      setTotalTries(t => t + 1);
    }
    
    const correct = selectedAnswer === questions[currentQuestion].correctAnswer;
    setIsAnswerCorrect(correct);
    setIsAnswerChecked(true); // Show feedback (green/red colors) immediately

    if (correct) {
      if (!isAnswerChecked) {
        setScore(s => s + 1);
      }
      // If the answer is correct, wait 1.5 seconds then automatically proceed.
      setTimeout(() => {
        handleNextQuestion();
      }, 1500); // 1.5 second delay
    }
    // If the answer is incorrect, the logic in the return statement below will show the "Retry" button.
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
      setIsAnswerCorrect(false);
    } else {
      setTimeTaken(Math.round((Date.now() - startTime) / 1000));
      setIsQuizFinished(true);
    }
  };
  
  const handleRetryQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setIsAnswerCorrect(false);
  };

  const handleResetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setIsAnswerCorrect(false);
    setScore(0);
    setIsQuizFinished(false);
    setTotalTries(0);
    setStartTime(Date.now());
  };

  return (
    <>
      <Head>
        <title>Marvel Quiz</title>
      </Head>
      <div className={styles.quizPage}>
        <div className={styles.quizContainer}>
          {isQuizFinished ? (
            <div className={styles.resultsContainer}>
              <h1 className={styles.title}>Mission Complete</h1>
              <div className={styles.stats}>
                <p>Final Score: <span>{score} / {questions.length}</span></p>
                <p>Time Taken: <span>{timeTaken} seconds</span></p>
                <p>Total Attempts: <span>{totalTries}</span></p>
              </div>
              <div className={styles.resultsControls}>
                <button onClick={handleResetQuiz} className={styles.actionButton}>Try Again</button>
                <Link href="/" legacyBehavior><a className={styles.actionButton}>Go Home</a></Link>
              </div>
            </div>
          ) : (
            <>
              <div className={styles.questionHeader}>
                <h2 className={styles.questionCount}>Assessment {currentQuestion + 1}/{questions.length}</h2>
                <p className={styles.questionText}>{questions[currentQuestion].questionText}</p>
              </div>
              <div className={styles.optionsContainer}>
                {questions[currentQuestion].options.map((option, index) => {
                  const isCorrect = index === questions[currentQuestion].correctAnswer;
                  const isSelected = index === selectedAnswer;
                  let buttonClass = styles.optionButton;
                  if (isAnswerChecked) {
                    if (isCorrect) buttonClass += ` ${styles.correct}`;
                    else if (isSelected && !isCorrect) buttonClass += ` ${styles.incorrect}`;
                  } else if (isSelected) {
                    buttonClass += ` ${styles.selected}`;
                  }
                  return (
                    <button key={index} className={buttonClass} onClick={() => handleOptionClick(index)} disabled={isAnswerChecked}>
                      {option}
                    </button>
                  );
                })}
              </div>
              
              {/* --- CHANGE IS HERE --- */}
              <div className={styles.navigation}>
                {/* Only show "Confirm" if an answer hasn't been checked yet */}
                {!isAnswerChecked && (
                  <button className={styles.actionButton} onClick={handleCheckAnswer} disabled={selectedAnswer === null}>
                    Confirm Answer
                  </button>
                )}
                {/* Only show "Retry" if the answer has been checked AND it's incorrect */}
                {isAnswerChecked && !isAnswerCorrect && (
                  <button className={`${styles.actionButton} ${styles.retryButton}`} onClick={handleRetryQuestion}>
                    Retry Question
                  </button>
                )}
                {/* If the answer is correct, this area is empty while it waits to auto-advance */}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}