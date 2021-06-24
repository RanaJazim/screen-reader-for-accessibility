export class TextToSpeechService {
  say(content: string) {
    const utterence = new SpeechSynthesisUtterance(content);
    speechSynthesis.speak(utterence);
    return new Promise((res) => {
      const func = setInterval(() => {
        if (speechSynthesis.speaking === false) {
          clearInterval(func);
          res(content);
        }
      }, 100);
    });
  }

  cancel() {
    speechSynthesis.cancel();
  }
}
