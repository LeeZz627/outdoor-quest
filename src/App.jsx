Here's the complete updated code for your GitHub repository:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NJ Outdoor Explorer - MVP</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-b from-green-50 to-blue-50 min-h-screen">
  <div id="app" class="max-w-md mx-auto pb-20">
    <!-- Header -->
    <header class="bg-green-600 text-white p-4 sticky top-0 z-10 shadow-lg">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold">🌲 NJ Outdoor Explorer</h1>
        <div class="text-right">
          <div class="text-sm opacity-90">Points</div>
          <div class="text-xl font-bold" id="points-display">0</div>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main id="main-content" class="p-4">
      <!-- Content will be dynamically loaded here -->
    </main>

    <!-- Bottom Navigation -->
    <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div class="max-w-md mx-auto flex justify-around">
        <button onclick="navigateTo('explore')" class="nav-btn flex-1 p-4 text-center hover:bg-green-50 transition-colors" data-page="explore">
          <div class="text-2xl">🗺️</div>
          <div class="text-xs mt-1">Explore</div>
        </button>
        <button onclick="navigateTo('check-in')" class="nav-btn flex-1 p-4 text-center hover:bg-green-50 transition-colors" data-page="check-in">
          <div class="text-2xl">📍</div>
          <div class="text-xs mt-1">Check In</div>
        </button>
        <button onclick="navigateTo('profile')" class="nav-btn flex-1 p-4 text-center hover:bg-green-50 transition-colors" data-page="profile">
          <div class="text-2xl">👤</div>
          <div class="text-xs mt-1">Profile</div>
        </button>
        <button onclick="navigateTo('rewards')" class="nav-btn flex-1 p-4 text-center hover:bg-green-50 transition-colors" data-page="rewards">
          <div class="text-2xl">🎁</div>
          <div class="text-xs mt-1">Rewards</div>
        </button>
      </div>
    </nav>
  </div>

  <script>
    // App State
    let state = {
      points: 0,
      level: 1,
      badges: [],
      checkIns: [],
      currentPage: 'explore',
      streak: 0,
      totalCheckIns: 0,
      avatar: {
        skin: 'light',
        hair: 'brown',
        outfit: 'explorer',
        hat: 'none'
      }
    };

    // Sample locations data
    const locations = [
      { id: 1, name: 'Branch Brook Park', type: 'Park', town: 'Newark', difficulty: 'Easy', points: 10 },
      { id: 2, name: 'South Mountain Reservation', type: 'Hiking Trail', town: 'Millburn', difficulty: 'Moderate', points: 25 },
      { id: 3, name: 'Turtle Back Zoo', type: 'Zoo', town: 'West Orange', difficulty: 'Easy', points: 15 },
      { id: 4, name: 'Eagle Rock Reservation', type: 'Scenic Overlook', town: 'West Orange', difficulty: 'Easy', points: 20 },
      { id: 5, name: 'Grover Cleveland Park', type: 'Park', town: 'Caldwell', difficulty: 'Easy', points: 10 }
    ];

    // Sample rewards data
    const rewards = [
      { id: 1, name: 'Ice Cream Cone', cost: 50, partner: 'Local Ice Cream Shop', image: '🍦' },
      { id: 2, name: 'Movie Ticket', cost: 100, partner: 'AMC Theaters', image: '🎬' },
      { id: 3, name: 'Pizza Slice', cost: 30, partner: 'Pizza Place', image: '🍕' },
      { id: 4, name: 'Bookstore Gift Card ($5)', cost: 500, partner: 'Barnes & Noble', image: '📚' }
    ];

    // Available badges
    const availableBadges = [
      { id: 'first-steps', name: 'First Steps', description: 'Complete your first check-in', icon: '👣', unlocked: false },
      { id: 'streak-3', name: '3-Day Streak', description: 'Check in 3 days in a row', icon: '🔥', unlocked: false },
      { id: 'explorer-10', name: 'Explorer', description: 'Visit 10 different locations', icon: '🗺️', unlocked: false },
      { id: 'hiker', name: 'Hiker', description: 'Complete a moderate trail', icon: '🥾', unlocked: false }
    ];

    // Initialize app
    function init() {
      loadState();
      navigateTo('explore');
      updatePointsDisplay();
    }

    // Navigation
    function navigateTo(page) {
      state.currentPage = page;
      
      // Update active nav button
      document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('bg-green-100', 'text-green-600');
        if (btn.dataset.page === page) {
          btn.classList.add('bg-green-100', 'text-green-600');
        }
      });

      // Render page content
      const content = document.getElementById('main-content');
      switch(page) {
        case 'explore':
          content.innerHTML = renderExplorePage();
          break;
        case 'check-in':
          content.innerHTML = renderCheckInPage();
          break;
        case 'profile':
          content.innerHTML = renderProfilePage();
          break;
        case 'rewards':
          content.innerHTML = renderRewardsPage();
          break;
      }
    }

    // Render Explore Page
    function renderExplorePage() {
      return `
        <div class="space-y-4">
          <h2 class="text-2xl font-bold text-gray-800">Discover Places</h2>
          <div class="bg-white rounded-lg p-4 shadow">
            <input type="text" placeholder="Search locations..." 
                   class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
          </div>
          
          <div class="space-y-3">
            ${locations.map(loc => `
              <div class="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow cursor-pointer"
                   onclick="viewLocation(${loc.id})">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="font-bold text-lg text-gray-800">${loc.name}</h3>
                    <p class="text-sm text-gray-600">${loc.type} • ${loc.town}</p>
                    <div class="mt-2 flex items-center gap-2">
                      <span class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        ${loc.difficulty}
                      </span>
                      <span class="text-sm font-semibold text-green-600">+${loc.points} pts</span>
                    </div>
                  </div>
                  <div class="text-3xl">📍</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Render Check-In Page
    function renderCheckInPage() {
      return `
        <div class="space-y-4">
          <h2 class="text-2xl font-bold text-gray-800">Check In</h2>
          
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-2xl">ℹ️</span>
              <span class="font-semibold text-blue-900">Location Required</span>
            </div>
            <p class="text-sm text-blue-800">
              Enable location services to check in at outdoor locations and earn points!
            </p>
          </div>

          <div class="bg-white rounded-lg p-6 shadow text-center">
            <div class="text-6xl mb-4">📍</div>
            <h3 class="text-xl font-bold mb-2">Find Your Location</h3>
            <p class="text-gray-600 mb-4">We'll detect nearby outdoor spaces</p>
            <button onclick="simulateCheckIn()" 
                    class="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Detect Location
            </button>
          </div>

          ${state.checkIns.length > 0 ? `
            <div class="mt-6">
              <h3 class="font-bold text-lg mb-3">Recent Check-Ins</h3>
              <div class="space-y-2">
                ${state.checkIns.slice(-5).reverse().map(checkIn => `
                  <div class="bg-white rounded-lg p-3 shadow-sm">
                    <div class="flex justify-between items-center">
                      <div>
                        <div class="font-semibold">${checkIn.location}</div>
                        <div class="text-xs text-gray-500">${checkIn.date}</div>
                      </div>
                      <div class="text-green-600 font-bold">+${checkIn.points} pts</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      `;
    }

    // Render Profile Page
    function renderProfilePage() {
      const progress = (state.points % 100);
      
      return `
        <div class="space-y-4">
          <div class="bg-gradient-to-br from-green-500 to-blue-500 rounded-lg p-6 text-white shadow-lg">
            <div class="text-center mb-4">
              <div class="text-6xl mb-2">${getAvatarDisplay()}</div>
              <h2 class="text-2xl font-bold">Outdoor Explorer</h2>
              <p class="text-green-100">Level ${state.level}</p>
            </div>
            <div class="bg-white bg-opacity-20 rounded-full h-3 mb-2">
              <div class="bg-white rounded-full h-3 transition-all duration-500" 
                   style="width: ${progress}%"></div>
            </div>
            <p class="text-sm text-center text-green-100">${progress} / 100 points to Level ${state.level + 1}</p>
          </div>

          <!-- Avatar Customization -->
          <div class="bg-white rounded-lg p-4 shadow">
            <h3 class="font-bold text-lg mb-3">Customize Avatar</h3>
            
            <!-- Skin Tone -->
            <div class="mb-4">
              <label class="block text-sm font-semibold mb-2">Skin Tone</label>
              <div class="flex gap-2">
                ${['light', 'medium-light', 'medium', 'medium-dark', 'dark'].map(tone => `
                  <button onclick="updateAvatar('skin', '${tone}')"
                          class="w-10 h-10 rounded-full border-2 ${state.avatar.skin === tone ? 'border-green-600' : 'border-gray-300'}"
                          style="background-color: ${getSkinColor(tone)}">
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Hair Color -->
            <div class="mb-4">
              <label class="block text-sm font-semibold mb-2">Hair Color</label>
              <div class="flex gap-2">
                ${['brown', 'blonde', 'black', 'red', 'gray'].map(color => `
                  <button onclick="updateAvatar('hair', '${color}')"
                          class="w-10 h-10 rounded-full border-2 ${state.avatar.hair === color ? 'border-green-600' : 'border-gray-300'}"
                          style="background-color: ${getHairColor(color)}">
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Outfit -->
            <div class="mb-4">
              <label class="block text-sm font-semibold mb-2">Outfit</label>
              <div class="flex gap-2">
                ${['explorer', 'hiker', 'scientist', 'athlete'].map(outfit => `
                  <button onclick="updateAvatar('outfit', '${outfit}')"
                          class="px-3 py-2 rounded-lg border-2 ${state.avatar.outfit === outfit ? 'border-green-600 bg-green-50' : 'border-gray-300'} text-sm">
                    ${outfit.charAt(0).toUpperCase() + outfit.slice(1)}
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Hat -->
            <div class="mb-4">
              <label class="block text-sm font-semibold mb-2">Hat</label>
              <div class="flex gap-2">
                ${['none', 'cap', 'beanie', 'ranger'].map(hat => `
                  <button onclick="updateAvatar('hat', '${hat}')"
                          class="px-3 py-2 rounded-lg border-2 ${state.avatar.hat === hat ? 'border-green-600 bg-green-50' : 'border-gray-300'} text-sm flex items-center gap-1">
                    ${hat === 'none' ? 'None' : getHatEmoji(hat)}
                  </button>
                `).join('')}
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg p-4 shadow">
            <h3 class="font-bold text-lg mb-3">Stats</h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="text-center p-3 bg-green-50 rounded-lg">
                <div class="text-2xl font-bold text-green-600">${state.totalCheckIns}</div>
                <div class="text-sm text-gray-600">Check-ins</div>
              </div>
              <div class="text-center p-3 bg-blue-50 rounded-lg">
                <div class="text-2xl font-bold text-blue-600">${state.streak}</div>
                <div class="text-sm text-gray-600">Day Streak</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg p-4 shadow">
            <h3 class="font-bold text-lg mb-3">Badges</h3>
            <div class="grid grid-cols-4 gap-3">
              ${availableBadges.map(badge => {
                const unlocked = state.badges.includes(badge.id);
                return `
                  <div class="text-center ${unlocked ? '' : 'opacity-40'}">
                    <div class="text-3xl mb-1">${badge.icon}</div>
                    <div class="text-xs">${badge.name}</div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      `;
    }

    // Render Rewards Page
    function renderRewardsPage() {
      return `
        <div class="space-y-4">
          <h2 class="text-2xl font-bold text-gray-800">Rewards</h2>
          
          <div class="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg p-4 text-white shadow-lg">
            <div class="text-center">
              <div class="text-sm opacity-90">Your Balance</div>
              <div class="text-4xl font-bold">${state.points} points</div>
              <div class="text-sm opacity-90 mt-1">= $${(state.points / 100).toFixed(2)} in rewards</div>
            </div>
          </div>

          <div class="space-y-3">
            ${rewards.map(reward => {
              const canAfford = state.points >= reward.cost;
              return `
                <div class="bg-white rounded-lg p-4 shadow ${canAfford ? 'hover:shadow-md transition-shadow cursor-pointer' : 'opacity-60'}"
                     ${canAfford ? `onclick="redeemReward(${reward.id})"` : ''}>
                  <div class="flex items-center gap-4">
                    <div class="text-5xl">${reward.image}</div>
                    <div class="flex-1">
                      <h3 class="font-bold text-lg">${reward.name}</h3>
                      <p class="text-sm text-gray-600">${reward.partner}</p>
                      <div class="mt-2 flex items-center justify-between">
                        <span class="font-bold text-green-600">${reward.cost} points</span>
                        ${canAfford ? 
                          '<span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Available</span>' :
                          '<span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Need more points</span>'
                        }
                      </div>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    // Helper Functions
    function getAvatarDisplay() {
      let avatar = '👤';
      
      // Build avatar based on customization
      const skinTones = {
        'light': '👶🏻',
        'medium-light': '👶🏼',
        'medium': '👶🏽',
        'medium-dark': '👶🏾',
        'dark': '👶🏿'
      };
      
      avatar = skinTones[state.avatar.skin] || '👶';
      
      // Add hat if selected
      if (state.avatar.hat !== 'none') {
        avatar += getHatEmoji(state.avatar.hat);
      }
      
      return avatar;
    }

    function getHatEmoji(hat) {
      switch(hat) {
        case 'cap':
          return '🧢';
        case 'beanie':
          return '🎿';
        case 'ranger':
          return '🧢';
        default:
          return '';
      }
    }

    function getSkinColor(tone) {
      const colors = {
        'light': '#FFE0BD',
        'medium-light': '#F1C27D',
        'medium': '#E0AC69',
        'medium-dark': '#C68642',
        'dark': '#8D5524'
      };
      return colors[tone] || colors.light;
    }

    function getHairColor(color) {
      const colors = {
        'brown': '#6B4423',
        'blonde': '#F4D03F',
        'black': '#1C1C1C',
        'red': '#C1440E',
        'gray': '#A9A9A9'
      };
      return colors[color] || colors.brown;
    }

    function updateAvatar(category, value) {
      state.avatar[category] = value;
      saveState();
      navigateTo('profile'); // Refresh the page
    }

    function simulateCheckIn() {
      // Simulate checking in at a random location
      const location = locations[Math.floor(Math.random() * locations.length)];
      const points = location.points;
      
      // Add points
      state.points += points;
      state.totalCheckIns++;
      
      // Add check-in to history
      state.checkIns.push({
        location: location.name,
        points: points,
        date: new Date().toLocaleDateString()
      });

      // Check for level up
      if (state.points >= state.level * 100) {
        state.level++;
        showNotification(`🎉 Level Up! You're now Level ${state.level}!`);
      }

      // Check for badges
      if (state.totalCheckIns === 1 && !state.badges.includes('first-steps')) {
        state.badges.push('first-steps');
        showNotification('🏆 Badge Unlocked: First Steps!');
      }

      saveState();
      updatePointsDisplay();
      showNotification(`✅ Checked in at ${location.name}! +${points} points`);
      
      setTimeout(() => navigateTo('check-in'), 1500);
    }

    function redeemReward(rewardId) {
      const reward = rewards.find(r => r.id === rewardId);
      if (!reward) return;

      if (state.points >= reward.cost) {
        if (confirm(`Redeem ${reward.name} for ${reward.cost} points?`)) {
          state.points -= reward.cost;
          saveState();
          updatePointsDisplay();
          showNotification(`🎉 Redeemed: ${reward.name}!`);
          navigateTo('rewards');
        }
      }
    }

    function viewLocation(locationId) {
      const location = locations.find(l => l.id === locationId);
      alert(`${location.name}\n\nType: ${location.type}\nTown: ${location.town}\nDifficulty: ${location.difficulty}\nPoints: ${location.points}\n\n(Full location details coming soon!)`);
    }

    function updatePointsDisplay() {
      document.getElementById('points-display').textContent = state.points;
    }

    function showNotification(message) {
      const notification = document.createElement('div');
      notification.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
      notification.textContent = message;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }

    // State Management
    function saveState() {
      localStorage.setItem('outdoorAppState', JSON.stringify(state));
    }

    function loadState() {
      const saved = localStorage.getItem('outdoorAppState');
      if (saved) {
        state = JSON.parse(saved);
      }
    }

    // Initialize app when page loads
    init();
  </script>

  <style>
    @keyframes fade-in {
      from {
        opacity: 0;
        transform: translate(-50%, -20px);
      }
      to {
        opacity: 1;
        transform: translate(-50%, 0);
      }
    }
    .animate-fade-in {
      animation: fade-in 0.3s ease-out;
    }
  </style>
</body>
</html>
```

This is the complete, updated code with the ranger hat changed to a baseball cap (🧢). You can paste this directly into your GitHub repository file!
