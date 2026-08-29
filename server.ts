import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getObservatorySkyConditions } from './src/services/astronomyService';
import { 
  executeAskAstra, 
  AVAILABLE_PROVIDERS, 
  PRESET_ASTRONOMY_QUESTIONS,
  validateAstronomyDomain 
} from './src/services/serverAiService';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', club: 'ASTRA — PSG iTech Astronomy Club' });
  });

  // Observatory Sky Telemetry API
  app.get('/api/astronomy/telemetry', (req, res) => {
    try {
      const telemetry = getObservatorySkyConditions(new Date());
      res.json({
        success: true,
        location: 'PSG iTech, Coimbatore, India (11.0772° N, 77.0867° E)',
        timestamp: new Date().toISOString(),
        telemetry,
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Get Available AI Providers and configurations
  app.get('/api/ai/providers', (req, res) => {
    res.json({
      providers: AVAILABLE_PROVIDERS,
      activeDefault: process.env.GEMINI_API_KEY ? 'gemini' : 'ephemeris_engine',
      hasGeminiApiKey: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  // Get Curated Preset Astronomy Questions
  app.get('/api/ai/presets', (req, res) => {
    res.json({
      presets: PRESET_ASTRONOMY_QUESTIONS,
    });
  });

  // Ask ASTRA AI Assistant Endpoint (Supports multiple configurable providers and guardrails)
  app.post('/api/ai/ask', async (req, res) => {
    try {
      const { prompt, history, provider, model } = req.body;
      if (!prompt || typeof prompt !== 'string') {
        res.status(400).json({ error: 'Prompt string is required' });
        return;
      }

      const result = await executeAskAstra({
        prompt,
        history,
        provider: provider || (process.env.GEMINI_API_KEY ? 'gemini' : 'ephemeris_engine'),
        model,
      });

      res.json(result);
    } catch (err: any) {
      console.error('Error in /api/ai/ask:', err);
      res.status(500).json({
        error: 'Failed to process astronomical inquiry.',
        details: err.message,
      });
    }
  });

  // Legacy endpoint alias for backward compatibility
  app.post('/api/gemini/ask-astra', async (req, res) => {
    try {
      const { prompt, history, provider, model } = req.body;
      if (!prompt || typeof prompt !== 'string') {
        res.status(400).json({ error: 'Prompt is required' });
        return;
      }

      const result = await executeAskAstra({
        prompt,
        history,
        provider: provider || 'gemini',
        model,
      });

      res.json({ reply: result.reply, provider: result.provider, model: result.model });
    } catch (err: any) {
      console.error('Error in /api/gemini/ask-astra:', err);
      res.status(500).json({
        error: 'Failed to communicate with astronomy intelligence service.',
        details: err.message,
      });
    }
  });

  // Vite middleware in dev / Static server in prod
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ASTRA PSG iTech Server running on port ${PORT}`);
  });
}

startServer();
