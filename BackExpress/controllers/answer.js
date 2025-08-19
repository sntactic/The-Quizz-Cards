const OpenAI = require('openai')


const client = new OpenAI({
    apiKey: "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"
});

exports.getAnswer = async (req, res) => {
    const { question } = req.body;

    if (!question) {
    return res.status(400).json({ error: "La question est requise" });
    }

    try {
    const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
        {
            role: "system",
            content: "Tu es un expert en quiz. Donne uniquement la réponse correcte, concise et claire sans aucune explication."
        },
        { role: "user", content: question }
        ],
    });

    const answer = completion.choices[0]?.message?.content?.trim() || "";

    res.json({ answer });
    } catch (error) {
    console.error("Erreur GPT:", error);
    res.status(500).json({ error: "Erreur lors de la génération de la réponse" });
    }
};