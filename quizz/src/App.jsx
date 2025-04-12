//import kısmı
import { useState, useEffect } from 'react'; 
import StartScreen from './components/StartScreen';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';
import './App.css';
import { questions } from './data/questions';

//fonksiyon atamaları
function App() {
  const [gameState, setGameState] = useState('start'); //aşama kısmı
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // soru indexleri
  const [answers, setAnswers] = useState(Array(questions.length).fill(null)); // cevaplar
  const [timeRemaining, setTimeRemaining] = useState(30); // sayaç
  const [showOptions, setShowOptions] = useState(false); // cevap göster usestate drumunda kapalı
  const [pass, setPass] = useState(false); 

  //useEffect kısmı
  useEffect(() => {
    if (gameState === 'playing') {//game state ismen ve fonksiyonel olarark playing eşit olduğunda)
      setTimeRemaining(30); // 30 saniye sayaç
      setShowOptions(false); // seçnekleri gizler
      setPass(false); // geçişi iptal eder 

      const optionsTimer = setTimeout(() => setShowOptions(true), 4000); // 4 saniye sonra seçenekleri göster
      
      const timer = setInterval(() => { // Sayaç
        setTimeRemaining(prev => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => {
        clearInterval(timer);
        clearTimeout(optionsTimer);
      };
    }
  }, [gameState, currentQuestionIndex]);

  useEffect(() => { // zaman 0 olduğunda geçiş yap
    if (timeRemaining === 0 && !pass) {
      setPass(true);
      handleAnswer(null);
    }
  }, [timeRemaining, pass]);

  const handleAnswer = (selectedOption) => { // cevap seçildiğin de kullanıcının seçeneğini index seçeneğine ekler
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedOption;
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) { //eğer sroular bitmediyse sıradaki soruya geç
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setGameState('result');  // bittiyse sonuç ekranını ver
    }
  };

  const startGame = () => { // oyunu başlat
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setAnswers(Array(questions.length).fill(null)); // sıfırla
  };

  const getResults = () => { // sonuç objesi
    const results = {
      correct: 0,
      incorrect: 0,
      unanswered: 0
    };          

    answers.forEach((answer, index) => { // cevap başına index eşleştirme
      if (answer === null) {
        results.unanswered++;
      } else if (answer === questions[index].answer) {
        results.correct++;
      } else {
        results.incorrect++;
      }
    });

    return results;  
  };

  return (
    <div className="app-container">  {/*container*/}
      {gameState === 'start' && (     // oyunu başlatı getir
        <StartScreen onStart={startGame} />
      )}
      
      {gameState === 'playing' && ( // oynama esnasında soru ekranını getir
        <QuestionScreen 
          question={questions[currentQuestionIndex]} 
          timeRemaining={timeRemaining}
          showOptions={showOptions}
          onAnswer={handleAnswer}
        />
      )}
      
      {gameState === 'result' && (// sonuç esnasında sonuç ekranını getir
        <ResultScreen 
          results={getResults()} 
          answers={answers}
          questions={questions}
          onRestart={startGame}
        />
      )}
    </div>
  );
}

export default App;