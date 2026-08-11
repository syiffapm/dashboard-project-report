// Vercel serverless function — adds a comment to a Jira issue using server-side credentials.
// Required env vars: JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN } = process.env;
  if (!JIRA_BASE_URL || !JIRA_EMAIL || !JIRA_API_TOKEN) {
    return res.status(500).json({ error: "Jira credentials aren't configured on the server (missing env vars)." });
  }

  try {
    const { issueKey, commentBody } = req.body || {};
    if (!issueKey || !commentBody) return res.status(400).json({ error: "Missing issueKey or commentBody" });

    const auth = Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString("base64");
    const r = await fetch(`${JIRA_BASE_URL}/rest/api/3/issue/${encodeURIComponent(issueKey)}/comment`, {
      method: "POST",
      headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ body: { type: "doc", version: 1, content: [{ type: "paragraph", content: [{ type: "text", text: commentBody }] }] } })
    });
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json(data);
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: String(e && e.message ? e.message : e) });
  }
}
