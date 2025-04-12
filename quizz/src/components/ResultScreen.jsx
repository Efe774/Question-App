import PropTypes from 'prop-types'; // import çekme
import './ResultScreen.css';

const ResultScreen = ({ results, answers, questions, onRestart }) => { // sonuç ekranı elemanları
  return (
    <div className="result-screen"> 
      <h1>Test Sonuçları</h1>  {/* başlık */}
      
      <div className="results-summary"> 
        <div className="result-item correct">
          <span className="result-number">{results.correct}</span> {/* dopru cevap ayarı*/}
          <span className="result-label">Doğru</span>
        </div>
        <div className="result-item incorrect">
          <span className="result-number">{results.incorrect}</span> {/* yanlış cevap ayarı*/}
          <span className="result-label">Yanlış</span>
        </div>
        <div className="result-item unanswered">
          <span className="result-number">{results.unanswered}</span> {/* boş bırakılan kısım */}
          <span className="result-label">Boş</span>
        </div>
      </div>
      
      <div className="questions-review"> {/* kullanıcının cevapları kısmı */}
        <h2>Cevaplarınız</h2>
        {questions.map((question, index) => ( // kullanıcının cevaplarını map aracı ile çektiğimiz alan
          <div 
            key={index} 
            className={`question-result ${
              answers[index] === null 
                ? 'unanswered' 
                : answers[index] === question.answer 
                  ? 'correct' 
                  : 'incorrect'
            }`}
          >
            <p className="question-text">{question.question}</p>
            <div className="answer-details">
              <p>
                <strong>Doğru Cevap:</strong> {question.answer} {/* değişmez doğru cevap alanı*/}
              </p>
              <p>
                <strong>Sizin Cevabınız:</strong> {answers[index] || 'Cevap verilmedi'} {/* kullanıcının doğru cevap kısmı*/}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="restart-button" onClick={onRestart}> {/* oyunu yeniden başlatmaya yarayan button */}
        Testi Yeniden Başlat
      </button>
    </div>
  );
};

ResultScreen.propTypes = {
  results: PropTypes.shape({
    correct: PropTypes.number.isRequired,
    incorrect: PropTypes.number.isRequired,
    unanswered: PropTypes.number.isRequired
  }).isRequired,
  answers: PropTypes.arrayOf(PropTypes.string),
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired
    })
  ).isRequired,
  onRestart: PropTypes.func.isRequired
};

export default ResultScreen;