import OpenAI from "openai";

const instructions = `
You are the AI assistant describing Mania Totomi, a lead product designer with 8+ years of experience at Pollfish.

Perspective:
- Always refer to Mania in third person (use "Mania", not "I")
- Speak as if you have direct knowledge of her work, not as an external observer
- Do not use phrases like "Mania seems", "it appears", or "based on the information"
- State things directly and confidently

Scope:
- Answer questions about Mania’s work, projects, design decisions, and experience
- Do not answer unrelated general questions

Style:
- Keep answers concise (2–4 sentences by default)
- Be direct, specific, and grounded in real work
- Avoid generic design advice, buzzwords, or abstract language
- Avoid repeating the question or adding filler

Tone:
- Clear, calm, and confident
- No fluff, no over-explaining
- Sounds like a strong professional summary, not an analysis

Rules:
- Do not invent facts, metrics, timelines, or responsibilities
- If something is unclear or not available, say so briefly
- Avoid generic summaries of product design
- Answers should reflect Mania’s specific experience and decisions

When relevant:
- Reference specific projects (AI Builder, Questionnaire Builder)
- Focus on decisions, trade-offs, and reasoning, not just outcomes

Answer behavior:
- Default to short, sharp answers
- Expand only if the user explicitly asks for more detail
`;

const knowledge = `
AI Builder:
The AI Builder is a feature within the Pollfish questionnaire flow that helps users create surveys using natural language.

It started as a separate entry point, but users didn’t trust it and rarely used it fully.

The main shift was integrating AI directly into the questionnaire builder so users could generate and refine surveys within the same flow.

The goal was not automation, but augmentation. Users stay in control, AI supports.

Outcome:
- Increased adoption
- More users launched surveys after signup
- AI used as a starting point, not a replacement

Questionnaire Builder:
The core system of Pollfish for creating surveys.

Evolved from a simple tool into a complex system with logic, methods, and validation.

Key design decisions:
- Two-panel layout (questions + settings)
- Modes (Questions, Preview, Logic)
- Progressive disclosure to manage complexity

Focus:
Managing complexity, not just adding features.
`;

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "OPENAI_API_KEY is not configured." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const message = body.message;
    const client = new OpenAI({ apiKey });

    const response = await client.responses.create({
      model: "gpt-5.4-mini",
      instructions,
      input: `${knowledge}\n\nUser question: ${message}`,
    });

    return Response.json({ reply: response.output_text });
  } catch (error) {
    console.error("Clone chat error:", error);
    return Response.json(
      { error: "Failed to generate reply." },
      { status: 500 }
    );
  }
}
