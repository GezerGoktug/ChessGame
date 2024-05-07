import EndGameOverlay from "./EndGameOverlay";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdRestartAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { resetGame } from "../Game";
const EndGameContent = ({ setModal, result }) => {
  const navigate = useNavigate();
  //! Oyunu yeniden başlatır
  const restartGame = () => resetGame();
  
  //! Ekranda herhangi bi yere basılırsa (modal harici) modalı kapat
  const screenHandle = (e) => {
    if (e.target.classList.contains("modal")) setModal(false);
  };
  return (
    <EndGameOverlay>
      <div
        onClick={screenHandle}
        className="modal w-full h-full fixed top-0 left-0 bg-black/75 flex justify-center items-center "
      >
        <div className="w-full py-12 bg-emerald-900/90 flex flex-col justify-center items-center text-slate-200">
          <h2 className="mb-12 text-3xl sm:text-5xl lg:text-7xl font-medium">
            {result}
          </h2>
          <button
            onClick={() => navigate("/")}
            className="flex items-center  justify-center gap-3  p-4  text-2xl font-bold w-3/4 lg:w-1/2 outline outline-4 outline-slate-800 rounded-xl bg-slate-700 hover:bg-slate-800 hover:outline-slate-900 transition-colors"
          >
            <IoMdArrowRoundBack />
            <span>Back Home Page</span>
          </button>
          <button
            onClick={restartGame}
            className="flex items-center  justify-center gap-3 mt-8  p-4  text-2xl font-bold w-3/4 lg:w-1/2 outline outline-4 outline-slate-800 rounded-xl bg-slate-700 hover:bg-slate-800 hover:outline-slate-900 transition-colors"
          >
            <MdRestartAlt />
            <span>Restart Game</span>
          </button>
          <button
            onClick={() => setModal(false)}
            className="flex items-center  justify-center gap-3 mt-8  p-4  text-2xl font-bold w-3/4 lg:w-1/2 outline outline-4 outline-slate-800 rounded-xl bg-slate-700 hover:bg-slate-800 hover:outline-slate-900 transition-colors"
          >
            <IoMdArrowRoundBack />
            <span>Back Game</span>
          </button>
        </div>
      </div>
    </EndGameOverlay>
  );
};

export default EndGameContent;
