export async function onRequestPost(context) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    const body = await context.request.json();
    const { firstName, email, interests, message, turnstileToken } = body;

    // ----- Validate input
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: "Please enter a valid email." }, 400, corsHeaders);
    }
    if (!firstName || !firstName.trim()) {
      return json({ error: "Please enter your first name." }, 400, corsHeaders);
    }
    if (!Array.isArray(interests) || interests.length === 0) {
      return json({ error: "Pick at least one interest." }, 400, corsHeaders);
    }

    // ----- Validate Turnstile (server-side)
    const TURNSTILE_SECRET = context.env.TURNSTILE_SECRET_KEY;
    if (TURNSTILE_SECRET) {
      if (!turnstileToken) {
        return json({ error: "Bot check failed. Please reload." }, 403, corsHeaders);
      }
      const tsRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: TURNSTILE_SECRET,
          response: turnstileToken,
          remoteip: context.request.headers.get("CF-Connecting-IP") || "",
        }),
      });
      const tsData = await tsRes.json();
      if (!tsData.success) {
        return json({ error: "Bot check failed. Please reload." }, 403, corsHeaders);
      }
    }

    // ----- Send to MailerLite
    const ML_KEY  = context.env.MAILERLITE_API_KEY;
    const ML_GROUP = context.env.MAILERLITE_GROUP_ID; // main waitlist group
    if (!ML_KEY || !ML_GROUP) {
      return json({ error: "Server configuration error." }, 500, corsHeaders);
    }

    // Map interests to MailerLite custom-field tags or additional groups.
    // Use a single custom field "interests" containing a comma-joined string.
    const subscriberPayload = {
      email,
      fields: {
        name: firstName.trim(),
        interests: interests.join(","),
        message: (message || "").slice(0, 2000),
      },
      groups: [ML_GROUP],
    };

    const mlRes = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ML_KEY}`,
      },
      body: JSON.stringify(subscriberPayload),
    });

    if (!mlRes.ok) {
      return json({ error: "Subscription failed. Try again in a moment." }, mlRes.status, corsHeaders);
    }

    return json({ success: true }, 200, corsHeaders);
  } catch (err) {
    return json({ error: "Server error. Try again." }, 500, corsHeaders);
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

function json(obj, status, headers) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}
