import { useState, useEffect, useRef } from "react";

// ============================================================
// DATA & CONSTANTS
// ============================================================
const ESSEX_COUNTY_PARKS = [
  { id: 1, name: "Eagle Rock Reservation", type: "hike", lat: 40.7883, lng: -74.2276, address: "Eagle Rock Ave, West Orange, NJ", amenities: ["trails", "viewpoint", "parking"], difficulty: "moderate", ageRange: "6+", description: "Stunning views of the NYC skyline from a cliff overlook. Great trails through wooded areas.", funFact: "This cliff was used as a lookout point during the Revolutionary War — George Washington's troops watched British movements from here!", discoveries: [{ name: "Red-Tailed Hawk", icon: "🦅", rarity: "uncommon", points: 50 }, { name: "NYC Skyline View", icon: "🏙️", rarity: "common", points: 25 }, { name: "Revolutionary War Marker", icon: "🏛️", rarity: "rare", points: 100 }, { name: "White Oak Tree", icon: "🌳", rarity: "common", points: 25 }] },
  { id: 2, name: "South Mountain Reservation", type: "hike", lat: 40.7440, lng: -74.3535, address: "South Orange Ave, South Orange, NJ", amenities: ["trails", "waterfall", "parking", "restrooms"], difficulty: "moderate", ageRange: "5+", description: "560-acre reservation with Hemlock Falls waterfall, extensive trail system, and the Turtle Back Zoo nearby.", funFact: "Hemlock Falls is a 25-foot waterfall hidden in the woods — one of the best-kept secrets in Essex County!", discoveries: [{ name: "Hemlock Falls", icon: "💧", rarity: "rare", points: 100 }, { name: "Eastern Box Turtle", icon: "🐢", rarity: "uncommon", points: 50 }, { name: "Hemlock Tree", icon: "🌲", rarity: "common", points: 25 }, { name: "Deer Tracks", icon: "🦌", rarity: "uncommon", points: 50 }] },
  { id: 3, name: "Branch Brook Park", type: "park", lat: 40.7640, lng: -74.1720, address: "Branch Brook Park, Newark, NJ", amenities: ["playground", "lake", "paths", "restrooms", "sports fields"], difficulty: "easy", ageRange: "All ages", description: "Famous for having more cherry blossom trees than Washington DC! Beautiful lake, open fields, and great playgrounds.", funFact: "Branch Brook Park has over 5,000 cherry blossom trees — more than Washington DC's Tidal Basin!", discoveries: [{ name: "Cherry Blossom", icon: "🌸", rarity: "rare", points: 100, seasonal: "spring" }, { name: "Canada Goose", icon: "🪿", rarity: "common", points: 25 }, { name: "Great Blue Heron", icon: "🐦", rarity: "uncommon", points: 50 }, { name: "Historic Bridge", icon: "🌉", rarity: "common", points: 25 }] },
  { id: 4, name: "Turtle Back Zoo", type: "attraction", lat: 40.7430, lng: -74.3290, address: "560 Northfield Ave, West Orange, NJ", amenities: ["zoo", "playground", "restrooms", "food", "parking"], difficulty: "easy", ageRange: "All ages", description: "Popular family zoo with native and exotic animals, train ride, treetop adventure course, and splash pad.", funFact: "The zoo is named after 'Turtle Back Rock,' a large boulder with markings that look like a turtle shell!", discoveries: [{ name: "Turtle Back Rock", icon: "🪨", rarity: "rare", points: 100 }, { name: "Red Panda", icon: "🐾", rarity: "uncommon", points: 50 }, { name: "Bald Eagle", icon: "🦅", rarity: "rare", points: 100 }, { name: "Prairie Dog", icon: "🐿️", rarity: "common", points: 25 }] },
  { id: 5, name: "Brookdale Park", type: "park", lat: 40.8310, lng: -74.1920, address: "Brookdale Park, Bloomfield, NJ", amenities: ["playground", "sports fields", "paths", "restrooms", "tennis"], difficulty: "easy", ageRange: "All ages", description: "Large county park with great playgrounds, sports fields, walking paths, and a beautiful rose garden.", funFact: "Brookdale Park's rose garden has been blooming for over 60 years and features more than 100 varieties!", discoveries: [{ name: "Rose Garden", icon: "🌹", rarity: "uncommon", points: 50 }, { name: "Monarch Butterfly", icon: "🦋", rarity: "uncommon", points: 50 }, { name: "Robin", icon: "🐦", rarity: "common", points: 25 }] },
  { id: 6, name: "Mills Reservation", type: "hike", lat: 40.8160, lng: -74.2520, address: "Reservoir Dr, Cedar Grove, NJ", amenities: ["trails", "viewpoint", "parking"], difficulty: "moderate", ageRange: "7+", description: "Quiet, wooded reservation with excellent trails and a stunning NYC viewpoint from the eastern ridge.", funFact: "On a clear day, you can see the entire Manhattan skyline from the overlook — it's one of the best views in NJ!", discoveries: [{ name: "Pileated Woodpecker", icon: "🪶", rarity: "rare", points: 100 }, { name: "Sunset Overlook", icon: "🌅", rarity: "uncommon", points: 50 }, { name: "Fern Valley", icon: "🌿", rarity: "common", points: 25 }] },
  { id: 7, name: "Verona Park", type: "park", lat: 40.8330, lng: -74.2430, address: "Lakeside Ave, Verona, NJ", amenities: ["lake", "playground", "paths", "paddle boats", "restrooms"], difficulty: "easy", ageRange: "All ages", description: "Beautiful Olmsted-designed park with a lake, paddle boats, playgrounds, and walking paths.", funFact: "This park was designed by the Olmsted Brothers firm — the same family that designed Central Park in NYC!", discoveries: [{ name: "Painted Turtle", icon: "🐢", rarity: "uncommon", points: 50 }, { name: "Mallard Duck", icon: "🦆", rarity: "common", points: 25 }, { name: "Olmsted Design Marker", icon: "📜", rarity: "rare", points: 100 }] },
  { id: 8, name: "Hilltop Reservation", type: "hike", lat: 40.7606, lng: -74.2786, address: "Oak Ridge Ave, West Orange, NJ", amenities: ["trails", "viewpoint"], difficulty: "easy", ageRange: "5+", description: "Short but rewarding trails through mixed forests with a hilltop viewpoint.", funFact: "The reservoir at the top was built in the 1800s to supply water to the growing towns below!", discoveries: [{ name: "Wild Turkey", icon: "🦃", rarity: "uncommon", points: 50 }, { name: "Reservoir Vista", icon: "💧", rarity: "common", points: 25 }, { name: "Coyote Tracks", icon: "🐾", rarity: "rare", points: 100 }] },
  { id: 9, name: "Watsessing Park", type: "park", lat: 40.8140, lng: -74.1580, address: "Bloomfield Ave, Bloomfield, NJ", amenities: ["playground", "paths", "sports fields", "tennis"], difficulty: "easy", ageRange: "All ages", description: "Community park with great playgrounds, ball fields, and a nice walking loop.", funFact: "The name 'Watsessing' comes from the Lenape Native American word meaning 'place of the winding river'!", discoveries: [{ name: "Cardinal", icon: "🐦", rarity: "common", points: 25 }, { name: "Lenape History Stone", icon: "🏛️", rarity: "rare", points: 100 }] },
  { id: 10, name: "Rahway River Park", type: "park", lat: 40.7020, lng: -74.2830, address: "St Georges Ave, Rahway, NJ", amenities: ["playground", "pool", "paths", "sports fields", "parking"], difficulty: "easy", ageRange: "All ages", description: "Large park along the Rahway River with extensive sports facilities and a great community pool.", funFact: "The Rahway River runs 24 miles through NJ — Native Americans used it as a major travel route for centuries!", discoveries: [{ name: "Great Egret", icon: "🐦", rarity: "uncommon", points: 50 }, { name: "River Otter", icon: "🦦", rarity: "rare", points: 100 }, { name: "Willow Tree", icon: "🌳", rarity: "common", points: 25 }] },
  { id: 11, name: "Glenfield Park", type: "playground", lat: 40.7590, lng: -74.2120, address: "Glenfield Ave, Montclair, NJ", amenities: ["playground", "sports fields", "parking"], difficulty: "easy", ageRange: "All ages", description: "Community park with playground equipment and open fields perfect for pickup games.", funFact: "Montclair was once called 'Cranetown' because of all the cranberry bogs in the area!", discoveries: [{ name: "Chipmunk", icon: "🐿️", rarity: "common", points: 25 }, { name: "Bluebird", icon: "🐦", rarity: "uncommon", points: 50 }] },
  { id: 12, name: "Anderson Park", type: "playground", lat: 40.8160, lng: -74.2140, address: "Bellevue Ave, Montclair, NJ", amenities: ["playground", "restrooms", "paths"], difficulty: "easy", ageRange: "All ages", description: "Charming Montclair park with a great playground, shaded paths, and community events.", funFact: "The park is named after Major Abraham Anderson, a Civil War hero from Montclair!", discoveries: [{ name: "Blue Jay", icon: "🐦", rarity: "common", points: 25 }, { name: "Civil War Memorial", icon: "🏛️", rarity: "uncommon", points: 50 }] },
];

const ACTIVITY_TYPES = [
  { id: "walking", label: "Walking/Exploring", icon: "🚶", multiplier: 1.0 },
  { id: "hiking", label: "Hiking", icon: "🥾", multiplier: 1.5 },
  { id: "playground", label: "Playground", icon: "🛝", multiplier: 1.0 },
  { id: "soccer", label: "Soccer", icon: "⚽", multiplier: 1.5 },
  { id: "basketball", label: "Basketball", icon: "🏀", multiplier: 1.5 },
  { id: "baseball", label: "Baseball", icon: "⚾", multiplier: 1.5 },
  { id: "biking", label: "Biking", icon: "🚴", multiplier: 1.5 },
  { id: "nature", label: "Nature Study", icon: "🔍", multiplier: 1.2 },
];

const CHALLENGES = [
  { id: 1, title: "Park Hopper", desc: "Visit 3 different parks this week", target: 3, reward: 150, type: "weekly", icon: "🗺️" },
  { id: 2, title: "Trail Blazer", desc: "Spend 2 hours on trails", target: 120, reward: 200, type: "weekly", icon: "🥾" },
  { id: 3, title: "Early Bird", desc: "Check in before 9 AM", target: 1, reward: 75, type: "daily", icon: "🌅" },
  { id: 4, title: "Rain Explorer", desc: "Spend 30 min outside in the rain", target: 30, reward: 100, type: "weather", icon: "🌧️" },
  { id: 5, title: "Snow Day Hero", desc: "Play outside during snowfall", target: 1, reward: 150, type: "weather", icon: "❄️" },
  { id: 6, title: "Discovery Hunter", desc: "Find 3 discoveries this week", target: 3, reward: 100, type: "weekly", icon: "🔍" },
  { id: 7, title: "Team Player", desc: "Play a sport for 45 minutes", target: 45, reward: 100, type: "daily", icon: "🏅" },
  { id: 8, title: "Sunset Chaser", desc: "Be outdoors during sunset", target: 1, reward: 75, type: "daily", icon: "🌇" },
];

const AVATAR_ITEMS = {
  hats: [
    { id: "none", label: "None", cost: 0, icon: "" },
    { id: "cap", label: "Explorer Cap", cost: 0, icon: "🧢" },
    { id: "cowboy", label: "Ranger Hat", cost: 100, icon: "🤠" },
    { id: "helmet", label: "Adventure Helmet", cost: 200, icon: "⛑️" },
    { id: "crown", label: "Nature Crown", cost: 500, icon: "👑" },
  ],
  gear: [
    { id: "none", label: "None", cost: 0, icon: "" },
    { id: "backpack", label: "Backpack", cost: 0, icon: "🎒" },
    { id: "binoculars", label: "Binoculars", cost: 150, icon: "🔭" },
    { id: "camera", label: "Camera", cost: 300, icon: "📸" },
    { id: "compass", label: "Golden Compass", cost: 500, icon: "🧭" },
  ],
  boots: [
    { id: "none", label: "Sneakers", cost: 0, icon: "" },
    { id: "hiking", label: "Hiking Boots", cost: 100, icon: "🥾" },
    { id: "rain", label: "Rain Boots", cost: 200, icon: "🌧️" },
    { id: "snow", label: "Snow Boots", cost: 300, icon: "❄️" },
  ],
};

const LEADERBOARD_TIERS = [
  { name: "Little Explorers", range: "Ages 5–8", icon: "🌱" },
  { name: "Trailblazers", range: "Ages 9–12", icon: "🔥" },
  { name: "Adventurers", range: "Ages 13–17", icon: "⚡" },
];

const INITIAL_STATE = {
  screen: "splash",
  user: null,
  childProfiles: [],
  activeChild: null,
  checkedIn: null,
  timerStart: null,
  timerElapsed: 0,
  selectedActivity: null,
  points: 480,
  totalPoints: 480,
  streak: 3,
  discoveries: ["Canada Goose", "Robin", "Chipmunk", "Blue Jay"],
  passportStamps: [3, 5, 12],
  challengeProgress: { 1: 2, 6: 2 },
  selectedPark: null,
  filterType: "all",
  sortBy: "distance",
  tab: "explore",
  avatar: { hat: "cap", gear: "backpack", boots: "none", color: "#4A7C59" },
  ownedItems: ["cap", "backpack", "none"],
  customRewards: [
    { id: 1, name: "Ice Cream Trip", cost: 300, icon: "🍦", claimed: false },
    { id: 2, name: "Movie Night", cost: 500, icon: "🎬", claimed: false },
    { id: 3, name: "New Book", cost: 400, icon: "📚", claimed: false },
  ],
  leaderboardTier: 0,
  showDiscoveryModal: false,
  discoveryTarget: null,
  parentView: false,
  showOnboarding: false,
  journalEntries: [
    { date: "Feb 10", park: "Branch Brook Park", photo: "🪿", note: "Saw a huge goose by the lake!", points: 45 },
    { date: "Feb 8", park: "Anderson Park", photo: "🐦", note: "Blue jay was sitting on the fence", points: 30 },
  ],
  notifications: [
    { id: 1, text: "🔥 3-day streak! Keep it going tomorrow!", time: "Today", read: false },
    { id: 2, text: "🗺️ Park Hopper: Visit 1 more park to complete!", time: "Today", read: false },
    { id: 3, text: "🌧️ Rain expected tomorrow — Rain Explorer challenge activated!", time: "Yesterday", read: true },
  ],
};

const getUserLocation = () => ({ lat: 40.7880, lng: -74.2320 });

const getDistance = (lat1, lng1, lat2, lng2) => {
  const R = 3959;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const typeIcons = { hike: "🥾", park: "🌳", playground: "🛝", campground: "⛺", attraction: "🎪" };
const typeColors = { hike: "#5B8C5A", park: "#3D8B37", playground: "#E8833A", campground: "#8B6914", attraction: "#9B59B6" };
const difficultyColors = { easy: "#27ae60", moderate: "#f39c12", hard: "#e74c3c" };
const rarityColors = { common: "#6B7280", uncommon: "#3B82F6", rare: "#F59E0B" };

// ============================================================
// MAIN APP
// ============================================================
export default function OutdoorQuestApp() {
  const [s, setS] = useState(INITIAL_STATE);
  const timerRef = useRef(null);
  const userLoc = getUserLocation();
  const u = (updates) => setS((prev) => ({ ...prev, ...updates }));

  useEffect(() => {
    if (s.checkedIn && s.timerStart) {
      timerRef.current = setInterval(() => {
        u({ timerElapsed: Math.floor((Date.now() - s.timerStart) / 1000) });
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [s.checkedIn, s.timerStart]);

  const parksWithDist = ESSEX_COUNTY_PARKS.map((p) => ({ ...p, distance: getDistance(userLoc.lat, userLoc.lng, p.lat, p.lng) }))
    .filter((p) => s.filterType === "all" || p.type === s.filterType)
    .sort((a, b) => (s.sortBy === "distance" ? a.distance - b.distance : a.name.localeCompare(b.name)));

  const formatTime = (sec) => `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, "0")}`;

  const earnedPoints = s.checkedIn && s.selectedActivity
    ? Math.floor((s.timerElapsed / 900) * 10 * (ACTIVITY_TYPES.find((a) => a.id === s.selectedActivity)?.multiplier || 1))
    : 0;

  const checkOut = () => {
    const pts = Math.max(earnedPoints, 5);
    u({ points: s.points + pts, totalPoints: s.totalPoints + pts, passportStamps: s.passportStamps.includes(s.checkedIn.id) ? s.passportStamps : [...s.passportStamps, s.checkedIn.id], checkedIn: null, timerStart: null, timerElapsed: 0, selectedActivity: null, tab: "profile" });
  };

  const claimDiscovery = (disc) => {
    if (!s.discoveries.includes(disc.name)) {
      u({ discoveries: [...s.discoveries, disc.name], points: s.points + disc.points, totalPoints: s.totalPoints + disc.points, showDiscoveryModal: true, discoveryTarget: disc });
    }
  };

  const buyItem = (item) => {
    if (s.points >= item.cost && !s.ownedItems.includes(item.id)) {
      u({ points: s.points - item.cost, ownedItems: [...s.ownedItems, item.id] });
    }
  };

  const claimReward = (reward) => {
    if (s.points >= reward.cost && !reward.claimed) {
      u({ points: s.points - reward.cost, customRewards: s.customRewards.map((r) => (r.id === reward.id ? { ...r, claimed: true } : r)) });
    }
  };

  const levelNum = Math.floor(s.totalPoints / 200) + 1;
  const levelProgress = (s.totalPoints % 200) / 200;
  const levelTitles = ["Rookie Explorer", "Park Ranger", "Trail Master", "Nature Champion", "Wilderness Legend", "Outdoor Hero", "Quest Master"];
  const levelTitle = levelTitles[Math.min(levelNum - 1, levelTitles.length - 1)];

  // SPLASH SCREEN
  if (s.screen === "splash") {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #2D5016 0%, #4A7C59 40%, #E8833A 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', sans-serif", padding: 20, textAlign: "center" }}>
        <div style={{ fontSize: 72, marginBottom: 8 }}>🏕️</div>
        <h1 style={{ color: "#FFF", fontSize: 36, fontWeight: 900, margin: 0, textShadow: "2px 2px 8px rgba(0,0,0,0.3)", letterSpacing: 1 }}>OUTDOOR QUEST</h1>
        <p style={{ color: "#FFE4B5", fontSize: 16, margin: "8px 0 32px", fontWeight: 500 }}>Play Outside. Earn Rewards.</p>
        <button onClick={() => u({ screen: "app" })} style={{ background: "#E8833A", color: "#FFF", border: "none", borderRadius: 30, padding: "16px 48px", fontSize: 18, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 15px rgba(0,0,0,0.25)" }}>Start Exploring!</button>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, marginTop: 24 }}>Early Preview — Essex County, NJ</p>
      </div>
    );
  }

  // NAV
  const NAV = [
    { id: "explore", icon: "🗺️", label: "Explore" },
    { id: "active", icon: "⏱️", label: "Active" },
    { id: "quests", icon: "⚔️", label: "Quests" },
    { id: "profile", icon: "🏅", label: "Profile" },
    { id: "parent", icon: "👨‍👩‍👧", label: "Parent" },
  ];

  const Header = () => (
    <div style={{ background: "linear-gradient(135deg, #2D5016, #4A7C59)", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 24 }}>🏕️</span>
        <span style={{ color: "#FFF", fontWeight: 800, fontSize: 16 }}>OUTDOOR QUEST</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "4px 12px", display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 14 }}>🔥</span>
          <span style={{ color: "#FFD700", fontWeight: 700, fontSize: 14 }}>{s.streak} days</span>
        </div>
        <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "4px 12px", display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 14 }}>⭐</span>
          <span style={{ color: "#FFD700", fontWeight: 700, fontSize: 14 }}>{s.points} pts</span>
        </div>
      </div>
    </div>
  );

  const BottomNav = () => (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#FFF", borderTop: "1px solid #E5E7EB", display: "flex", justifyContent: "space-around", padding: "6px 0 env(safe-area-inset-bottom, 12px)", zIndex: 100 }}>
      {NAV.map((n) => (
        <button key={n.id} onClick={() => u({ tab: n.id, selectedPark: null })} style={{ background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, cursor: "pointer", opacity: s.tab === n.id ? 1 : 0.5, padding: "4px 8px", position: "relative" }}>
          <span style={{ fontSize: 20 }}>{n.icon}</span>
          <span style={{ fontSize: 10, fontWeight: 600, color: s.tab === n.id ? "#2D5016" : "#9CA3AF" }}>{n.label}</span>
        </button>
      ))}
    </div>
  );

  // EXPLORE TAB
  const ExploreTab = () => (
    <div style={{ padding: "12px 16px 80px" }}>
      <div style={{ background: "linear-gradient(135deg, #1E3A5F, #2980B9)", borderRadius: 16, padding: "14px 16px", marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ color: "#FFF", fontWeight: 700, fontSize: 14 }}>☀️ Clear Skies — 38°F</div>
          <div style={{ color: "#93C5FD", fontSize: 12 }}>Great day to explore! Dress warm.</div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "6px 10px" }}>
          <div style={{ color: "#FFD700", fontSize: 11, fontWeight: 700 }}>NO WEATHER</div>
          <div style={{ color: "#FFF", fontSize: 10 }}>CHALLENGES</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 16, paddingBottom: 4 }}>
        {[{ id: "all", label: "All", icon: "📍" }, { id: "park", label: "Parks", icon: "🌳" }, { id: "hike", label: "Hikes", icon: "🥾" }, { id: "playground", label: "Play", icon: "🛝" }, { id: "attraction", label: "Attractions", icon: "🎪" }].map((f) => (
          <button key={f.id} onClick={() => u({ filterType: f.id })} style={{ background: s.filterType === f.id ? "#2D5016" : "#F3F4F6", color: s.filterType === f.id ? "#FFF" : "#374151", border: "none", borderRadius: 20, padding: "6px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 4 }}>
            {f.icon} {f.label}
          </button>
        ))}
      </div>
      {s.selectedPark ? <ParkDetail park={s.selectedPark} /> : parksWithDist.map((p) => <ParkCard key={p.id} park={p} />)}
    </div>
  );

  const ParkCard = ({ park }) => (
    <div onClick={() => u({ selectedPark: park })} style={{ background: "#FFF", borderRadius: 16, padding: 16, marginBottom: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", cursor: "pointer", border: "1px solid #F3F4F6" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 20 }}>{typeIcons[park.type]}</span>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#1F2937" }}>{park.name}</h3>
          </div>
          <p style={{ margin: "4px 0 8px", fontSize: 13, color: "#6B7280", lineHeight: 1.4 }}>{park.description.slice(0, 80)}...</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={{ background: `${typeColors[park.type]}15`, color: typeColors[park.type], padding: "2px 8px", borderRadius: 10, fontSize: 11, fontWeight: 600 }}>{park.type}</span>
            <span style={{ background: `${difficultyColors[park.difficulty]}15`, color: difficultyColors[park.difficulty], padding: "2px 8px", borderRadius: 10, fontSize: 11, fontWeight: 600 }}>{park.difficulty}</span>
            <span style={{ background: "#F3F4F6", color: "#6B7280", padding: "2px 8px", borderRadius: 10, fontSize: 11 }}>{park.ageRange}</span>
          </div>
        </div>
        <div style={{ textAlign: "right", minWidth: 60 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#2D5016" }}>{park.distance.toFixed(1)}</div>
          <div style={{ fontSize: 11, color: "#9CA3AF" }}>miles</div>
          {s.passportStamps.includes(park.id) && <div style={{ fontSize: 16, marginTop: 4 }}>✅</div>}
        </div>
      </div>
      <div style={{ display: "flex", gap: 4, marginTop: 10 }}>
        {park.discoveries.map((d) => (
          <span key={d.name} style={{ fontSize: 16, opacity: s.discoveries.includes(d.name) ? 1 : 0.25 }}>{d.icon}</span>
        ))}
        <span style={{ fontSize: 11, color: "#9CA3AF", alignSelf: "center", marginLeft: 4 }}>
          {park.discoveries.filter((d) => s.discoveries.includes(d.name)).length}/{park.discoveries.length} found
        </span>
      </div>
    </div>
  );

  const ParkDetail = ({ park }) => (
    <div>
      <button onClick={() => u({ selectedPark: null })} style={{ background: "none", border: "none", fontSize: 14, color: "#2D5016", fontWeight: 600, cursor: "pointer", marginBottom: 12, padding: 0 }}>← Back to list</button>
      <div style={{ background: `linear-gradient(135deg, ${typeColors[park.type]}, ${typeColors[park.type]}CC)`, borderRadius: 20, padding: 20, color: "#FFF", marginBottom: 16 }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>{typeIcons[park.type]}</div>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800 }}>{park.name}</h2>
        <p style={{ margin: "4px 0 0", opacity: 0.9, fontSize: 13 }}>{park.address}</p>
        <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
          <span style={{ background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: 10, fontSize: 12, fontWeight: 600 }}>{park.distance.toFixed(1)} mi</span>
          <span style={{ background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: 10, fontSize: 12, fontWeight: 600 }}>{park.difficulty}</span>
          <span style={{ background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: 10, fontSize: 12, fontWeight: 600 }}>{park.ageRange}</span>
        </div>
      </div>
      <div style={{ background: "#FFF", borderRadius: 16, padding: 16, marginBottom: 12, border: "1px solid #F3F4F6" }}>
        <p style={{ margin: 0, fontSize: 14, color: "#374151", lineHeight: 1.6 }}>{park.description}</p>
      </div>
      <div style={{ background: "#FFF7ED", borderRadius: 16, padding: 16, marginBottom: 12, borderLeft: "4px solid #E8833A" }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: "#E8833A", marginBottom: 4 }}>💡 Fun Fact</div>
        <p style={{ margin: 0, fontSize: 13, color: "#78350F", lineHeight: 1.5 }}>{park.funFact}</p>
      </div>
      <div style={{ background: "#FFF", borderRadius: 16, padding: 16, marginBottom: 12, border: "1px solid #F3F4F6" }}>
        <h4 style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 700, color: "#1F2937" }}>Amenities</h4>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {park.amenities.map((a) => (
            <span key={a} style={{ background: "#F0FDF4", color: "#166534", padding: "4px 10px", borderRadius: 10, fontSize: 12, fontWeight: 500 }}>{a}</span>
          ))}
        </div>
      </div>
      <div style={{ background: "#FFF", borderRadius: 16, padding: 16, marginBottom: 12, border: "1px solid #F3F4F6" }}>
        <h4 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: "#1F2937" }}>🔍 Discoveries at this location</h4>
        {park.discoveries.map((d) => {
          const found = s.discoveries.includes(d.name);
          return (
            <div key={d.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #F9FAFB" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 24, opacity: found ? 1 : 0.3 }}>{d.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: found ? "#1F2937" : "#9CA3AF" }}>{found ? d.name : "???"}</div>
                  <span style={{ fontSize: 11, color: rarityColors[d.rarity], fontWeight: 600 }}>{d.rarity.toUpperCase()} • {d.points} pts</span>
                </div>
              </div>
              {s.checkedIn?.id === park.id && !found && (
                <button onClick={(e) => { e.stopPropagation(); claimDiscovery(d); }} style={{ background: "#E8833A", color: "#FFF", border: "none", borderRadius: 10, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Found it! 📸</button>
              )}
              {found && <span style={{ color: "#22C55E", fontWeight: 700, fontSize: 13 }}>✓ Found</span>}
            </div>
          );
        })}
      </div>
      {!s.checkedIn ? (
        <button onClick={() => u({ checkedIn: park, timerStart: Date.now(), tab: "active" })} style={{ width: "100%", background: "linear-gradient(135deg, #2D5016, #4A7C59)", color: "#FFF", border: "none", borderRadius: 16, padding: 16, fontSize: 18, fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 15px rgba(45,80,22,0.3)", marginBottom: 12 }}>
          📍 Check In Here!
        </button>
      ) : s.checkedIn.id === park.id ? (
        <div style={{ background: "#F0FDF4", borderRadius: 16, padding: 16, textAlign: "center", border: "2px solid #22C55E" }}>
          <div style={{ color: "#166534", fontWeight: 700, fontSize: 16 }}>✅ You're checked in!</div>
          <div style={{ color: "#15803D", fontSize: 13, marginTop: 4 }}>Go to Active tab to manage your session</div>
        </div>
      ) : (
        <div style={{ background: "#FEF3C7", borderRadius: 16, padding: 16, textAlign: "center" }}>
          <div style={{ color: "#92400E", fontSize: 13 }}>Currently checked in at {s.checkedIn.name}. Check out first.</div>
        </div>
      )}
      {s.passportStamps.includes(park.id) && (
        <div style={{ textAlign: "center", marginTop: 8, padding: 12, background: "#F0FDF4", borderRadius: 12 }}>
          <span style={{ fontSize: 28 }}>🎫</span>
          <div style={{ color: "#166534", fontWeight: 700, fontSize: 13 }}>Passport Stamp Collected!</div>
        </div>
      )}
    </div>
  );

  // ACTIVE TAB
  const ActiveTab = () => (
    <div style={{ padding: "12px 16px 80px" }}>
      {s.checkedIn ? (
        <div>
          <div style={{ background: "linear-gradient(135deg, #2D5016, #4A7C59)", borderRadius: 20, padding: 24, color: "#FFF", textAlign: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 14, opacity: 0.8, marginBottom: 4 }}>Currently exploring</div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>{s.checkedIn.name}</h2>
            <div style={{ fontSize: 56, fontWeight: 900, margin: "16px 0 8px", fontFamily: "monospace", letterSpacing: 2 }}>{formatTime(s.timerElapsed)}</div>
            <div style={{ fontSize: 14, opacity: 0.8 }}>Time Outdoors</div>
            <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "8px 16px", display: "inline-block", marginTop: 16 }}>
              <span style={{ color: "#FFD700", fontWeight: 700, fontSize: 20 }}>+{earnedPoints}</span>
              <span style={{ color: "#FFF", fontSize: 13, marginLeft: 4 }}>points earned</span>
            </div>
          </div>
          <div style={{ background: "#FFF", borderRadius: 16, padding: 16, marginBottom: 12, border: "1px solid #F3F4F6" }}>
            <h4 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 700 }}>What are you doing?</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {ACTIVITY_TYPES.map((a) => (
                <button key={a.id} onClick={() => u({ selectedActivity: a.id })} style={{ background: s.selectedActivity === a.id ? "#2D5016" : "#F9FAFB", color: s.selectedActivity === a.id ? "#FFF" : "#374151", border: s.selectedActivity === a.id ? "2px solid #2D5016" : "1px solid #E5E7EB", borderRadius: 12, padding: "10px 8px", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 18 }}>{a.icon}</span>
                  <div style={{ textAlign: "left" }}>
                    <div>{a.label}</div>
                    {a.multiplier > 1 && <div style={{ fontSize: 10, color: s.selectedActivity === a.id ? "#A3E635" : "#22C55E", fontWeight: 700 }}>{a.multiplier}x points</div>}
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div style={{ background: "#FFF", borderRadius: 16, padding: 16, marginBottom: 12, border: "1px solid #F3F4F6" }}>
            <h4 style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 700 }}>🔍 Discoveries Nearby</h4>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {s.checkedIn.discoveries.map((d) => {
                const found = s.discoveries.includes(d.name);
                return (
                  <button key={d.name} disabled={found} onClick={() => claimDiscovery(d)} style={{ background: found ? "#F0FDF4" : "#FFF7ED", border: found ? "1px solid #86EFAC" : "1px solid #FDBA74", borderRadius: 12, padding: "8px 12px", cursor: found ? "default" : "pointer", display: "flex", alignItems: "center", gap: 6, opacity: found ? 0.6 : 1 }}>
                    <span style={{ fontSize: 20 }}>{d.icon}</span>
                    <div style={{ textAlign: "left" }}>
                      <div style={{ fontSize: 12, fontWeight: 600 }}>{found ? d.name : "???"}</div>
                      <div style={{ fontSize: 10, color: rarityColors[d.rarity] }}>{found ? "Found ✓" : `${d.points} pts`}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          <button onClick={checkOut} style={{ width: "100%", background: "#DC2626", color: "#FFF", border: "none", borderRadius: 16, padding: 16, fontSize: 16, fontWeight: 800, cursor: "pointer", marginTop: 8 }}>
            🏁 Check Out & Earn {Math.max(earnedPoints, 5)} Points
          </button>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🗺️</div>
          <h3 style={{ color: "#374151", marginBottom: 8 }}>No Active Session</h3>
          <p style={{ color: "#9CA3AF", marginBottom: 24 }}>Head to the Explore tab and check in at a park to start earning points!</p>
          <button onClick={() => u({ tab: "explore" })} style={{ background: "#2D5016", color: "#FFF", border: "none", borderRadius: 12, padding: "12px 24px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Find a Park →</button>
        </div>
      )}
    </div>
  );

  // QUESTS TAB
  const QuestsTab = () => (
    <div style={{ padding: "12px 16px 80px" }}>
      <h3 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 800, color: "#1F2937" }}>⚔️ Active Challenges</h3>
      {CHALLENGES.map((c) => {
        const prog = s.challengeProgress[c.id] || 0;
        const pct = Math.min((prog / c.target) * 100, 100);
        const complete = pct >= 100;
        return (
          <div key={c.id} style={{ background: "#FFF", borderRadius: 16, padding: 16, marginBottom: 12, border: complete ? "2px solid #22C55E" : "1px solid #F3F4F6", opacity: complete ? 0.7 : 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ fontSize: 28 }}>{c.icon}</span>
                <div>
                  <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#1F2937" }}>{c.title} {complete && "✅"}</h4>
                  <p style={{ margin: "2px 0 0", fontSize: 12, color: "#6B7280" }}>{c.desc}</p>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: "#E8833A", fontWeight: 800, fontSize: 15 }}>+{c.reward}</div>
                <div style={{ color: "#9CA3AF", fontSize: 10 }}>pts</div>
              </div>
            </div>
            <div style={{ background: "#F3F4F6", borderRadius: 10, height: 8, marginTop: 12, overflow: "hidden" }}>
              <div style={{ background: complete ? "#22C55E" : "linear-gradient(90deg, #E8833A, #F59E0B)", height: "100%", borderRadius: 10, width: `${pct}%`, transition: "width 0.5s" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span style={{ fontSize: 10, color: "#9CA3AF" }}>{c.type === "weekly" ? "🗓 Weekly" : c.type === "daily" ? "☀️ Daily" : "🌧 Weather"}</span>
              <span style={{ fontSize: 11, color: "#9CA3AF" }}>{prog}/{c.target}</span>
            </div>
          </div>
        );
      })}
      <h3 style={{ margin: "24px 0 16px", fontSize: 18, fontWeight: 800, color: "#1F2937" }}>🎫 Park Passport</h3>
      <div style={{ background: "#FFF", borderRadius: 16, padding: 16, border: "1px solid #F3F4F6" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ fontWeight: 700, color: "#374151" }}>Essex County</span>
          <span style={{ color: "#E8833A", fontWeight: 700 }}>{s.passportStamps.length}/{ESSEX_COUNTY_PARKS.length} stamps</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {ESSEX_COUNTY_PARKS.map((p) => (
            <div key={p.id} style={{ textAlign: "center", padding: 8, background: s.passportStamps.includes(p.id) ? "#F0FDF4" : "#F9FAFB", borderRadius: 10, border: s.passportStamps.includes(p.id) ? "1px solid #86EFAC" : "1px solid #E5E7EB" }}>
              <div style={{ fontSize: 20 }}>{s.passportStamps.includes(p.id) ? "🎫" : "❓"}</div>
              <div style={{ fontSize: 9, color: s.passportStamps.includes(p.id) ? "#166534" : "#9CA3AF", marginTop: 2, fontWeight: 600, lineHeight: 1.2 }}>
                {s.passportStamps.includes(p.id) ? p.name.split(" ").slice(0, 2).join(" ") : "???"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // PROFILE TAB
  const ProfileTab = () => (
    <div style={{ padding: "12px 16px 80px" }}>
      <div style={{ background: "linear-gradient(135deg, #2D5016, #4A7C59)", borderRadius: 20, padding: 24, color: "#FFF", textAlign: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 60, marginBottom: 4 }}>
          {AVATAR_ITEMS.hats.find((h) => h.id === s.avatar.hat)?.icon || ""}🧑‍🌾{AVATAR_ITEMS.gear.find((g) => g.id === s.avatar.gear)?.icon || ""}
        </div>
        <div style={{ fontSize: 11, opacity: 0.7 }}>LEVEL {levelNum}</div>
        <div style={{ fontSize: 18, fontWeight: 800, marginTop: 2 }}>{levelTitle}</div>
        <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 10, height: 8, marginTop: 10, overflow: "hidden" }}>
          <div style={{ background: "#FFD700", height: "100%", borderRadius: 10, width: `${levelProgress * 100}%` }} />
        </div>
        <div style={{ fontSize: 11, opacity: 0.7, marginTop: 4 }}>{s.totalPoints % 200}/{200} XP to next level</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
        {[{ label: "Points", value: s.points, icon: "⭐" }, { label: "Streak", value: `${s.streak}🔥`, icon: "" }, { label: "Stamps", value: s.passportStamps.length, icon: "🎫" }].map((st) => (
          <div key={st.label} style={{ background: "#FFF", borderRadius: 12, padding: 12, textAlign: "center", border: "1px solid #F3F4F6" }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#2D5016" }}>{st.icon}{st.value}</div>
            <div style={{ fontSize: 11, color: "#9CA3AF" }}>{st.label}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "#FFF", borderRadius: 16, padding: 16, marginBottom: 12, border: "1px solid #F3F4F6" }}>
        <h4 style={{ margin: "0 0 12px", fontWeight: 700 }}>🎨 Avatar Gear</h4>
        {Object.entries(AVATAR_ITEMS).map(([category, items]) => (
          <div key={category} style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", marginBottom: 6 }}>{category}</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {items.map((item) => {
                const owned = s.ownedItems.includes(item.id) || item.cost === 0;
                const equipped = s.avatar[category] === item.id;
                return (
                  <button key={item.id} onClick={() => { if (owned) u({ avatar: { ...s.avatar, [category]: item.id } }); else buyItem(item); }} style={{ background: equipped ? "#2D5016" : owned ? "#F0FDF4" : "#F9FAFB", color: equipped ? "#FFF" : "#374151", border: equipped ? "2px solid #2D5016" : owned ? "1px solid #86EFAC" : "1px solid #E5E7EB", borderRadius: 10, padding: "6px 10px", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                    {item.icon || "—"} {item.label}
                    {!owned && <span style={{ color: "#E8833A", fontWeight: 700, fontSize: 10 }}>{item.cost}pts</span>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div style={{ background: "#FFF", borderRadius: 16, padding: 16, marginBottom: 12, border: "1px solid #F3F4F6" }}>
        <h4 style={{ margin: "0 0 12px", fontWeight: 700 }}>🔍 My Discoveries ({s.discoveries.length})</h4>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {s.discoveries.map((d) => {
            const disc = ESSEX_COUNTY_PARKS.flatMap((p) => p.discoveries).find((dd) => dd.name === d);
            return disc ? (
              <div key={d} style={{ background: "#FFF7ED", borderRadius: 10, padding: "6px 10px", display: "flex", alignItems: "center", gap: 4, border: "1px solid #FDBA74" }}>
                <span style={{ fontSize: 16 }}>{disc.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 600 }}>{disc.name}</span>
              </div>
            ) : null;
          })}
        </div>
      </div>
      <div style={{ background: "#FFF", borderRadius: 16, padding: 16, marginBottom: 12, border: "1px solid #F3F4F6" }}>
        <h4 style={{ margin: "0 0 12px", fontWeight: 700 }}>🎁 Rewards</h4>
        {s.customRewards.map((r) => (
          <div key={r.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #F9FAFB" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 28 }}>{r.icon}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</div>
                <div style={{ fontSize: 12, color: "#E8833A" }}>⭐ {r.cost} points</div>
              </div>
            </div>
            {r.claimed ? (
              <span style={{ color: "#22C55E", fontWeight: 700, fontSize: 13 }}>Claimed ✓</span>
            ) : (
              <button disabled={s.points < r.cost} onClick={() => claimReward(r)} style={{ background: s.points >= r.cost ? "#E8833A" : "#E5E7EB", color: "#FFF", border: "none", borderRadius: 10, padding: "6px 14px", fontSize: 13, fontWeight: 700, cursor: s.points >= r.cost ? "pointer" : "default" }}>Claim</button>
            )}
          </div>
        ))}
      </div>
      <div style={{ background: "#FFF", borderRadius: 16, padding: 16, border: "1px solid #F3F4F6" }}>
        <h4 style={{ margin: "0 0 12px", fontWeight: 700 }}>🏆 Leaderboard — {LEADERBOARD_TIERS[s.leaderboardTier].name}</h4>
        <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
          {LEADERBOARD_TIERS.map((t, i) => (
            <button key={i} onClick={() => u({ leaderboardTier: i })} style={{ background: s.leaderboardTier === i ? "#2D5016" : "#F3F4F6", color: s.leaderboardTier === i ? "#FFF" : "#6B7280", border: "none", borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>{t.icon} {t.name}</button>
          ))}
        </div>
        {[{ rank: 1, name: "TrailBlazer_22", pts: 2450 }, { rank: 2, name: "NatureKid_NJ", pts: 1890 }, { rank: 3, name: "ParkExplorer", pts: 1650 }, { rank: 4, name: "You", pts: s.totalPoints, isUser: true }, { rank: 5, name: "WildHiker99", pts: 420 }]
          .sort((a, b) => b.pts - a.pts)
          .map((p, i) => (
            <div key={p.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: p.isUser ? "8px" : "8px 0", borderBottom: "1px solid #F9FAFB", background: p.isUser ? "#F0FDF4" : "transparent", borderRadius: p.isUser ? 8 : 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontWeight: 800, fontSize: 16, width: 24, textAlign: "center" }}>
                  {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}`}
                </span>
                <span style={{ fontWeight: p.isUser ? 800 : 500, color: p.isUser ? "#2D5016" : "#374151" }}>{p.name}</span>
              </div>
              <span style={{ fontWeight: 700, color: "#E8833A" }}>{p.pts.toLocaleString()} pts</span>
            </div>
          ))}
      </div>
    </div>
  );

  // PARENT TAB
  const ParentTab = () => (
    <div style={{ padding: "12px 16px 80px" }}>
      <div style={{ background: "linear-gradient(135deg, #1E3A5F, #2563EB)", borderRadius: 20, padding: 20, color: "#FFF", marginBottom: 16 }}>
        <div style={{ fontSize: 13, opacity: 0.8 }}>Parent Dashboard</div>
        <h2 style={{ margin: "4px 0 0", fontSize: 22, fontWeight: 800 }}>👨‍👩‍👧 The Explorer Family</h2>
      </div>
      <div style={{ background: "#FFF", borderRadius: 16, padding: 16, marginBottom: 12, border: "1px solid #F3F4F6" }}>
        <h4 style={{ margin: "0 0 12px", fontWeight: 700 }}>📊 This Week's Activity</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[{ val: "3.5 hrs", label: "Outdoor Time", bg: "#F0FDF4", color: "#166534" }, { val: "480", label: "Points Earned", bg: "#FFF7ED", color: "#C2410C" }, { val: "3", label: "Parks Visited", bg: "#EFF6FF", color: "#1D4ED8" }, { val: "4", label: "Discoveries", bg: "#FDF4FF", color: "#7C3AED" }].map((s) => (
            <div key={s.label} style={{ background: s.bg, borderRadius: 12, padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: 12, color: "#6B7280" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: "#FFF", borderRadius: 16, padding: 16, marginBottom: 12, border: "1px solid #F3F4F6" }}>
        <h4 style={{ margin: "0 0 12px", fontWeight: 700 }}>👧 Child Profiles</h4>
        <div style={{ background: "#F9FAFB", borderRadius: 12, padding: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>🧒 Emma, age 9</div>
              <div style={{ fontSize: 12, color: "#6B7280" }}>Trailblazers • Level 3</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 700, color: "#E8833A" }}>⭐ 480 pts</div>
              <div style={{ fontSize: 12, color: "#22C55E" }}>🔥 3 day streak</div>
            </div>
          </div>
        </div>
        <button style={{ width: "100%", background: "#F3F4F6", border: "2px dashed #D1D5DB", borderRadius: 12, padding: 12, fontSize: 14, color: "#6B7280", cursor: "pointer", marginTop: 8 }}>+ Add Child Profile</button>
      </div>
      <div style={{ background: "#FFF", borderRadius: 16, padding: 16, marginBottom: 12, border: "1px solid #F3F4F6" }}>
        <h4 style={{ margin: "0 0 12px", fontWeight: 700 }}>🎁 Manage Family Rewards</h4>
        {s.customRewards.map((r) => (
          <div key={r.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #F9FAFB" }}>
            <span>{r.icon} {r.name} — {r.cost} pts</span>
            <span style={{ fontSize: 12, color: r.claimed ? "#22C55E" : "#9CA3AF" }}>{r.claimed ? "Claimed ✓" : "Active"}</span>
          </div>
        ))}
        <button style={{ width: "100%", background: "#F3F4F6", border: "2px dashed #D1D5DB", borderRadius: 12, padding: 10, fontSize: 13, color: "#6B7280", cursor: "pointer", marginTop: 8 }}>+ Add Custom Reward</button>
      </div>
      <div style={{ background: "#FFF", borderRadius: 16, padding: 16, marginBottom: 12, border: "1px solid #F3F4F6" }}>
        <h4 style={{ margin: "0 0 12px", fontWeight: 700 }}>📓 Nature Journal</h4>
        {s.journalEntries.map((entry, i) => (
          <div key={i} style={{ background: "#F9FAFB", borderRadius: 12, padding: 12, marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6B7280", marginBottom: 4 }}>
              <span>{entry.date}</span><span>📍 {entry.park}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 32 }}>{entry.photo}</span>
              <p style={{ margin: 0, fontSize: 13, color: "#374151" }}>"{entry.note}"</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background: "linear-gradient(135deg, #F0FDF4, #ECFDF5)", borderRadius: 16, padding: 16, border: "1px solid #86EFAC", marginBottom: 12 }}>
        <h4 style={{ margin: "0 0 8px", fontWeight: 700, color: "#166534" }}>💚 Why Outdoor Play Matters</h4>
        <div style={{ fontSize: 13, color: "#15803D", lineHeight: 1.6 }}>
          <p style={{ margin: "0 0 8px" }}><strong>Physical:</strong> Kids who play outside 60+ min/day have 36% lower obesity risk and better cardiovascular health.</p>
          <p style={{ margin: "0 0 8px" }}><strong>Mental:</strong> Outdoor play reduces anxiety and depression symptoms by up to 50% in children.</p>
          <p style={{ margin: 0 }}><strong>Academic:</strong> Studies show outdoor time improves focus and test scores by 20%.</p>
        </div>
      </div>
      <div style={{ background: "#FFF", borderRadius: 16, padding: 16, border: "1px solid #F3F4F6" }}>
        <h4 style={{ margin: "0 0 12px", fontWeight: 700 }}>⚙️ Account Settings</h4>
        {["Manage linked guardians", "Notification preferences", "Privacy & safety settings", "Subscription: Free Plan", "Help & support"].map((item) => (
          <div key={item} style={{ padding: "10px 0", borderBottom: "1px solid #F9FAFB", fontSize: 14, color: "#374151", cursor: "pointer", display: "flex", justifyContent: "space-between" }}>
            <span>{item}</span><span style={{ color: "#9CA3AF" }}>→</span>
          </div>
        ))}
      </div>
    </div>
  );

  // DISCOVERY MODAL
  const DiscoveryModal = () => s.showDiscoveryModal && s.discoveryTarget ? (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 20 }} onClick={() => u({ showDiscoveryModal: false, discoveryTarget: null })}>
      <div style={{ background: "#FFF", borderRadius: 24, padding: 32, textAlign: "center", maxWidth: 320, width: "100%" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ fontSize: 64 }}>{s.discoveryTarget.icon}</div>
        <div style={{ fontSize: 12, fontWeight: 700, color: rarityColors[s.discoveryTarget.rarity], textTransform: "uppercase", marginTop: 8 }}>{s.discoveryTarget.rarity} DISCOVERY</div>
        <h2 style={{ margin: "8px 0", fontSize: 24, fontWeight: 800 }}>{s.discoveryTarget.name}</h2>
        <div style={{ fontSize: 18, color: "#E8833A", fontWeight: 700 }}>+{s.discoveryTarget.points} points!</div>
        <div style={{ margin: "16px 0", padding: "12px 16px", background: "#FFF7ED", borderRadius: 12, fontSize: 13, color: "#78350F" }}>📸 Photo saved to your Nature Journal!</div>
        <button onClick={() => u({ showDiscoveryModal: false, discoveryTarget: null })} style={{ background: "#2D5016", color: "#FFF", border: "none", borderRadius: 12, padding: "12px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Awesome!</button>
      </div>
    </div>
  ) : null;

  return (
    <div style={{ maxWidth: 430, margin: "0 auto", background: "#F9FAFB", minHeight: "100vh", fontFamily: "'Segoe UI', -apple-system, sans-serif", position: "relative" }}>
      <Header />
      {s.tab === "explore" && <ExploreTab />}
      {s.tab === "active" && <ActiveTab />}
      {s.tab === "quests" && <QuestsTab />}
      {s.tab === "profile" && <ProfileTab />}
      {s.tab === "parent" && <ParentTab />}
      <BottomNav />
      <DiscoveryModal />
    </div>
  );
}
