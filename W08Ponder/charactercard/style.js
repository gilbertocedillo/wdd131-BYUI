// Function to update the DOM with the character's current stats
function updateCardDisplay(character) {
    document.getElementById('character-name').textContent = character.name;
    document.getElementById('character-class').textContent = character.class;
    document.getElementById('character-level').textContent = character.level;
    document.getElementById('character-health').textContent = character.health;
    document.getElementById('character-image').src = character.image;
}

// 1. Create a character card with properties and methods (The Character Object)
const characterCard = {
    // Properties
    name: "Astra, The Starlight Rogue",
    class: "Rogue",
    level: 1,
    health: 100,
    // Note: Replaced with a placeholder image URL. You can use the one from the example.
    image: "https://placehold.co/400x200/5d747b/white?text=Astra", 

    // Methods
    /**
     * Subtracts 20 from the health property. 
     * If health reaches 0 or below, it logs that the character has died.
     */
    attacked: function() {
        if (this.health > 0) {
            // Subtract 20 from health
            this.health -= 20;
            
            // Ensure health doesn't go below 0 for display purposes
            if (this.health < 0) {
                this.health = 0;
            }

            // Update the display
            updateCardDisplay(this);

            // Check for death condition
            if (this.health === 0) {
                console.log(`${this.name} has died.`);
                document.getElementById('character-name').textContent = `${this.name} (DECEASED)`;
                // Optionally disable buttons when dead
                document.getElementById('attack-button').disabled = true;
                document.getElementById('level-up-button').disabled = true;
                alert(`${this.name}'s health has reached 0. The character has died!`);
            } else {
                console.log(`${this.name} was attacked! Health is now ${this.health}.`);
            }
        } else {
            console.log(`${this.name} is already dead.`);
        }
    },

    /**
     * Adds 1 to the level property value.
     */
    levelUp: function() {
        if (this.health > 0) {
            this.level += 1;
            console.log(`${this.name} leveled up! New level: ${this.level}`);
            // Update the display
            updateCardDisplay(this);
        } else {
            console.log(`Cannot level up. ${this.name} is dead.`);
        }
    }
};


// 2. Initial setup and event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initial display of the character stats
    updateCardDisplay(characterCard);

    // Attach event listeners to the buttons
    document.getElementById('attack-button').addEventListener('click', () => {
        characterCard.attacked();
    });

    document.getElementById('level-up-button').addEventListener('click', () => {
        characterCard.levelUp();
    });
});