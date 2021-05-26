import $ from "jquery";
import ScreenReader from "./utils/screen-reader";

function runApp() {
  const reader = ScreenReader();

  $(document).keydown((e) => {
    if (reader.isReaderEnabled()) {
      if (e.code === "ArrowRight") reader.readFromNext();
      else if (e.code === "ArrowLeft") reader.readFromPrev();
      else if (e.code === "KeyS") reader.stop();
    } else {
      if (e.code === "KeyR" && !e.ctrlKey) reader.readFromStart();
    }
  });
}

console.log(document.querySelectorAll("*"));

runApp();
