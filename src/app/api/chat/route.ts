import { NextRequest, NextResponse } from "next/server";

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "https://api.reinaldotineo.online/ai/chat";
const AI_SERVICE_TOKEN = process.env.AI_SERVICE_TOKEN;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, conversation_id, max_context_items } = body;

    const response = await fetch(AI_SERVICE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(AI_SERVICE_TOKEN ? { "Authorization": `Bearer ${AI_SERVICE_TOKEN}` } : {}),
      },
      body: JSON.stringify({
        question,
        conversation_id,
        max_context_items: max_context_items || 5,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: "AI service error", details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("BFF Chat Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
