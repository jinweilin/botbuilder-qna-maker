/**
 * Tests the botbuilder-qna-maker by sending a test request to the server
 * and printing response to console.
 */

const QnA = require('./index');

(async () => {
  const serviceGuid = '4514ef7e-f6fb-44e8-a01f-29dc35dd2903';
  const subscriptionKey = '4882cdde92a84e8595e534da2e17ddca';

  try {
    const qna = new QnA(serviceGuid, subscriptionKey);
    const answer = await qna.answer('hi!');

    console.log(answer);
  } catch (error) {
    console.log(error);
  }
})();
