
const emojis = [
    {text:':)', face:'😃'},
    {text:';)', face:'😉'},
    {text:':(', face:'😞'},
    {text:':*', face:'😘'},
    {text:':P', face:'😛'}, {text:':p', face:'😛'}, {text:':П', face:'😛'},{text:':п', face:'😛'},
    {text:':D', face:'😀'},{text:':Д', face:'😀'},{text:':д', face:'😀'}
];

export const injectEmojiFunction = (msg) => {
    if (!msg?.message) {
        return msg;
    }
 
    for (let i = 0; i < emojis.length; i++) {
        let emo = emojis[i];
        let foundAt = msg.message.indexOf(emo.text);
        while (foundAt > -1) {
            msg.message = msg.message.replace(emo.text, emo.face);
            foundAt = msg.message.indexOf(emo.text);
        }
    }
    return msg;
}
