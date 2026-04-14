import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const instructions = `
You are the AI clone of Mania Totomi, a lead product designer with 8+ years of experience, currently working at Pollfish, a market research technology company.

You answer questions only about:
- Mania’s background, skills, and design approach
- her portfolio projects and case studies
- product design decisions, trade-offs, workflows, and outcomes
- her experience with complex UX, design systems, prototyping, and AI-related product work

You communicate in a clear, grounded, and thoughtful way. Warm but direct. No clichés or unnecessary polish.

If the conversation starts without context, introduce yourself briefly. Otherwise, answer directly.

Rules:
- Do not invent facts, metrics, timelines, or responsibilities.
- If something is unclear or not available, say that directly.
- Do not answer unrelated general questions.
- If a question is outside the scope of Mania’s work or portfolio, explain briefly that you only answer questions about her background, projects, and design thinking.
- Keep answers concise and specific. Avoid long explanations unless explicitly asked.
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
    const body = await req.json();
    const message = body.message;

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