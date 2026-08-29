import { 
  AIProviderId, 
  AIProviderInfo, 
  PresetQuestionItem, 
  AskAstraRequestPayload, 
  AskAstraResponsePayload 
} from '../types';

/**
 * Sends an astronomical question to the backend Ask ASTRA service layer
 */
export async function askAstronomyAI(
  prompt: string,
  history: { role: string; parts: string }[] = [],
  provider: AIProviderId = 'gemini',
  model?: string
): Promise<AskAstraResponsePayload> {
  try {
    const payload: AskAstraRequestPayload = {
      prompt,
      history,
      provider,
      model,
    };

    const res = await fetch('/api/ai/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Server returned HTTP ${res.status}`);
    }

    const data: AskAstraResponsePayload = await res.json();
    return data;
  } catch (error: any) {
    console.error('Error contacting ASTRA AI assistant:', error);
    // Fallback to client-side astronomical responder if offline
    return getOfflineFallbackResponse(prompt, provider);
  }
}

/**
 * Fetches the list of configured AI providers from the backend
 */
export async function fetchAIProviders(): Promise<{
  providers: AIProviderInfo[];
  activeDefault: AIProviderId;
  hasGeminiApiKey: boolean;
}> {
  try {
    const res = await fetch('/api/ai/providers');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Using default client provider list:', err);
    return {
      providers: [
        {
          id: 'gemini',
          name: 'Google Gemini 3.7 Flash',
          description: 'High-speed generative AI model powered by Google DeepMind with deep astronomical reasoning.',
          model: 'gemini-3.7-flash',
          badge: 'Recommended',
          isAvailable: true,
          requiresKey: true,
          iconType: 'gemini',
        },
        {
          id: 'ephemeris_engine',
          name: 'ASTRA Ephemeris & Domain Engine',
          description: 'Built-in real-time astronomical compute engine and PSG iTech Observatory knowledge base.',
          model: 'astra-ephemeris-v2.6',
          badge: 'Always Available',
          isAvailable: true,
          requiresKey: false,
          iconType: 'telescope',
        },
      ],
      activeDefault: 'gemini',
      hasGeminiApiKey: false,
    };
  }
}

/**
 * Fetches curated preset astronomy questions
 */
export async function fetchPresetQuestions(): Promise<PresetQuestionItem[]> {
  try {
    const res = await fetch('/api/ai/presets');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.presets || [];
  } catch (err) {
    return [
      {
        id: 'q-tonight',
        question: 'What can I see tonight?',
        category: 'Night Sky',
        hint: 'Real-time visible planets, constellations, and deep-sky objects from Coimbatore',
      },
      {
        id: 'q-black-hole',
        question: 'What is a black hole?',
        category: 'Astrophysics',
        hint: 'Event horizons, spacetime singularities, and supermassive monsters like Sgr A*',
      },
      {
        id: 'q-moon-phases',
        question: 'Why does the Moon have phases?',
        category: 'Lunar Science',
        hint: 'Orbital geometry, synodic cycles, and sunlight angles across 29.5 days',
      },
      {
        id: 'q-meteor-shower',
        question: 'When is the next meteor shower?',
        category: 'Observational',
        hint: 'Perseids, Geminids, and peak viewing times from Tamil Nadu',
      },
    ];
  }
}

/**
 * Offline fallback generator if network / server is unavailable
 */
function getOfflineFallbackResponse(prompt: string, provider: AIProviderId): AskAstraResponsePayload {
  const p = prompt.toLowerCase();
  let reply = '';

  if (p.includes('tonight') || p.includes('see') || p.includes('visible')) {
    reply = `🔭 **Visible Tonight from PSG iTech, Coimbatore**:\n\n- **Jupiter**: Brilliant in Taurus with Galilean moons.\n- **Saturn**: Ring tilt in Aquarius.\n- **The Moon**: Distinct craters along the terminator line.\n- **Orion Nebula (M42)**: Bright stellar nursery with central Trapezium stars.\n- **Pleiades (M45)**: Sparkling cluster of young blue stars in Taurus.`;
  } else if (p.includes('black hole') || p.includes('singularity')) {
    reply = `🕳️ **What is a Black Hole?**\n\nA black hole is a region of spacetime where gravitational curvature is so extreme that nothing, not even light, can escape past its **Event Horizon**. At its core lies a **Singularity**. At the center of our Milky Way sits **Sagittarius A*** (4.15 million solar masses).`;
  } else if (p.includes('moon') && (p.includes('phase') || p.includes('why'))) {
    reply = `🌓 **Why Does the Moon Have Phases?**\n\nThe Moon orbits Earth every 29.5 days while reflecting sunlight. As its orbital position changes relative to the Sun and Earth, we see differing illuminated portions—from New Moon, through Waxing Crescent, First Quarter, Gibbous, to Full Moon.`;
  } else if (p.includes('meteor') || p.includes('shower')) {
    reply = `🌠 **When is the Next Meteor Shower?**\n\nKey annual meteor showers from Coimbatore include:\n- **Perseids (August 12–13)**: Up to 90 meteors/hr from comet 109P/Swift-Tuttle.\n- **Geminids (December 13–14)**: Richest shower with 120–150 multicolored meteors/hr from asteroid 3200 Phaethon.`;
  } else {
    reply = `🌌 **ASTRA Astronomy Intelligence Guide**\n\nGreetings from ASTRA at PSG iTech! Ask me about tonight's sky, telescopes, astrophotography stacking, or astrophysics!`;
  }

  return {
    reply,
    provider: 'ephemeris_engine',
    model: 'offline-ephemeris-client',
    isAstronomyTopic: true,
    timestamp: new Date().toISOString(),
  };
}
