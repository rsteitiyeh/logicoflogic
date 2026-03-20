export async function onRequestPost(context) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    const body = await context.request.json();
    const { email } = body;

    if (!email || !email.includes("@") || !email.includes(".")) {
      return new Response(JSON.stringify({ error: "Please enter a valid email address." }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const API_KEY = context.env.MAILERLITE_API_KEY;
    const GROUP_ID = "182443421797975555";

    if (!API_KEY) {
      return new Response(JSON.stringify({ error: "Server configuration error." }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        email: email,
        groups: [GROUP_ID],
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } else {
      return new Response(JSON.stringify({ error: "Subscription failed. Please try again." }), {
        status: response.status,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error. Please try again." }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
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
