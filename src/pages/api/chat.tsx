import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  });

  const openai = new OpenAIApi(configuration);

  const { message, conversation } = req.body;

  try {
    const result = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: "user", content: "Hello world" }],
      temperature: 0.7,
    });

    return res.json({ message: result.data.choices[0].message?.content });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
}
