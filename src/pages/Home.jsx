import {
  FaChess,
  FaChessBishop,
  FaChessKing,
  FaChessKnight,
  FaChessPawn,
  FaChessQueen,
  FaChessRook,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="  bg-gradient-to-b from-slate-700 to-slate-900   h-screen flex items-center justify-center ">
      <div className=" mx-12 flex  items-center w-full md:w-3/4 xl:w-1/2">
        <div className="w-full text-center flex flex-col justify-center items-center  h-max  text-slate-50 ">
          <h1 className=" text-4xl min-[400px]:text-5xl min-[560px]:text-7xl md:text-8xl flex items-center font-semibold gap-2 min-[400px]:gap-6">
            <FaChess className=" text-amber-900" />
            <span className="whitespace-nowrap">Chess Game</span>
          </h1>
          <div className="flex items-center gap-4 text-slate-300 justify-start mt-12 text-3xl  ">
            <FaChessKing />
            <FaChessKnight />
            <FaChessBishop />
            <FaChessPawn />
            <FaChessQueen />
            <FaChessRook />
          </div>
          <button
            onClick={() => navigate("/game")}
            className="flex items-center  justify-center gap-3 p-4 my-9  text-2xl font-bold w-3/4 sm:w-1/2 outline outline-4 outline-emerald-800 rounded-xl bg-emerald-600 hover:bg-emerald-700 hover:outline-emerald-900 transition-colors"
          >
            <FaChessPawn />
            <span>Start Game</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
