export const chatWithYavizAI = async (message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, history }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Failed to fetch AI response');
    }

    const data = await response.json();
    return data.text || "I'm sorry, I couldn't process that.";
  } catch (error) {
    console.error("AI Error:", error);
    return "Something went wrong in my digital brain. Please try again later!";
  }
};
