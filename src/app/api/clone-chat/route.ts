import { readFile } from "node:fs/promises";
import path from "node:path";
import OpenAI from "openai";

async function loadAssistantContext() {
  const assistantDir = path.join(process.cwd(), "ai-assistant");
  const [
    instructions,
    aiBuilderKnowledge,
    aiWorkflowKnowledge,
    questionnaireBuilderKnowledge,
  ] = await Promise.all([
    readFile(path.join(assistantDir, "ai-assistant-instructions.md"), "utf8"),
    readFile(path.join(assistantDir, "ai-builder-knowledge.md"), "utf8"),
    readFile(path.join(assistantDir, "ai-workflow-knowledge.md"), "utf8"),
    readFile(path.join(assistantDir, "questionnaire-builder-knowledge.md"), "utf8"),
  ]);

  return {
    instructions,
    knowledge: [
      aiBuilderKnowledge,
      aiWorkflowKnowledge,
      questionnaireBuilderKnowledge,
    ].join("\n\n"),
  };
}

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
    const { instructions, knowledge } = await loadAssistantContext();

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
