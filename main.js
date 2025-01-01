const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const keepAlive = require('./keep_alive');
require('dotenv').config();

keepAlive();

client.once('ready', () => {
    console.log('Agro Ratana is online!');
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    const keywords = {
        modernFarming: [
            'modern farming', 'something about farming', 'features of farming'
        ],
        farmBetter: [
            'make my farm better', 'improve my farm', 'help with farming'
        ]
    };

    if (message.mentions.has(client.user)) {
        message.reply('Hello! I am Agro Ratana, a multitasking farming robot!');
    }

    if (keywords.modernFarming.some(keyword => message.content.toLowerCase().includes(keyword))) {
        message.reply('I am equipped with features that make farming modern and efficient! I can plough fields, sow seeds, monitor soil moisture, cut grass, remove stones, and even buzz a siren to protect the fields from animals or birds in future versions. Stay tuned for more advancements!');
    }

    if (keywords.farmBetter.some(keyword => message.content.toLowerCase().includes(keyword))) {
        message.reply(`Here are some ways I can help make your farm better:
    
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
    }

    // Provide bot bio and photo
    if (message.content.toLowerCase().includes('tell me about yourself')) {
        const bioEmbed = new EmbedBuilder()
            .setColor(0x00ff00)
            .setTitle('Agro Ratana')
            .setDescription('I am Agro Ratana, a multitasking farming robot designed to revolutionize modern agriculture!')
            .addFields(
                { name: 'Features', value: 'Ploughing, Seed Sowing, Soil Moisture Monitoring, Grass Cutting, Stone Removal, and more!' },
                { name: 'Future Plans', value: 'AI-powered management, automatic water systems, and nutrient detection.' }
            )
            .setThumbnail('https://example.com/robot-thumbnail.png') // Replace with your image URL
            .setFooter({ text: 'Your modern farming assistant' });

        message.reply({ embeds: [bioEmbed] });
    }
});

// Log in to Discord
client.login(process.env.TOKEN);

