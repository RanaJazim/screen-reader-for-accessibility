import $ from "jquery";
// import ScreenReader from "./utils/screen-reader";

// function runApp() {
//   const reader = ScreenReader();

//   $(document).keydown((e) => {
//     if (reader.isReaderEnabled()) {
//       if (e.code === "ArrowRight") reader.readFromNext();
//       else if (e.code === "ArrowLeft") reader.readFromPrev();
//       else if (e.code === "KeyS") reader.stop();
//     } else {
//       if (e.code === "KeyR" && !e.ctrlKey) reader.readFromStart();
//     }
//   });
// }

// runApp();

// custom code here
function runApp() {
  console.log("say");

  const msgs = ["first message", "second message", "third message"];

  $(document).keydown(async (e) => {
    if (e.code === "KeyR") {
      for (let i = 0; i < msgs.length; i++) {
        await speak(msgs[i]);
      }
    }
  });
}

function speak(message) {
  const utterance = new SpeechSynthesisUtterance(message);
  speechSynthesis.speak(utterance);
  return new Promise((resolve) => {
    const id = setInterval(() => {
      if (speechSynthesis.speaking === false) {
        clearInterval(id);
        resolve(id);
      }
    }, 100);
  });
}

runApp();
