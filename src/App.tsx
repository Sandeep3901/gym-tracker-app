import React, { useState, useEffect, useMemo } from "react";
import { 
  Users, 
  Clock, 
  ChevronDown, 
  Plus, 
  Minus, 
  Check, 
  Sun, 
  Moon, 
  Dumbbell, 
  AlertTriangle,
  Image as ImageIcon
} from "lucide-react";

// --- G-SPOT VECTOR LOGO ---
const GSpotLogo: React.FC<{ className?: string; isDark?: boolean }> = ({ 
  className = "w-7 h-7",
  isDark = false 
}) => (
  <svg 
    viewBox="0 0 36 36" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="G-SPOT Logo"
  >
    {/* Outer athletic G curve */}
    <path 
      d="M26 12.5 C24 8 19.5 5.5 14 6 C8 6.5 3.5 12 3.5 18 C3.5 24.5 8.5 29.5 15 29.5 C21.5 29.5 26.5 25.5 27 19.5 L17.5 19.5" 
      stroke={isDark ? "#CCFF00" : "#0F172A"} 
      strokeWidth="3.2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    {/* The SPOT: Precision glowing target beacon */}
    <circle 
      cx="17.5" 
      cy="19.5" 
      r="4" 
      fill={isDark ? "#38BDF8" : "#E11D48"} 
    />
    <circle 
      cx="17.5" 
      cy="19.5" 
      r="7" 
      stroke={isDark ? "#38BDF8" : "#E11D48"} 
      strokeWidth="1.2" 
      strokeOpacity="0.4"
      strokeDasharray="2 2"
    />
  </svg>
);

// --- INDIAN GYM BRANCHES & MISSING EQUIPMENT DATA ---
interface IndianGym {
  id: string;
  name: string;
  chain: string;
  city: string;
  area: string;
  maxCapacity: number;
  initialOccupancy: number;
  openHours: string;
  missingEquipment: string[];
  equipmentAvailable: string[];
  crowdProfile: {
    morningPeak: string;
    eveningPeak: string;
    lunchLull: string;
  };
}

const INDIAN_GYMS: IndianGym[] = [
  {
    id: "cult_koramangala",
    name: "Cult.fit - Koramangala",
    chain: "Cult.fit",
    city: "Bengaluru",
    area: "80 Feet Rd, 4th Block",
    maxCapacity: 90,
    initialOccupancy: 36,
    openHours: "6:00 AM – 10:30 PM",
    missingEquipment: [
      "Hack Squat Machine",
      "Preacher Curl Bench",
      "Pendulum Squat",
      "Decline Bench Press"
    ],
    equipmentAvailable: [
      "Olympic Squat Racks",
      "Deadlift Platforms",
      "Adjustable Dumbbells (up to 40kg)",
      "Dual Cable Crossover",
      "Assault Air Bikes",
      "Kettlebell Station",
      "Turf Sled Track"
    ],
    crowdProfile: {
      morningPeak: "7:00 AM – 9:00 AM",
      eveningPeak: "6:30 PM – 9:00 PM",
      lunchLull: "1:30 PM – 4:30 PM"
    }
  },
  {
    id: "golds_bandra",
    name: "Gold's Gym - Bandra West",
    chain: "Gold's Gym",
    city: "Mumbai",
    area: "Hill Road, Bandra West",
    maxCapacity: 130,
    initialOccupancy: 76,
    openHours: "6:00 AM – 11:00 PM",
    missingEquipment: [
      "Hip Thrust Machine",
      "Sled Push Turf",
      "Safety Squat Bar",
      "Woodway Curve Treadmills"
    ],
    equipmentAvailable: [
      "Heavy Dumbbells (up to 60kg)",
      "4 Flat & Incline Olympic Benches",
      "Hack Squat & Leg Press",
      "Multiple Cable Towers",
      "Pec Deck Fly",
      "Preacher Curl Station",
      "Smith Machines"
    ],
    crowdProfile: {
      morningPeak: "7:30 AM – 9:30 AM",
      eveningPeak: "7:00 PM – 10:00 PM",
      lunchLull: "2:00 PM – 5:00 PM"
    }
  },
  {
    id: "anytime_cyberhub",
    name: "Anytime Fitness - Cyber Hub",
    chain: "Anytime Fitness",
    city: "Gurugram",
    area: "DLF Cyber City, Sector 24",
    maxCapacity: 110,
    initialOccupancy: 48,
    openHours: "24 Hours Open",
    missingEquipment: [
      "Deadlift Jack & Chalk Station",
      "Glute Ham Developer (GHD)",
      "Jammer Arms",
      "Belt Squat"
    ],
    equipmentAvailable: [
      "LifeFitness Cardio Suite",
      "Hammer Strength Plate-Loaded Stations",
      "Power Racks",
      "Dumbbells (up to 45kg)",
      "Cable Jungle Tower",
      "Stairmasters"
    ],
    crowdProfile: {
      morningPeak: "6:30 AM – 8:30 AM",
      eveningPeak: "6:00 PM – 9:30 PM",
      lunchLull: "1:00 PM – 3:30 PM"
    }
  },
  {
    id: "chisel_indiranagar",
    name: "Chisel Fitness - Indiranagar",
    chain: "Chisel",
    city: "Bengaluru",
    area: "100 Feet Rd, HAL 2nd Stage",
    maxCapacity: 85,
    initialOccupancy: 28,
    openHours: "5:30 AM – 10:30 PM",
    missingEquipment: [
      "Pec Deck Fly (Under Maintenance)",
      "Standing Calf Raise Machine",
      "T-Bar Row Machine",
      "V-Squat"
    ],
    equipmentAvailable: [
      "Incline & Flat Benches",
      "Adjustable Cable Stations",
      "Barbell Squat Cage",
      "Spin Studio",
      "Dumbbells (up to 38kg)",
      "Leg Extension & Leg Curl"
    ],
    crowdProfile: {
      morningPeak: "6:30 AM – 9:00 AM",
      eveningPeak: "6:00 PM – 9:00 PM",
      lunchLull: "1:30 PM – 4:00 PM"
    }
  },
  {
    id: "talwalkars_delhi",
    name: "Talwalkars - South Extension II",
    chain: "Talwalkars",
    city: "New Delhi",
    area: "Main Ring Road, South Ext.",
    maxCapacity: 95,
    initialOccupancy: 54,
    openHours: "6:00 AM – 10:00 PM",
    missingEquipment: [
      "Bumper Plates (Cast Iron Only)",
      "Trap Bar / Hex Bar",
      "Cable Crossover Tower 2",
      "Incline Chest Press Machine"
    ],
    equipmentAvailable: [
      "Cast Iron Weight Plates",
      "Olympic Barbells",
      "Flat Benches",
      "Lat Pulldown & Seated Cable Row",
      "Leg Press 45°",
      "Dumbbells (up to 42kg)"
    ],
    crowdProfile: {
      morningPeak: "7:00 AM – 9:30 AM",
      eveningPeak: "6:30 PM – 9:30 PM",
      lunchLull: "2:00 PM – 4:30 PM"
    }
  }
];

// Baseline hourly crowd pattern for Indian demographics (Peak at 7-9 AM and 6:30-9:30 PM)
interface HourlyPattern {
  hourNumber: number;
  hourLabel: string;
  baseline: number;
}

const INDIAN_HOURLY_BASELINE: HourlyPattern[] = [
  { hourNumber: 6, hourLabel: "6:00 AM", baseline: 22 },
  { hourNumber: 7, hourLabel: "7:00 AM", baseline: 65 },
  { hourNumber: 8, hourLabel: "8:00 AM", baseline: 72 },
  { hourNumber: 9, hourLabel: "9:00 AM", baseline: 48 },
  { hourNumber: 10, hourLabel: "10:00 AM", baseline: 28 },
  { hourNumber: 11, hourLabel: "11:00 AM", baseline: 24 },
  { hourNumber: 12, hourLabel: "12:00 PM", baseline: 35 },
  { hourNumber: 13, hourLabel: "1:00 PM", baseline: 20 },
  { hourNumber: 14, hourLabel: "2:00 PM", baseline: 18 },
  { hourNumber: 15, hourLabel: "3:00 PM", baseline: 22 },
  { hourNumber: 16, hourLabel: "4:00 PM", baseline: 38 },
  { hourNumber: 17, hourLabel: "5:00 PM", baseline: 58 },
  { hourNumber: 18, hourLabel: "6:00 PM", baseline: 82 },
  { hourNumber: 19, hourLabel: "7:00 PM", baseline: 94 },
  { hourNumber: 20, hourLabel: "8:00 PM", baseline: 86 },
  { hourNumber: 21, hourLabel: "9:00 PM", baseline: 52 },
  { hourNumber: 22, hourLabel: "10:00 PM", baseline: 22 }
];

// Muscle options
type MuscleGroup = "Chest" | "Back" | "Legs" | "Shoulders" | "Arms" | "Core & Functional";
type IntensityLevel = "Light" | "Moderate" | "Heavy";

// Exercise database with ideal equipment and automatic fallback when machine is missing
interface ExerciseDefinition {
  name: string;
  muscle: MuscleGroup;
  primaryEquipment: string;
  fallbackEquipment: string;
  fallbackName: string;
  lightSets: string;
  moderateSets: string;
  heavySets: string;
  cue: string;
}

const EXERCISE_KNOWLEDGE_BASE: ExerciseDefinition[] = [
  // CHEST
  {
    name: "Barbell Flat Bench Press",
    muscle: "Chest",
    primaryEquipment: "Flat Olympic Bench",
    fallbackEquipment: "Flat Dumbbell Bench",
    fallbackName: "Flat Dumbbell Press",
    lightSets: "3 sets × 12 reps (60s rest)",
    moderateSets: "4 sets × 8-10 reps (90s rest)",
    heavySets: "5 sets × 4-6 reps (2-3m rest)",
    cue: "Retract scapulae, touch lower sternum, drive through feet."
  },
  {
    name: "Incline Chest Press Machine",
    muscle: "Chest",
    primaryEquipment: "Incline Chest Press Machine",
    fallbackEquipment: "Adjustable Incline Bench & Dumbbells",
    fallbackName: "Incline Dumbbell Press (30°)",
    lightSets: "3 sets × 15 reps",
    moderateSets: "4 sets × 10-12 reps",
    heavySets: "4 sets × 6-8 reps",
    cue: "Focus on upper clavicular head contraction without flaring elbows."
  },
  {
    name: "Pec Deck Fly Machine",
    muscle: "Chest",
    primaryEquipment: "Pec Deck Fly Machine",
    fallbackEquipment: "Dual Cable Crossover",
    fallbackName: "Standing Cable Crossover Flyes",
    lightSets: "3 sets × 15 reps",
    moderateSets: "4 sets × 12 reps",
    heavySets: "4 sets × 10 reps (controlled negative)",
    cue: "Keep soft bend in elbows, hug an imaginary tree trunk."
  },
  {
    name: "Decline Bench Press",
    muscle: "Chest",
    primaryEquipment: "Decline Bench Press",
    fallbackEquipment: "Dip Station or High-to-Low Cable Press",
    fallbackName: "Parallel Bar Dips / Cable Pressdowns",
    lightSets: "3 sets × 12 reps",
    moderateSets: "3 sets × 10 reps",
    heavySets: "4 sets × 8 reps (weighted)",
    cue: "Slight forward torso lean for lower pectoral activation."
  },

  // BACK
  {
    name: "Barbell Deadlift",
    muscle: "Back",
    primaryEquipment: "Deadlift Platforms & Chalk Station",
    fallbackEquipment: "Dumbbell Roman Deadlifts",
    fallbackName: "Heavy Dumbbell Romanian Deadlifts",
    lightSets: "3 sets × 10 reps",
    moderateSets: "4 sets × 6-8 reps",
    heavySets: "5 sets × 3-5 reps",
    cue: "Engage lats, brace core like taking a punch, push floor away."
  },
  {
    name: "Lat Pulldown Tower",
    muscle: "Back",
    primaryEquipment: "Lat Pulldown Station",
    fallbackEquipment: "Pull-Up Rig / Band-Assisted",
    fallbackName: "Wide-Grip Bodyweight Pull-Ups",
    lightSets: "3 sets × 12 reps",
    moderateSets: "4 sets × 10 reps",
    heavySets: "4 sets × 6-8 reps (heavy stack)",
    cue: "Drive elbows into back pockets, pause 1 second at collarbone."
  },
  {
    name: "T-Bar Row Machine",
    muscle: "Back",
    primaryEquipment: "T-Bar Row Machine",
    fallbackEquipment: "Barbell Bent-Over Row",
    fallbackName: "Barbell Bent-Over Row (Pronated)",
    lightSets: "3 sets × 12 reps",
    moderateSets: "4 sets × 8-10 reps",
    heavySets: "4 sets × 6 reps",
    cue: "Hinge hips at 45 degrees, pull barbell to navel."
  },
  {
    name: "Seated Cable Row",
    muscle: "Back",
    primaryEquipment: "Seated Cable Row",
    fallbackEquipment: "Chest-Supported Dumbbell Row",
    fallbackName: "Incline Chest-Supported Dumbbell Rows",
    lightSets: "3 sets × 15 reps",
    moderateSets: "4 sets × 10-12 reps",
    heavySets: "4 sets × 8 reps",
    cue: "Full lat stretch at extension without rounding lumbar spine."
  },

  // LEGS
  {
    name: "Barbell Back Squat",
    muscle: "Legs",
    primaryEquipment: "Olympic Squat Racks",
    fallbackEquipment: "Heavy Dumbbell Goblet Squats",
    fallbackName: "Heavy Dumbbell Goblet Squat",
    lightSets: "3 sets × 12 reps",
    moderateSets: "4 sets × 8 reps",
    heavySets: "5 sets × 5 reps (deep depth)",
    cue: "Knees track over toes, maintain upright torso angle."
  },
  {
    name: "Hack Squat Machine",
    muscle: "Legs",
    primaryEquipment: "Hack Squat Machine",
    fallbackEquipment: "Dumbbell Bulgarian Split Squat",
    fallbackName: "Elevated Dumbbell Bulgarian Split Squats",
    lightSets: "3 sets × 12 reps/leg",
    moderateSets: "4 sets × 10 reps/leg",
    heavySets: "4 sets × 8 reps/leg",
    cue: "Target deep quad teardrop; controlled 3-second descent."
  },
  {
    name: "Machine Leg Press 45°",
    muscle: "Legs",
    primaryEquipment: "Leg Press 45°",
    fallbackEquipment: "Barbell Walking Lunges",
    fallbackName: "Barbell / Dumbbell Walking Lunges",
    lightSets: "3 sets × 15 reps",
    moderateSets: "4 sets × 12 reps",
    heavySets: "4 sets × 8-10 reps",
    cue: "Do not lock out knees at top; keep constant tension on quads."
  },
  {
    name: "Barbell Hip Thrust / Machine",
    muscle: "Legs",
    primaryEquipment: "Hip Thrust Machine",
    fallbackEquipment: "Bench + Barbell & Foam Pad",
    fallbackName: "Barbell Hip Thrust on Flat Bench",
    lightSets: "3 sets × 15 reps",
    moderateSets: "4 sets × 10-12 reps",
    heavySets: "4 sets × 8 reps (pause at top)",
    cue: "Full glute contraction at top, chin tucked to chest."
  },

  // SHOULDERS
  {
    name: "Standing Overhead Barbell Press",
    muscle: "Shoulders",
    primaryEquipment: "Olympic Squat Racks",
    fallbackEquipment: "Seated Dumbbell Shoulder Press",
    fallbackName: "Seated Dumbbell Overhead Press",
    lightSets: "3 sets × 12 reps",
    moderateSets: "4 sets × 8 reps",
    heavySets: "5 sets × 5 reps",
    cue: "Tuck chin, press vertically, lock out directly over spine."
  },
  {
    name: "Cable Lateral Raises",
    muscle: "Shoulders",
    primaryEquipment: "Dual Cable Crossover",
    fallbackEquipment: "Standing Dumbbell Lateral Raises",
    fallbackName: "Strict Dumbbell Lateral Raises",
    lightSets: "3 sets × 15 reps",
    moderateSets: "4 sets × 12-15 reps",
    heavySets: "4 sets × 10 reps (slow eccentric)",
    cue: "Lead with elbows, slight pinky tilt, zero torso swing."
  },
  {
    name: "Face Pulls with Rope",
    muscle: "Shoulders",
    primaryEquipment: "Cable Pulley Station",
    fallbackEquipment: "Incline Rear Delt Dumbbell Flyes",
    fallbackName: "Prone Incline Rear Delt Dumbbell Flyes",
    lightSets: "3 sets × 15-20 reps",
    moderateSets: "4 sets × 12-15 reps",
    heavySets: "4 sets × 12 reps",
    cue: "Pull rope directly to eye level, externally rotate wrists."
  },

  // ARMS
  {
    name: "Preacher Curl Bench",
    muscle: "Arms",
    primaryEquipment: "Preacher Curl Bench",
    fallbackEquipment: "Incline Bench (45°) Dumbbell Curls",
    fallbackName: "Incline Dumbbell Bicep Curls (Deep Stretch)",
    lightSets: "3 sets × 12 reps",
    moderateSets: "4 sets × 10 reps",
    heavySets: "4 sets × 8 reps",
    cue: "Full bicep stretch at bottom, do not hyperextend elbows."
  },
  {
    name: "Tricep Rope Pushdowns",
    muscle: "Arms",
    primaryEquipment: "Cable Pulley Station",
    fallbackEquipment: "Overhead Dumbbell French Press",
    fallbackName: "Seated Overhead Dumbbell Tricep Extension",
    lightSets: "3 sets × 15 reps",
    moderateSets: "4 sets × 12 reps",
    heavySets: "4 sets × 8-10 reps",
    cue: "Spread rope ends apart at bottom, lock elbows in place."
  },
  {
    name: "Barbell EZ-Bar Bicep Curls",
    muscle: "Arms",
    primaryEquipment: "EZ Curl Bar & Plates",
    fallbackEquipment: "Standing Alternating Dumbbell Curls",
    fallbackName: "Dumbbell Supinated Bicep Curls",
    lightSets: "3 sets × 12 reps",
    moderateSets: "4 sets × 8-10 reps",
    heavySets: "4 sets × 6-8 reps",
    cue: "Keep upper arms glued to ribs, supinate wrist at peak."
  },

  // CORE & FUNCTIONAL
  {
    name: "Hanging Leg Raises",
    muscle: "Core & Functional",
    primaryEquipment: "Pull-Up Bar / Captain's Chair",
    fallbackEquipment: "Decline Bench / Floor Mat",
    fallbackName: "Decline Bench Reverse Crunches",
    lightSets: "3 sets × 12 reps",
    moderateSets: "4 sets × 12 reps",
    heavySets: "4 sets × 15 reps (toes to bar)",
    cue: "Roll pelvis upward, avoid swinging momentum."
  },
  {
    name: "Turf Sled Push & Sprint",
    muscle: "Core & Functional",
    primaryEquipment: "Turf Sled Track",
    fallbackEquipment: "Treadmill Max Incline Hike",
    fallbackName: "Treadmill 15% Incline Power Walk (Level 12)",
    lightSets: "3 rounds × 30m push",
    moderateSets: "4 rounds × 40m push",
    heavySets: "5 rounds × 40m heavy drive",
    cue: "Drive balls of feet into floor, neutral cervical spine."
  }
];

export default function App() {
  // Theme state: light or dark mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  // Wallpaper display style: vivid (high visibility) or soft
  const [wallpaperStyle, setWallpaperStyle] = useState<'vivid' | 'soft'>('vivid');

  // Sync dark class with document.documentElement and body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Selected Indian Gym
  const [selectedGym, setSelectedGym] = useState<IndianGym>(INDIAN_GYMS[0]);
  const [currentCount, setCurrentCount] = useState<number>(INDIAN_GYMS[0].initialOccupancy);
  const [gymDropdownOpen, setGymDropdownOpen] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>("Just now");

  // Dynamic Hour (real-time recording stops at this hour)
  const realHour = new Date().getHours();
  const initialSimHour = (realHour >= 6 && realHour <= 22) ? realHour : 11;
  const [activeHour, setActiveHour] = useState<number>(initialSimHour);

  // Hourly recorded values
  const [recordedHistory, setRecordedHistory] = useState<Record<number, number>>(() => {
    const map: Record<number, number> = {};
    INDIAN_HOURLY_BASELINE.forEach(h => {
      if (h.hourNumber <= initialSimHour) {
        map[h.hourNumber] = h.baseline;
      }
    });
    return map;
  });

  // Workout Planner State
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup>("Chest");
  const [selectedIntensity, setSelectedIntensity] = useState<IntensityLevel>("Moderate");
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});

  // When changing gym
  const handleSelectGym = (gym: IndianGym) => {
    setSelectedGym(gym);
    setCurrentCount(gym.initialOccupancy);
    setGymDropdownOpen(false);
    setCompletedExercises({});
  };

  // Keep active hour percentage synced with currentCount
  useEffect(() => {
    const pct = Math.min(100, Math.round((currentCount / selectedGym.maxCapacity) * 100));
    setRecordedHistory(prev => ({
      ...prev,
      [activeHour]: pct
    }));
  }, [currentCount, activeHour, selectedGym.maxCapacity]);

  // When changing hour
  const handleHourChange = (newHour: number) => {
    setActiveHour(newHour);
    setRecordedHistory(prev => {
      const next = { ...prev };
      INDIAN_HOURLY_BASELINE.forEach(h => {
        if (h.hourNumber <= newHour) {
          if (!next[h.hourNumber]) {
            next[h.hourNumber] = h.baseline;
          }
        } else {
          // Future hours not completed yet!
          delete next[h.hourNumber];
        }
      });
      return next;
    });
    setLastUpdated("Just now");
  };

  // Metrics
  const maxCapacity = selectedGym.maxCapacity;
  const percentage = Math.min(100, Math.round((currentCount / maxCapacity) * 100));

  // Density Tier
  const crowdTier = useMemo(() => {
    if (percentage < 45) {
      return {
        label: "Khali (Uncrowded)",
        statusText: "Open Benches & Racks",
        colorHex: isDarkMode ? "#34D399" : "#059669",
        bgBadge: isDarkMode ? "bg-emerald-950/60 text-emerald-300 border-emerald-800" : "bg-emerald-50 text-emerald-800 border-emerald-200",
        ringStroke: isDarkMode ? "#34D399" : "#10B981",
        description: "Zero waiting line. You can superset or grab any dumbbell pair easily."
      };
    } else if (percentage < 75) {
      return {
        label: "Moderate (Normal Desi Flow)",
        statusText: "Smooth Rotation",
        colorHex: isDarkMode ? "#38BDF8" : "#0284C7",
        bgBadge: isDarkMode ? "bg-sky-950/60 text-sky-300 border-sky-800" : "bg-sky-50 text-sky-800 border-sky-200",
        ringStroke: isDarkMode ? "#38BDF8" : "#0EA5E9",
        description: "Typical workout energy. Machines rotating normally with short rests."
      };
    } else {
      return {
        label: "Bheed (Heavy Rush)",
        statusText: "Peak Crowded Hour",
        colorHex: isDarkMode ? "#F87171" : "#E11D48",
        bgBadge: isDarkMode ? "bg-rose-950/60 text-rose-300 border-rose-800" : "bg-rose-50 text-rose-800 border-rose-200",
        ringStroke: isDarkMode ? "#F87171" : "#F43F5E",
        description: "High rush hour. Expect 2-3 members working in on benches and cables."
      };
    }
  }, [percentage, isDarkMode]);

  // Turnstile Tap controls
  const handleCheckIn = () => {
    if (currentCount >= maxCapacity) return;
    setCurrentCount(prev => prev + 1);
    setLastUpdated("Just now");
  };

  const handleCheckOut = () => {
    if (currentCount <= 0) return;
    setCurrentCount(prev => prev - 1);
    setLastUpdated("Just now");
  };

  // --- SMART EQUIPMENT-AWARE WORKOUT PLAN GENERATOR ---
  // Filters exercises for the selected muscle, checks if the selected gym is missing equipment,
  // and swaps with available alternative if missing!
  const customizedWorkoutPlan = useMemo(() => {
    const rawExercises = EXERCISE_KNOWLEDGE_BASE.filter(ex => ex.muscle === selectedMuscle);
    const missingEquipList = selectedGym.missingEquipment.map(m => m.toLowerCase());

    return rawExercises.map(ex => {
      // Check if primary equipment matches any missing equipment in this gym
      const isMissing = missingEquipList.some(missing => 
        ex.primaryEquipment.toLowerCase().includes(missing.toLowerCase()) ||
        missing.toLowerCase().includes(ex.name.toLowerCase()) ||
        ex.name.toLowerCase().includes(missing.toLowerCase().replace("machine", "").trim())
      );

      const setsFormula = selectedIntensity === "Light" 
        ? ex.lightSets 
        : selectedIntensity === "Heavy" 
        ? ex.heavySets 
        : ex.moderateSets;

      if (isMissing) {
        return {
          id: ex.name,
          title: ex.fallbackName,
          originalName: ex.name,
          wasSubstituted: true,
          reason: `${ex.primaryEquipment} is not available at ${selectedGym.name}`,
          equipment: ex.fallbackEquipment,
          prescription: setsFormula,
          cue: ex.cue
        };
      }

      return {
        id: ex.name,
        title: ex.name,
        originalName: ex.name,
        wasSubstituted: false,
        reason: null,
        equipment: ex.primaryEquipment,
        prescription: setsFormula,
        cue: ex.cue
      };
    });
  }, [selectedMuscle, selectedIntensity, selectedGym]);

  // Active hour formatted
  const activeHourFormatted = useMemo(() => {
    const found = INDIAN_HOURLY_BASELINE.find(h => h.hourNumber === activeHour);
    return found ? found.hourLabel : `${activeHour}:00`;
  }, [activeHour]);

  // Circular gauge geometry
  const radius = 86;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (circumference * percentage) / 100;

  return (
    <div className={`min-h-screen transition-colors duration-200 relative ${
      isDarkMode 
        ? "text-[#F3F4F6]" 
        : "text-[#111827]"
    } flex flex-col font-sans selection:bg-[#CCFF00] selection:text-black pb-24`}>

      {/* ========================================================================= */}
      {/* VIVID GYM INTERIOR WALLPAPER (High-End Training Floor & Power Racks)      */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Real Gym Interior Wallpaper */}
        <img 
          src="/src/assets/images/gym_interior_backdrop_1794127054123.jpg" 
          alt="Gym Interior Training Floor with Power Racks and Dumbbells"
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-center fixed inset-0 transition-all duration-700 ${
            isDarkMode 
              ? (wallpaperStyle === "vivid" ? "opacity-65 brightness-[0.72] contrast-[1.18]" : "opacity-40 brightness-[0.6] contrast-[1.1]") 
              : (wallpaperStyle === "vivid" ? "opacity-80 brightness-[0.93] contrast-[1.1]" : "opacity-45 brightness-[0.96] contrast-[1.02]")
          }`}
        />
        {/* Subtle Atmospheric Vignette - keeps center gym floor vivid & visible */}
        <div 
          className={`absolute inset-0 transition-colors duration-500 ${
            isDarkMode
              ? "bg-gradient-to-b from-[#0A0D14]/70 via-black/40 to-[#0A0D14]/90"
              : "bg-gradient-to-b from-white/35 via-slate-900/10 to-white/70"
          }`}
        />
        {/* Precision Rubber Gym Floor Grid Texture */}
        <div 
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08] bg-[radial-gradient(#000000_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"
        />
        {/* Warm overhead gym lighting glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-96 bg-amber-400/15 dark:bg-amber-500/15 blur-[120px] rounded-full pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* 1. TOP NAVIGATION BAR                                                     */}
      {/* ========================================================================= */}
      <header className={`sticky top-0 z-30 backdrop-blur-2xl border-b transition-colors relative ${
        isDarkMode 
          ? "bg-[#0A0D14]/90 border-neutral-800/90 shadow-md" 
          : "bg-white/90 border-neutral-200/80 shadow-xs"
      }`}>
        <div className="max-w-4xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          
          {/* Logo & Indian Gym Dropdown */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <GSpotLogo className="w-8 h-8" isDark={isDarkMode} />
              <div className="flex flex-col">
                <span className="font-black text-lg tracking-tight leading-none">
                  G-SPOT
                </span>
                <span className="text-[9px] uppercase tracking-widest font-semibold opacity-60">
                  Gym Presence & Spotter
                </span>
              </div>
            </div>

            <span className="opacity-30 select-none">/</span>

            {/* Gym Selector */}
            <div className="relative">
              <button
                onClick={() => setGymDropdownOpen(prev => !prev)}
                className={`flex items-center gap-1.5 text-xs font-semibold py-1.5 px-2.5 rounded-xl border transition cursor-pointer ${
                  isDarkMode 
                    ? "bg-neutral-900 border-neutral-800 text-neutral-200 hover:border-neutral-700" 
                    : "bg-white border-neutral-200 text-neutral-800 hover:bg-neutral-50 shadow-2xs"
                }`}
              >
                <span>{selectedGym.name}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {gymDropdownOpen && (
                <div className={`absolute top-full left-0 mt-2 w-72 rounded-2xl shadow-2xl border p-2 z-50 ${
                  isDarkMode 
                    ? "bg-[#121722] border-neutral-800 text-white" 
                    : "bg-white border-neutral-200 text-neutral-900"
                }`}>
                  <div className="text-[10px] font-bold uppercase tracking-wider opacity-50 px-3 py-1.5">
                    Select Indian Gym Branch
                  </div>
                  {INDIAN_GYMS.map(gym => (
                    <button
                      key={gym.id}
                      onClick={() => handleSelectGym(gym)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                        selectedGym.id === gym.id
                          ? (isDarkMode ? "bg-neutral-800 font-bold" : "bg-neutral-100 font-bold")
                          : (isDarkMode ? "hover:bg-neutral-800/60" : "hover:bg-neutral-50")
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{gym.name}</div>
                        <div className="text-[10px] opacity-60 font-normal">{gym.area}, {gym.city}</div>
                      </div>
                      {selectedGym.id === gym.id && <Check className="w-4 h-4 text-[#CCFF00]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Wallpaper Visibility, Hours & Mode Switcher */}
          <div className="flex items-center gap-2.5">
            {/* Wallpaper Vibe Toggle */}
            <button
              onClick={() => setWallpaperStyle(s => s === "vivid" ? "soft" : "vivid")}
              title={`Gym Wallpaper: ${wallpaperStyle === "vivid" ? "Vivid (High Visibility)" : "Soft (Muted)"}`}
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                isDarkMode 
                  ? "bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700" 
                  : "bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50 shadow-2xs"
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-amber-500" />
              <span>Wallpaper: {wallpaperStyle === "vivid" ? "Vivid" : "Soft"}</span>
            </button>

            <div className="hidden md:flex items-center gap-1 text-xs opacity-70">
              <Clock className="w-3.5 h-3.5" />
              <span>{selectedGym.openHours}</span>
            </div>

            {/* Mode Toggle Button */}
            <button
              onClick={() => setIsDarkMode(prev => !prev)}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isDarkMode 
                  ? "bg-neutral-900 border-neutral-800 text-amber-400 hover:bg-neutral-800" 
                  : "bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-100 shadow-2xs"
              }`}
              aria-label="Toggle Theme Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN CONTENT                                                              */}
      {/* ========================================================================= */}
      <main className="max-w-4xl mx-auto px-4 md:px-6 w-full mt-6 space-y-6">

        {/* 1. HERO OCCUPANCY CARD */}
        <section className={`rounded-3xl p-6 md:p-8 border backdrop-blur-2xl transition-all duration-300 relative overflow-hidden ${
          isDarkMode 
            ? "bg-[#0D121C]/94 border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.6)]" 
            : "bg-white/94 border-white/90 shadow-[0_14px_36px_rgba(0,0,0,0.12)]"
        }`}>
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Left Info */}
            <div className="flex-1 text-center md:text-left space-y-3">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${crowdTier.bgBadge}`}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: crowdTier.ringStroke }} />
                <span>{crowdTier.label} · {crowdTier.statusText}</span>
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                  {percentage}% Gym Filled
                </h1>
                <p className="text-sm md:text-base opacity-75 mt-1 leading-relaxed max-w-md font-normal">
                  {crowdTier.description}
                </p>
              </div>

              <div className="pt-1 flex flex-wrap items-center justify-center md:justify-start gap-2.5 text-xs opacity-80">
                <span className={`px-2.5 py-1 rounded-lg border ${isDarkMode ? "bg-neutral-900 border-neutral-800" : "bg-neutral-100 border-neutral-200"}`}>
                  <Users className="w-3.5 h-3.5 inline mr-1" />
                  <strong>{currentCount}</strong> of {maxCapacity} inside
                </span>
                <span className={`px-2.5 py-1 rounded-lg border ${isDarkMode ? "bg-neutral-900 border-neutral-800" : "bg-neutral-100 border-neutral-200"}`}>
                  <strong>{maxCapacity - currentCount}</strong> open spots
                </span>
                <span className="text-[11px] opacity-60">Updated {lastUpdated}</span>
              </div>
            </div>

            {/* Right Gauge */}
            <div className="relative flex items-center justify-center shrink-0">
              <svg className="w-48 h-48 md:w-52 md:h-52 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r={radius}
                  stroke={isDarkMode ? "#1E293B" : "#F1F5F9"}
                  strokeWidth="16"
                  fill="transparent"
                />
                <circle
                  cx="96"
                  cy="96"
                  r={radius}
                  stroke={crowdTier.ringStroke}
                  strokeWidth="16"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeOffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-700 ease-out"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
                <span className="text-4xl md:text-5xl font-extrabold tracking-tight leading-none">
                  {currentCount}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider opacity-60 mt-1">
                  Lifters
                </span>
              </div>
            </div>

          </div>

          {/* Quick Simulation Bar */}
          <div className="mt-8 pt-5 border-t border-neutral-200/50 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs opacity-60 font-medium">Turnstile Tap:</span>
              <button
                onClick={handleCheckIn}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-neutral-900 text-white dark:bg-[#CCFF00] dark:text-black text-xs font-bold active:scale-95 transition shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Check In</span>
              </button>
              <button
                onClick={handleCheckOut}
                disabled={currentCount <= 0}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold active:scale-95 disabled:opacity-40 transition cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
                <span>Check Out</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <span className="opacity-60 font-medium mr-1">Presets:</span>
              <button
                onClick={() => setCurrentCount(Math.round(maxCapacity * 0.25))}
                className={`px-2.5 py-1 rounded-full transition cursor-pointer ${
                  percentage < 45 
                    ? (isDarkMode ? "bg-emerald-950 text-emerald-300 font-bold" : "bg-emerald-100 text-emerald-900 font-bold") 
                    : (isDarkMode ? "bg-neutral-800 text-neutral-400" : "bg-neutral-100 text-neutral-600")
                }`}
              >
                Khali (25%)
              </button>
              <button
                onClick={() => setCurrentCount(Math.round(maxCapacity * 0.60))}
                className={`px-2.5 py-1 rounded-full transition cursor-pointer ${
                  percentage >= 45 && percentage < 75 
                    ? (isDarkMode ? "bg-sky-950 text-sky-300 font-bold" : "bg-sky-100 text-sky-900 font-bold") 
                    : (isDarkMode ? "bg-neutral-800 text-neutral-400" : "bg-neutral-100 text-neutral-600")
                }`}
              >
                Normal (60%)
              </button>
              <button
                onClick={() => setCurrentCount(Math.round(maxCapacity * 0.90))}
                className={`px-2.5 py-1 rounded-full transition cursor-pointer ${
                  percentage >= 75 
                    ? (isDarkMode ? "bg-rose-950 text-rose-300 font-bold" : "bg-rose-100 text-rose-900 font-bold") 
                    : (isDarkMode ? "bg-neutral-800 text-neutral-400" : "bg-neutral-100 text-neutral-600")
                }`}
              >
                Rush (90%)
              </button>
            </div>
          </div>
        </section>

        {/* 2. REAL-TIME HOURLY LOG (STOPS AT CURRENT TIME) */}
        <section className={`rounded-3xl p-6 md:p-8 border backdrop-blur-2xl transition-all space-y-6 ${
          isDarkMode 
            ? "bg-[#0D121C]/94 border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.6)]" 
            : "bg-white/94 border-white/90 shadow-[0_14px_36px_rgba(0,0,0,0.12)]"
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">Today's Hourly Rush</h2>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                  isDarkMode ? "bg-neutral-800 border-neutral-700 text-neutral-300" : "bg-neutral-100 border-neutral-200 text-neutral-700"
                }`}>
                  Logged up to {activeHourFormatted}
                </span>
              </div>
              <p className="text-xs opacity-60 mt-1">
                Data records continuously. Hours after {activeHourFormatted} are uncompleted and will record in real time.
              </p>
            </div>

            {/* Time Selector - Clean labels without Real-Time Clock text */}
            <div className={`flex items-center gap-2 p-1.5 rounded-2xl border ${
              isDarkMode ? "bg-neutral-900 border-neutral-800" : "bg-neutral-50 border-neutral-200"
            }`}>
              <span className="text-[11px] font-medium opacity-60 pl-1.5">Current Time:</span>
              <select
                value={activeHour}
                onChange={(e) => handleHourChange(Number(e.target.value))}
                className={`text-xs font-semibold px-2.5 py-1 rounded-xl border focus:outline-none cursor-pointer ${
                  isDarkMode ? "bg-[#1A2230] border-neutral-700 text-white" : "bg-white border-neutral-200 text-neutral-900"
                }`}
              >
                {INDIAN_HOURLY_BASELINE.map(h => (
                  <option key={h.hourNumber} value={h.hourNumber}>
                    {h.hourLabel}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Histogram Bar Display */}
          <div className="pt-2">
            <div className="h-44 flex items-end gap-1.5 md:gap-2">
              {INDIAN_HOURLY_BASELINE.map((slot) => {
                const isPastOrNow = slot.hourNumber <= activeHour;
                const isCurrent = slot.hourNumber === activeHour;
                const recordedPct = recordedHistory[slot.hourNumber] || 0;

                let barColor = isDarkMode ? "bg-emerald-500" : "bg-emerald-400";
                if (recordedPct >= 75) {
                  barColor = isDarkMode ? "bg-rose-500" : "bg-rose-400";
                } else if (recordedPct >= 45) {
                  barColor = isDarkMode ? "bg-sky-500" : "bg-sky-400";
                }

                return (
                  <div
                    key={slot.hourNumber}
                    className="flex-1 flex flex-col items-center h-full justify-end relative group cursor-pointer"
                  >
                    {/* Tooltip */}
                    <div className="absolute -top-10 bg-neutral-900 text-white text-[10px] font-medium py-1 px-2.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                      {isPastOrNow ? (
                        <span>{slot.hourLabel}: {recordedPct}% ({Math.round(maxCapacity * (recordedPct / 100))} inside)</span>
                      ) : (
                        <span className="text-neutral-400">Time unreached · No data</span>
                      )}
                    </div>

                    {isCurrent && (
                      <span className={`w-1.5 h-1.5 rounded-full mb-1 ${isDarkMode ? "bg-[#CCFF00]" : "bg-neutral-900"}`} />
                    )}

                    {isPastOrNow ? (
                      <div
                        className={`w-full rounded-t-md transition-all duration-500 ${barColor} ${
                          isCurrent ? (isDarkMode ? "ring-2 ring-[#CCFF00] ring-offset-1 ring-offset-[#121722]" : "ring-2 ring-neutral-900 ring-offset-1") : "opacity-90 hover:opacity-100"
                        }`}
                        style={{ height: `${recordedPct}%` }}
                      />
                    ) : (
                      <div className={`w-full h-1 rounded-full mb-1 ${isDarkMode ? "bg-neutral-800" : "bg-neutral-200"}`} />
                    )}

                    <span className={`text-[10px] mt-2 whitespace-nowrap font-medium ${
                      isCurrent 
                        ? (isDarkMode ? "text-[#CCFF00] font-bold" : "text-neutral-900 font-bold") 
                        : isPastOrNow 
                        ? "opacity-80" 
                        : "opacity-30"
                    }`}>
                      {slot.hourLabel.replace(":00", "").replace(" ", "")}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-200/50 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs opacity-70">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-xs ${isDarkMode ? "bg-emerald-500" : "bg-emerald-400"}`} />
                  Logged (&le; {activeHourFormatted})
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-neutral-300 dark:bg-neutral-700 rounded" />
                  Upcoming (Unrecorded)
                </span>
              </div>
              <span>Desi Peak Window: 7:00 PM – 9:30 PM</span>
            </div>
          </div>
        </section>

        {/* 3. WORKOUT SPOTTER & CUSTOMIZED PLAN ENGINE (Equipment-Aware) */}
        <section className={`rounded-3xl p-6 md:p-8 border backdrop-blur-2xl transition-all space-y-6 ${
          isDarkMode 
            ? "bg-[#0D121C]/94 border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.6)]" 
            : "bg-white/94 border-white/90 shadow-[0_14px_36px_rgba(0,0,0,0.12)]"
        }`}>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-200/50 dark:border-neutral-800">
            <div>
              <div className="flex items-center gap-2">
                <Dumbbell className={`w-5 h-5 ${isDarkMode ? "text-[#CCFF00]" : "text-neutral-900"}`} />
                <h2 className="text-xl font-bold tracking-tight">
                  Daily Workout Spotter & Plan
                </h2>
              </div>
              <p className="text-xs opacity-70 mt-1">
                Customized for <strong>{selectedGym.name}</strong> based on machines currently available
              </p>
            </div>

            {/* Missing equipment notification chip */}
            <div className={`p-3 rounded-2xl border text-xs max-w-sm ${
              isDarkMode 
                ? "bg-amber-950/30 border-amber-800/60 text-amber-300" 
                : "bg-amber-50/80 border-amber-200 text-amber-900"
            }`}>
              <div className="flex items-center gap-1.5 font-bold mb-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Notice: Equipment Not Available at this Gym</span>
              </div>
              <p className="text-[11px] opacity-80 leading-snug">
                {selectedGym.missingEquipment.join(" · ")}
              </p>
            </div>
          </div>

          {/* Configuration Selectors: Muscle Group & Intensity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Step 1: Muscle Target */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider opacity-60 mb-2">
                1. What muscles are you hitting today?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(["Chest", "Back", "Legs", "Shoulders", "Arms", "Core & Functional"] as MuscleGroup[]).map(muscle => (
                  <button
                    key={muscle}
                    onClick={() => {
                      setSelectedMuscle(muscle);
                      setCompletedExercises({});
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border text-center transition cursor-pointer ${
                      selectedMuscle === muscle
                        ? (isDarkMode ? "bg-[#CCFF00] text-black border-[#CCFF00] shadow-sm font-bold" : "bg-neutral-900 text-white border-neutral-900 shadow-sm font-bold")
                        : (isDarkMode ? "bg-neutral-900 border-neutral-800 hover:bg-neutral-850" : "bg-neutral-50 border-neutral-200 hover:bg-neutral-100")
                    }`}
                  >
                    {muscle}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Intensity */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider opacity-60 mb-2">
                2. Workout Intensity Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["Light", "Moderate", "Heavy"] as IntensityLevel[]).map(intensity => (
                  <button
                    key={intensity}
                    onClick={() => setSelectedIntensity(intensity)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border text-center transition cursor-pointer ${
                      selectedIntensity === intensity
                        ? (isDarkMode ? "bg-sky-400 text-black border-sky-400 font-bold" : "bg-sky-600 text-white border-sky-600 font-bold")
                        : (isDarkMode ? "bg-neutral-900 border-neutral-800 hover:bg-neutral-850" : "bg-neutral-50 border-neutral-200 hover:bg-neutral-100")
                    }`}
                  >
                    <div>{intensity}</div>
                    <div className="text-[10px] font-normal opacity-75 mt-0.5">
                      {intensity === "Light" && "Form / Deload"}
                      {intensity === "Moderate" && "Hypertrophy"}
                      {intensity === "Heavy" && "Max Strength"}
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Step 3: Customized Equipment-Adapted Plan */}
          <div className="mt-6 pt-5 border-t border-neutral-200/50 dark:border-neutral-800">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-base font-bold">
                  {selectedMuscle} Routine ({selectedIntensity} Intensity)
                </h3>
                <span className="text-xs opacity-60">
                  {customizedWorkoutPlan.length} tailored exercises matching {selectedGym.chain}'s layout
                </span>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                isDarkMode ? "bg-neutral-900 border border-neutral-800 text-[#CCFF00]" : "bg-neutral-100 text-neutral-800"
              }`}>
                {Object.values(completedExercises).filter(Boolean).length} / {customizedWorkoutPlan.length} Done
              </span>
            </div>

            {/* Exercise List */}
            <div className="space-y-3">
              {customizedWorkoutPlan.map((ex, index) => {
                const isDone = !!completedExercises[ex.id];

                return (
                  <div
                    key={ex.id}
                    onClick={() => setCompletedExercises(prev => ({ ...prev, [ex.id]: !prev[ex.id] }))}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                      isDone
                        ? (isDarkMode ? "bg-emerald-950/20 border-emerald-800/40 opacity-70" : "bg-emerald-50/50 border-emerald-200 opacity-70")
                        : (isDarkMode ? "bg-[#182030] border-neutral-800 hover:border-neutral-700" : "bg-white border-neutral-200/80 hover:border-neutral-300 shadow-2xs")
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                        isDone 
                          ? (isDarkMode ? "bg-emerald-500 text-black" : "bg-emerald-600 text-white") 
                          : (isDarkMode ? "bg-neutral-800 text-neutral-300" : "bg-neutral-100 text-neutral-700")
                      }`}>
                        {isDone ? <Check className="w-4 h-4" /> : index + 1}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className={`text-sm font-bold ${isDone ? "line-through opacity-70" : ""}`}>
                            {ex.title}
                          </h4>

                          {/* Equipment Adaptation Badge */}
                          {ex.wasSubstituted && (
                            <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold border ${
                              isDarkMode 
                                ? "bg-amber-950/60 text-amber-300 border-amber-800" 
                                : "bg-amber-100 text-amber-900 border-amber-200"
                            }`}>
                              Smart Swap: {ex.originalName} replaced
                            </span>
                          )}
                        </div>

                        <div className="text-xs opacity-75 mt-1 flex flex-wrap items-center gap-2">
                          <span className="font-semibold text-sky-600 dark:text-sky-400">
                            {ex.prescription}
                          </span>
                          <span>·</span>
                          <span>Using: {ex.equipment}</span>
                        </div>

                        {ex.reason && (
                          <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1 font-normal italic">
                            * {ex.reason}
                          </p>
                        )}

                        <p className="text-[11px] opacity-60 mt-0.5">
                          Form Cue: "{ex.cue}"
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCompletedExercises(prev => ({ ...prev, [ex.id]: !prev[ex.id] }));
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition ${
                        isDone
                          ? (isDarkMode ? "bg-emerald-900/60 text-emerald-300" : "bg-emerald-100 text-emerald-800")
                          : (isDarkMode ? "bg-neutral-800 text-neutral-300 hover:bg-neutral-700" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200")
                      }`}
                    >
                      {isDone ? "Completed" : "Mark Set Done"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-6 mt-12 text-center text-xs opacity-50 space-y-1">
        <p>G-SPOT India · Real-time gym crowd telemetry & equipment-aware workout intelligence</p>
      </footer>

    </div>
  );
}
