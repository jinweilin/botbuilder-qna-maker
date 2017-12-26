/**
 * Tests the botbuilder-qna-maker by sending a test request to the server
 * and printing response to console.
 */

const QnA = require('./index');

(async () => {
  const serviceGuid = '<INSERT SERVICE ID>';
  const subscriptionKey = '<INSERT SUBSCRIPTION KEY>';

  try {
    const qna = new QnA(serviceGuid, subscriptionKey);
    const answer = await qna.answer('hi!');

    console.log(answer);
  } catch (error) {
    console.log(error);
  }

  try {
    const qna = new QnA(serviceGuid, subscriptionKey);
    const questionAnwser = {add: {
      qnaPairs: [{
            answer: "Hello, How can I help you?",
            question: "Hello"
          }
        ]
      }
    };
    const state = await qna.updateKnowledgeBase(questionAnwser);
    console.log(state);
  } catch (error) {
    console.log(error);
  }
})();
