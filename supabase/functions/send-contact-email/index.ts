
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@3.4.0";
import DOMPurify from "npm:dompurify@3.1.0";
import { JSDOM } from "npm:jsdom@24.0.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const DESTINATION_EMAIL = "omsri8032@gmail.com"; // User-provided email

const securityHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
};

interface ContactFormData {
  name: string;
  email: string; // Sender's email
  message: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: securityHeaders });
  }

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set in environment variables.");
    return new Response(
      JSON.stringify({ error: "Server configuration error." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...securityHeaders },
      }
    );
  }

  const resend = new Resend(RESEND_API_KEY);
  const { window } = new JSDOM('<!DOCTYPE html>');
  const purify = DOMPurify(window);

  try {
    const { name, email, message } = await req.json() as ContactFormData;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing name, email, or message in request body." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...securityHeaders },
        }
      );
    }

    // Sanitize user-provided strings before including them in the email
    const sanitizedName = purify.sanitize(name);
    const sanitizedMessage = purify.sanitize(message);

    console.log(`Received contact form submission: Name: ${sanitizedName}, Email: ${email}, Message: [sanitized]`);

    const { data, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>", // Using Resend's default for unverified domains
      to: [DESTINATION_EMAIL],
      subject: `New Contact Form Submission from ${sanitizedName}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedMessage.replace(/\n/g, "<br>")}</p>
      `,
      reply_to: email, // Set reply-to for easy response
    });

    if (error) {
      console.error("Resend API Error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to send email." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...securityHeaders },
        }
      );
    }

    console.log("Email sent successfully via Resend:", data);
    return new Response(
      JSON.stringify({ message: "Email sent successfully!", emailId: data?.id }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...securityHeaders },
      }
    );
  } catch (e) {
    console.error("Error processing request:", e);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...securityHeaders },
      }
    );
  }
});
