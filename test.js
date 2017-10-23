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
})();
