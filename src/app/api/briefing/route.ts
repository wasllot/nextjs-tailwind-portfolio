import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, existsSync, mkdirSync, readFileSync } from "fs";
import { join } from "path";
import { jwtVerify } from "jose";

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3;
const RATE_LIMIT_WINDOW = 60 * 1000;
const JWT_SECRET = new TextEncoder().encode(process.env.MESSAGES_API_KEY || "default-secret");
const MESSAGES_API_KEY = process.env.MESSAGES_API_KEY;

function getClientIP(request: NextRequest): string {
    return (
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        "unknown"
    );
}

function isRateLimited(clientIP: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(clientIP);
    if (!record || now > record.resetTime) {
        rateLimitMap.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return false;
    }
    if (record.count >= RATE_LIMIT) return true;
    record.count++;
    return false;
}

function sanitizeInput(input: string): string {
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;").slice(0, 2000);
}

interface BriefingBody {
    tipo?: unknown;
    tipoOtro?: unknown;
    plataforma?: unknown;
    funciones?: unknown;
    funcionesOtro?: unknown;
    usuarios?: unknown;
    roles?: unknown;
    integraciones?: unknown;
    integracionesOtro?: unknown;
    plazo?: unknown;
    fechaIdeal?: unknown;
    presupuesto?: unknown;
    prioridades?: unknown;
    negocio?: unknown;
    referencia?: unknown;
    contacto?: unknown;
}

function isValidBriefingBody(body: BriefingBody): boolean {
    return (
        typeof body.contacto === "string" && body.contacto.trim().length > 0
    );
}

function saveToFile(data: object): void {
    try {
        const dataDir = join(process.cwd(), "data");
        if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });

        const filePath = join(dataDir, "briefings.json");
        let briefings: object[] = [];

        if (existsSync(filePath)) {
            const content = readFileSync(filePath, "utf-8");
            briefings = JSON.parse(content || "[]");
        }

        briefings.push(data);
        writeFileSync(filePath, JSON.stringify(briefings, null, 2));
    } catch (error) {
        console.error("Error saving briefing to file:", error);
    }
}

async function verifyAuth(request: NextRequest): Promise<boolean> {
    const apiKey = request.headers.get("x-api-key");
    if (apiKey && apiKey === MESSAGES_API_KEY) return true;

    const token = request.cookies.get("auth_token")?.value;
    if (!token) return false;

    try {
        await jwtVerify(token, JWT_SECRET);
        return true;
    } catch {
        return false;
    }
}

export async function POST(request: NextRequest) {
    try {
        const clientIP = getClientIP(request);
        if (isRateLimited(clientIP)) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                { status: 429 }
            );
        }

        const body: BriefingBody = await request.json();

        if (!isValidBriefingBody(body)) {
            return NextResponse.json({ error: "El campo de contacto es obligatorio." }, { status: 400 });
        }

        const briefingData = {
            tipo: Array.isArray(body.tipo) ? (body.tipo as string[]).map(sanitizeInput) : [],
            tipoOtro: typeof body.tipoOtro === "string" ? sanitizeInput(body.tipoOtro) : "",
            plataforma: Array.isArray(body.plataforma) ? (body.plataforma as string[]).map(sanitizeInput) : [],
            funciones: Array.isArray(body.funciones) ? (body.funciones as string[]).map(sanitizeInput) : [],
            funcionesOtro: typeof body.funcionesOtro === "string" ? sanitizeInput(body.funcionesOtro) : "",
            usuarios: typeof body.usuarios === "string" ? sanitizeInput(body.usuarios) : "",
            roles: typeof body.roles === "string" ? sanitizeInput(body.roles) : "",
            integraciones: Array.isArray(body.integraciones) ? (body.integraciones as string[]).map(sanitizeInput) : [],
            integracionesOtro: typeof body.integracionesOtro === "string" ? sanitizeInput(body.integracionesOtro) : "",
            plazo: typeof body.plazo === "string" ? sanitizeInput(body.plazo) : "",
            fechaIdeal: typeof body.fechaIdeal === "string" ? sanitizeInput(body.fechaIdeal) : "",
            presupuesto: typeof body.presupuesto === "string" ? sanitizeInput(body.presupuesto) : "",
            prioridades: typeof body.prioridades === "object" && body.prioridades !== null ? body.prioridades : {},
            negocio: typeof body.negocio === "string" ? sanitizeInput(body.negocio) : "",
            referencia: typeof body.referencia === "string" ? sanitizeInput(body.referencia) : "",
            contacto: sanitizeInput(body.contacto as string),
            timestamp: new Date().toISOString(),
            source: "briefing-talleres",
        };

        console.log("New briefing submission:", briefingData);
        saveToFile(briefingData);

        return NextResponse.json({
            success: true,
            message: "¡Briefing recibido! Te contactaré en menos de 24 horas.",
        });
    } catch (error) {
        console.error("Briefing API Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const isAuthorized = await verifyAuth(request);
        if (!isAuthorized) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const filePath = join(process.cwd(), "data", "briefings.json");
        if (!existsSync(filePath)) {
            return NextResponse.json({ briefings: [] });
        }

        const content = readFileSync(filePath, "utf-8");
        const briefings = JSON.parse(content || "[]");
        return NextResponse.json({ briefings });
    } catch (error) {
        console.error("Error reading briefings:", error);
        return NextResponse.json({ briefings: [] });
    }
}
