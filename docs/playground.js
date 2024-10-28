const rng = new GameRng();

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('input').addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      let start = this.selectionStart;
      let end = this.selectionEnd;

      // Set textarea value to: text before caret + spaces + text after caret
      this.value = this.value.substring(0, start) + '  ' + this.value.substring(end); // 4 spaces

      // Move the caret to after the spaces
      this.selectionStart = this.selectionEnd = start + 2;
    }
  });
  function replot () {
    const econt = document.getElementById('error');
    const container = document.querySelector('#graph-container');
    const samples = document.getElementById('samples').value / 1;
    const argstr = document.getElementById('input').value.trim();
    const argstreval = `(() => {return ${argstr};})()`;
    econt.style.display = "none";
    econt.innerText = ``;

    console.log(argstreval);

    let args = eval(argstreval);

    if (!Array.isArray(args)) {
      args = [args];
    }

    const data = [];


    const callSigs = new Set();

    document.querySelector('#info').innerText = '';
    try {
      for (const argv of args) {
        const results = [];
        for (let i = 0; i < samples; i++) {
          results.push(rng.chancy(argv));
        }

        data.push({
          x: results,
          name: JSON.stringify(argv),
          type: 'histogram',
          opacity: 0.5
        });
        if (argv.type) {
          if (typeof rng[argv.type] === 'function') {
            const f = rng[argv.type].toString();
            const fl = f.substr(0, f.indexOf(')') + 1);
            callSigs.add(fl);
          }
        }
      }
    } catch (e) {
      econt.style.display = "block";
      econt.innerText = `${e}`;
    }

    document.querySelector('#info').innerHTML = `<p>${Array.from(callSigs).join('</p><p>')}</p>`;

    Plotly.newPlot(container, {
      data,
      layout: {
        title: `Chancy results`,
      }
    });
  }

  document.getElementById('run').onclick = replot;

  replot();
});
