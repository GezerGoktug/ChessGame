import { DragPreviewImage, useDrag } from "react-dnd";

const SquareBoard = ({ brd, position }) => {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "chess",
    //! Square e "a8_r_w" tarzında veri yolladık.
    item: { id: `${position}_${brd.type}_${brd.color}` },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag}>
      {/* Sürüklenmekte iken ikonun üzerinde durcak olan resim */}
      <DragPreviewImage
        src={`img/${brd.type}_${brd.color}.png`}
        connect={dragPreview}
      />
      {/* Sürükleniyor ise img yi gösterme  */}
      {!isDragging && (
        <img
          className="w-full h-full"
          src={`img/${brd.type}_${brd.color}.png`}
        />
      )}
    </div>
  );
};

export default SquareBoard;
