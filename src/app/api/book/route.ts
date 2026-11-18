import { NextResponse } from "next/server";
import clinicConfig from "@/config/clinic";
import { supabase } from "@/lib/supabase";

// Simple in-memory rate limiter for spam prevention (1 request per 3 seconds per IP)
const ipRateMap = new Map<string, number>();

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const lastRequest = ipRateMap.get(ip) || 0;

    if (now - lastRequest < 3000) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment before trying again." },
        { status: 429 }
      );
    }
    ipRateMap.set(ip, now);

    // Housekeeping to prevent memory leak
    if (ipRateMap.size > 1000) {
      ipRateMap.clear();
    }

    const body = await req.json();

    // 1. Honeypot check (Spambot trap)
    if (body.honeypot || body.faxNumber || body.website) {
      return NextResponse.json({ success: true, message: "Request received" });
    }

    const {
      name,
      phone,
      email,
      treatment,
      date,
      timeSlot,
      message,
    } = body;

    // 2. Validate Required Fields
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your full name." },
        { status: 400 }
      );
    }

    // Indian 10-digit phone validation (starts with 6, 7, 8, or 9)
    const cleanDigits = (phone || "").replace(/\D/g, "");
    const phoneValid = /^[6-9]\d{9}$/.test(cleanDigits);

    if (!phoneValid) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit Indian mobile number." },
        { status: 400 }
      );
    }

    // 3. Construct WhatsApp Message URL
    const waLines = [
      `*New Appointment Request - ${clinicConfig.clinicName}*`,
      `-----------------------------------------`,
      `👤 *Patient:* ${name.trim()}`,
      `📞 *Phone:* +91 ${cleanDigits}`,
      email ? `✉️ *Email:* ${email.trim()}` : "",
      treatment ? `🦷 *Treatment:* ${treatment}` : "",
      date ? `📅 *Preferred Date:* ${date}` : "",
      timeSlot ? `⏰ *Preferred Time:* ${timeSlot}` : "",
      message ? `📝 *Notes:* ${message.trim()}` : "",
      `-----------------------------------------`,
      `_Sent via website appointment form_`,
    ].filter(Boolean);

    const waText = encodeURIComponent(waLines.join("\n"));
    const whatsappUrl = `https://wa.me/${clinicConfig.whatsappNumber}?text=${waText}`;

    // 4. Record to Database (Supabase) if available
    let dbSuccess = false;
    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        const { error } = await (supabase as any).from("appointments").insert([
          {
            full_name: name.trim(),
            phone: cleanDigits,
            email: email?.trim() || null,
            service: treatment || null,
            preferred_date: date || null,
            preferred_time: timeSlot || null,
            message: message?.trim() || null,
            status: "pending",
          },
        ]);
        if (!error) dbSuccess = true;
      }
    } catch (dbErr) {
      console.warn("[Booking API] Supabase insert skipped:", dbErr);
    }

    // 5. Optional Email Notification (Resend or SMTP)
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Clinic Bookings <onboarding@resend.dev>",
            to: clinicConfig.email,
            subject: `New Dental Appointment: ${name.trim()} - ${treatment || "General Consultation"}`,
            text: waLines.join("\n"),
          }),
        });
      } catch (emailErr) {
        console.warn("[Booking API] Email delivery error (ignored):", emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      whatsappUrl,
      dbLogged: dbSuccess,
      message: "Appointment request registered successfully.",
    });
  } catch (error: any) {
    console.error("[Booking API Error]:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please call or WhatsApp us directly." },
      { status: 500 }
    );
  }
}
