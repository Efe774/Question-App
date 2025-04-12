import { useEffect, useState } from 'react'; //import çekme
import PropTypes from 'prop-types';
import './QuestionScreen.css';

const QuestionScreen = ({ question, timeRemaining, showOptions, onAnswer }) => { //soru ekranı elemanları
  const [imagePath, setImagePath] = useState('');

  useEffect(() => { // useeffect ile tr catch kullanımı, resim çekerse göster çekmezse error bas
    try {
      setImagePath(`/images/${question.media}`);
    } catch (err) {
      console.error("Could not load image:", err);
      setImagePath('');
    }
  }, [question.media]);

  return (
    <div className="question-screen">  {/* soru ekranı */}
      <div className="timer">
        <div className="time-bar">
          <div 
            className="time-progress" 
            style={{ width: `${(timeRemaining / 30) * 100}%` }} // zamanlayıcı
          ></div>
        </div>
        <div className="time-text">{timeRemaining} saniye</div>
      </div>
      
      <div className="question-container">
        <h2 className="question-text">{question.question}</h2>
        
        {imagePath && ( // resim yolu
          <div className="question-image">
            <img src={imagePath} alt="Soru İçeriği" />
          </div>
        )}
        
        <div className={`options-container ${showOptions ? 'visible' : 'hidden'}`}>
          {question.options.map((option, index) => (
            <button
              key={index}
              className="option-button"
              onClick={() => onAnswer(option)}
              disabled={!showOptions}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

QuestionScreen.propTypes = {
  question: PropTypes.shape({
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    answer: PropTypes.string.isRequired,
    media: PropTypes.string
  }).isRequired,
  timeRemaining: PropTypes.number.isRequired,
  showOptions: PropTypes.bool.isRequired,
  onAnswer: PropTypes.func.isRequired
};

export default QuestionScreen;