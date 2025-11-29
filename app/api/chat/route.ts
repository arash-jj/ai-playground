import { NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const client = new InferenceClient(process.env.HF_TOKEN);

    const chat = await client.chatCompletion({
      model: "Qwen/Qwen2.5-7B-Instruct:together",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 200,
    });

    return NextResponse.json({
      output: chat.choices[0].message.content,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: String(error) },
      { status: 500 }
    );
  }
}
