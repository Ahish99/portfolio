// Python Quest Challenges Database
const WORLDS = [
    {
        id: 1,
        name: "Forest of Beginnings",
        icon: "🌲",
        description: "Learn the basics of Python",
        color: "#2ecc71",
        challenges: [
            {
                id: "1-1",
                title: "Your First Spell",
                narrative: "Welcome, young wizard! The forest is dark. Cast the ancient spell 'Hello, World!' to light up the path.",
                task: 'print("Hello, World!")',
                expectedOutput: "Hello, World!",
                hint: 'Use the print() function with text inside quotes. Remember: "text"',
                xp: 50,
                type: "output"
            },
            {
                id: "1-2",
                title: "Name Your Hero",
                narrative: "The forest spirit asks: What is your name, brave adventurer? Use variables to store your name!",
                task: 'name = "Python Wizard"\nprint(name)',
                expectedOutput: "Python Wizard",
                hint: 'Create a variable with name = "Your Name", then print it',
                xp: 60,
                type: "output"
            },
            {
                id: "1-3",
                title: "Magic Numbers",
                narrative: "The ancient tome contains numbers. Calculate 15 + 27 using variables!",
                task: 'a = 15\nb = 27\nprint(a + b)',
                expectedOutput: "42",
                hint: 'Store numbers in variables and add them with +',
                xp: 70,
                type: "output"
            },
            {
                id: "1-4",
                title: "String Magic",
                narrative: "Combine two strings: "Hello" and "Python" to create "Hello Python"!",
                task: 'greeting = "Hello"\nlanguage = "Python"\nprint(greeting + " " + language)',
                expectedOutput: "Hello Python",
                hint: 'Use + to join strings. Add " " for space between words!',
                xp: 80,
                type: "output"
            },
            {
                id: "1-5",
                title: "First Boss: The Gatekeeper",
                narrative: "The Forest Gatekeeper challenges you! Print your level (a number) and your title (a string) on separate lines!",
                task: 'level = 1\ntitle = "Novice Wizard"\nprint(level)\nprint(title)',
                expectedOutput: "1\nNovice Wizard",
                hint: 'Use two print() statements - one for the number, one for the string',
                xp: 100,
                type: "output"
            }
        ]
    },
    {
        id: 2,
        name: "Cave of Conditions",
        icon: "🕳️",
        description: "Master if/else logic",
        color: "#9b59b6",
        challenges: [
            {
                id: "2-1",
                title: "The Door Test",
                narrative: "A magical door opens only if you say the password: 'open'. Write code that prints 'Access Granted' if password equals 'open'!",
                task: 'password = "open"\nif password == "open":\n    print("Access Granted")',
                expectedOutput: "Access Granted",
                hint: 'Use if statement: if variable == "value":',
                xp: 80,
                type: "output"
            },
            {
                id: "2-2",
                title: "Age Check",
                narrative: "The tavern requires visitors to be 18 or older. Check if age = 20 and print 'Welcome!' if true!",
                task: 'age = 20\nif age >= 18:\n    print("Welcome!")',
                expectedOutput: "Welcome!",
                hint: 'Use >= for "greater than or equal to" comparison',
                xp: 80,
                type: "output"
            },
            {
                id: "2-3",
                title: "The Choice Path",
                narrative: "At the crossroads, you must choose! If x = 5, print 'Left Path'. Otherwise, print 'Right Path'!",
                task: 'x = 5\nif x == 5:\n    print("Left Path")\nelse:\n    print("Right Path")',
                expectedOutput: "Left Path",
                hint: 'Use if/else structure to handle both cases',
                xp: 90,
                type: "output"
            },
            {
                id: "2-4",
                title: "Grade Calculator",
                narrative: "The wizard school grades students. If score >= 90, print 'A'. Else if >= 80, print 'B'. Else print 'C'!",
                task: 'score = 85\nif score >= 90:\n    print("A")\nelif score >= 80:\n    print("B")\nelse:\n    print("C")',
                expectedOutput: "B",
                hint: 'Use if/elif/else for multiple conditions',
                xp: 100,
                type: "output"
            },
            {
                id: "2-5",
                title: "Boss: The Guardian",
                narrative: "The Guardian asks: Is 100 divided by 2 equal to 50 AND is 5 > 3? Print 'Yes' if BOTH are true!",
                task: 'if 100 / 2 == 50 and 5 > 3:\n    print("Yes")',
                expectedOutput: "Yes",
                hint: 'Use "and" to check if BOTH conditions are true',
                xp: 120,
                type: "output"
            }
        ]
    },
    {
        id: 3,
        name: "Tower of Loops",
        icon: "🗼",
        description: "Conquer for and while loops",
        color: "#3498db",
        challenges: [
            {
                id: "3-1",
                title: "Count to Five",
                narrative: "The tower stairs must be counted! Use a for loop to print numbers 1 to 5, each on a new line!",
                task: 'for i in range(1, 6):\n    print(i)',
                expectedOutput: "1\n2\n3\n4\n5",
                hint: 'range(1, 6) gives numbers 1, 2, 3, 4, 5',
                xp: 80,
                type: "output"
            },
            {
                id: "3-2",
                title: "Spell Casting",
                narrative: "Cast the healing spell 3 times! Use a for loop to print "Healing!" three times!",
                task: 'for _ in range(3):\n    print("Healing!")',
                expectedOutput: "Healing!\nHealing!\nHealing!",
                hint: 'range(3) repeats the loop 3 times. _ is used when we do not need the loop variable.',
                xp: 80,
                type: "output"
            },
            {
                id: "3-3",
                title: "Summation Magic",
                narrative: "Calculate the sum of numbers 1 to 10 using a loop and print the result!",
                task: 'total = 0\nfor i in range(1, 11):\n    total = total + i\nprint(total)',
                expectedOutput: "55",
                hint: 'Start with total = 0, add each number to it in the loop',
                xp: 100,
                type: "output"
            },
            {
                id: "3-4",
                title: "Array Attack",
                narrative: "You have an array of spells: ["Fire", "Ice", "Lightning"]. Print each spell!",
                task: 'spells = ["Fire", "Ice", "Lightning"]\nfor spell in spells:\n    print(spell)',
                expectedOutput: "Fire\nIce\nLightning",
                hint: 'Use "for spell in spells:" to iterate through the list',
                xp: 100,
                type: "output"
            },
            {
                id: "3-5",
                title: "Boss: Infinite Maze",
                narrative: "Use a while loop to count from 1 to 3. Start with i = 1 and increment by 1 each time!",
                task: 'i = 1\nwhile i <= 3:\n    print(i)\n    i = i + 1',
                expectedOutput: "1\n2\n3",
                hint: 'while i <= 3: keeps looping until i becomes 4. Remember to increment i!',
                xp: 120,
                type: "output"
            }
        ]
    },
    {
        id: 4,
        name: "Library of Lists",
        icon: "📚",
        description: "Master lists and dictionaries",
        color: "#e67e22",
        challenges: [
            {
                id: "4-1",
                title: "Create Your Party",
                narrative: "Assemble your adventuring party! Create a list with 3 heroes: "Warrior", "Mage", "Rogue" and print it!",
                task: 'party = ["Warrior", "Mage", "Rogue"]\nprint(party)',
                expectedOutput: "['Warrior', 'Mage', 'Rogue']",
                hint: 'Lists are created with square brackets [] and items separated by commas',
                xp: 80,
                type: "output"
            },
            {
                id: "4-2",
                title: "Access the Treasure",
                narrative: "Get the first item from the inventory list ["Sword", "Shield", "Potion"]. Remember, counting starts at 0!",
                task: 'inventory = ["Sword", "Shield", "Potion"]\nprint(inventory[0])',
                expectedOutput: "Sword",
                hint: 'Use inventory[0] for the FIRST item (index starts at 0!)',
                xp: 80,
                type: "output"
            },
            {
                id: "4-3",
                title: "List Manipulation",
                narrative: "Add "Gold" to the end of treasures list ["Diamond", "Ruby"] and print the result!",
                task: 'treasures = ["Diamond", "Ruby"]\ntreasures.append("Gold")\nprint(treasures)',
                expectedOutput: "['Diamond', 'Ruby', 'Gold']",
                hint: 'Use .append() to add an item to the end of a list',
                xp: 90,
                type: "output"
            },
            {
                id: "4-4",
                title: "Dictionary of Powers",
                narrative: "Create a dictionary hero with "name": "Arthas" and "level": 10. Print the level!",
                task: 'hero = {"name": "Arthas", "level": 10}\nprint(hero["level"])',
                expectedOutput: "10",
                hint: 'Dictionaries use key-value pairs. Access with dict["key"]',
                xp: 100,
                type: "output"
            },
            {
                id: "4-5",
                title: "Boss: The Archivist",
                narrative: "Loop through this dictionary and print each key and value: {"hp": 100, "mp": 50}!",
                task: 'stats = {"hp": 100, "mp": 50}\nfor key in stats:\n    print(key, stats[key])',
                expectedOutput: "hp 100\nmp 50",
                hint: 'Use "for key in dict:" and access values with dict[key]',
                xp: 120,
                type: "output"
            }
        ]
    },
    {
        id: 5,
        name: "Temple of Functions",
        icon: "🏛️",
        description: "Learn to create reusable code",
        color: "#1abc9c",
        challenges: [
            {
                id: "5-1",
                title: "Simple Function",
                narrative: "Create a function called greet that prints "Welcome, Hero!" and then call it!",
                task: 'def greet():\n    print("Welcome, Hero!")\n\ngreet()',
                expectedOutput: "Welcome, Hero!",
                hint: 'Use def function_name(): to define, then call with function_name()',
                xp: 90,
                type: "output"
            },
            {
                id: "5-2",
                title: "Function with Parameter",
                narrative: "Create a function greet_user(name) that prints "Hello, " + name. Call it with "Gandalf"!",
                task: 'def greet_user(name):\n    print("Hello, " + name)\n\ngreet_user("Gandalf")',
                expectedOutput: "Hello, Gandalf",
                hint: 'Parameters go inside the parentheses when defining the function',
                xp: 100,
                type: "output"
            },
            {
                id: "5-3",
                title: "Return Value",
                narrative: "Create a function add(a, b) that returns the sum. Call it with 5 and 3, and print the result!",
                task: 'def add(a, b):\n    return a + b\n\nresult = add(5, 3)\nprint(result)',
                expectedOutput: "8",
                hint: 'Use "return" to send a value back from the function',
                xp: 110,
                type: "output"
            },
            {
                id: "5-4",
                title: "Default Parameters",
                narrative: "Create a function power(base, exp=2) with default exp=2. Call it with power(3) and print!",
                task: 'def power(base, exp=2):\n    return base ** exp\n\nprint(power(3))',
                expectedOutput: "9",
                hint: 'Default parameters are used when no value is provided. ** means power (3² = 9)',
                xp: 120,
                type: "output"
            },
            {
                id: "5-5",
                title: "Boss: Magic Combiner",
                narrative: "Create a function apply_spell(spell, times) that prints the spell times times. Call with "Fire", 2!",
                task: 'def apply_spell(spell, times):\n    for _ in range(times):\n        print(spell)\n\napply_spell("Fire", 2)',
                expectedOutput: "Fire\nFire",
                hint: 'Combine a loop inside a function with a parameter',
                xp: 140,
                type: "output"
            }
        ]
    },
    {
        id: 6,
        name: "Castle of OOP",
        icon: "🏰",
        description: "Master Object-Oriented Programming",
        color: "#e74c3c",
        challenges: [
            {
                id: "6-1",
                title: "Create a Class",
                narrative: "Define a class Wizard with an __init__ that sets name to "Merlin". Create an object and print the name!",
                task: 'class Wizard:\n    def __init__(self, name):\n        self.name = name\n\nwizard = Wizard("Merlin")\nprint(wizard.name)',
                expectedOutput: "Merlin",
                hint: '__init__ is called when creating an object. self refers to the object itself.',
                xp: 120,
                type: "output"
            },
            {
                id: "6-2",
                title: "Add Methods",
                narrative: "Add a cast_spell() method to Wizard class that prints "Magic!". Create a wizard and call the method!",
                task: 'class Wizard:\n    def __init__(self, name):\n        self.name = name\n    def cast_spell(self):\n        print("Magic!")\n\nwizard = Wizard("Merlin")\nwizard.cast_spell()',
                expectedOutput: "Magic!",
                hint: 'Methods are functions inside a class. Always include self as first parameter!',
                xp: 130,
                type: "output"
            },
            {
                id: "6-3",
                title: "Inheritance",
                narrative: "Create a FireWizard class that inherits from Wizard. Override __init__ to add element="fire". Print the element!",
                task: 'class Wizard:\n    def __init__(self, name):\n        self.name = name\n\nclass FireWizard(Wizard):\n    def __init__(self, name):\n        super().__init__(name)\n        self.element = "fire"\n\nfw = FireWizard("Pyro")\nprint(fw.element)',
                expectedOutput: "fire",
                hint: 'Use super().__init__(name) to call the parent class constructor',
                xp: 140,
                type: "output"
            },
            {
                id: "6-4",
                title: "Encapsulation",
                narrative: "Create a BankAccount class with private _balance (set to 1000). Add get_balance() method. Print the balance!",
                task: 'class BankAccount:\n    def __init__(self):\n        self._balance = 1000\n    def get_balance(self):\n        return self._balance\n\naccount = BankAccount()\nprint(account.get_balance())',
                expectedOutput: "1000",
                hint: '_balance is a "private" attribute by convention. Use getter methods to access it.',
                xp: 150,
                type: "output"
            },
            {
                id: "6-5",
                title: "Boss: The Final Battle",
                narrative: "Create a Character class with name and hp. Create an attack() method that returns "attacks!". Create two characters and have them attack!",
                task: 'class Character:\n    def __init__(self, name, hp):\n        self.name = name\n        self.hp = hp\n    def attack(self):\n        return "attacks!"\n\nhero = Character("Hero", 100)\nvillain = Character("Villain", 80)\nprint(hero.name, hero.attack())\nprint(villain.name, villain.attack())',
                expectedOutput: "Hero attacks!\nVillain attacks!",
                hint: 'Objects can call their own methods. Each object has its own data.',
                xp: 200,
                type: "output"
            }
        ]
    }
];

// Get world by ID
function getWorld(worldId) {
    return WORLDS.find(w => w.id === worldId);
}

// Get challenge by ID
function getChallenge(worldId, challengeIndex) {
    const world = getWorld(worldId);
    if (world && world.challenges[challengeIndex]) {
        return world.challenges[challengeIndex];
    }
    return null;
}

// Get total challenges
function getTotalChallenges() {
    return WORLDS.reduce((sum, world) => sum + world.challenges.length, 0);
}

// Calculate total XP for completing a world
function getWorldTotalXP(worldId) {
    const world = getWorld(worldId);
    if (!world) return 0;
    return world.challenges.reduce((sum, c) => sum + c.xp, 0);
}

// Get world completion percentage
function getWorldProgress(playerData, worldId) {
    const world = getWorld(worldId);
    if (!world) return 0;
    const completed = playerData.completedChallenges.filter(id => 
        id.startsWith(worldId + '-')
    ).length;
    return Math.round((completed / world.challenges.length) * 100);
}

// Get player level based on total XP
function calculateLevel(totalXP) {
    // Level up every 500 XP
    return Math.floor(totalXP / 500) + 1;
}

// XP needed for next level
function XPForNextLevel(totalXP) {
    const currentLevel = calculateLevel(totalXP);
    const xpForCurrentLevel = (currentLevel - 1) * 500;
    return 500 - (totalXP - xpForCurrentLevel);
}
