import axios from 'axios';


const geminiResponse = async (command,assistantName,userName) => {

    try {
        const apiUrl = process.env.GEMINI_API_URL;

        const prompt = `You are a voice assistant named ${assistantName} created by ${userName}. Respond ONLY with a single compact JSON object and nothing else.

{
  "type": "general" | "google-search" | "youtube-search" | "youtube-play" | "get-time" | "get-date" | "get-day" | "get-month" | "calculator-open" | "instagram-open" | "facebook-open" | "weather-show",
  "userInput": "<the user request without the wake word '${assistantName}' and without filler>",
  "response": "<very short, natural, speakable reply>"
}

Rules:
- Do not include markdown, code fences, apologies, or extra text. Only JSON.
- If asked who created you, answer with ${userName} in the response.
- If the intent is general Q&A, keep response concise (<= 18 words).
- If user mentions Google/YouTube search or play, set appropriate type and reduce userInput to just the query terms.

User input: ${command}`;
        

        const result = await axios.post(apiUrl, {

            "contents":[{
                "parts":[{
                    "text": prompt
                }]
            }]

        })
        return result.data.candidates?.[0]?.content?.parts?.[0]?.text;

    } catch (error) {
        console.log(error);

    }
}

export default geminiResponse;