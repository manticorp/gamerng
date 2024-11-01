import Version, { SemVerInterface } from './../src/version';

const v = (r : string) => new Version(r);

describe('Testing Version', () => {
  test('instantiation with 3 elements', () => {
    const v = new Version(1, 0, 0);
    expect(v.major).toBe(1);
    expect(v.minor).toBe(0);
    expect(v.patch).toBe(0);
  });

  test('instantiation with 5 elements', () => {
    const v = new Version(5, 4, 3, 'a', 'b');
    expect(v.major).toBe(5);
    expect(v.minor).toBe(4);
    expect(v.patch).toBe(3);
    expect(v.prerelease).toBe('a');
    expect(v.build).toBe('b');
  });

  test('instantiation with 5 strings', () => {
    const v = new Version('5', '4', '3', 'a', 'b');
    expect(v.major).toBe(5);
    expect(v.minor).toBe(4);
    expect(v.patch).toBe(3);
    expect(v.prerelease).toBe('a');
    expect(v.build).toBe('b');
  });

  test('instantiation with 1 element, major 1 = 1.0.0', () => {
    const v = new Version(1);
    expect(v.major).toBe(1);
    expect(v.minor).toBe(0);
    expect(v.patch).toBe(0);
  });

  test('instantiation with 1 element, major 0 = 0.1.0', () => {
    const v = new Version(0);
    expect(v.major).toBe(0);
    expect(v.minor).toBe(1);
    expect(v.patch).toBe(0);
  });

  test('instantiation with object', () => {
    const v = new Version({ major: 2, minor: 1, patch: 0 });
    expect(v.major).toBe(2);
    expect(v.minor).toBe(1);
    expect(v.patch).toBe(0);
  });

  test('instantiation with object and string values', () => {
    const v = new Version({ major: '2', minor: '1', patch: '0' });
    expect(v.major).toBe(2);
    expect(v.minor).toBe(1);
    expect(v.patch).toBe(0);
  });

  test('instantiation with object and only minor is 0.1.0', () => {
    const v = new Version({ minor: 1 });
    expect(v.major).toBe(0);
    expect(v.minor).toBe(1);
    expect(v.patch).toBe(0);
  });

  test('instantiation with object and only major as 0 is 0.1.0', () => {
    const v = new Version({ major: 0 });
    expect(v.major).toBe(0);
    expect(v.minor).toBe(1);
    expect(v.patch).toBe(0);
  });

  test('instantiation with object and only major as 1 is 1.0.0', () => {
    const v = new Version({ major: 1 });
    expect(v.major).toBe(1);
    expect(v.minor).toBe(0);
    expect(v.patch).toBe(0);
  });

  test('plain', () => {
    const v = new Version(1, 0, 0).plain();
    expect(v.major).toBe(1);
    expect(v.minor).toBe(0);
    expect(v.patch).toBe(0);
  });

  const pairs : [string, SemVerInterface][] = [
    ['1.0.0', { major: 1, minor: 0, patch: 0 }],
    ['0.1.0', { major: 0, minor: 1, patch: 0 }],
    ['0.0.1', { major: 0, minor: 0, patch: 1 }],
    ['0.0.0', { major: 0, minor: 0, patch: 0 }],

    ['0.0.4', { major: 0, minor: 0, patch: 4, prerelease: undefined, build: undefined }],
    ['1.2.3', { major: 1, minor: 2, patch: 3, prerelease: undefined, build: undefined }],
    ['10.20.30', { major: 10, minor: 20, patch: 30, prerelease: undefined, build: undefined }],
    ['1.1.2-prerelease+meta', { major: 1, minor: 1, patch: 2, prerelease: 'prerelease', build: 'meta' }],
    ['1.1.2+meta', { major: 1, minor: 1, patch: 2, prerelease: undefined, build: 'meta' }],
    ['1.1.2+meta-valid', { major: 1, minor: 1, patch: 2, prerelease: undefined, build: 'meta-valid' }],
    ['1.0.0-alpha', { major: 1, minor: 0, patch: 0, prerelease: 'alpha', build: undefined }],
    ['1.0.0-beta', { major: 1, minor: 0, patch: 0, prerelease: 'beta', build: undefined }],
    ['1.0.0-alpha.beta', { major: 1, minor: 0, patch: 0, prerelease: 'alpha.beta', build: undefined }],
    ['1.0.0-alpha.beta.1', { major: 1, minor: 0, patch: 0, prerelease: 'alpha.beta.1', build: undefined }],
    ['1.0.0-alpha.1', { major: 1, minor: 0, patch: 0, prerelease: 'alpha.1', build: undefined }],
    ['1.0.0-alpha0.valid', { major: 1, minor: 0, patch: 0, prerelease: 'alpha0.valid', build: undefined }],
    ['1.0.0-alpha.0valid', { major: 1, minor: 0, patch: 0, prerelease: 'alpha.0valid', build: undefined }],
    ['1.0.0-alpha-a.b-c-somethinglong+build.1-aef.1-its-okay', { major: 1, minor: 0, patch: 0, prerelease: 'alpha-a.b-c-somethinglong', build: 'build.1-aef.1-its-okay' }],
    ['1.0.0-rc.1+build.1', { major: 1, minor: 0, patch: 0, prerelease: 'rc.1', build: 'build.1' }],
    ['2.0.0-rc.1+build.123', { major: 2, minor: 0, patch: 0, prerelease: 'rc.1', build: 'build.123' }],
    ['1.2.3-beta', { major: 1, minor: 2, patch: 3, prerelease: 'beta', build: undefined }],
    ['10.2.3-DEV-SNAPSHOT', { major: 10, minor: 2, patch: 3, prerelease: 'DEV-SNAPSHOT', build: undefined }],
    ['1.2.3-SNAPSHOT-123', { major: 1, minor: 2, patch: 3, prerelease: 'SNAPSHOT-123', build: undefined }],
    ['1.0.0', { major: 1, minor: 0, patch: 0, prerelease: undefined, build: undefined }],
    ['2.0.0', { major: 2, minor: 0, patch: 0, prerelease: undefined, build: undefined }],
    ['1.1.7', { major: 1, minor: 1, patch: 7, prerelease: undefined, build: undefined }],
    ['2.0.0+build.1848', { major: 2, minor: 0, patch: 0, prerelease: undefined, build: 'build.1848' }],
    ['2.0.1-alpha.1227', { major: 2, minor: 0, patch: 1, prerelease: 'alpha.1227', build: undefined }],
    ['1.0.0-alpha+beta', { major: 1, minor: 0, patch: 0, prerelease: 'alpha', build: 'beta' }],
    ['1.2.3----RC-SNAPSHOT.12.9.1--.12+788', { major: 1, minor: 2, patch: 3, prerelease: '---RC-SNAPSHOT.12.9.1--.12', build: '788' }],
    ['1.2.3----R-S.12.9.1--.12+meta', { major: 1, minor: 2, patch: 3, prerelease: '---R-S.12.9.1--.12', build: 'meta' }],
    ['1.2.3----RC-SNAPSHOT.12.9.1--.12', { major: 1, minor: 2, patch: 3, prerelease: '---RC-SNAPSHOT.12.9.1--.12', build: undefined }],
    ['1.0.0+0.build.1-rc.10000aaa-kk-0.1', { major: 1, minor: 0, patch: 0, prerelease: undefined, build: '0.build.1-rc.10000aaa-kk-0.1' }],
    // Until TypeScript and Javascript have better support for BigInt, we won't be supporting this.
    // ['99999999999999999999999.999999999999999999.99999999999999999', { major: 99999999999999999999999, minor: 999999999999999999, patch: 99999999999999999, prerelease: undefined, build: undefined }],
    ['1.0.0-0A.is.legal', { major: 1, minor: 0, patch: 0, prerelease: '0A.is.legal', build: undefined }],
  ];

  describe.each(pairs)('instantiation with string gets correct result', (string, expected : SemVerInterface) => {
    test(string, () => {
      const v = new Version(string);
      const pairs: [keyof SemVerInterface, string | number][] = Object.entries(expected) as [keyof SemVerInterface, string | number][];
      for (const [key, val] of pairs) {
        expect(v[key]).toEqual(val);
      }
      expect(v.toString()).toBe(string);
    });
  });

  const invalid : string[] = [
    '1',
    '1.2',
    '1.2.3-0123',
    '1.2.3-0123.0123',
    '1.1.2+.123',
    '+invalid',
    '-invalid',
    '-invalid+invalid',
    '-invalid.01',
    'alpha',
    'alpha.beta',
    'alpha.beta.1',
    'alpha.1',
    'alpha+beta',
    'alpha_beta',
    'alpha.',
    'alpha..',
    'beta',
    '1.0.0-alpha_beta',
    '-alpha.',
    '1.0.0-alpha..',
    '1.0.0-alpha..1',
    '1.0.0-alpha...1',
    '1.0.0-alpha....1',
    '1.0.0-alpha.....1',
    '1.0.0-alpha......1',
    '1.0.0-alpha.......1',
    '01.1.1',
    '1.01.1',
    '1.1.01',
    '1.2',
    '1.2.3.DEV',
    '1.2-SNAPSHOT',
    '1.2.31.2.3----RC-SNAPSHOT.12.09.1--..12+788',
    '1.2-RC-SNAPSHOT',
    '-1.0.3-gamma+b7718',
    '+justmeta',
    '9.8.7+meta+meta',
    '9.8.7-whatever+meta+meta',
    '99999999999999999999999.999999999999999999.99999999999999999----RC-SNAPSHOT.12.09.1---------------------------'
  ];

  describe.each(invalid)('instantiation with invalid string throws', (string) => {
    test(string, () => {
      expect(() => {
        // eslint-disable-next-line no-new
        new Version(string);
      }).toThrow();
    });
  });

  describe.each([
    ['1.0.0', '0.1.0'],
    ['1.0.0', '0.0.0'],
    ['1.1.0', '1.0.1'],
    ['1.1.1', '1.1.0'],
    ['0.1.1', '0.1.0'],
    ['1.2.3-alpha.3', '1.2.3-alpha.2'],
    ['3.4.5', '1.2.3-alpha.2'],
    ['3.4.5-alpha.1', '1.2.3-alpha.2', false]
  ])('gt series of test cases', (v1, v2, v3 = true) => {
    test(`${v1} > ${v2}`, () => {
      expect(v(v1).gt(v(v2))).toBe(v3);
    });
  });

  describe.each([
    ['1.0.0', '0.1.0'],
    ['1.0.0', '0.0.0'],
    ['1.1.0', '1.0.1'],
    ['1.1.1', '1.1.0'],
    ['0.1.1', '0.1.0'],
    ['0.1.1', '0.1.1'],
    ['1.2.3-alpha.3', '1.2.3-alpha.2'],
    ['1.2.3-alpha.3', '1.2.3-alpha.3'],
    ['3.4.5-alpha.1', '1.2.3-alpha.2', false]
  ])('gteq series of test cases', (v1, v2, v3 = true) => {
    test(`${v1} >= ${v2}`, () => {
      expect(v(v1).gteq(v(v2))).toBe(v3);
    });
  });

  describe.each([
    ['0.1.0', '1.0.0'],
    ['0.0.0', '1.0.0'],
    ['1.0.1', '1.1.0'],
    ['1.1.0', '1.1.1'],
    ['0.1.0', '0.1.1'],
    ['1.2.3-alpha.2', '1.2.3-alpha.3']
  ])('lt series of test cases', (v1, v2, v3 = true) => {
    test(`${v1} < ${v2}`, () => {
      expect(v(v1).lt(v(v2))).toBe(v3);
    });
  });

  describe.each([
    ['0.1.0', '1.0.0'],
    ['0.0.0', '1.0.0'],
    ['1.0.1', '1.1.0'],
    ['1.1.0', '1.1.1'],
    ['0.1.0', '0.1.1'],
    ['0.1.1', '0.1.1'],
    ['1.2.3-alpha.2', '1.2.3-alpha.3'],
    ['1.2.3-alpha.3', '1.2.3-alpha.3']
  ])('lteq series of test cases', (v1, v2, v3 = true) => {
    test(`${v1} <= ${v2}`, () => {
      expect(v(v1).lteq(v(v2))).toBe(v3);
    });
  });

  describe.each([
    ['0.0.4'],
    ['1.2.3'],
    ['10.20.30'],
    ['1.1.2-prerelease+meta'],
    ['1.1.2+meta'],
    ['1.1.2+meta-valid'],
    ['1.0.0-alpha'],
    ['1.0.0-beta'],
    ['1.0.0-alpha.beta'],
    ['1.0.0-alpha.beta.1'],
    ['1.0.0-alpha.1'],
    ['1.0.0-alpha0.valid'],
    ['1.0.0-alpha.0valid'],
    ['1.0.0-alpha-a.b-c-somethinglong+build.1-aef.1-its-okay'],
    ['1.0.0-rc.1+build.1'],
    ['2.0.0-rc.1+build.123'],
    ['1.2.3-beta'],
    ['10.2.3-DEV-SNAPSHOT'],
    ['1.2.3-SNAPSHOT-123'],
    ['1.0.0'],
    ['2.0.0'],
    ['1.1.7'],
    ['2.0.0+build.1848'],
    ['2.0.1-alpha.1227'],
    ['1.0.0-alpha+beta'],
    ['1.2.3----RC-SNAPSHOT.12.9.1--.12+788'],
    ['1.2.3----R-S.12.9.1--.12+meta'],
    ['1.2.3----RC-SNAPSHOT.12.9.1--.12'],
    ['1.0.0+0.build.1-rc.10000aaa-kk-0.1'],
    ['0.1.0'],
    ['0.0.0'],
    ['1.0.1'],
    ['1.1.0'],
    ['0.1.0'],
    ['0.1.1']
  ])('eq series of test cases', (v1) => {
    test(`${v1} === ${v1}`, () => {
      expect(v(v1).eq(v(v1))).toBeTruthy();
    });
  });

  describe.each([
    ['1.1.2-prerelease+meta', '1.1.2'],
    ['1.2.3----RC-SNAPSHOT.12.9.1--.12+788', '1.2.3'],
  ])('samever series of test cases', (v1, v2, v3 = true) => {
    test(`${v1} == ${v2}`, () => {
      expect(v(v1).sameVer(v(v2))).toBe(v3);
    });
  });
});
