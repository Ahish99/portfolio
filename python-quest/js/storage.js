// Player Data Storage
const STORAGE_KEY = 'python_quest_data';

class PlayerStorage {
    constructor() {
        this.data = this.load();
    }
    
    load() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (e) {
            console.error('Failed to load data:', e);
        }
        return this.getDefaultData();
    }
    
    getDefaultData() {
        return {
            username: 'Python Wizard',
            totalXP: 0,
            level: 1,
            completedChallenges: [],
            currentWorld: 1,
            currentChallenge: 0,
            achievements: [],
            stats: {
                totalAttempts: 0,
                totalSuccesses: 0,
                totalFailures: 0,
                hintsUsed: 0,
                perfectRuns: 0,
                worldsCompleted: 0
            },
            startedAt: new Date().toISOString(),
            lastPlayedAt: new Date().toISOString()
        };
    }
    
    save() {
        try {
            this.data.lastPlayedAt = new Date().toISOString();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
        } catch (e) {
            console.error('Failed to save:', e);
        }
    }
    
    reset() {
        this.data = this.getDefaultData();
        this.save();
    }
    
    // XP and Level
    addXP(amount) {
        this.data.totalXP += amount;
        const newLevel = calculateLevel(this.data.totalXP);
        const leveledUp = newLevel > this.data.level;
        this.data.level = newLevel;
        this.save();
        return { leveledUp, newLevel, totalXP: this.data.totalXP };
    }
    
    // Challenge completion
    completeChallenge(challengeId) {
        if (!this.data.completedChallenges.includes(challengeId)) {
            this.data.completedChallenges.push(challengeId);
            this.data.stats.totalSuccesses++;
            this.save();
        }
    }
    
    isChallengeCompleted(challengeId) {
        return this.data.completedChallenges.includes(challengeId);
    }
    
    // World progress
    getCurrentWorld() {
        return this.data.currentWorld;
    }
    
    setCurrentWorld(worldId) {
        this.data.currentWorld = worldId;
        this.save();
    }
    
    getCurrentChallenge() {
        return this.data.currentChallenge;
    }
    
    setCurrentChallenge(index) {
        this.data.currentChallenge = index;
        this.save();
    }
    
    // Stats
    recordAttempt(success) {
        this.data.stats.totalAttempts++;
        if (success) {
            this.data.stats.totalSuccesses++;
        } else {
            this.data.stats.totalFailures++;
        }
        this.save();
    }
    
    useHint() {
        this.data.stats.hintsUsed++;
        this.save();
    }
    
    recordPerfectRun() {
        this.data.stats.perfectRuns++;
        this.save();
    }
    
    completeWorld() {
        this.data.stats.worldsCompleted++;
        this.save();
    }
    
    // Achievements
    unlockAchievement(achievementId) {
        if (!this.data.achievements.includes(achievementId)) {
            this.data.achievements.push(achievementId);
            this.save();
            return true;
        }
        return false;
    }
    
    hasAchievement(achievementId) {
        return this.data.achievements.includes(achievementId);
    }
    
    // World completion check
    isWorldUnlocked(worldId) {
        if (worldId === 1) return true;
        // World N is unlocked when all challenges in World N-1 are complete
        const prevWorld = getWorld(worldId - 1);
        if (!prevWorld) return false;
        return prevWorld.challenges.every(c => 
            this.data.completedChallenges.includes(c.id)
        );
    }
    
    isWorldCompleted(worldId) {
        const world = getWorld(worldId);
        if (!world) return false;
        return world.challenges.every(c => 
            this.data.completedChallenges.includes(c.id)
        );
    }
    
    getWorldProgress(worldId) {
        const world = getWorld(worldId);
        if (!world) return 0;
        const completed = this.data.completedChallenges.filter(id => 
            id.startsWith(worldId + '-')
        ).length;
        return Math.round((completed / world.challenges.length) * 100);
    }
}

// Initialize player
const player = new PlayerStorage();

// Helper to export player data
function exportProgress() {
    return player.data;
}

// Reset all progress
function resetProgress() {
    player.reset();
    location.reload();
}
