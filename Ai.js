const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI);
const Answer = require('./main.js');


async function processText(promt) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const prompt = promt

  const result = await model.generateContent(prompt);
  const response = await result.response;
  text = response.text();
  console.log(text);
  Answer.recieveAnswer(text);
}



module.exports = { processText };
