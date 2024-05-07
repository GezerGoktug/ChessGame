import { useEffect, useState } from "react";
import Board from "../components/Board";
import subjectGame, { initGame, moveToLastRow } from "../Game";
import EndGameContent from "../components/EndGameContent";
import { GrFormNextLink } from "react-icons/gr";

const GamePage = () => {
  const [modal, setModal] = useState(true);
  const [chanceModal, setChanceModal] = useState(null);
  const [turn, setTurn] = useState("w");
  const [board, setBoard] = useState([]);
  const [isGameOver, setİsGameOver] = useState();
  const [result, setResult] = useState();

  useEffect(() => {
    //! Sayfa açıldığı an oyunu başlat.
    initGame();
    //! Oluşturduğumuz BehaviorSubject e abone oluyoz.Oyun durum verilerini çekmek için
    //! Burda subject game de her Behavior Subject guncelleme(next() metodu ile) işleminde
    //! Sürekli subject içi güncellicek ve burdaki abone işlemi içindeki fonksiyonu tekrar çalıştırıcak.
    //! Böylece her guncelleme işleminde tahtayı ve oyun durumunu güncelleyebilcez.
    const subscribe = subjectGame.subscribe((sub) => {
      setTurn(sub.turn);
      setBoard(sub.chess);
      setResult(sub.result);
      setİsGameOver(sub.isGameOver);
    });

    return () => subscribe.unsubscribe();
  }, []);

  const chanceSquare = (type) => {
    //! Taş değiştirme modalından seçilen taşa göre taşı değiştiren
    //! ve taşı son sıraya taşıyan fonksiyonu çağırıyoz.
    moveToLastRow(chanceModal, type, setChanceModal);
  };
  return (
    <div
      className={`${
        turn === "w" ? "bg-slate-300" : "bg-slate-800"
      } min-h-screen flex justify-center  items-center relative`}
    >
      {/* Oyun bittikten sonraki modal ekranı  */}
      {isGameOver
        ? modal && <EndGameContent result={result} setModal={setModal} />
        : null}
      {/* Oyun bittikten sonraki modal ekranı açma kapama ikonu  */}
      {isGameOver && !modal && (
        <div
          className="p-3 cursor-pointer outline outline-green-800 transition-colors hover:bg-green-500 hover:outline-green-900  fixed top-24 left-0 bg-green-400"
          onClick={() => setModal(true)}
        >
          <GrFormNextLink className="  text-3xl text-white" />
        </div>
      )}
      {/* Piyon en sona gittikten sonra taş değiştirme modalı  */}
      {chanceModal && (
        <div className="absolute bg-amber-500/70 w-1/2 h-48 flex justify-center gap-8 items-center">
          {["b", "k", "n", "q", "r"].map((letter, i) => (
            <img
              key={i}
              onClick={() => chanceSquare(letter)}
              className="cursor-pointer"
              src={`img/${letter}_${chanceModal.color}.png`}
            />
          ))}
        </div>
      )}
      <Board board={board} setChanceModal={setChanceModal} />
    </div>
  );
};

export default GamePage;
