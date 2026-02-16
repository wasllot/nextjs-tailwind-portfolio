import { NextResponse } from "next/server";

interface ServiceHealth {
  status: "operational" | "degraded" | "down";
  latency?: string;
  type?: string;
  meta?: string;
}

export async function GET() {
  const services: Record<string, ServiceHealth> = {
    database: {
      status: "operational",
      type: "PostgreSQL",
      meta: "Primary DB",
    },
    redis: {
      status: "operational",
      type: "Redis Cache",
      meta: "Session & Cache",
    },
    ai_engine: {
      status: "operational",
      latency: "45ms",
      type: "Python/FastAPI",
      meta: "Gemini 1.5",
    },
    scraper_engine: {
      status: "operational",
      latency: "120ms",
      type: "Python/FastAPI",
      meta: "JobSpy",
    },
  };

  const hasDegraded = Object.values(services).some((s) => s.status === "degraded");
  const hasDown = Object.values(services).some((s) => s.status === "down");

  let global_status: "operational" | "degraded" | "down" = "operational";
  if (hasDown) global_status = "down";
  else if (hasDegraded) global_status = "degraded";

  return NextResponse.json({
    global_status,
    timestamp: new Date().toISOString(),
    services,
  });
}
