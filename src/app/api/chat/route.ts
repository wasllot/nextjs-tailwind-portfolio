import { NextRequest, NextResponse } from "next/server";

const AI_SERVICE_URL = process.env.AI_SERVICE_URL 
  ? `${process.env.AI_SERVICE_URL}/ai/chat`
  : "https://api.reinaldotineo.online/ai/chat";
const AI_SERVICE_TOKEN = process.env.AI_SERVICE_TOKEN;

// Simple in-memory rate limiting (use Redis for production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // Max requests per window
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in ms

function getClientIP(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() 
    || request.headers.get("x-real-ip") 
    || "unknown";
}

function isRateLimited(clientIP: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(clientIP);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (record.count >= RATE_LIMIT) {
    return true;
  }

  record.count++;
  return false;
}

function sanitizeInput(input: string): string {
  // Remove potential XSS payloads
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .slice(0, 2000); // Limit input length
}

function validateQuestion(question: unknown): question is string {
  return (
    typeof question === "string" &&
    question.length > 0 &&
    question.length <= 2000
  );
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    if (isRateLimited(clientIP)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse and validate body
    const body = await request.json();
    const { question, conversation_id, max_context_items } = body;

    // Validate question
    if (!validateQuestion(question)) {
      return NextResponse.json(
        { error: "Invalid question format" },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedQuestion = sanitizeInput(question);
    const sanitizedConversationId = typeof conversation_id === "string" 
      ? conversation_id.slice(0, 100) 
      : undefined;
    const sanitizedMaxItems = typeof max_context_items === "number" 
      ? Math.min(Math.max(max_context_items, 1), 10) 
      : 5;

    const response = await fetch(AI_SERVICE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(AI_SERVICE_TOKEN ? { "Authorization": `Bearer ${AI_SERVICE_TOKEN}` } : {}),
      },
      body: JSON.stringify({
        question: sanitizedQuestion,
        conversation_id: sanitizedConversationId,
        max_context_items: sanitizedMaxItems,
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
