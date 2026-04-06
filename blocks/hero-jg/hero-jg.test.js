/**
 * Unit tests for hero-jg cta-button-opacity logic.
 * Run with: node blocks/hero-jg/hero-jg.test.js
 *
 * Tests the opacity computation logic extracted from decorate() so it
 * can be verified without a browser DOM.
 */

/* eslint-disable no-console */
import assert from 'node:assert/strict';

// ─── Extracted logic (mirrors hero-jg.js exactly) ────────────────────────────

/**
 * Converts a raw authored opacity string (0–100) into a complete rgba() CSS
 * value for the CTA button background. Returns the value that would be set
 * on --hero-jg-cta-bg.
 *
 * @param {string|undefined} rawValue - the authored config value
 * @returns {string} complete rgba() string
 */
function computeCtaBg(rawValue) {
  const pct = parseFloat(rawValue);
  const opacity = Number.isNaN(pct) ? 0.24 : Math.min(1, Math.max(0, pct / 100));
  return `rgba(255, 255, 255, ${opacity})`;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed += 1;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(`    ${err.message}`);
    failed += 1;
  }
}

console.log('\nhero-jg › cta-button-opacity\n');

test('default (undefined) → 24% opacity', () => {
  assert.equal(computeCtaBg(undefined), 'rgba(255, 255, 255, 0.24)');
});

test('empty string → 24% opacity', () => {
  assert.equal(computeCtaBg(''), 'rgba(255, 255, 255, 0.24)');
});

test('non-numeric string → 24% opacity', () => {
  assert.equal(computeCtaBg('abc'), 'rgba(255, 255, 255, 0.24)');
});

test('0 → fully transparent (0 opacity)', () => {
  assert.equal(computeCtaBg('0'), 'rgba(255, 255, 255, 0)');
});

test('50 → 50% opacity', () => {
  assert.equal(computeCtaBg('50'), 'rgba(255, 255, 255, 0.5)');
});

test('60 → 60% opacity', () => {
  assert.equal(computeCtaBg('60'), 'rgba(255, 255, 255, 0.6)');
});

test('100 → fully opaque (1.0 opacity)', () => {
  assert.equal(computeCtaBg('100'), 'rgba(255, 255, 255, 1)');
});

test('values above 100 clamp to 1', () => {
  assert.equal(computeCtaBg('150'), 'rgba(255, 255, 255, 1)');
});

test('negative values clamp to 0', () => {
  assert.equal(computeCtaBg('-10'), 'rgba(255, 255, 255, 0)');
});

test('decimal input (e.g. 24.5) works correctly', () => {
  assert.equal(computeCtaBg('24.5'), 'rgba(255, 255, 255, 0.245)');
});

test('output is always a complete rgba() string (no var() calls)', () => {
  const result = computeCtaBg('50');
  assert.ok(!result.includes('var('), 'should not contain var()');
  assert.ok(result.startsWith('rgba('), 'should start with rgba(');
});

// ─── Summary ─────────────────────────────────────────────────────────────────

console.log(`\n${passed} passed, ${failed} failed\n`);
if (failed > 0) process.exit(1);
