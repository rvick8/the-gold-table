export async function forwardToHookdeck(payload: Record<string, unknown>) {
  const url = process.env.HOOKDECK_WEBHOOK_URL;
  if (!url) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[The Gold Table development form submission]", { formType: payload.form_type, submissionId: payload.submissionId });
      return { development: true };
    }
    console.error("HOOKDECK_WEBHOOK_URL is missing in production");
    throw new Error("Form delivery is not configured");
  }
  const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json", "X-Source": "the-gold-table-website" }, body: JSON.stringify(payload), signal: AbortSignal.timeout(10_000) });
  if (!response.ok) throw new Error(`Hookdeck returned ${response.status}`);
  return { development: false };
}
