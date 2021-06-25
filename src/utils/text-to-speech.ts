export class TextToSpeechService {
  async say(content: string) {
    const messages = this.splitContentToOneFiftyChars(content);

    for (let i = 0; i < messages.length; i++) {
      await this.speechContent(messages[i]);
    }

    // const utterence = new SpeechSynthesisUtterance(content);
    // speechSynthesis.speak(utterence);
    // return new Promise((res) => {
    //   const func = setInterval(() => {
    //     if (speechSynthesis.speaking === false) {
    //       clearInterval(func);
    //       res(content);
    //     }
    //   }, 100);
    // });
  }

  cancel() {
    speechSynthesis.cancel();
  }

  private splitContentToOneFiftyChars(msg: string) {
    let message = msg;
    let arr: string[] = [];

    while (message.length > 0) {
      let split = message.slice(0, 100);
      console.log(split);
      arr.push(split);
      message = message.slice(100, -1);
    }

    return arr;
  }

  private speechContent(content: string) {
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
}
