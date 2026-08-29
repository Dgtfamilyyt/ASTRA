import {
  CelestialObject,
  Constellation,
  AstronomyEvent,
  GalleryImage,
  LearnTopic,
} from '../types';

export const CELESTIAL_OBJECTS: CelestialObject[] = [
  {
    id: 'jupiter',
    name: 'Jupiter',
    designation: 'Sol V',
    category: 'Planet',
    constellation: 'Taurus',
    apparentMagnitude: -2.4,
    distanceLightYears: '43.2 light-minutes (778M km)',
    bestViewingTime: '08:45 PM – 02:15 AM',
    visibleTonight: true,
    altitudeDegrees: 58,
    azimuthDegrees: 142,
    description: 'The monarch of our solar system. Distinct cloud bands (NEB/SEB) and all 4 Galilean moons (Io, Europa, Ganymede, Callisto) are easily resolved even in a 70mm telescope.',
    features: ['Great Red Spot anticyclone', 'Galilean Moon shadow transits', 'Rapid 9h 55m rotation period'],
    viewingDifficulty: 'Naked Eye',
    imageUrl: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'saturn',
    name: 'Saturn',
    designation: 'Sol VI',
    category: 'Planet',
    constellation: 'Aquarius',
    apparentMagnitude: 0.6,
    distanceLightYears: '82 light-minutes (1.4B km)',
    bestViewingTime: '07:30 PM – 11:45 PM',
    visibleTonight: true,
    altitudeDegrees: 46,
    azimuthDegrees: 185,
    description: 'The jewel of the night sky with its stunning icy ring system and giant moon Titan visible as an 8th-magnitude golden pinpoint nearby.',
    features: ['Cassini Division in rings', 'Titan & Rhea moons', 'Hexagonal north polar jet stream'],
    viewingDifficulty: 'Naked Eye',
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'moon',
    name: 'The Moon',
    designation: 'Luna / Earth I',
    category: 'Moon',
    constellation: 'Scorpius',
    apparentMagnitude: -12.1,
    distanceLightYears: '1.28 light-seconds (384,400 km)',
    bestViewingTime: '06:45 PM – 11:30 PM',
    visibleTonight: true,
    altitudeDegrees: 64,
    azimuthDegrees: 195,
    description: 'Earth’s only natural satellite. Along the day-night terminator line, crater rims such as Tycho, Copernicus, and Montes Apenninus cast dramatic long shadows.',
    features: ['Tycho ray crater system', 'Sea of Tranquility (Apollo 11 site)', 'Montes Apenninus mountain range (up to 5km high)'],
    viewingDifficulty: 'Naked Eye',
    imageUrl: 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'orion-nebula',
    name: 'Orion Nebula',
    designation: 'Messier 42 / NGC 1976',
    category: 'Nebula',
    constellation: 'Orion',
    apparentMagnitude: 4.0,
    distanceLightYears: '1,344 ly',
    rightAscension: '05h 35m',
    declination: '-05° 23′',
    bestViewingTime: '10:15 PM – 03:30 AM',
    visibleTonight: true,
    altitudeDegrees: 52,
    azimuthDegrees: 110,
    description: 'The closest massive star-forming nursery to Earth. In our 8" Dobsonian, the central Trapezium cluster (Theta1 Orionis) illuminates glowing curtains of ionized hydrogen and oxygen gas.',
    features: ['Trapezium Quadruple Star System', 'Dark dust bay (Sinus Magnus)', 'Protoplanetary disks (Proplyds)'],
    viewingDifficulty: 'Binoculars',
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'andromeda-galaxy',
    name: 'Andromeda Galaxy',
    designation: 'Messier 31 / NGC 224',
    category: 'Galaxy',
    constellation: 'Andromeda',
    apparentMagnitude: 3.44,
    distanceLightYears: '2.5 million ly',
    rightAscension: '00h 42m',
    declination: '+41° 16′',
    bestViewingTime: '08:00 PM – 01:00 AM',
    visibleTonight: true,
    altitudeDegrees: 38,
    azimuthDegrees: 35,
    description: 'The most distant object visible to the unaided human eye from a dark sky. A colossal barred spiral galaxy containing over 1 trillion stars on a collision course with our Milky Way in 4.5 billion years.',
    features: ['Bright stellar nucleus', 'Satellite galaxies M32 and M110', 'Extends across 3 degrees of sky'],
    viewingDifficulty: 'Binoculars',
    imageUrl: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pleiades',
    name: 'The Pleiades (Seven Sisters)',
    designation: 'Messier 45',
    category: 'Star Cluster',
    constellation: 'Taurus',
    apparentMagnitude: 1.6,
    distanceLightYears: '444 ly',
    bestViewingTime: '09:30 PM – 03:00 AM',
    visibleTonight: true,
    altitudeDegrees: 62,
    azimuthDegrees: 85,
    description: 'A dazzling open cluster of hot blue B-type stars enveloped in a faint reflection nebula of cosmic dust. Breathtaking in 15x70 binoculars.',
    features: ['Alcyone, Maia, Electra & Atlas stars', 'Bluish reflection nebulosity', 'Age ~100 million years'],
    viewingDifficulty: 'Naked Eye',
    imageUrl: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mars',
    name: 'Mars',
    designation: 'Sol IV',
    category: 'Planet',
    constellation: 'Gemini',
    apparentMagnitude: 0.2,
    distanceLightYears: '11 light-minutes (200M km)',
    bestViewingTime: '11:45 PM – 05:00 AM',
    visibleTonight: true,
    altitudeDegrees: 42,
    azimuthDegrees: 78,
    description: 'The Red Planet, illuminated by rust-red iron oxide dust on its arid surface. In high magnification, white polar ice caps and dark volcanic plains like Syrtis Major emerge.',
    features: ['North polar ice cap', 'Olympus Mons & Valles Marineris', 'Phobos & Deimos micro-moons'],
    viewingDifficulty: 'Naked Eye',
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'venus',
    name: 'Venus',
    designation: 'Sol II',
    category: 'Planet',
    constellation: 'Virgo',
    apparentMagnitude: -4.1,
    distanceLightYears: '6 light-minutes (110M km)',
    bestViewingTime: '05:45 AM – 06:15 AM (Dawn)',
    visibleTonight: true,
    altitudeDegrees: 22,
    azimuthDegrees: 95,
    description: 'The brilliant "Morning Star". Completely shrouded in reflective sulfuric acid clouds, exhibiting clear crescent and gibbous phases identical to the Moon.',
    features: ['Over 70% albedo reflectivity', 'Extreme runaway greenhouse atmosphere', 'Retrograde axial rotation'],
    viewingDifficulty: 'Naked Eye',
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ring-nebula',
    name: 'Ring Nebula',
    designation: 'Messier 57 / NGC 6720',
    category: 'Nebula',
    constellation: 'Lyra',
    apparentMagnitude: 8.8,
    distanceLightYears: '2,570 ly',
    bestViewingTime: '07:30 PM – 10:45 PM',
    visibleTonight: true,
    altitudeDegrees: 48,
    azimuthDegrees: 310,
    description: 'A classic planetary nebula formed when a dying red giant star ejected its outer atmosphere, leaving behind a 15th-magnitude white dwarf at its core.',
    features: ['Distinct smoke-ring appearance in 8" telescope', 'White dwarf core', 'Oxygen III emission ring'],
    viewingDifficulty: 'Small Telescope',
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80',
  },
];

export const CONSTELLATIONS: Constellation[] = [
  {
    id: 'orion',
    name: 'Orion',
    latinName: 'Orion the Hunter',
    meaning: 'The Celestial Hunter',
    season: 'Winter',
    brightestStar: 'Rigel (Beta Orionis, Mag 0.13)',
    visibleTonight: true,
    bestTime: '10:00 PM – 03:00 AM',
    mythology: 'Represented in Indian astronomy as Mriga (the Deer) and Kalapurusha. Features red supergiant Betelgeuse and blue supergiant Rigel.',
    keyStars: [
      { name: 'Betelgeuse', mag: 0.5, x: 35, y: 30 },
      { name: 'Bellatrix', mag: 1.6, x: 65, y: 32 },
      { name: 'Alnitak', mag: 1.8, x: 44, y: 52 },
      { name: 'Alnilam', mag: 1.7, x: 50, y: 50 },
      { name: 'Mintaka', mag: 2.2, x: 56, y: 48 },
      { name: 'Saiph', mag: 2.0, x: 38, y: 75 },
      { name: 'Rigel', mag: 0.1, x: 68, y: 72 },
    ],
    lines: [
      [0, 1], [0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6], [5, 6]
    ],
  },
  {
    id: 'ursa-major',
    name: 'Ursa Major (Saptarishi)',
    latinName: 'Great Bear',
    meaning: 'The Seven Sages / Great Bear',
    season: 'Spring',
    brightestStar: 'Alioth (Epsilon UMa, Mag 1.77)',
    visibleTonight: true,
    bestTime: '07:30 PM – 11:30 PM',
    mythology: 'Revered across Indian astronomical lore as the Saptarishi mandalam. Its pointer stars Dubhe and Merak line up directly toward Polaris.',
    keyStars: [
      { name: 'Dubhe', mag: 1.8, x: 68, y: 28 },
      { name: 'Merak', mag: 2.3, x: 65, y: 48 },
      { name: 'Phecda', mag: 2.4, x: 48, y: 50 },
      { name: 'Megrez', mag: 3.3, x: 50, y: 32 },
      { name: 'Alioth', mag: 1.8, x: 36, y: 35 },
      { name: 'Mizar/Alcor', mag: 2.2, x: 25, y: 42 },
      { name: 'Alkaid', mag: 1.9, x: 15, y: 55 },
    ],
    lines: [
      [0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [4, 5], [5, 6]
    ],
  },
  {
    id: 'scorpius',
    name: 'Scorpius',
    latinName: 'Scorpius',
    meaning: 'The Celestial Scorpion',
    season: 'Summer',
    brightestStar: 'Antares (Alpha Sco, Mag 0.96)',
    visibleTonight: true,
    bestTime: '07:00 PM – 10:00 PM',
    mythology: 'Contains the fiery red supergiant Antares (rival of Mars / Jyeshtha nakshatra) anchoring the galactic bulge of the Milky Way.',
    keyStars: [
      { name: 'Graffias', mag: 2.6, x: 45, y: 20 },
      { name: 'Dschubba', mag: 2.3, x: 42, y: 28 },
      { name: 'Antares', mag: 1.0, x: 40, y: 42 },
      { name: 'Larawag', mag: 2.8, x: 38, y: 56 },
      { name: 'Sargas', mag: 1.9, x: 44, y: 72 },
      { name: 'Shaula', mag: 1.6, x: 58, y: 78 },
      { name: 'Lesath', mag: 2.7, x: 62, y: 74 },
    ],
    lines: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]
    ],
  },
  {
    id: 'cygnus',
    name: 'Cygnus',
    latinName: 'Northern Cross / The Swan',
    meaning: 'The Flying Swan',
    season: 'Summer',
    brightestStar: 'Deneb (Alpha Cyg, Mag 1.25)',
    visibleTonight: true,
    bestTime: '08:00 PM – 01:30 AM',
    mythology: 'Flies right through the dense star clouds of the Milky Way. Deneb forms the prominent Summer Triangle alongside Vega and Altair.',
    keyStars: [
      { name: 'Deneb', mag: 1.2, x: 50, y: 20 },
      { name: 'Sadr', mag: 2.2, x: 50, y: 45 },
      { name: 'Albireo', mag: 3.0, x: 50, y: 80 },
      { name: 'Gienah', mag: 2.5, x: 25, y: 48 },
      { name: 'Rukh', mag: 2.8, x: 75, y: 42 },
    ],
    lines: [
      [0, 1], [1, 2], [3, 1], [1, 4]
    ],
  },
  {
    id: 'taurus',
    name: 'Taurus',
    latinName: 'Taurus the Bull',
    meaning: 'The Celestial Bull',
    season: 'Winter',
    brightestStar: 'Aldebaran (Alpha Tau, Mag 0.85)',
    visibleTonight: true,
    bestTime: '09:00 PM – 03:30 AM',
    mythology: 'Hosts two of the closest open star clusters to Earth: the V-shaped Hyades and the magnificent Pleiades (M45).',
    keyStars: [
      { name: 'Aldebaran', mag: 0.8, x: 58, y: 45 },
      { name: 'Elnath', mag: 1.6, x: 72, y: 22 },
      { name: 'Zeta Tauri', mag: 3.0, x: 80, y: 55 },
      { name: 'Hyades Root', mag: 3.4, x: 42, y: 48 },
      { name: 'Pleiades Center', mag: 1.6, x: 25, y: 30 },
    ],
    lines: [
      [1, 0], [0, 3], [0, 2], [3, 4]
    ],
  },
];

export const ASTRONOMY_CALENDAR: AstronomyEvent[] = [
  {
    id: 'cal-1',
    name: 'Perseids Meteor Shower Peak',
    type: 'Meteor Shower',
    category: 'Meteor Shower',
    date: '2026-08-12',
    peakTime: '01:00 AM – 04:30 AM IST',
    visibility: 'Excellent',
    direction: 'North-East (Constellation Perseus)',
    magnitude: 'Up to 90 meteors/hour (ZHR)',
    summary: 'One of the most prolific and reliable annual meteor showers, produced by comet 109P/Swift-Tuttle.',
    description: 'Swift, bright meteors with persistent ionization trains. Coimbatore’s eastern pre-dawn sky offers magnificent vantage points away from city lights.',
    observationTips: [
      'Allow 20 minutes for your eyes to fully adapt to the dark.',
      'Lie on a reclining chair facing Northeast after 1 AM.',
      'No optical equipment needed; naked eye widefield view is best.',
    ],
    equipmentNeeded: 'Naked eye / Reclining mat',
    celestialSignificance: 'Annual Perseid debris stream collision',
  },
  {
    id: 'cal-2',
    name: 'Saturn at Opposition',
    type: 'Opposition',
    category: 'Opposition',
    date: '2026-09-21',
    peakTime: 'All Night (Highest at 12:15 AM)',
    visibility: 'Excellent',
    direction: 'South (Constellation Aquarius)',
    magnitude: '+0.4',
    summary: 'Saturn makes its closest approach to Earth with its globe and ring system fully illuminated by the Sun.',
    description: 'During opposition, Saturn is directly opposite the Sun in our sky, rising at sunset and remaining visible until sunrise. The rings exhibit the Seeliger effect brightening.',
    observationTips: [
      'Use 100x or higher magnification on the ASTRA 8" Dobsonian.',
      'Look for the dark Cassini gap separating Ring A and Ring B.',
      'Spot orange-hued moon Titan hovering several ring-diameters away.',
    ],
    equipmentNeeded: 'Telescope (3-inch aperture or larger)',
    celestialSignificance: 'Maximum Saturn angular size & brightness in 2026',
  },
  {
    id: 'cal-3',
    name: 'Partial Lunar Eclipse',
    type: 'Eclipse',
    category: 'Eclipse',
    date: '2026-08-28',
    peakTime: '09:42 PM – 11:15 PM IST',
    visibility: 'Good',
    direction: 'South-East',
    magnitude: '0.93 Umbral Magnitude',
    summary: 'Earth’s dark umbral shadow bites into the lunar disk, visible across Tamil Nadu and peninsular India.',
    description: 'A striking partial eclipse where over 90% of the Moon enters the deep umbra, causing dramatic rusty copper hues across the eclipsed portion.',
    observationTips: [
      '100% safe to view with naked eyes, binoculars, and telescopes.',
      'Observe the curved geometry of Earth’s shadow confirming spherical planetary shape.',
      'Capture lunar surface HDR bracketed exposures through prime-focus DSLR.',
    ],
    equipmentNeeded: 'Naked eye, Binoculars, or Telescope',
    celestialSignificance: 'Saros 128 series deep partial eclipse',
  },
  {
    id: 'cal-4',
    name: 'Jupiter at Solar Opposition',
    type: 'Opposition',
    category: 'Opposition',
    date: '2026-11-14',
    peakTime: '11:40 PM IST',
    visibility: 'Excellent',
    direction: 'East to South',
    magnitude: '-2.8 (Blazing bright)',
    summary: 'Jupiter reaches minimum distance to Earth, appearing largest and most detailed for the entire year.',
    description: 'Apparent diameter exceeds 49 arcseconds. Swirling turbulence in the North and South Equatorial Belts, white ovals, and the Great Red Spot are easily studied.',
    observationTips: [
      'Track Io and Europa cast pitch-black shadows onto the Jovian cloud tops.',
      'A blue or light-green planetary filter improves contrast on atmospheric festoons.',
    ],
    equipmentNeeded: 'Binoculars or any Telescope',
    celestialSignificance: 'Closest Jovian approach at 3.98 AU',
  },
  {
    id: 'cal-5',
    name: 'Geminids Meteor Shower (King of Meteor Showers)',
    type: 'Meteor Shower',
    category: 'Meteor Shower',
    date: '2026-12-13',
    peakTime: '10:30 PM – 05:00 AM IST',
    visibility: 'Excellent',
    direction: 'High Overhead (Constellation Gemini)',
    magnitude: '120–150 meteors/hour (ZHR)',
    summary: 'The richest meteor display of the year originating from asteroid 3200 Phaethon rather than a comet.',
    description: 'Slow, dense, multicolored meteors (white, yellow, green) that create vivid bright fireballs across the entire night canopy.',
    observationTips: [
      'Peak activity begins earlier than most showers, starting around 10:30 PM.',
      'PSG iTech Central Sports Ground provides clear 360-degree horizon views.',
    ],
    equipmentNeeded: 'Naked Eye / Warm clothing',
    celestialSignificance: 'Phaethon asteroid dust stream encounter',
  },
];

export const ASTRONOMICAL_CALENDAR_EVENTS = ASTRONOMY_CALENDAR;

export const ASTROPHOTOGRAPHY_GALLERY: GalleryImage[] = [
  {
    id: 'img-1',
    title: 'The Great Orion Nebula (M42 & De Mairan’s M43)',
    object: 'Orion Nebula — M42',
    targetObject: 'Orion Nebula — M42',
    category: 'Nebulae',
    photographer: 'ASTRA Astrophotography Wing',
    photographerName: 'ASTRA Astrophotography Wing',
    photographerRole: 'M. Harish & Student Team',
    date: '2025-12-14',
    captureDate: '2025-12-14',
    location: 'PSG iTech Terrace Observatory, Coimbatore',
    telescope: '8" GSO Dobsonian on Motorized EQ Tracking Platform',
    telescopeUsed: '8" GSO Dobsonian on Motorized EQ Platform',
    camera: 'Canon EOS 80D (Astromodified)',
    mount: 'Dual-Axis Microstepping EQ Platform',
    exposure: '90 x 45s lights (ISO 1600), 25 Darks, 30 Flats, 40 Bias (Total ~1.1 hrs)',
    exposureTime: '90 x 45s lights (ISO 1600)',
    processing: 'DeepSkyStacker + Siril Background Extraction + Photoshop Star Stretch',
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
    description: 'Captures the billowing ionised hydrogen-alpha emission and teal oxygen-III shells in the core of the Sword of Orion, revealing dark dust tendrils cutting across the Trapezium cluster.',
    featured: true,
  },
  {
    id: 'img-2',
    title: 'Waxing Gibbous Moon & The Craters of Montes Apenninus',
    object: 'Lunar Terminator — Montes Apenninus & Copernicus',
    targetObject: 'Lunar Terminator — Montes Apenninus & Copernicus',
    category: 'Moon',
    photographer: 'S. K. Ashwin',
    photographerName: 'S. K. Ashwin',
    photographerRole: 'President, ASTRA',
    date: '2026-02-27',
    captureDate: '2026-02-27',
    location: 'Civil Engineering Block Terrace, PSG iTech',
    telescope: 'Celestron AstroMaster 130EQ with 2x Barlow',
    telescopeUsed: 'Celestron AstroMaster 130EQ',
    camera: 'ZWO ASI120MC-S Planetary Camera',
    exposure: '2,500 frames video capture at 60 FPS (Top 15% stacked in AutoStakkert!3)',
    exposureTime: '2,500 frames video stack',
    processing: 'AutoStakkert!3 + RegiStax 6 Wavelet Sharpening',
    imageUrl: 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&w=1200&q=80',
    description: 'High-resolution Lucky Imaging highlighting central peak uplifts of Copernicus crater and the jagged 5,000-meter peaks of Montes Apenninus casting long dawn shadows.',
    featured: true,
  },
  {
    id: 'img-3',
    title: 'Jupiter Cloud Belts & Galilean Moons Transit',
    object: 'Jupiter & Io Shadow',
    targetObject: 'Jupiter & Io Shadow',
    category: 'Planets',
    photographer: 'K. R. Vignesh & M. Harish',
    photographerName: 'K. R. Vignesh & M. Harish',
    photographerRole: 'ASTRA Imaging Core',
    date: '2025-11-20',
    captureDate: '2025-11-20',
    location: 'PSG iTech Campus, Neelambur',
    telescope: '8" Dobsonian with 3x TeleVue Barlow',
    telescopeUsed: '8" Dobsonian with 3x TeleVue Barlow',
    camera: 'ZWO ASI224MC Planetary Sensor',
    exposure: '3 x 90-second SER video runs with WinJUPOS derotation',
    exposureTime: '3 x 90-second SER video runs',
    processing: 'PIPP + AutoStakkert!3 + WinJUPOS atmospheric dispersion correction',
    imageUrl: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&w=1200&q=80',
    description: 'Reveals distinct festoons within the North Equatorial Belt and the tiny circular jet-black shadow of moon Io traversing across Jupiter’s upper troposphere.',
    featured: true,
  },
  {
    id: 'img-4',
    title: 'Andromeda Spiral Galaxy (M31, M32 & M110)',
    object: 'Andromeda Galaxy',
    targetObject: 'Andromeda Galaxy',
    category: 'Galaxies',
    photographer: 'ASTRA Astrophotography Team',
    photographerName: 'ASTRA Astrophotography Team',
    date: '2025-10-18',
    captureDate: '2025-10-18',
    location: 'Siruvani Foothills Dark Sky Site, Coimbatore Outskirts',
    telescope: 'Samyang 135mm f/2.0 ED UMC Telephoto Lens',
    telescopeUsed: 'Samyang 135mm f/2.0 ED UMC Lens',
    camera: 'Sony Alpha A7 III (Full Frame)',
    mount: 'Sky-Watcher Star Adventurer 2i',
    exposure: '120 x 60s at f/2.8, ISO 800 (2.0 hours integrated integration)',
    exposureTime: '120 x 60s at f/2.8, ISO 800',
    processing: 'Siril Stacking + Starnet++ Star Removal + GIMP Color Balance',
    imageUrl: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=1200&q=80',
    description: 'Wide-field capture showing the vast spiral dust lanes of our neighboring major galaxy spanning over 3 degrees of sky, accompanied by dwarf elliptical companions M32 and M110.',
  },
  {
    id: 'img-5',
    title: 'The Pleiades Open Cluster & Maia Reflection Nebula (M45)',
    object: 'The Seven Sisters',
    targetObject: 'The Seven Sisters',
    category: 'Constellations',
    photographer: 'M. Harish',
    photographerName: 'M. Harish',
    photographerRole: 'Astrophotography Lead',
    date: '2025-11-08',
    captureDate: '2025-11-08',
    location: 'PSG iTech Terrace, Coimbatore',
    telescope: '70mm Quadruplet Petzval Astrograph',
    telescopeUsed: '70mm Quadruplet Petzval Astrograph',
    camera: 'Canon EOS 80D',
    mount: 'Equatorial GoTo Mount',
    exposure: '60 x 90s, ISO 1600',
    exposureTime: '60 x 90s, ISO 1600',
    processing: 'Siril + Darktable Curves & Noise Reduction',
    imageUrl: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=1200&q=80',
    description: 'Electric blue reflection nebulosity illuminated by the intense ultraviolet radiation of young, luminous B-type stars in Taurus.',
  },
  {
    id: 'img-6',
    title: 'Solar White-Light Photosphere: Sunspot Group AR3664',
    object: 'Active Solar Sunspots',
    targetObject: 'Active Solar Sunspots',
    category: 'Sun',
    photographer: 'Dr. R. S. Kumar & ASTRA Team',
    photographerName: 'Dr. R. S. Kumar & ASTRA Team',
    photographerRole: 'Faculty Advisor & Student Team',
    date: '2024-05-10',
    captureDate: '2024-05-10',
    location: 'PSG iTech Physics Lab Balcony',
    telescope: '130mm Reflector + Baader Solar Safety Filter ND 5.0',
    telescopeUsed: '130mm Reflector + Baader Solar Filter',
    camera: 'Nikon D5600',
    exposure: '1/2000s at ISO 100 (Single frame raw)',
    exposureTime: '1/2000s at ISO 100',
    processing: 'Lightroom Contrast & Solar Limb Darkening Enhancement',
    imageUrl: 'https://images.unsplash.com/photo-1532767153582-b1a0e5145009?auto=format&fit=crop&w=1200&q=80',
    description: 'A monster sunspot complex spanning over 200,000 km across the solar disk—the source of historic geomagnetic auroral storms observed worldwide in May 2024.',
  },
  {
    id: 'img-7',
    title: 'Star Trails over PSG iTech Academic Clock Tower',
    object: 'Circumpolar Star Trails',
    targetObject: 'Circumpolar Star Trails',
    category: 'Campus Sky',
    photographer: 'Ananya S. Iyer & Team',
    photographerName: 'Ananya S. Iyer & Team',
    photographerRole: 'ASTRA Media & Outreach',
    date: '2026-01-15',
    captureDate: '2026-01-15',
    location: 'PSG iTech Main Quadrangle, Neelambur',
    telescope: 'Wide Angle 18mm f/3.5 Lens',
    telescopeUsed: 'Wide Angle 18mm Lens',
    camera: 'Canon EOS 1500D',
    mount: 'Heavy Duty Fixed Manfrotto Tripod',
    exposure: '180 consecutive 20-second exposures stacked (1 hour total duration)',
    exposureTime: '180 x 20s (1 hour total)',
    processing: 'StarStaX Gap Filling Mode + Photoshop Foreground Composite',
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    description: 'Vivid arcs traced by stars revolving around the Celestial North Pole (Polaris) framed against the architectural elegance of PSG iTech.',
    featured: true,
  },
];

export const LEARN_TOPICS: LearnTopic[] = [
  {
    id: 'solar-system',
    title: 'Our Solar System: The Heliocentric Neighborhood',
    category: 'Planetary Science',
    level: 'Beginner',
    difficulty: 'Beginner',
    readTime: '5 min read',
    readingTimeMinutes: 5,
    summary: 'Discover the architecture of our 4.6-billion-year-old planetary family, from rocky inner worlds to icy trans-Neptunian Kuiper Belt objects.',
    content: `The Solar System formed from the gravitational collapse of a giant interstellar molecular cloud approximately 4.57 billion years ago. The vast majority of mass (99.86%) condensed into our G-type main-sequence star, the Sun.

### The Terrestrial Realm
The inner four planets—Mercury, Venus, Earth, and Mars—are rocky worlds with solid silicate mantles and metallic iron cores. Between Mars and Jupiter lies the Main Asteroid Belt, containing remnants like Ceres and Vesta that were prevented from accreting into a planet by Jupiter's massive gravitational perturbations.

### The Jovian & Ice Giants
Beyond the frost line (where volatile compounds condense into solid ice grains) reside the Gas Giants: Jupiter and Saturn, composed overwhelmingly of hydrogen and helium. Further out orbit the Ice Giants: Uranus and Neptune, rich in water, ammonia, and methane ices.

### The Outer Frontier
Beyond Neptune lies the Kuiper Belt (home to Pluto, Eris, Haumea, and Makemake) and the spherical Oort Cloud extending up to nearly 2 light-years from the Sun.`,
    contentMarkdown: `The Solar System formed from the gravitational collapse of a giant interstellar molecular cloud approximately 4.57 billion years ago. The vast majority of mass (99.86%) condensed into our G-type main-sequence star, the Sun.

### The Terrestrial Realm
The inner four planets—Mercury, Venus, Earth, and Mars—are rocky worlds with solid silicate mantles and metallic iron cores. Between Mars and Jupiter lies the Main Asteroid Belt, containing remnants like Ceres and Vesta that were prevented from accreting into a planet by Jupiter's massive gravitational perturbations.

### The Jovian & Ice Giants
Beyond the frost line (where volatile compounds condense into solid ice grains) reside the Gas Giants: Jupiter and Saturn, composed overwhelmingly of hydrogen and helium. Further out orbit the Ice Giants: Uranus and Neptune, rich in water, ammonia, and methane ices.

### The Outer Frontier
Beyond Neptune lies the Kuiper Belt (home to Pluto, Eris, Haumea, and Makemake) and the spherical Oort Cloud extending up to nearly 2 light-years from the Sun.`,
    keyFacts: [
      'The Sun contains 99.86% of the total mass of the solar system.',
      'Jupiter’s magnetic field is 20,000 times stronger than Earth’s.',
      'Olympus Mons on Mars is 21.9 km high—nearly triple Mount Everest.',
      'A day on Venus (243 Earth days) is longer than its year (225 Earth days).',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=800&q=80',
    interactiveType: 'solar-scale',
  },
  {
    id: 'stellar-evolution',
    title: 'Stellar Evolution: From Protostars to Supernovae',
    category: 'Astrophysics',
    level: 'Intermediate',
    difficulty: 'Intermediate',
    readTime: '7 min read',
    readingTimeMinutes: 7,
    summary: 'How stars are born in cold hydrogen nebulae, shine via thermonuclear fusion, and die as white dwarfs, neutron stars, or black holes.',
    content: `Stars are the elemental crucibles of the universe. In the core of a star, hydrostatic equilibrium balances the inward crush of gravity against the outward thermal radiation pressure generated by nuclear fusion.

### The Main Sequence
For stars like our Sun, hydrogen fuses into helium via the Proton-Proton Chain at core temperatures exceeding 15 million Kelvin. This stage lasts for roughly 10 billion years.

### The Death of Solar-Mass Stars
When core hydrogen exhausts, the star expands into a Red Giant, begins core helium burning (triple-alpha process), and eventually expels its outer envelope as a radiant **Planetary Nebula**, leaving behind a degenerate carbon-oxygen **White Dwarf**.

### Massive Stars & Core-Collapse Supernovae
Stars above 8 solar masses fuse successively heavier elements up to Iron-56. Because iron fusion consumes rather than releases energy, the core catastrophically collapses in milliseconds, triggering a Type II Supernova. The remnant crushes into a **Neutron Star** (Pulsar) or a **Stellar-Mass Black Hole** if the progenitor exceeds the Tolman-Oppenheimer-Volkoff limit (~2.17 solar masses).`,
    contentMarkdown: `Stars are the elemental crucibles of the universe. In the core of a star, hydrostatic equilibrium balances the inward crush of gravity against the outward thermal radiation pressure generated by nuclear fusion.

### The Main Sequence
For stars like our Sun, hydrogen fuses into helium via the Proton-Proton Chain at core temperatures exceeding 15 million Kelvin. This stage lasts for roughly 10 billion years.

### The Death of Solar-Mass Stars
When core hydrogen exhausts, the star expands into a Red Giant, begins core helium burning (triple-alpha process), and eventually expels its outer envelope as a radiant **Planetary Nebula**, leaving behind a degenerate carbon-oxygen **White Dwarf**.

### Massive Stars & Core-Collapse Supernovae
Stars above 8 solar masses fuse successively heavier elements up to Iron-56. Because iron fusion consumes rather than releases energy, the core catastrophically collapses in milliseconds, triggering a Type II Supernova. The remnant crushes into a **Neutron Star** (Pulsar) or a **Stellar-Mass Black Hole** if the progenitor exceeds the Tolman-Oppenheimer-Volkoff limit (~2.17 solar masses).`,
    keyFacts: [
      'Every atom of carbon, oxygen, calcium, and iron in our bodies was forged inside dying stars.',
      'A teaspoon of neutron star matter would weigh approximately 6 billion tons on Earth.',
      'Betelgeuse in Orion is currently in its late red supergiant phase and will explode within 100,000 years.',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80',
    interactiveType: 'telescope-calc',
  },
  {
    id: 'black-holes',
    title: 'Black Holes, Event Horizons & Relativistic Spacetime',
    category: 'Cosmology & Relativity',
    level: 'Advanced',
    difficulty: 'Advanced',
    readTime: '8 min read',
    readingTimeMinutes: 8,
    summary: 'Explore singularities where general relativity meets quantum mechanics: gravitational lensing, Hawking radiation, and supermassive monsters at galactic hearts.',
    content: `Predicted by Karl Schwarzschild in 1916 as exact solutions to Einstein's Field Equations, a black hole is a region of spacetime where gravitational curvature becomes so extreme that nothing—not even light—can escape.

### The Anatomy of a Black Hole
1. **Singularity**: The point of infinite density at the center where classical physics breaks down.
2. **Event Horizon**: The boundary of no return, defined by the Schwarzschild radius: $R_s = \\frac{2GM}{c^2}$.
3. **Photon Sphere**: The radius where photons are forced into unstable circular orbits ($1.5 R_s$).
4. **Accretion Disk & Relativistic Jets**: Infalling matter heated to millions of degrees by friction, radiating intense X-rays before crossing the horizon.

### Sagittarius A* at Milky Way’s Heart
At the geometric center of our own galaxy lies Sagittarius A*, a supermassive black hole with a mass of 4.15 million Suns, directly imaged by the Event Horizon Telescope (EHT) collaboration.`,
    contentMarkdown: `Predicted by Karl Schwarzschild in 1916 as exact solutions to Einstein's Field Equations, a black hole is a region of spacetime where gravitational curvature becomes so extreme that nothing—not even light—can escape.

### The Anatomy of a Black Hole
1. **Singularity**: The point of infinite density at the center where classical physics breaks down.
2. **Event Horizon**: The boundary of no return, defined by the Schwarzschild radius: $R_s = \\frac{2GM}{c^2}$.
3. **Photon Sphere**: The radius where photons are forced into unstable circular orbits ($1.5 R_s$).
4. **Accretion Disk & Relativistic Jets**: Infalling matter heated to millions of degrees by friction, radiating intense X-rays before crossing the horizon.

### Sagittarius A* at Milky Way’s Heart
At the geometric center of our own galaxy lies Sagittarius A*, a supermassive black hole with a mass of 4.15 million Suns, directly imaged by the Event Horizon Telescope (EHT) collaboration.`,
    keyFacts: [
      'If Earth were compressed into a black hole, its Schwarzschild radius would be merely 9 millimeters.',
      'Time dilation near an event horizon slows down relative to a distant observer, effectively freezing time at the boundary.',
      'Stephen Hawking demonstrated that quantum vacuum fluctuations near the horizon cause black holes to slowly evaporate over googols of years via Hawking Radiation.',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80',
    interactiveType: 'black-hole-lens',
  },
  {
    id: 'astrophotography-guide',
    title: 'The Beginner’s Guide to Astrophotography & Telescopes',
    category: 'Observational Practice',
    level: 'Beginner',
    difficulty: 'Beginner',
    readTime: '6 min read',
    readingTimeMinutes: 6,
    summary: 'A practical, step-by-step handbook on optical formulas, choosing eyepieces, camera settings, and deep-sky stacking workflows for college students.',
    content: `You don't need a multi-lakh observatory to capture celestial wonders. Starting with a basic DSLR or smartphone and an understanding of optics opens up the night sky.

### Essential Optical Formulas
- **Magnification**: $M = \\frac{\\text{Focal Length of Telescope}}{\\text{Focal Length of Eyepiece}}$. (e.g., $1200\\text{mm} / 10\\text{mm} = 120\\times$)
- **Focal Ratio ($f/\\text{number}$)**: $f = \\frac{\\text{Focal Length}}{\\text{Aperture Diameter}}$. Fast telescopes ($f/4 - f/5$) are ideal for faint wide nebulae; slower scopes ($f/10 - f/12$) excel at high-contrast planetary detail.
- **The Rule of 500 (Star Trailing Limit)**: $\\text{Max Shutter Speed (seconds)} = \\frac{500}{\\text{Focal Length (mm)} \\times \\text{Crop Factor}}$.

### The 4 Pillars of Deep-Sky Stacking
1. **Light Frames**: Real exposures of the astronomical object.
2. **Dark Frames**: Exposures taken at same temperature/exposure with lens cap on to map thermal sensor noise.
3. **Flat Frames**: Exposures against an even white light source to remove vignetting and dust donuts.
4. **Bias Frames**: Ultra-fast exposures (1/4000s) to calibrate readout noise.`,
    contentMarkdown: `You don't need a multi-lakh observatory to capture celestial wonders. Starting with a basic DSLR or smartphone and an understanding of optics opens up the night sky.

### Essential Optical Formulas
- **Magnification**: $M = \\frac{\\text{Focal Length of Telescope}}{\\text{Focal Length of Eyepiece}}$. (e.g., $1200\\text{mm} / 10\\text{mm} = 120\\times$)
- **Focal Ratio ($f/\\text{number}$)**: $f = \\frac{\\text{Focal Length}}{\\text{Aperture Diameter}}$. Fast telescopes ($f/4 - f/5$) are ideal for faint wide nebulae; slower scopes ($f/10 - f/12$) excel at high-contrast planetary detail.
- **The Rule of 500 (Star Trailing Limit)**: $\\text{Max Shutter Speed (seconds)} = \\frac{500}{\\text{Focal Length (mm)} \\times \\text{Crop Factor}}$.

### The 4 Pillars of Deep-Sky Stacking
1. **Light Frames**: Real exposures of the astronomical object.
2. **Dark Frames**: Exposures taken at same temperature/exposure with lens cap on to map thermal sensor noise.
3. **Flat Frames**: Exposures against an even white light source to remove vignetting and dust donuts.
4. **Bias Frames**: Ultra-fast exposures (1/4000s) to calibrate readout noise.`,
    keyFacts: [
      'Higher magnification is NOT always better; aperture (light gathering power) determines detail and brightness.',
      'Stacking 50 photos reduces image noise by over 70% using the square root rule (SNR ~ sqrt(N)).',
      'The ASTRA club conducts free hands-on telescope alignment clinics every semester.',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
  },
];

export const ASTRONOMY_TOPICS = LEARN_TOPICS;
