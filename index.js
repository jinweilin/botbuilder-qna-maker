/**
 * @fileOverview Calls Microsoft's QnA Maker service and returns an answer from
 * that service. This can be used to build a bot whose logic is partially based
 * on the QnA maker responses.
 * @author Anton Ivanov <anton@ivanov.hk>
 */

const request = require('request');

/**
 * Calls Microsoft's QnA Maker service and returns an answer from
 * that service. This can be used to build a bot whose logic is partially based
 * on the QnA maker responses.
 */
class QnA {
  /**
   * Creates a new instance of the QnA maker request helper.
   * @param {string} serviceGuid - The GUID of the QnA maker service (app);
   * @param {string} subscriptionKey - The subscription key of the QnA maker
   *    service obtained at qnamaker.ai.
   * @param {string} [host] - The QnA Maker server. Default is West US. Can
   *    be set to another URL that must start with 'https://' and end with
   *    '/qnamaker/v2.0' or similar.
   */
  constructor(serviceGuid, subscriptionKey,
    host = 'https://westus.api.cognitive.microsoft.com/qnamaker/v2.0') {
    this.serviceGuid = serviceGuid;
    this.subscriptionKey = subscriptionKey;
    this.host = host;

    if (!host.startsWith('http') || !host.includes('qnamaker')) {
      throw new Error('The host parameter to botbuilder-qna-maker must start' +
        ' with "http" and end with a string like "/qnamaker/v2.0". Go to ' +
        'qnamaker.ai, find "Settings" in your service, click "Publish" and ' +
        'copy the "Host" value from the sample HTTP request displayed.');
    }
  }

  /**
   * Sends the `question` to the QnA maker service and retrieves the answer.
   * @param {string} question - The question asked by user.
   * @returns {object} The raw answer data from the QnA maker.
   */
  getRawAnswer(question) {
    return new Promise((resolve, reject) => {
      let url =
        `${this.host}/knowledgebases/${this.serviceGuid}/generateAnswer`;
      request.post(
        // Request params:
        {
          url: url,
          method: 'POST',
          json: true,
          body: {
            question: question,
          },
          headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': this.subscriptionKey,
          },
        },

        // Callback:
        (error, response, body) => {
          if (error) reject(error);
          resolve(body);
        }
      );
    });
  }

  /**
   * Sends the `question` to the QnA maker and retrieves the highest scoring
   * answer as string, without any metadata.
   * @param {string} question - The question asked by user.
   * @returns {string} The answer from the QnA maker.
   */
  async answer(question) {
    let rawData = await this.getRawAnswer(question);
    if (rawData && rawData.answers && rawData.answers[0]) {
      return rawData.answers[0].answer;
    } else {
      console.log(rawData);
      throw new Error('Invalid answer received from the QnA server.');
    }
  }

  /**
   * Sends the json object to the QnA maker and updates the knowledgeBase
   * json formate as string, without any metadata.
   * ex:jsonObject
    { 
      "add": {
        "qnaPairs": [
          {
            "answer": "Hello, How can I help you?",
            "question": "Hello"
          }
        ],
        "urls": [
          "https://docs.microsoft.com/en-in/azure/cognitive-services/qnamaker/faqs"
        ]
      },
      "delete": {
        "qnaPairs": [
          {
            "answer": "The QnA Maker tool ingests and matches data in UTF-16 encoding. This means that any language should work as is. Having said that, we have only extensively tested the relevance of the service for EN yet.",
            "question": "Does the QnA Maker support non-EN languages?"
          }
        ]
      }
    }
   * @param {jsonObject} 
   * @returns {string} The value of string is `00` when the QnA maker has done without error.
  */
  updateRawKnowledgeBase(jsonObject) {
    return new Promise((resolve, reject) => {
      let url =
        `${this.host}/knowledgebases/${this.serviceGuid}`;
      request.patch(
        // Request params:
        {
          url: url,
          method: 'PATCH',
          json: true,
          body: jsonObject,
          headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': this.subscriptionKey,
          },
        },
        // Callback:
        (error, response, body) => {
          if (error) reject(error);
          resolve(body);
        }
      );
    });
  }

  /**
   * Sends the json object to the QnA maker and updates the knowledgeBase
   * json formate as string, without any metadata.
   * ex:jsonObject
    { 
      "add": {
        "qnaPairs": [
          {
            "answer": "Hello, How can I help you?",
            "question": "Hello"
          }
        ],
        "urls": [
          "https://docs.microsoft.com/en-in/azure/cognitive-services/qnamaker/faqs"
        ]
      },
      "delete": {
        "qnaPairs": [
          {
            "answer": "The QnA Maker tool ingests and matches data in UTF-16 encoding. This means that any language should work as is. Having said that, we have only extensively tested the relevance of the service for EN yet.",
            "question": "Does the QnA Maker support non-EN languages?"
          }
        ]
      }
    }
   * @param {jsonObject} 
   * @returns {string} The value of string is `00` when the QnA maker has done without error.
   */
  async updateKnowledgeBase(jsonObject) {
    let rawData = await this.updateRawKnowledgeBase(jsonObject);
    if (typeof rawData == 'undefined') {
      return "00";
    } else {
      console.log(rawData);
      throw new Error('Invalid QuesttionAnswer added from the QnA server.');
    }
  }
}

/** The answer returned by QnA maker when there is no suitable answer found. */
QnA.FAILED_ANSWER = 'No good match found in the KB';

module.exports = QnA;