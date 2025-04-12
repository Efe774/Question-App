//import çekme 
import PropTypes from 'prop-types';
import './StartScreen.css';

const StartScreen = ({ onStart }) => { //start olduğunda
  return ( // elementleri oluştur
    <div className="start-screen">
      <h1>Bilgi Yarışması</h1>
      <div className="info-container">
        <h2>Test Hakkında Bilgi</h2>
        <ul>
          <li>Test toplam 10 sorudan oluşmaktadır.</li>
          <li>Her soru için 30 saniye süreniz bulunmaktadır.</li>
          <li>Cevap şıkları 4 saniye sonra görünecektir.</li>
          <li>Cevabınızı verdikten sonra bir sonraki soruya geçilecektir.</li>
          <li>Önceki sorulara dönüş yapılamaz.</li>
          <li>Test sonunda doğru, yanlış ve boş cevaplarınız gösterilecektir.</li>
        </ul>
      </div>
      <button className="start-button" onClick={onStart}>
        Teste Başla
      </button>
    </div>
  );
};

StartScreen.propTypes = {
  onStart: PropTypes.func.isRequired
};

export default StartScreen;