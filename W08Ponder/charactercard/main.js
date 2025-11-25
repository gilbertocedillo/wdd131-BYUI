/**
 * 1. Character Card Object
 */
const characterCard = {
    // Properties updated to match the target image
    name: "Snortleblat",
    class: "Swamp Beast Diplomat",
    level: 0, // Initial Level set to 8
    health: 100, // Initial Health set to 0 (Character is dead/defeated)
    image: "./imag/snortleblat.png", 

    // Method to handle character being attacked
    attacked: function() {
        if (this.health <= 0) {
            alert(`${this.name} is already defeated!`);
            return; 
        }

        this.health -= 20;
        if (this.health < 0) this.health = 0;

        updateCardDisplay(this);

        if (this.health === 0) {
            alert(`${this.name} has been defeated!`);
            document.getElementById('character-name').textContent = `${this.name}`;
            document.getElementById('attack-button').disabled = true;
            document.getElementById('level-up-button').disabled = true;
        }
    },

    // Method to handle character leveling up
    levelUp: function() {
        if (this.health > 0) {
            this.level += 1;
            updateCardDisplay(this);
        } else {
            alert(`Cannot level up. ${this.name} is defeated.`);
        }
    }
};

/**
 * 2. DOM Update Function
 */
function updateCardDisplay(character) {
    document.getElementById('character-name').textContent = character.name;
    document.getElementById('character-class').textContent = character.class;
    document.getElementById('character-level').textContent = character.level;
    document.getElementById('character-health').textContent = character.health;
    document.getElementById('character-image').src = character.image; 
}


/**
 * 3. Initialization and Event Listeners
 */
document.addEventListener('DOMContentLoaded', () => {
    // Show initial stats (Level 8, Health 0)
    updateCardDisplay(characterCard);

    // If health is 0 on load, disable buttons immediately
    if (characterCard.health === 0) {
        document.getElementById('attack-button').disabled = true;
        document.getElementById('level-up-button').disabled = true;
    }

    // Connect methods to buttons
    document.getElementById('attack-button').addEventListener('click', () => {
        characterCard.attacked();
    });

    document.getElementById('level-up-button').addEventListener('click', () => {
        characterCard.levelUp();
    });
});