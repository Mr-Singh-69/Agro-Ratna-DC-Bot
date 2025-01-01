const { GoogleGenerativeAI } = require("@google/generative-ai");
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI);

function processText(promt) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const prompt = promt

  const result = await model.generateContent(prompt);
  const response = await result.response;
  text = response.text();
  console.log(text);
  return text;
  console.log('Received text:', text); 
}

module.exports = { processText };
