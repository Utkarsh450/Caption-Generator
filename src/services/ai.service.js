const { GoogleGenAI } = require("@google/genai");

// The client picks up the API key from the env var GEMINI_API_KEY.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/**
 * Generates a caption for a base64-encoded image.
 * @param {string} base64ImageData - Image data as a base64 string (no data URL prefix).
 * @param {string} mimeType - The MIME type of the image, e.g., "image/png" or "image/jpeg".
 * @returns {Promise<string>} - The generated caption.
 */
async function generateCaption(base64ImageData, mimeType = "image/png") {
  // Basic validation
  if (typeof base64ImageData !== "string" || !base64ImageData.trim()) {
    throw new Error("base64ImageData must be a non-empty base64 string.");
  }
  if (typeof mimeType !== "string" || !/^image\/(png|jpe?g|webp)$/i.test(mimeType)) {
    throw new Error(`Unsupported or invalid MIME type: ${mimeType}`);
  }

  // Build contents payload (fixed typo: mimeType, not mimiType)
  const contents = [
    {
      inlineData: {
        mimeType: mimeType,
        data: base64ImageData,
      },
    },
    {
      text: "Caption this image.",
    },
  ];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config:{
        systemInstruction:`
        You are an exper in generating caption for images.
        You generate single caption for the image.
        Your caption should be short and concise.
        You use # and emojis in the caption.
        Generate caption in tapoori language.
        Create aesthetic caption.`
      }
    });

    // The response shape may vary; attempt to extract text intelligently.
    if (response?.text) {
      return response.text;
    }

    // Fallback: if the SDK nests outputs
    if (Array.isArray(response?.outputs) && response.outputs.length) {
      // try common fields
      const first = response.outputs[0];
      if (first?.text) return first.text;
      if (first?.output) return first.output;
    }

    // Last resort: stringify
    return JSON.stringify(response);
  } catch (err) {
    // Surface more helpful error
    const msg = err?.message || String(err);
    throw new Error(`Failed to generate caption: ${msg}`);
  }
}

module.exports = generateCaption;
