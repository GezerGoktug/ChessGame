import Square from "./Square";
import SquareBoard from "./SquareBoard";

const Board = ({ board, setChanceModal }) => {
  //! Aldığı index bilgisi ile karenin arka plan rengi için ya true
  //! ya da false uretir.True da farklı renk false da farklı renk.
  const color = (i) => {
    const a = i % 8; //! Sütun konumu
    const b = Math.abs(Math.floor(i / 8) - 7); //! Satır Konumu
    return (a + b) % 2 === 0;
  };
  //! Aldığı index bilgisi ile a8 b8 c5 tarzı bir pozisyon bilgisi döndürür.
  const position = (i) => {
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const a = i % 8; //! Sütun konumu
    const letterPosition = letters[a];
    const b = Math.abs(Math.floor(i / 8) - 7); //! Satır Konumu
    return `${letterPosition}${b + 1}`; //! a8 ,b8 ,c8...
  };
  return (
    <div className="bg-green-700 min-[300px]:w-[300px] min-[300px]:h-[300px] min-[380px]:w-[380px] min-[380px]:h-[380px] min-[500px]:w-[500px] min-[500px]:h-[500px]  md:w-[640px] md:h-[640px] flex flex-wrap">
      {/* Flat() ile [[],[]] tarzında iç içe dizileri tek bir boyutlu diziye dönüştürüyoz  */}
      {board.flat().map((brd, i) => (
        <Square
          key={i}
          position={position(i)}
          setChanceModal={setChanceModal}
          color={color(i)}
        >
          {brd && <SquareBoard brd={brd} position={position(i)} />}
        </Square>
      ))}
    </div>
  );
};

export default Board;
