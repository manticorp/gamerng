const rng = new GameRng();

class Monster {
  id;
  hp;
  attack = '1d4';
  constructor ({ id, hp, attack }) {
    this.id = id;
    this.hp = hp;
    this.attack = attack;
  }

  damage (rng) {
    return rng.chancyInt(this.attack);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  let monster;

  const btnContainer = document.getElementById('button-container');
  const outputContainer = document.getElementById('output-container');
  const atk = document.getElementById('attack');

  function monsterFactory (def) {
    return new Monster({
      id: def.id,
      hp: rng.chancyInt(def.hp),
      attack: def.attack
    });
  }

  const monsterDict = await fetch('resources/monsters.json')
    .then(a => a.json())
    .then(arr => arr.reduce((obj, item) => (obj[item.id] = item, obj), {})); // maps an array by subitem's id

  atk.onclick = () => {
    const r = monster.damage(rng);
    outputContainer.innerHTML += `<div>${monster.id} attacked for ${r}</div>`;
  };

  for (const [key, def] of Object.entries(monsterDict)) {
    const btn = document.createElement('button');
    btn.onclick = () => {
      monster = monsterFactory(def);
      console.log(monster);
      outputContainer.innerHTML = `<div>${JSON.stringify(monster)}</div>`;
      atk.innerText = `Attack with ${monster.id}`;
      atk.style.display = '';
    };
    btn.innerText = `Create ${key}`;
    btnContainer.appendChild(btn);
  }
});
