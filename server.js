const http = require('http');

const WEBHOOKS = {
  rules: process.env.WEBHOOK_RULES,
  building: process.env.WEBHOOK_BUILDING,
  training_us: process.env.WEBHOOK_TRAINING_US,
  training_uk: process.env.WEBHOOK_TRAINING_UK,
  training_au: process.env.WEBHOOK_TRAINING_AU,
};

function getWebhookUrl(type, data) {
  if (type === 'rules') return WEBHOOKS.rules;
  if (type === 'building') return WEBHOOKS.building;
  if (type === 'training') {
    const server = data.server || '';
    if (server.includes('US')) return WEBHOOKS.training_us;
    if (server.includes('UK')) return WEBHOOKS.training_uk;
    if (server.includes('AU')) return WEBHOOKS.training_au;
  }
  return null;
}

function buildEmbed(type, data) {
  const now = new Date();
  const utcStr = now.toISOString().replace('T', ' ').replace(/\.\d+Z$/, ' UTC');
  const ts = now.toISOString();
  if (type === 'rules') {
    return {
      title: '✅ Rules Accepted',
      color: 0x20d77b,
      fields: [
        { name: 'Discord', value: String(data.discord || '—'), inline: true },
        { name: 'MissionChief', value: String(data.mc || '—'), inline: true },
        { name: 'Version', value: String(data.version || '—'), inline: true },
        { name: 'Time (UTC)', value: utcStr, inline: false },
      ],
      timestamp: ts,
    };
  }
  if (type === 'building') {
    return {
      title: '🏗️ Building Request',
      color: 0x4dabf7,
      fields: [
        { name: 'Player', value: String(data.player || '—'), inline: true },
        { name: 'Server', value: String(data.server || '—'), inline: true },
        { name: 'Type', value: String(data.type || '—'), inline: true },
        { name: 'Building', value: String(data.building || '—'), inline: false },
        { name: 'Address', value: String(data.address || '—'), inline: false },
        { name: 'Time (UTC)', value: utcStr, inline: false },
      ],
      timestamp: ts,
    };
  }
  if (type === 'training') {
    return {
      title: '🎓 Training Request',
      color: 0xff6b35,
      fields: [
        { name: 'Username', value: String(data.player || '—'), inline: true },
        { name: 'Server', value: String(data.server || '—'), inline: true },
        { name: 'Category', value: String(data.category || '—'), inline: true },
        { name: 'Training', value: String(data.type || '—'), inline: false },
        { name: 'Seats', value: String(data.seats ?? '—'), inline: true },
        { name: 'Classrooms', value: String(data.classrooms ?? '—'), inline: true },
        { name: 'Time (UTC)', value: utcStr, inline: false },
      ],
      timestamp: ts,
    };
  }
  return null;
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.writeHead(405);
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  let body = '';
  for await (const chunk of req) body += chunk;

  let parsed;
  try {
    parsed = JSON.parse(body);
  } catch {
    res.writeHead(400);
    res.end(JSON.stringify({ error: 'Invalid JSON' }));
    return;
  }

  const { type, data } = parsed;
  const webhookUrl = getWebhookUrl(type, data || {});

  if (!webhookUrl) {
    res.writeHead(400);
    res.end(JSON.stringify({ error: 'No webhook configured for this type' }));
    return;
  }

  const embed = buildEmbed(type, data || {});
  if (!embed) {
    res.writeHead(400);
    res.end(JSON.stringify({ error: 'Unknown webhook type' }));
    return;
  }

  try {
    const discordRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] }),
    });
    if (!discordRes.ok) {
      const detail = await discordRes.text().catch(() => '');
      console.error('Discord webhook failed:', discordRes.status, detail);
      res.writeHead(502);
      res.end(JSON.stringify({ error: 'Discord rejected the webhook' }));
      return;
    }
    res.writeHead(200);
    res.end(JSON.stringify({ success: true }));
  } catch (err) {
    console.error('Webhook proxy error:', err.message);
    res.writeHead(502);
    res.end(JSON.stringify({ error: err.message }));
  }
});

server.listen(3001, '0.0.0.0', () => console.log('Webhook proxy running on :3001'));
