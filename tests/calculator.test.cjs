const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const context = vm.createContext({
  document: { querySelector: () => ({}), querySelectorAll: () => [] },
  Intl,
});
vm.runInContext(source.split('document.querySelector("#reset-btn").addEventListener')[0], context);
const run = (expression) => vm.runInContext(expression, context);

test('documented comparison retains its default result', () => {
  const total = run(`compute({...DEFAULTS, focus:'Carb Block', soil:'Poor', area:10,
    includeCarbon:false, includeBiodiversity:false, includeBiomass:false}).total`);
  assert.ok(Math.abs(total - (-127.36272587401172)) < 1e-9);
});

test('custom land cost changes only the land component across all model scenarios', () => {
  run(`for (const location of LOCATIONS) for (const soil of SOIL_OPTIONS)
    for (const focus of FOCUS_OPTIONS) for (const area of AREA_OPTIONS) {
      const inputs = {...DEFAULTS, location, soil, focus, area};
      const model = compute(inputs);
      for (const custom of [0, 75, 200]) {
        const changed = compute({...inputs, useCustomLandOpportunityCost:true, landOpportunityCostOverride:custom});
        if (changed.rows[0][1] !== -custom) throw Error('Wrong custom land cost');
        for (let i=1;i<model.rows.length;i++) {
          if (changed.rows[i][1] !== model.rows[i][1]) throw Error('Another component changed');
        }
        if (Math.abs(changed.total - (model.total + modelLandOpportunityCost(inputs) - custom)) > 1e-8) {
          throw Error('Wrong total adjustment');
        }
      }
    }`);
});

test('switching off an override restores the model estimate', () => {
  assert.equal(run(`lookupLand({...DEFAULTS, useCustomLandOpportunityCost:false, landOpportunityCostOverride:999})`), run('lookupLand(DEFAULTS)'));
});

test('zero is valid; missing, negative and infinite custom costs are rejected', () => {
  assert.equal(run(`validate({...DEFAULTS,useCustomLandOpportunityCost:true,landOpportunityCostOverride:0})`), '');
  for (const value of ['NaN', '-1', 'Infinity']) {
    assert.match(run(`validate({...DEFAULTS,useCustomLandOpportunityCost:true,landOpportunityCostOverride:${value}})`), /annual land opportunity cost/);
  }
});

test('entered standard carbon price respects each scenario multiplier', () => {
  for (const [scenario, expected] of [['Standard', 60], ['Low (-50%)', 30], ['High (+50%)', 90]]) {
    assert.equal(run(`carbonPrice({...DEFAULTS,carbonPriceBase:60,carbonPriceScenario:${JSON.stringify(scenario)}})`), expected);
  }
});

test('negative prices and biodiversity values are rejected', () => {
  for (const field of ['carbonPriceBase','biomassPriceBase','biodiversityValueCarbBlock']) {
    assert.match(run(`validate({...DEFAULTS,${field}:-1})`), /Prices and biodiversity values/);
  }
});
