import { OpenAI } from 'openai';
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const openai = new OpenAI(process.env.OPENAI_API_KEY);

  const { message, conversation } = req.body;

  try {
    const result = await openai.complete({
      engine: 'davinci-codex',
      prompt: conversation + message,
      temperature: 0.7,
      max_tokens: 150,
    });

    return res.json({ message: result.data.choices[0].text });
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong.' });
  }
}
