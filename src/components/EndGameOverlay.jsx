import ReactDOM from "react-dom";

const EndGameOverlay = (props) => {
  const portalElement = document.getElementById("overlay");
  return <>{ReactDOM.createPortal(<>{props.children}</>, portalElement)}</>;
};
export default EndGameOverlay;
