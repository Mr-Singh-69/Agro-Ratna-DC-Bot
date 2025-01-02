const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const keepAlive = require('./keep_alive');
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI);
const { NlpManager } = require('node-nlp');

keepAlive();

const manager = new NlpManager({ languages: ['en'] });

client.once('ready', () => {
    console.log('Agro Ratana is online!');
});
//1st

manager.addDocument('en', 'what are your features', 'commands.features');

manager.addAnswer('en', 'commands.features', 'I am equipped with features that make farming modern and efficient! I can plough fields, sow seeds, monitor soil moisture, cut grass, remove stones, and even buzz a siren to protect the fields from animals or birds in future versions. Stay tuned for more advancements!');

//2nd

manager.addDocument('en', 'make my farm better or improve my farm or help with farming', 'commands.improvement');

manager.addAnswer('en', 'commands.improvement', `Here are some ways I can help make your farm better:  
        **Ploughing**: Our Ploughing Mechanism will plough the field when you tell it to. It consists of one Servo Motor and is connected with the Arduino Uno.
    
        **Seed Sowing Mechanism**: It will sow seeds automatically when required in the field. It consists of a Servo Motor and a creative Bottle System idea invented by the team.
    
        **Soil Moisture**: It will automatically give water to the field when required. The flow of water can be controlled. It consists of a Soil Moisture Sensor, Arduino Nano, and a Breadboard.
    
        **Grass Cutter**: It will cut the grass of the field when required. It is controlled by a DC Motor and Arduino Nano.
    
        **Stone Remover**: It will remove stones located on the particular land. It is controlled by a DC Motor.
    
        **Future Possibilities**:
        - Smart AI-powered robots that can fully operate and manage the farm.
        - Systems that provide water to the soil when needed automatically.
        - Robots that detect animals or birds in the fields and buzz a siren to scare them away.
        - Robots that detect the nutrients present in the soil and suggest which crops can be grown (not in our robot yet, but we aim to add it).`);

//3rd
manager.addDocument('en', 'what is your purpose or whats reason behind making you', 'commands.purpose');

manager.addAnswer('commands.purpose',`According to an UN report by the year 2050 there will be 9.7 billion people on earth. Leading a significant increase in global food demand, therefore use of Modern technologies Including robotics, have become crucial in agriculture.  Also, according to the reports of (Economic times) Share of agriculture in India's GDP declined to 15 percent last financial year from 35 percent in 1990-91. Also, according to the reports of (Hiralal magudar memorial college for girls) technologies can improve the growth rate of agriculture in India by various ways`)

//4th   who has made you

manager.addDocument('en', 'what are your focus areas or what do focus on','commands.focusareas');

manager.addAnswer('commands.focusareas',`Our focus areas are:
    Fast and good farming.
    Crops remain healthy.
    Automatic Water System for field.
    Automatic Seed Sowing Mechanism.
    Automatic Grass Cutting.
    Automatic Farming for large fields and more crops production.`);

//5th

manager.addDocument('en', 'who has made you or whats your team','commands.team');

manager.addAnswer('commands.team',`We are a team of tech enthusiasts and have come up with the ideas of Agro Ratna. The roles of each member of the team behind “Agro Ratna"is outlined below:
Syed Daniyal The Leader Of Our Project was also the Programmer And The Designer Of The Robot. Daniyal also made the Synopsis and all documents of the project, Daniyal also did some research and found some sources listed in our Website in the Sources Portion. Shuhaab is the Vice Leader of our project, He worked fully on the website and helped Daniyal to lead the team. He also did programming with Daniyal and designed the robot with the team and also did some of The Hardware work. Siddiq who was also an important part of the project did work on the project and designed the Seed Sowing Mechanism fully with Daniyal and he is also the co-speaker for the Demonstration of the project. Amaan who managed to help other members and also led the decoration part he also did some designing and hardware work. Muqadas significantly contributed to the project and helped through various factors like seed sowing and decoration. Our ATAL Lab instructor, Mr. Shafat Majeed lone. put the product together and did the majority of the circuit-work and showed his incredible guidance for the team in every factor of the project.in the v2 we will have a new member named S.Navdeep Singh`);

//6th 

manager.addDocument('en', 'what are you future targets or future goals','commands.targets');

manager.addAnswer('commands.targets',`The V1 of the project was completed in 4 months in 2024. Now the team of tech enthusiasts are willing to make “AGRO RATNA”V2 .Agro Ratna will be more efficient and 80% market ready. The team is also willing to add more features like it will work on solar batteries, we will add NPK Sensors, We will make systems in which if the robot will detect any animals/bird in the fields then it will buzz a siren.We will try to add more features by the time . The work for the project V2 will start in 2025. We will also try to focus and work on some other things and we will make it much better than the V1 of Agro Ratna. We will also try To make it capable to do work on farms.
(We will add more and features with the passage of time and we will come back with more ideas)`);

// Training
(async () => {
    await manager.train();
    manager.save();
  })();

  
// Discord Part
client.on('messageCreate',async message => {
    if (message.author.bot) return;

    const response = await manager.process('en', message.content);
    
    
    if (message.mentions.has(client.user)) {
        message.reply('Hello! I am Agro Ratana, a multitasking farming robot!');
    }

    console.log("Response from node-nlp:", response);

    // If there's an intent with a response, reply with that response
    if (response.intent !== 'None') {
    message.reply(response.answer);
    }

    if (message.content.startsWith('AR Ask ')) {
    const textToSend = message.content.slice(9).trim(); 
    message.channel.send('Text Sent For Proccesing');
    gemini();
   async function gemini() {
      const promt = message.content.slice(7).trim(); 
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    
      const prompt = textToSend
    
      const result = await model.generateContent(prompt);
      const response = await result.response;
      text = response.text();
      console.log(text);
      message.reply(text);
    }
    
  }
    
});
    
    
client.login(process.env.TOKEN);

