const rng = new GameRng();

const diceMap = {
  1: '\u2680',
  2: '\u2681',
  3: '\u2682',
  4: '\u2683',
  5: '\u2684',
  6: '\u2685',
};

class Yahtzee {
  constructor () {
    this.reset();
  }

  get score () {
    return this.kept.reduce((a, b) => a + b, 0);
  }

  get numdie () {
    return 5 - this.kept.length;
  }

  reset () {
    this.dice = Array(5).fill(0);
    this.kept = [];
    this.rollsLeft = 3;
  }

  roll () {
    const r = rng.diceExpanded({ n: this.numdie, d: 6 });
    this.rollsLeft--;
    return r.dice;
  }

  keep (die) {
    if (this.kept.length < 5) {
      this.kept.push(die);
    }
  }

  unkeep (die) {
    this.kept.splice(this.kept.indexOf(die), 1);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  let highScore = 0;
  const game = new Yahtzee();

  const rollButton = document.getElementById('roll');
  const crContainer = document.getElementById('current-roll');
  const bankContainer = document.getElementById('bank');
  const score = document.getElementById('score');
  const hscore = document.getElementById('high-score');
  const finish = document.getElementById('finish');
  const rollsleft = document.getElementById('rollsleft');

  const refreshGame = () => {
    rollsleft.innerText = game.rollsLeft;
    bankContainer.innerHTML = game.kept.map(a => diceMap[a]).join('');
    score.innerText = game.score;
    if (game.kept.length >= 5) {
      finish.style.display = '';
    } else {
      finish.style.display = 'none';
    }
    if (game.rollsLeft === 0 && game.kept.length < 5) {
      rollButton.disabled = true;
    } else {
      rollButton.disabled = false;
    }
  };

  const finishGame = () => {
    crContainer.innerHTML = '';
    highScore = Math.max(game.score, highScore);
    hscore.innerText = highScore;
    game.reset();
    refreshGame();
  };

  let anim;
  let lastframe = 0;
  let animating = false;
  const diceanim = () => {
    const now = performance.now();
    const elapsed = (now - lastframe) / 1000;
    if (elapsed > (1 / 15)) {
      const d = Array(game.numdie).fill(0).map(a => rng.dice(1, 6)).map(a => diceMap[a]).join('');
      crContainer.classList.add('rolling');
      crContainer.innerHTML = d;
      lastframe = now;
    }
    if (animating) {
      anim = requestAnimationFrame(diceanim);
    }
  };

  finish.addEventListener('click', finishGame);

  rollButton.addEventListener('click', () => {
    if (game.kept.length === 5) {
      finishGame();
    }
    if (game.rollsLeft > 0) {
      const r = game.roll();

      animating = true;
      anim = requestAnimationFrame(diceanim);

      setTimeout(() => {
        crContainer.classList.remove('rolling');
        animating = false;
        cancelAnimationFrame(anim);
        crContainer.innerHTML = '';
        r.forEach(a => {
          const d = document.createElement('span');
          d.dataset.number = a;
          d.dataset.kept = false;
          d.classList.add('die');
          d.innerText = diceMap[a];
          d.onclick = () => {
            if (JSON.parse(d.dataset.kept)) {
              game.unkeep(a);
              d.classList.remove('kept');
              d.dataset.kept = false;
            } else {
              game.keep(a);
              d.classList.add('kept');
              d.dataset.kept = true;
            }
            refreshGame();
          };
          crContainer.appendChild(d);
          if (game.rollsLeft === 0) {
            d.click();
          }
        });
      }, 1000);
    } else {
      alert('No rolls left, please choose your remaining dice!');
    }
    refreshGame();
  });
});
