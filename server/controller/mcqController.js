import OpenAI from 'openai';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateMCQs = async({ text, count })=> {

  const prompt = `
Generate ${count} multiple choice question based on the following text. 
Each question should have 4 options and indicate the correct answer.

Text:
${text}
`;

  try {
    // console.log(prompt);

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });
    
    console.log(response);
    const raw = response.choices[0].message.content;
    return raw;
  } catch (err) {
    console.error('Error generating MCQs:', err);
    throw new Error('Failed to generate MCQs');
  }
};
