// Python Quest - Main Game Logic

// ===== Game State =====
let currentWorld = null;
let currentChallengeIndex = 0;
let currentHP = 3;
let totalChallenges = 0;

// ===== Screen Management =====
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) {
        target.classList.add('active');
        
        if (screenId === 'main-menu') {
            updateMainMenu();
        } else if (screenId === 'world-map') {
            renderWorldMap();
        } else if (screenId === 'leaderboard-screen') {
            renderLeaderboard();
        }
    }
}

// ===== Update Main Menu Stats =====
function updateMainMenu() {
    document.getElementById('menu-level').textContent = player.data.level;
    document.getElementById('menu-xp').textContent = player.data.totalXP;
    document.getElementById('menu-challenges').textContent = 
        player.data.completedChallenges.length;
    
    const continueBtn = document.getElementById('btn-continue');
    if (player.data.completedChallenges.length > 0) {
        continueBtn.style.display = 'block';
    } else {
        continueBtn.style.display = 'none';
    }
}

// ===== Render World Map =====
function renderWorldMap() {
    document.getElementById('map-level').textContent = player.data.level;
    document.getElementById('map-xp').textContent = player.data.totalXP;
    
    const container = document.getElementById('worlds-container');
    container.innerHTML = '';
    
    WORLDS.forEach((world, index) => {
        const isUnlocked = player.isWorldUnlocked(world.id);
        const isCompleted = player.isWorldCompleted(world.id);
        const progress = player.getWorldProgress(world.id);
        const challengesDone = player.data.completedChallenges.filter(id => 
            id.startsWith(world.id + '-')
        ).length;
        
        const card = document.createElement('div');
        card.className = 'world-card' + (isUnlocked ? '' : ' locked') + 
                         (isCompleted ? ' completed' : '');
        card.style.borderColor = isUnlocked ? world.color + '60' : 'rgba(255,255,255,0.1)';
        
        card.innerHTML = `
            <div class="world-header">
                <div class="world-icon">${world.icon}</div>
                <div class="world-info">
                    <h3>${world.name}</h3>
                    <p>${world.description}</p>
                </div>
            </div>
            <div class="world-status">
                ${isCompleted ? '🏆' : isUnlocked ? '⚔️' : '🔒'}
            </div>
            <div class="world-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%; 
                         background: linear-gradient(90deg, ${world.color}, ${world.color}cc);">
                    </div>
                </div>
                <div class="progress-text">${challengesDone}/${world.challenges.length} completed</div>
            </div>
        `;
        
        if (isUnlocked) {
            card.addEventListener('click', () => {
                startWorld(world.id);
            });
        }
        
        container.appendChild(card);
    });
}

// ===== Start a World =====
function startWorld(worldId) {
    currentWorld = getWorld(worldId);
    // Find first incomplete challenge
    for (let i = 0; i < currentWorld.challenges.length; i++) {
        if (!player.isChallengeCompleted(currentWorld.challenges[i].id)) {
            currentChallengeIndex = i;
            break;
        }
    }
    currentHP = 3;
    loadChallenge();
    showScreen('challenge-screen');
}

// ===== Load a Challenge =====
function loadChallenge() {
    const challenge = currentWorld.challenges[currentChallengeIndex];
    if (!challenge) {
        worldComplete();
        return;
    }
    
    document.getElementById('challenge-world-name').textContent = currentWorld.name;
    document.getElementById('challenge-number').textContent = 
        `${currentChallengeIndex + 1}/${currentWorld.challenges.length}`;
    
    document.getElementById('hp-hearts').textContent = '❤️'.repeat(currentHP);
    document.getElementById('narrative-text').textContent = challenge.narrative;
    document.getElementById('challenge-title').textContent = `⚔️ ${challenge.title}`;
    document.getElementById('challenge-description').textContent = challenge.task;
    document.getElementById('code-editor').value = '';
    document.getElementById('code-output').textContent = 'Run your code to see output here...';
    document.getElementById('code-output').classList.remove('error');
    document.getElementById('hint-text').style.display = 'none';
    document.getElementById('hint-text').textContent = challenge.hint;
    
    // Clear result overlay
    document.getElementById('result-overlay').classList.remove('active');
    
    // Auto-focus editor
    setTimeout(() => {
        document.getElementById('code-editor').focus();
    }, 300);
}

// ===== Show Hint =====
function showHint() {
    const hintText = document.getElementById('hint-text');
    if (hintText.style.display === 'none') {
        hintText.style.display = 'block';
        player.useHint();
    } else {
        hintText.style.display = 'none';
    }
}

// ===== Reset Code =====
function resetCode() {
    document.getElementById('code-editor').value = '';
    document.getElementById('code-output').textContent = 'Run your code to see output here...';
    document.getElementById('code-output').classList.remove('error');
}

// ===== Clear Output =====
function clearOutput() {
    document.getElementById('code-output').textContent = '';
}

// ===== Run Python Code with Skulpt =====
function runCode() {
    const code = document.getElementById('code-editor').value;
    const outputEl = document.getElementById('code-output');
    
    if (!code.trim()) {
        outputEl.textContent = 'Please write some code first!';
        outputEl.classList.add('error');
        return;
    }
    
    outputEl.textContent = 'Running...';
    outputEl.classList.remove('error');
    
    // Use Skulpt to run Python in browser
    Sk.configure({
        output: function(text) {
            outputEl.textContent += text + '\n';
        },
        read: function(x) {
            if (Sk.builtinFiles === undefined || Sk.builtinFiles['files'][x] === undefined) {
                throw "File not found: '" + x + "'";
            }
            return Sk.builtinFiles['files'][x];
        }
    });
    
    const promise = Sk.misceval.asyncToPromise(function() {
        return Sk.importMainWithBody("test", false, code, true);
    });
    
    promise.then(function(mod) {
        checkAnswer(outputEl.textContent);
    }).catch(function(err) {
        let errorMsg = err.toString();
        // Clean up the error message
        errorMsg = errorMsg.replace(/<[^>]*>/g, '');
        outputEl.textContent = '❌ Error: ' + errorMsg;
        outputEl.classList.add('error');
    });
}

// ===== Check Answer =====
function checkAnswer(userOutput) {
    const challenge = currentWorld.challenges[currentChallengeIndex];
    const expected = challenge.expectedOutput.trim();
    const actual = userOutput.replace('Running...\n', '').trim();
    
    player.recordAttempt(actual === expected);
    
    if (actual === expected) {
        // Success!
        showResult(true, challenge);
    } else {
        // Failed - lose HP
        currentHP--;
        document.getElementById('hp-hearts').textContent = '❤️'.repeat(Math.max(0, currentHP));
        
        if (currentHP <= 0) {
            // Game Over
            showResult(false, challenge, 'You ran out of HP! Try again.');
        } else {
            // Try again
            showResult(false, challenge, `Output doesn't match. ${currentHP} HP left. Try again!`);
        }
    }
}

// ===== Show Result =====
function showResult(success, challenge, customMessage) {
    const overlay = document.getElementById('result-overlay');
    const content = document.getElementById('result-content');
    
    if (success) {
        content.className = 'result-content success';
        content.innerHTML = `
            <div class="result-icon">🎉</div>
            <h2>Victory!</h2>
            <p class="result-message">Code executed successfully!</p>
            <div class="xp-gained">
                <span>+${challenge.xp} XP</span>
            </div>
            <button class="result-btn" onclick="nextChallenge()">Next Challenge →</button>
        `;
        
        // Record completion
        player.completeChallenge(challenge.id);
        const xpResult = player.addXP(challenge.xp);
        player.recordPerfectRun();
        
        // Check for level up
        if (xpResult.leveledUp) {
            setTimeout(() => {
                showAchievement(`Level Up! You are now level ${xpResult.newLevel}!`);
            }, 1500);
        }
        
        // Check achievements
        checkAchievements();
        
    } else {
        content.className = 'result-content error';
        content.innerHTML = `
            <div class="result-icon">💔</div>
            <h2>Not Quite!</h2>
            <p class="result-message">${customMessage || 'Output doesn\\'t match expected.'}</p>
            <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 20px;">
                Expected: <code style="background: rgba(0,0,0,0.3); padding: 2px 5px; border-radius: 3px;">${challenge.expectedOutput}</code>
            </p>
            <button class="result-btn" onclick="retryChallenge()">Try Again</button>
        `;
    }
    
    overlay.classList.add('active');
}

// ===== Next Challenge =====
function nextChallenge() {
    currentChallengeIndex++;
    if (currentChallengeIndex >= currentWorld.challenges.length) {
        worldComplete();
    } else {
        loadChallenge();
    }
}

// ===== Retry Challenge =====
function retryChallenge() {
    currentHP = 3;
    document.getElementById('result-overlay').classList.remove('active');
    document.getElementById('code-editor').value = '';
    document.getElementById('code-output').textContent = 'Run your code to see output here...';
    document.getElementById('code-output').classList.remove('error');
    document.getElementById('hp-hearts').textContent = '❤️❤️❤️';
    setTimeout(() => {
        document.getElementById('code-editor').focus();
    }, 100);
}

// ===== World Complete =====
function worldComplete() {
    player.completeWorld();
    const xpEarned = getWorldTotalXP(currentWorld.id);
    
    document.getElementById('reward-xp').textContent = `+${xpEarned} XP (across all challenges)`;
    document.getElementById('reward-unlock').textContent = 
        currentWorld.id < WORLDS.length ? 'Next World Unlocked' : 'All Worlds Complete!';
    
    document.getElementById('victory-message').textContent = 
        `You've mastered the ${currentWorld.name}!`;
    
    // Check world-specific achievements
    checkAchievements();
    
    showScreen('victory-screen');
}

// ===== Achievements =====
function checkAchievements() {
    const stats = player.data.stats;
    
    // First challenge
    if (player.data.completedChallenges.length === 1) {
        if (player.unlockAchievement('first-step')) {
            showAchievement('First Step - Complete your first challenge!');
        }
    }
    
    // 5 challenges
    if (player.data.completedChallenges.length === 5) {
        if (player.unlockAchievement('persistent')) {
            showAchievement('Persistent - Complete 5 challenges!');
        }
    }
    
    // World 1 complete
    if (player.isWorldCompleted(1) && player.unlockAchievement('forest-master')) {
        showAchievement('Forest Master - Complete World 1!');
    }
    
    // World 3 complete
    if (player.isWorldCompleted(3) && player.unlockAchievement('loop-wizard')) {
        showAchievement('Loop Wizard - Master loops!');
    }
    
    // World 5 complete
    if (player.isWorldCompleted(5) && player.unlockAchievement('function-master')) {
        showAchievement('Function Master - Master functions!');
    }
    
    // World 6 complete (final boss)
    if (player.isWorldCompleted(6) && player.unlockAchievement('oop-master')) {
        showAchievement('OOP Master - Complete the final challenge!');
    }
    
    // No hints used
    if (player.data.completedChallenges.length === 30 && stats.hintsUsed === 0) {
        if (player.unlockAchievement('no-hints')) {
            showAchievement('No Hints Needed - Completed all challenges without hints!');
        }
    }
    
    // Level 5
    if (player.data.level >= 5 && player.unlockAchievement('level-5')) {
        showAchievement('Level 5 Reached!');
    }
    
    // Level 10
    if (player.data.level >= 10 && player.unlockAchievement('level-10')) {
        showAchievement('Level 10 - True Python Master!');
    }
}

// ===== Show Achievement Toast =====
function showAchievement(message) {
    const toast = document.getElementById('achievement-toast');
    toast.querySelector('.achievement-text').textContent = message;
    toast.style.display = 'flex';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// ===== Render Leaderboard =====
function renderLeaderboard() {
    const list = document.getElementById('leaderboard-list');
    const yourRank = document.getElementById('your-rank');
    const yourXP = document.getElementById('your-total-xp');
    
    // Mock leaderboard data (in real app, would fetch from server)
    const players = [
        { name: 'CodeNinja', xp: 12500, rank: 1 },
        { name: 'PythonPro', xp: 9800, rank: 2 },
        { name: 'DataWizard', xp: 7500, rank: 3 },
        { name: 'AlgoMaster', xp: 5200, rank: 4 },
        { name: 'DevGuru', xp: 4800, rank: 5 },
        { name: 'ByteCoder', xp: 4200, rank: 6 },
        { name: 'SyntaxHero', xp: 3500, rank: 7 },
        { name: 'LoopLord', xp: 2800, rank: 8 },
        { name: 'FuncKing', xp: 2100, rank: 9 },
        { name: 'VarViking', xp: 1500, rank: 10 }
    ];
    
    // Insert current player
    const playerXP = player.data.totalXP;
    const playerRank = players.filter(p => p.xp > playerXP).length + 1;
    players.push({ name: player.data.username + ' (You)', xp: playerXP, rank: playerRank, isYou: true });
    
    // Sort by XP
    players.sort((a, b) => b.xp - a.xp);
    players.forEach((p, i) => p.rank = i + 1);
    
    yourRank.textContent = playerRank;
    yourXP.textContent = playerXP;
    
    list.innerHTML = players.slice(0, 10).map(p => {
        let badge = '';
        if (p.rank === 1) badge = '🥇';
        else if (p.rank === 2) badge = '🥈';
        else if (p.rank === 3) badge = '🥉';
        else badge = '#' + p.rank;
        
        const rankClass = p.rank === 1 ? 'gold' : p.rank === 2 ? 'silver' : p.rank === 3 ? 'bronze' : '';
        const topClass = p.rank <= 3 ? 'top-' + p.rank : '';
        const youClass = p.isYou ? 'style="background: rgba(108, 92, 231, 0.2); border: 1px solid #6c5ce7;"' : '';
        
        return `
            <div class="leaderboard-item ${topClass}" ${youClass}>
                <span class="rank-badge ${rankClass}">${badge}</span>
                <span class="player-name">${p.name}</span>
                <span class="player-xp">${p.xp.toLocaleString()} XP</span>
            </div>
        `;
    }).join('');
}

// ===== Switch Leaderboard Tab =====
function switchLeaderboardTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    // In a real app, would switch between global/friends
    renderLeaderboard();
}

// ===== Update Line Count =====
document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('code-editor');
    if (editor) {
        editor.addEventListener('input', () => {
            const lines = editor.value.split('\n').length;
            document.getElementById('line-count').textContent = `Line ${lines}`;
        });
    }
    
    // Handle Enter key for indentation
    if (editor) {
        editor.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = editor.selectionStart;
                const end = editor.selectionEnd;
                editor.value = editor.value.substring(0, start) + '    ' + editor.value.substring(end);
                editor.selectionStart = editor.selectionEnd = start + 4;
            }
        });
    }
});

// ===== Event Listeners =====
document.getElementById('btn-new-game').addEventListener('click', () => {
    if (confirm('Start a new adventure? This will reset your progress!')) {
        player.reset();
        showScreen('world-map');
    }
});

document.getElementById('btn-continue').addEventListener('click', () => {
    showScreen('world-map');
});

document.getElementById('btn-leaderboard').addEventListener('click', () => {
    showScreen('leaderboard-screen');
});

// ===== Initialize Game =====
window.addEventListener('load', () => {
    setTimeout(() => {
        showScreen('main-menu');
    }, 2500);
});

// ===== Service Worker Registration =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(err => {
            console.log('Service worker registration failed:', err);
        });
    });
}
