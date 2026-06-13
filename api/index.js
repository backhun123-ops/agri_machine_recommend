const handler = require("../server");

module.exports = (req, res) => {
  try {
    handler(req, res);
  } catch (err) {
    console.error("[api/index.js] Unhandled error:", err);
    if (!res.headersSent) {
      res.writeHead(500, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store"
      });
      res.end(JSON.stringify({ error: "Internal server error" }));
    }
  }
};
