import { useDrop } from "react-dnd";
import { move } from "../Game";

const Square = ({ children, color, position, setChanceModal }) => {
  const [, drop] = useDrop({
    accept: "chess",
    drop: (item) => {
      //! item id de "a8_r_w" tarzında veri var bunu Square board dan aldık .
      //! Split ile ["a8","r","w"] tarzında diziye dönüştürdük.
      //! destructing ile de a8 verisini ne fromPosition değerini atayıp aldık.
      const [fromPosition] = item.id.split("_");
      //! Chess js de tahtada ilerlemeyi sağlayan fonksiyonu çalıştırır.
      move(fromPosition, position, setChanceModal);
    },
  });
  return (
    <div
      ref={drop}
      className={`${
        color ? "bg-green-800" : "bg-green-200"
      } w-[12.5%] h-[12.5%] flex items-center justify-center cursor-grab`}
    >
      {children}
    </div>
  );
};

export default Square;
