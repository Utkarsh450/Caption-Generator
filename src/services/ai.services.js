import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ // here you are initiating a client or a instance to use Google AI Services by giving your api key
    apiKey: "AIzaSyB4emKwaV0TxSzXYXIx6DaBIvW9rn4Nuug" // with the api key you are telling about the services, requests for the google servers
});

async function main() {
  const response = await ai.models.generateContent({ // this is the method provided by the google to use gemini
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

main();