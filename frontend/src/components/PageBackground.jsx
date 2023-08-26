import "./PageBackground.css";
import { memo } from "react";
import BackgroundImgSrc from "../assets/background_comic.png?url"

function PageBackground({ children }) {
  return (
    <div className="image-container">
      <img src={BackgroundImgSrc} className="background-image"/>
      <div className="content">{children}</div>
    </div>
  );
}

export default memo(PageBackground);
