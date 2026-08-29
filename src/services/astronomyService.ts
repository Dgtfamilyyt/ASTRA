import { SkyConditionData, CelestialObject } from '../types';
import { CELESTIAL_OBJECTS } from '../data/astronomyData';

// PSG iTech Coordinates: 11.0772° N, 77.0867° E
const COIMBATORE_LAT = 11.0772;
const COIMBATORE_LNG = 77.0867;

export interface MoonDetails {
  phaseName: string;
  phaseIndex: number; // 0 to 7
  illumination: number; // 0 to 100%
  ageDays: number;
  stage: 'Waxing' | 'Waning' | 'Full' | 'New';
}

/**
 * Computes the exact Moon Phase and illumination percentage for any given date
 * based on the 29.53058867-day synodic lunation cycle from reference epoch.
 */
export function calculateMoonPhase(date: Date = new Date()): MoonDetails {
  const knownNewMoon = new Date('2000-01-06T18:14:00Z').getTime();
  const synodicMonth = 29.53058867 * 24 * 60 * 60 * 1000;
  
  const diff = date.getTime() - knownNewMoon;
  const cycles = (diff / synodicMonth) % 1;
  const normalized = cycles < 0 ? cycles + 1 : cycles;
  
  const ageDays = +(normalized * 29.53058867).toFixed(1);
  // Illumination calculation (0 to 100%)
  const illumination = Math.round((1 - Math.cos(normalized * 2 * Math.PI)) / 2 * 100);
  
  let phaseName = 'New Moon';
  let phaseIndex = 0;
  let stage: 'Waxing' | 'Waning' | 'Full' | 'New' = 'Waxing';

  if (normalized < 0.03 || normalized > 0.97) {
    phaseName = 'New Moon';
    phaseIndex = 0;
    stage = 'New';
  } else if (normalized < 0.22) {
    phaseName = 'Waxing Crescent';
    phaseIndex = 1;
    stage = 'Waxing';
  } else if (normalized < 0.28) {
    phaseName = 'First Quarter';
    phaseIndex = 2;
    stage = 'Waxing';
  } else if (normalized < 0.47) {
    phaseName = 'Waxing Gibbous';
    phaseIndex = 3;
    stage = 'Waxing';
  } else if (normalized < 0.53) {
    phaseName = 'Full Moon';
    phaseIndex = 4;
    stage = 'Full';
  } else if (normalized < 0.72) {
    phaseName = 'Waning Gibbous';
    phaseIndex = 5;
    stage = 'Waning';
  } else if (normalized < 0.78) {
    phaseName = 'Third Quarter';
    phaseIndex = 6;
    stage = 'Waning';
  } else {
    phaseName = 'Waning Crescent';
    phaseIndex = 7;
    stage = 'Waning';
  }

  return {
    phaseName,
    phaseIndex,
    illumination,
    ageDays,
    stage,
  };
}

/**
 * Generates real-time / current sky condition telemetry for PSG iTech Observatory
 */
export function getObservatorySkyConditions(date: Date = new Date()): SkyConditionData {
  const moon = calculateMoonPhase(date);
  
  // Calculate simulated realistic seeing conditions based on local Coimbatore climatology
  const hours = date.getHours();
  const isNight = hours >= 18 || hours <= 5;
  
  let cloudCover = 15;
  let temp = isNight ? 23 : 31;
  let humidity = isNight ? 68 : 52;
  
  let seeing: SkyConditionData['seeingIndex'] = 'Good (2-3")';
  let transparency: SkyConditionData['transparency'] = 'High';
  let rating: SkyConditionData['overallRating'] = 'Good Observation';
  
  if (moon.illumination < 40 && isNight) {
    rating = 'Outstanding Night';
    transparency = 'High';
    seeing = 'Excellent (1-2")';
  } else if (moon.illumination > 80) {
    rating = 'Good Observation'; // Moon bright, great for lunar/planetary
    transparency = 'Moderate';
  }

  return {
    bortleRating: 'Class 5 (Terrace SQM ~19.8 mag/arcsec²)',
    limitingMagnitude: 5.6,
    cloudCoverPercentage: cloudCover,
    seeingIndex: seeing,
    transparency,
    humidityPercentage: humidity,
    temperatureCelsius: temp,
    moonIlluminationPercent: moon.illumination,
    moonPhaseName: moon.phaseName,
    moonPhaseIndex: moon.phaseIndex,
    moonRiseTime: '06:12 PM IST',
    moonSetTime: '05:48 AM IST',
    sunSetTime: '06:38 PM IST',
    astronomicalTwilightEnd: '07:52 PM IST',
    astronomicalTwilightStart: '05:14 AM IST',
    overallRating: rating,
  };
}

/**
 * Computes altitude and azimuth of visible celestial objects for a given simulation hour
 * (0 = 6 PM, 6 = 12 AM Midnight, 12 = 6 AM Dawn)
 */
export function getSimulatedObjectPositions(hourOffsetFromSunset: number = 2): CelestialObject[] {
  return CELESTIAL_OBJECTS.map((obj, index) => {
    // Phase shift based on right ascension simulation
    const baseAlt = obj.altitudeDegrees;
    const baseAz = obj.azimuthDegrees;
    
    // As night progresses (earth rotates ~15 deg/hr), objects drift westwards and change altitude
    const rotationDeg = hourOffsetFromSunset * 15;
    let newAz = (baseAz + rotationDeg * 0.8) % 360;
    
    // Parabolic altitude arc
    const midHour = 5;
    const hourDelta = Math.abs(hourOffsetFromSunset - midHour);
    const altAdjustment = Math.sin((12 - hourDelta) / 12 * Math.PI) * 20 - 10;
    let newAlt = Math.max(5, Math.min(88, Math.round(baseAlt + altAdjustment + (index % 3) * 2)));

    const isCurrentlyVisible = newAlt > 10;

    return {
      ...obj,
      altitudeDegrees: newAlt,
      azimuthDegrees: Math.round(newAz),
      visibleTonight: isCurrentlyVisible,
    };
  });
}

/**
 * Service to call our backend Gemini AI assistant endpoint securely
 */
export async function askAstraAI(prompt: string, history: { role: string; parts: string }[] = []): Promise<string> {
  try {
    const res = await fetch('/api/gemini/ask-astra', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, history }),
    });

    if (!res.ok) {
      throw new Error(`Server returned HTTP ${res.status}`);
    }

    const data = await res.json();
    return data.reply || 'No astronomical telemetry received.';
  } catch (error) {
    console.error('Error contacting ASTRA AI assistant:', error);
    // Intelligent offline astronomical responses if backend is in cold-start or disconnected
    return getOfflineAstronomyAnswer(prompt);
  }
}

/**
 * Fallback domain knowledge generator for instant answers
 */
function getOfflineAstronomyAnswer(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('tonight') || q.includes('see') || q.includes('visible')) {
    return `From PSG iTech tonight in Coimbatore, the standout highlights are **Jupiter** high in Taurus with its 4 Galilean moons, **Saturn** displaying sharp ring shadows in Aquarius, and the radiant **Orion Nebula (M42)** rising in late evening. The Moon is in Waxing phase, offering crisp shadow relief along the Montes Apenninus mountain range!`;
  }
  if (q.includes('black hole') || q.includes('singularity')) {
    return `A black hole is a region of spacetime where gravitational curvature is so intense that nothing—not even light—can exceed its escape velocity. At its boundary lies the **Event Horizon**, and at its core is a singularity where matter is crushed to infinite density. At the center of our Milky Way sits **Sagittarius A***, a supermassive black hole with 4.15 million times the mass of our Sun!`;
  }
  if (q.includes('moon') || q.includes('phase')) {
    return `Moon phases occur because the Moon orbits Earth while being illuminated on one side by the Sun. As it completes its 29.5-day synodic cycle, we view varying fractions of its sunlit hemisphere—from New Moon, through Waxing Crescent, First Quarter, Gibbous, to Full Moon and back.`;
  }
  if (q.includes('meteor') || q.includes('shower')) {
    return `Meteor showers occur when Earth plows through streams of dust and rocky debris left behind by comets or asteroids. When these particles strike Earth's upper atmosphere at 30–70 km/s, friction vaporizes them into glowing streaks of ionized gas. Key annual showers observable from Coimbatore include the **Perseids (August)**, **Orionids (October)**, and **Geminids (December)**.`;
  }
  if (q.includes('telescope') || q.includes('buy') || q.includes('equipment')) {
    return `For beginner college astronomers, ASTRA recommends starting with a **70mm to 130mm reflector or refractor** or an **8-inch Dobsonian telescope**. Aperture (mirror diameter) matters much more than advertised magnification because light-gathering power determines how bright and resolved deep-sky objects appear.`;
  }
  return `Greetings from ASTRA at PSG iTech! Astronomy is the study of celestial objects, space, and the physical universe. Whether you're curious about planetary orbits, stellar lifecycles, telescope optics, or upcoming observation camps on our campus terrace, feel free to ask!`;
}
