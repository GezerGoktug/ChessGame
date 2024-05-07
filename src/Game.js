import { Chess } from "chess.js";
import { BehaviorSubject } from "rxjs"; 

const chess = new Chess(); //! Yeni bir Chess oyunu oluşturuyoruz.

//! Oyun durumunu tutmak için bir BehaviorSubject oluşturuyoruz.
const subjectGame = new BehaviorSubject();

export default subjectGame; //! Oluşturduğumuz BehaviorSubject'i dışa aktarıyoruz.

//! Son sıraya gelen taşı taş değiştirme modalından seçilen taş ile değiştirmek 
//! ve son sıraya taşımak için bir fonksiyon.
export const moveToLastRow = (chanceModal, type, setChanceModal) => {
  const { from, to } = chanceModal;

  setChanceModal(null); // Taş değiştirme modalını kapatıyoruz.
  //! taşın seçilen taş değiştirilmesini sağlıyoruz.
  const move = chess.move({ from, to, promotion: type }); 
  if (move) updateGame(); // Taşı yaptıysak, oyun durumunu güncelliyoruz.
};

//! Chess js de hamle yapmak için bir fonksiyon.
export const move = (from, to, setChanceModal) => {
  let moveOpr;
  //! Taş son sıraya ulaştıysa
  if (
    !(from === to) &&
    ((chess.get(from).color === "b" && to.charAt(1) === "1") ||
      (chess.get(from).color === "w" && to.charAt(1) === "8"))
  ) {
    //! Taş son sıraya ulaştıysa ve bir piyon ise, taş değiştirme modalını gösteriyoruz.
    if (chess.get(from).type === "p") {
      setChanceModal({
        from: from,
        to: to,
        color: chess.get(from).color,
      });
    } 
    //! Eğer piyon değilse taşı değiştirmeden son sıraya taşı
    else {
      moveOpr = chess.move({ from, to, promotion: chess.get(from).type });
    }
  } else {
    moveOpr = chess.move({ from, to });
  }

  if (moveOpr) updateGame(); //! Hamle yapıldıysa, oyun durumunu güncelliyoruz.
};

//! Oyunu başlatmak için bir fonksiyon.
export const initGame = () => updateGame();

//! Oyun durumunu güncellemek için bir fonksiyon.
const updateGame = () => {
  //! Oyunun bitip bitmediğini kontrol ediyoruz.
  const isGameOver = chess.isGameOver(); 
  //! BehaviorSubject'e yeni oyun durumunu iletiyoruz.
  subjectGame.next({ 
    chess: chess.board(),
    turn: chess.turn(),
    isGameOver,
    result: isGameOver ? getGameResult() : null,
  });
};

//! Oyun sonucunu belirlemek için bir fonksiyon.
const getGameResult = () => {
  if (chess.isCheckmate()) { //! Şah mat olduysa.
    const winner = chess.turn() === "w" ? "Black" : "White";
    return `ŞAH MAT - Winner : ${winner}`;
  } else if (chess.isDraw()) { //! Berabere olduysa.
    let reason = "50 moves rule";
    if (chess.isStalemate()) reason = "Dead end loop";
    else if (chess.isThreefoldRepetition()) reason = "Repeat";
    else if (chess.isInsufficientMaterial()) reason = "Insufficient material";

    return reason;
  } else return "bilinmeyen durum"; 
};

//! Oyunu sıfırlamak için bir fonksiyon.
export const resetGame = () => {
  chess.reset(); 
  updateGame();
};

