// Vercel serverless function — proxies a Jira JQL search using server-side credentials.
// Required env vars (set in Vercel → Settings → Environment Variables):
//   JIRA_BASE_URL   e.g. https://linkit360.atlassian.net
//   JIRA_EMAIL      the account the API token belongs to
//   JIRA_API_TOKEN  generate at https://id.atlassian.com/manage-profile/security/api-tokens

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN } = process.env;
  if (!JIRA_BASE_URL || !JIRA_EMAIL || !JIRA_API_TOKEN) {
    return res.status(500).json({ error: "Jira credentials aren't configured on the server (missing env vars)." });
  }

  try {
    const { jql, maxResults, fields } = req.body || {};
    if (!jql) return res.status(400).json({ error: "Missing jql" });

    const auth = Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString("base64");
    const params = new URLSearchParams({
      jql,
      maxResults: String(maxResults || 50),
      fields: (fields || ["summary", "status", "assignee", "updated", "duedate", "project", "parent"]).join(",")
    });

    const r = await fetch(`${JIRA_BASE_URL}/rest/api/3/search?${params.toString()}`, {
      headers: { Authorization: `Basic ${auth}`, Accept: "application/json" }
    });
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json(data);
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: String(e && e.message ? e.message : e) });
  }
}
