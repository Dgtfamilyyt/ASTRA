export interface ClubInfo {
  name: string;
  fullName: string;
  tagline: string;
  supportingLine: string;
  institution: string;
  institutionShort: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
    elevation: string;
    bortleClass: number; // Coimbatore dark sky rating
  };
  foundedYear: string;
  email: string;
  contactEmail?: string;
  websiteUrl: string;
  githubUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  psgItechUrl: string;
  socials: {
    github: string;
    instagram: string;
    linkedin: string;
    website: string;
    email?: string;
  };
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: string;
  department?: string;
  year?: string;
  photo?: string;
  photoUrl?: string;
  bio: string;
  astronomyInterest?: string;
  astronomyInterests?: string[];
  email?: string;
  linkedin?: string;
  github?: string;
  socials?: {
    linkedin?: string;
    github?: string;
    instagram?: string;
    email?: string;
  };
}

export interface ClubEvent {
  id: string;
  title: string;
  type: string;
  category?: string;
  date: string;
  time: string;
  venue: string;
  shortDescription: string;
  description?: string;
  fullDescription: string;
  organizer: string;
  posterUrl: string;
  bannerImage?: string;
  status: 'Upcoming' | 'Registration Open' | 'Completed' | 'Postponed';
  registrationUrl?: string;
  maxParticipants?: number;
  seatsLimit?: number;
  targetAudience?: string;
  agenda: { time: string; activity: string }[];
  instructions: string[];
  equipmentProvided: string[];
  contactPerson: { name: string; phone?: string; email: string };
  highlights?: string[];
}

export interface AstronomyEvent {
  id: string;
  name: string;
  type: 'Meteor Shower' | 'Eclipse' | 'Conjunction' | 'Opposition' | 'Moon Phase' | 'ISS Transit' | 'Occultation';
  date: string;
  peakTime: string;
  visibility: 'Excellent' | 'Good' | 'Moderate' | 'Challenging';
  direction: string;
  magnitude?: number | string;
  summary: string;
  description: string;
  observationTips: string[];
  equipmentNeeded: string;
  category?: string;
  celestialSignificance?: string;
}

export type CosmicCalendarEvent = AstronomyEvent;

export interface CelestialObject {
  id: string;
  name: string;
  designation?: string;
  category: 'Planet' | 'Moon' | 'Nebula' | 'Galaxy' | 'Star Cluster' | 'Satellite' | 'Star';
  constellation: string;
  apparentMagnitude: number;
  distanceLightYears?: string;
  rightAscension?: string;
  declination?: string;
  bestViewingTime: string;
  visibleTonight: boolean;
  altitudeDegrees: number;
  azimuthDegrees: number;
  description: string;
  features: string[];
  viewingDifficulty: 'Naked Eye' | 'Binoculars' | 'Small Telescope' | 'Advanced Telescope';
  imageUrl: string;
}

export interface Constellation {
  id: string;
  name: string;
  latinName: string;
  meaning: string;
  season: 'Winter' | 'Spring' | 'Summer' | 'Autumn' | 'All Year';
  brightestStar: string;
  visibleTonight: boolean;
  bestTime: string;
  mythology: string;
  keyStars: { name: string; mag: number; x: number; y: number }[];
  lines: [number, number][];
}

export interface GalleryImage {
  id: string;
  title: string;
  object: string;
  targetObject?: string;
  category: 'Moon' | 'Sun' | 'Planets' | 'Nebulae' | 'Galaxies' | 'Constellations' | 'Night Sky' | 'Campus Sky';
  photographer: string;
  photographerName?: string;
  photographerRole?: string;
  date: string;
  captureDate?: string;
  location: string;
  telescope: string;
  telescopeUsed?: string;
  camera: string;
  mount?: string;
  exposure: string;
  exposureTime?: string;
  processing?: string;
  imageUrl: string;
  description: string;
  featured?: boolean;
}

export type GalleryItem = GalleryImage;

export interface LearnTopic {
  id: string;
  title: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: string;
  readingTimeMinutes?: number;
  summary: string;
  content: string;
  contentMarkdown?: string;
  keyFacts: string[];
  imageUrl: string;
  interactiveType?: 'solar-scale' | 'black-hole-lens' | 'lunar-phases' | 'telescope-calc';
  furtherReading?: { title: string; url: string }[];
}

export type AstronomyTopic = LearnTopic;

export interface Milestone {
  id?: string;
  year: string;
  date?: string;
  title: string;
  category: 'Inauguration' | 'Observation' | 'Workshop' | 'Achievement' | 'Acquisition' | string;
  description: string;
  impact?: string;
}

export type ClubAchievement = Milestone;

export interface Announcement {
  id: string;
  title: string;
  date: string;
  category: 'Notice' | 'Observation Alert' | 'Registration' | 'News';
  badge: string;
  summary: string;
  content?: string;
  link?: string;
  linkText?: string;
  urgent?: boolean;
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant';
  role?: 'user' | 'assistant';
  text: string;
  timestamp: string;
  providerUsed?: string;
  modelUsed?: string;
  suggestions?: string[];
  sources?: string[];
  isAstronomyRelated?: boolean;
}

export type AIProviderId = 'gemini' | 'ephemeris_engine' | 'openai_compatible' | 'anthropic_compatible';

export interface AIProviderInfo {
  id: AIProviderId;
  name: string;
  description: string;
  model: string;
  badge: string;
  isAvailable: boolean;
  requiresKey: boolean;
  iconType: 'gemini' | 'telescope' | 'openai' | 'claude';
}

export interface PresetQuestionItem {
  id: string;
  question: string;
  category: 'Night Sky' | 'Astrophysics' | 'Lunar Science' | 'Observational' | 'Telescopes';
  hint: string;
}

export interface AskAstraRequestPayload {
  prompt: string;
  history?: { role: string; parts: string }[];
  provider?: AIProviderId;
  model?: string;
}

export interface AskAstraResponsePayload {
  reply: string;
  provider: AIProviderId;
  model: string;
  isAstronomyTopic: boolean;
  astronomyCategory?: string;
  suggestions?: string[];
  timestamp: string;
}

export interface SkyConditionData {
  bortleRating: string;
  limitingMagnitude: number;
  cloudCoverPercentage: number;
  seeingIndex: 'Excellent (1-2")' | 'Good (2-3")' | 'Average (3-4")' | 'Poor (>4")';
  transparency: 'High' | 'Moderate' | 'Low';
  humidityPercentage: number;
  temperatureCelsius: number;
  moonIlluminationPercent: number;
  moonPhaseName: string;
  moonPhaseIndex: number; // 0 to 7
  moonRiseTime: string;
  moonSetTime: string;
  sunSetTime: string;
  astronomicalTwilightEnd: string;
  astronomicalTwilightStart: string;
  overallRating: 'Outstanding Night' | 'Good Observation' | 'Fair Conditions' | 'Overcast / Restricted';
}
