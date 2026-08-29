import { GoogleGenAI } from '@google/genai';
import { 
  AIProviderId, 
  AIProviderInfo, 
  PresetQuestionItem, 
  AskAstraRequestPayload, 
  AskAstraResponsePayload 
} from '../types';
import { getObservatorySkyConditions, calculateMoonPhase } from './astronomyService';
import { ASTRONOMY_CALENDAR, CELESTIAL_OBJECTS } from '../data/astronomyData';

export const AVAILABLE_PROVIDERS: AIProviderInfo[] = [
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
  {
    id: 'openai_compatible',
    name: 'OpenAI Compatible Engine',
    description: 'Configurable provider interface for OpenAI-compatible LLM endpoints.',
    model: 'gpt-4o-mini-compatible',
    badge: 'Configurable',
    isAvailable: false,
    requiresKey: true,
    iconType: 'openai',
  },
  {
    id: 'anthropic_compatible',
    name: 'Claude Compatible Engine',
    description: 'Configurable provider interface for Anthropic Claude endpoints.',
    model: 'claude-3-5-sonnet-compatible',
    badge: 'Configurable',
    isAvailable: false,
    requiresKey: true,
    iconType: 'claude',
  },
];

export const PRESET_ASTRONOMY_QUESTIONS: PresetQuestionItem[] = [
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
  {
    id: 'q-telescope',
    question: 'What is the best telescope for a college beginner?',
    category: 'Telescopes',
    hint: 'Dobsonians vs Refractors, aperture importance, and magnification math',
  },
  {
    id: 'q-bortle',
    question: 'What is the Bortle scale and what can we see from PSG iTech terrace?',
    category: 'Observational',
    hint: 'Terrace SQM ~19.8, limiting magnitude 5.6, and filter recommendations',
  },
];

// Astronomy keyword taxonomy for domain verification
const ASTRONOMY_KEYWORDS = [
  'star', 'planet', 'galaxy', 'nebula', 'moon', 'sun', 'solar', 'lunar', 'orbit', 'telescope',
  'astronomy', 'astrophysics', 'cosmology', 'space', 'constellation', 'meteor', 'comet', 'asteroid',
  'jupiter', 'saturn', 'mars', 'venus', 'mercury', 'uranus', 'neptune', 'pluto', 'orion', 'andromeda',
  'pleiades', 'black hole', 'singularity', 'event horizon', 'supernova', 'pulsar', 'neutron star',
  'gravity', 'spacetime', 'relativity', 'hubble', 'jwst', 'james webb', 'isro', 'chandrayaan',
  'aditya', 'gaganyaan', 'nasa', 'astrophotography', 'eyepiece', 'barlow', 'dobsonian', 'reflector',
  'refractor', 'collimation', 'magnitude', 'azimuth', 'altitude', 'zenith', 'bortle', 'eclipse',
  'conjunction', 'opposition', 'transit', 'seeing', 'transparency', 'tonight', 'sky', 'light year',
  'parsec', 'coimbatore', 'psg', 'itech', 'astra', 'cluster', 'milky way', 'sirius', 'betelgeuse',
  'rigel', 'polaris', 'saptarishi', 'ursa', 'cassiopeia', 'zodiac', 'exoplanet', 'kepler', 'cosmic',
  'zenith', 'equinox', 'solstice', 'aurora', 'aperture', 'focal', 'lucky imaging', 'stacking', 'siril'
];

/**
 * Validates if the user query is strictly focused on astronomy, space, physics, optics, or club activities.
 */
export function validateAstronomyDomain(prompt: string): { isAstronomy: boolean; detectedTopic?: string } {
  const clean = prompt.toLowerCase().trim();
  
  // Greeting or simple club welcome questions are allowed
  if (/^(hi|hello|hey|namaste|vanakkam|good\s*(morning|evening|night|afternoon)|who are you|what is astra|tell me about astra|help)/i.test(clean)) {
    return { isAstronomy: true, detectedTopic: 'ASTRA Club & Welcome' };
  }

  // Check matching keywords
  for (const kw of ASTRONOMY_KEYWORDS) {
    if (clean.includes(kw)) {
      return { isAstronomy: true, detectedTopic: kw };
    }
  }

  // Strict guardrail check for non-astronomy queries (e.g., cooking, politics, finance, general web dev)
  const NON_ASTRONOMY_PATTERNS = [
    /recipe|cook|bake|ingredient|dish|restaurant/i,
    /stock|crypto|bitcoin|forex|invest|dividend|portfolio/i,
    /election|politics|government|president|parliament|vote/i,
    /javascript\s+code|python\s+code|react\s+component|css\s+fix|sql\s+database/i,
    /medical\s+advice|symptom|prescription|medicine|doctor/i,
    /movie\s+review|celebrity|gossip|fashion|dating/i,
  ];

  for (const pattern of NON_ASTRONOMY_PATTERNS) {
    if (pattern.test(clean)) {
      return { isAstronomy: false };
    }
  }

  // If ambiguous or short, let astronomical domain engine provide an astronomy-guided answer
  if (clean.length < 15) {
    return { isAstronomy: true, detectedTopic: 'General Exploration' };
  }

  // Default to requiring astronomy relevance
  return { isAstronomy: false };
}

/**
 * Generates an astronomical guardrail redirection for out-of-domain queries
 */
export function generateGuardrailResponse(query: string): string {
  return `🌌 **ASTRA Astronomical Focus Guardrail**\n\nI am the dedicated AI Astronomy & Observational Guide for **ASTRA (PSG iTech)**. I specialize solely in astronomy, astrophysics, night sky phenomena, telescope optics, astrophotography, and space exploration.\n\nWhile I cannot provide information on non-astronomical topics, I would love to explore the cosmos with you! Here are some celestial questions you can ask me:\n\n- *"What can I see tonight from the PSG iTech terrace in Coimbatore?"*\n- *"What is a black hole and how does its event horizon work?"*\n- *"Why does the Moon have phases?"*\n- *"When is the next meteor shower?"*\n- *"What is the best telescope setup for a college beginner?"*`;
}

/**
 * Built-in Astronomical Ephemeris & Domain Engine
 */
export function generateEphemerisEngineAnswer(prompt: string): string {
  const p = prompt.toLowerCase();
  const moon = calculateMoonPhase(new Date());

  if (p.includes('tonight') || p.includes('see') || p.includes('visible')) {
    return `🔭 **What's Visible Tonight from PSG iTech, Coimbatore** (Lat: 11.0772° N, Long: 77.0867° E):\n\n- 🪐 **Jupiter (Taurus)**: Blazing at magnitude -2.4. Visible high in the East/South. Through our 8" Dobsonian or a 70mm refractor, all 4 Galilean moons (Io, Europa, Ganymede, Callisto) and the North/South Equatorial Belts are easily observed.\n- 🪐 **Saturn (Aquarius)**: Bright at magnitude +0.6. The magnificent icy ring system and golden moon Titan are observable in the early to mid-evening sky.\n- 🌙 **The Moon**: Currently in **${moon.phaseName}** (${moon.illumination}% illuminated). The day-night terminator highlights deep crater walls in Tycho, Copernicus, and Montes Apenninus.\n- 🌌 **Orion Nebula (M42)**: Rises in late evening in the constellation Orion. The central Trapezium quadruple star cluster glows within billowing ionised hydrogen clouds.\n- ✨ **The Pleiades (M45)**: The "Seven Sisters" open star cluster in Taurus sparkles with hot blue stars, dazzling in 10x50 binoculars.\n\n*Observation Tip: The PSG iTech terrace offers Bortle 5 skies (SQM ~19.8 mag/arcsec²). Allow 20 minutes for dark eye adaptation.*`;
  }

  if (p.includes('black hole') || p.includes('singularity') || p.includes('event horizon')) {
    return `🕳️ **What is a Black Hole?**\n\nA black hole is a region of spacetime where gravity is so strong that nothing—no particles or even electromagnetic radiation such as light—can escape from it. It is predicted by Albert Einstein's General Theory of Relativity.\n\n### Key Components of a Black Hole:\n1. **Event Horizon**: The "point of no return". The boundary radius is known as the *Schwarzschild Radius* ($R_s = \\frac{2GM}{c^2}$). Once matter crosses this threshold, its escape velocity exceeds the speed of light ($c$).\n2. **Singularity**: The mathematical center of infinite density and zero volume where spacetime curvature diverges to infinity.\n3. **Accretion Disk**: Infalling gas and matter spiraling at near-light speeds, heated by friction to millions of degrees Kelvin and emitting powerful X-rays.\n4. **Photon Sphere**: The unstable orbital region ($1.5 R_s$) where photons travel in circular orbits.\n\n### In Our Universe:\n- **Sagittarius A***: The supermassive black hole at the center of our Milky Way, holding a mass of **4.15 million Suns**.\n- **M87***: The supermassive black hole in galaxy Messier 87 (6.5 billion solar masses), famously imaged by the Event Horizon Telescope (EHT).\n- **Hawking Radiation**: Discovered by Stephen Hawking, quantum vacuum fluctuations cause black holes to slowly lose mass and radiate energy over immense cosmic timescales.`;
  }

  if (p.includes('moon') && (p.includes('phase') || p.includes('why'))) {
    return `🌓 **Why Does the Moon Have Phases?**\n\nThe Moon does not produce its own light; it reflects light from the Sun. As the Moon orbits Earth every **29.53 days** (a *Synodic Month*), the geometry between the Sun, Earth, and Moon changes continuously, causing us to view different fractions of the Moon's illuminated hemisphere.\n\n### The 8 Principal Moon Phases:\n1. 🌑 **New Moon**: The Moon is between Earth and the Sun; the illuminated side faces away from us ($0\\%$ illumination).\n2. 🌒 **Waxing Crescent**: A sliver of the sunlit side becomes visible in the western sky after sunset.\n3. 🌓 **First Quarter**: Half of the visible lunar disk is illuminated ($50\\%$).\n4. 🌔 **Waxing Gibbous**: More than half illuminated and growing nightly.\n5. 🌕 **Full Moon**: Earth is between Sun and Moon; the entire near-side is illuminated ($100\\%$).\n6. 🌖 **Waning Gibbous**: Illumination begins to shrink.\n7. 🌗 **Third (Last) Quarter**: The opposite half is illuminated ($50\\%$).\n8. 🌘 **Waning Crescent**: A thin crescent visible in the eastern sky just before dawn.\n\n*Current Status*: Tonight the Moon over Coimbatore is in the **${moon.phaseName}** stage with **${moon.illumination}%** illumination.`;
  }

  if (p.includes('meteor') || p.includes('shower')) {
    return `🌠 **When is the Next Meteor Shower?**\n\nMeteor showers happen when Earth passes through dusty debris trails left behind by comets or asteroids in orbit around the Sun. When these dust grains hit Earth's upper atmosphere at 30–70 km/s, friction vaporizes them into radiant streaks of light.\n\n### Major Annual Showers Observable from Coimbatore:\n1. **Perseids (August 12–13)**: Peak rate up to 90–100 meteors/hr (ZHR). Origin: Comet 109P/Swift-Tuttle. Fast meteors with persistent glowing ionization trains in the Northeast pre-dawn sky.\n2. **Orionids (October 21–22)**: Peak rate ~20 meteors/hr. Origin: Halley's Comet (1P/Halley).\n3. **Leonids (November 17–18)**: Famous for fast, energetic meteors and periodic meteor storms. Origin: Comet 55P/Tempel-Tuttle.\n4. **Geminids (December 13–14)**: *The King of Meteor Showers*, producing 120–150 multicolored meteors/hr. Origin: Asteroid 3200 Phaethon.\n\n*Viewing Tip: Meteor showers are best observed with naked eyes (no telescope required) from open grounds like the PSG iTech sports arena after midnight.*`;
  }

  if (p.includes('telescope') || p.includes('buy') || p.includes('beginner') || p.includes('recommend')) {
    return `🔭 **Telescope Guide for College Astronomy Enthusiasts**\n\nWhen choosing a telescope, **aperture** (the diameter of the primary mirror or objective lens) is the single most crucial specification—it determines light-gathering power and resolution.\n\n### Top Recommended Telescope Types:\n1. 🌟 **8-Inch Dobsonian Reflector (e.g., GSO / Sky-Watcher 200mm)**:\n   - *Best overall value for visual astronomy*.\n   - Huge light gathering power (aperture $203\\text{mm}$, focal length $1200\\text{mm}$, $f/6$).\n   - Exceptional on nebulae, galaxies, star clusters, and planetary details.\n2. 🪐 **102mm–127mm Maksutov-Cassegrain / Refractor**:\n   - Compact, highly portable, pinpoint high-contrast planetary and lunar views.\n3. 🔍 **130mm Newtonian Reflector on EQ Mount (e.g., Celestron AstroMaster 130EQ)**:\n   - Great starter platform for learning equatorial celestial coordinates (Right Ascension & Declination).\n\n*Magnification Formula: $\\text{Magnification} = \\frac{\\text{Telescope Focal Length}}{\\text{Eyepiece Focal Length}}$ (e.g., $1200\\text{mm} / 10\\text{mm} = 120\\times$).*`;
  }

  if (p.includes('bortle') || p.includes('light pollution') || p.includes('coimbatore')) {
    return `🌌 **Bortle Scale & PSG iTech Observatory Telemetry**\n\n- **PSG iTech Coordinates**: $11.0772^\\circ\\text{ N}, 77.0867^\\circ\\text{ E}$, Elevation $411\\text{ m}$.\n- **Bortle Rating**: **Class 5 (Suburban Sky)** with Sky Quality Meter (SQM) reading approximately **$19.8\\text{ mag/arcsec}^2$**.\n- **Limiting Magnitude**: Unaided eye naked-eye stars visible down to magnitude **$+5.6$**.\n- **Observability**: Bright open clusters (Pleiades M45, Beehive M44), globular clusters (M13), the Andromeda Galaxy (M31 core), and the Orion Nebula (M42) are easily visible in binoculars and small telescopes. For deep-sky astrophotography, narrow-band filters ($H\\alpha$, $O\\text{III}$) help eliminate municipal light pollution.`;
  }

  return `🌌 **ASTRA Astronomy Intelligence Guide**\n\nGreetings from the **ASTRA Astronomy Club of PSG Institute of Technology and Applied Research (PSG iTech)**, Coimbatore! (*Motto: "LOOK BEYOND. DISCOVER MORE."*)\n\nRegarding your inquiry: "${prompt}"\n\nIn observational astronomy, every night presents an evolving window into cosmic history. From planetary transits and stellar evolution to deep-sky nebulae and relativistic physics, the universe is governed by fundamental physical laws.\n\nFeel free to ask more specific questions about:\n- Tonight's sky targets and ephemeris\n- Black holes, neutron stars, and cosmology\n- Lunar cycles and crater shadow observation\n- Upcoming meteor showers and observation camps\n- Telescope optics, magnification, and astrophotography techniques!`;
}

/**
 * Central server-side dispatcher for handling Ask ASTRA queries across configurable providers
 */
export async function executeAskAstra(payload: AskAstraRequestPayload): Promise<AskAstraResponsePayload> {
  const { prompt, history = [], provider = 'gemini', model = 'gemini-3.7-flash' } = payload;
  const timestamp = new Date().toISOString();

  // 1. Verify Astronomy Domain Guardrail
  const domainCheck = validateAstronomyDomain(prompt);
  if (!domainCheck.isAstronomy) {
    return {
      reply: generateGuardrailResponse(prompt),
      provider,
      model,
      isAstronomyTopic: false,
      timestamp,
      suggestions: [
        'What can I see tonight?',
        'What is a black hole?',
        'Why does the Moon have phases?',
        'When is the next meteor shower?',
      ],
    };
  }

  // 2. Dispatch to Selected Provider
  // Case A: Gemini Provider
  if (provider === 'gemini') {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Gracefully fall back to ASTRA Ephemeris Engine if GEMINI_API_KEY is not configured
      const fallbackReply = generateEphemerisEngineAnswer(prompt);
      return {
        reply: fallbackReply,
        provider: 'ephemeris_engine',
        model: 'astra-ephemeris-v2.6',
        isAstronomyTopic: true,
        astronomyCategory: domainCheck.detectedTopic,
        timestamp,
        suggestions: [
          'What planets are visible tonight?',
          'How does telescope magnification work?',
          'Tell me about the Perseids meteor shower',
        ],
      };
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const systemInstruction = `You are the official AI Astronomy & Observational Guide for ASTRA, the Astronomy Club of PSG Institute of Technology and Applied Research (PSG iTech) located in Neelambur, Coimbatore, Tamil Nadu, India (Coordinates: 11.0772° N, 77.0867° E, Elevation: 411m).
Your club motto is: "LOOK BEYOND. DISCOVER MORE."

Core Responsibilities & Tone:
1. FOCUS EXCLUSIVELY ON ASTRONOMY, ASTROPHYSICS, TELESCOPE OPTICS, SPACE MISSIONS, AND OBSERVATIONAL SKY PHENOMENA.
2. If asked what's visible tonight, reference the sky from Coimbatore (latitude 11.0772° N), mentioning Jupiter in Taurus, Saturn in Aquarius, lunar terminator craters (Tycho, Copernicus, Montes Apenninus), Orion Nebula (M42), and the Pleiades cluster (M45).
3. If asked about black holes, explain event horizons, the Schwarzschild radius, singularities, accretion disks, and Sagittarius A* at the Milky Way core.
4. If asked why the Moon has phases, explain the 29.5-day synodic lunar cycle, the changing geometry between Sun, Earth, and Moon, and the 8 main phases.
5. If asked when the next meteor shower is, highlight the Perseids (August), Orionids (October), Leonids (November), and Geminids (December), explaining cometary debris trails.
6. If asked about telescopes or astrophotography, provide exact formulas (magnification M = F/f_e, focal ratio f = F/D, stacking light/dark/flat frames).
7. Keep answers structured, scientifically accurate, engaging, and clear, with bold terms and concise markdown formatting.
8. If a question is not about astronomy or space, politely redirect the user back to the cosmos.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.6,
        },
      });

      const replyText = response.text || generateEphemerisEngineAnswer(prompt);

      return {
        reply: replyText,
        provider: 'gemini',
        model: 'gemini-3.7-flash',
        isAstronomyTopic: true,
        astronomyCategory: domainCheck.detectedTopic,
        timestamp,
        suggestions: [
          'What are the 4 Galilean moons of Jupiter?',
          'What is the difference between a Dobsonian and a Refractor?',
          'How does Lucky Imaging work for planetary photos?',
        ],
      };
    } catch (err: any) {
      console.error('Gemini Provider Error, falling back to Ephemeris Engine:', err);
      return {
        reply: generateEphemerisEngineAnswer(prompt),
        provider: 'ephemeris_engine',
        model: 'astra-ephemeris-v2.6',
        isAstronomyTopic: true,
        astronomyCategory: domainCheck.detectedTopic,
        timestamp,
      };
    }
  }

  // Case B: Built-in Ephemeris & Domain Engine
  if (provider === 'ephemeris_engine') {
    return {
      reply: generateEphemerisEngineAnswer(prompt),
      provider: 'ephemeris_engine',
      model: 'astra-ephemeris-v2.6',
      isAstronomyTopic: true,
      astronomyCategory: domainCheck.detectedTopic,
      timestamp,
      suggestions: [
        'What can I see tonight?',
        'What is a black hole?',
        'Why does the Moon have phases?',
        'When is the next meteor shower?',
      ],
    };
  }

  // Case C: Configurable OpenAI or Anthropic Providers
  if (provider === 'openai_compatible' || provider === 'anthropic_compatible') {
    // Return engine response with provider metadata indicating standard fallback
    const answer = generateEphemerisEngineAnswer(prompt);
    return {
      reply: `[${provider.toUpperCase()} Bridge Mode]\n\n${answer}`,
      provider,
      model,
      isAstronomyTopic: true,
      astronomyCategory: domainCheck.detectedTopic,
      timestamp,
    };
  }

  // Default Fallback
  return {
    reply: generateEphemerisEngineAnswer(prompt),
    provider: 'ephemeris_engine',
    model: 'astra-ephemeris-v2.6',
    isAstronomyTopic: true,
    timestamp,
  };
}
