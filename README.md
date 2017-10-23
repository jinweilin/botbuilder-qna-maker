Wrapper for Microsoft QnA Maker for Microsoft Bot Framework
===================
###Short sample
```js
const QnA = require('botbuilder-qna-maker');

// Send request to QnA maker, get an answer
const serviceGuid = '<INSERT SERVICE ID>';
const subscriptionKey = '<INSERT SUBSCRIPTION KEY>';

const qna = new QnA(serviceGuid, subscriptionKey);
const answer = await qna.answer('hi!');

console.log(answer);
```

###What's it for?
This package provides a shortcut to call the Microsoft QnA Maker service and get a response. It works with bots written in Node.js using Microsoft Bot Framework (see the `botbuilder` package), but actually can be used in any code, not just in a bot.

###Methods and Static Members

The **constructor** takes two required and one optional parameter:

`const qna = new QnA(serviceGuid, subscriptionKey, host);`

You can get all of them from the Settings page at qnamaker.ai.

As for the `host`, by default we're using the West US server ( `https://westus.api.cognitive.microsoft.com/qnamaker/v2.0`) but you can change it if the service becomes available in another region.

**Methods:**
* `async answer(question)` - retrieves an answer and returns it as string, without any metadata.
* `async getRawAnswer(question)` - retrieves an answer together with some metadata like the original question and the confidence score. Returns an object.

**Static Members:**
`QnA.FAILED_ANSWER = 'No good match found in the KB';`

This is the answer returned by QnA maker when there is no suitable answer found. You can use it to output your own message:

```js
if (answer === QnA.FAILED_ANSWER) {
  console.log('Oops, no answer found.');
} else { 
  console.log(answer);
}
```

###Comments and suggestions
If you have any comments, contact me here: https://github.com/catcher-in-the-try/