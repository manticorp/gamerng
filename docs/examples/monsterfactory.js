const rng = new GameRng();

/**
 * Our generic "Monster" class.
 */
class Monster {
  id;
  title;
  name;
  hp;
  attack = '1d4';
  constructor ({ id, hp, attack, title, name }) {
    this.id = id;
    this.hp = hp;
    this.attack = attack;
    this.name = name;
    this.title = title;
  }

  damage (rng) {
    return rng.chancyInt(this.attack);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  // Holds the currently selected / created monster
  let monster;

  // Set up our DOM elements
  const btnContainer = document.getElementById('button-container');
  const outputContainer = document.getElementById('output-container');
  const atkButton = document.getElementById('attack');

  // A monster factory - creates a new Monster instance with a given definition
  function monsterFactory (def) {
    return new Monster({
      id: def.id,
      title: def.title,
      name: Array.isArray(def.name) ? rng.chancy(def.name) : def.name,
      hp: rng.chancyInt(def.hp),
      attack: def.attack
    });
  }

  // Load our monsters from our json definitions file.
  const monsterDict = await fetch('resources/monsters.json')
    .then(a => a.json())
    .then(arr => arr.reduce((obj, item) => (obj[item.id] = item, obj), {})); // maps an array by subitem's id

  // When the attack button is clicked, call the monster's 'damage' function.
  atkButton.onclick = () => {
    const r = monster.damage(rng);

    // Show the resulting damage
    outputContainer.innerHTML += `<div>${monster.name} the ${monster.title} attacked for ${r}</div>`;
  };

  // For each of our monsters, we will create a button
  for (const [key, def] of Object.entries(monsterDict)) {
    const btn = document.createElement('button');

    // When the button is clicked, we use out monsterFactory to create that monster
    btn.onclick = () => {
      monster = monsterFactory(def);

      // Check the console!
      console.log(monster);

      // Show the monster in our output
      outputContainer.innerHTML = `<div>${JSON.stringify(monster)}</div>`;

      // Chance the attack button to have a monster name
      atkButton.innerText = `Attack with ${monster.title} "${monster.name}"`;
      atkButton.style.display = '';
    };

    btn.id = `create-${key}`;
    btn.innerText = `Create ${def.title}`;
    btnContainer.appendChild(btn);
  }
});
