import tryer from '../src/tryer';

describe('#tryer', () => {
  function not1(n) {
    if(n === 1) throw "Oh nooo!"

    return n;
  }

  describe('without any arguments', () => {
    const safeNot1 = tryer()(not1);

    it('returns undefined if there is en error', () => {
      expect(safeNot1(1)).toEqual(undefined);
    });

    it('returns the normal result even when its falsey', () => {
      expect(safeNot1(undefined)).toEqual(undefined);
      expect(safeNot1(0)).toEqual(0);
      expect(safeNot1(false)).toEqual(false);
      expect(safeNot1(null)).toEqual(null);
    });
  });

  describe('with a default value', () => {
    const tryOrBoom = tryer({default: 'boom!'});
    const safeNot1 = tryOrBoom(not1);

    it('returns the default value if there is en error', () => {
      const fn = tryOrBoom(() => { throw 'AhaHaHAHa!' });

      expect(fn()).toEqual('boom!');
      expect(safeNot1(1)).toEqual('boom!');
    });

    it('returns the normal result even when its falsey', () => {
      expect(safeNot1(5)).toEqual(5);
      expect(safeNot1(0)).toEqual(0);
      expect(safeNot1(false)).toEqual(false);
      expect(safeNot1(null)).toEqual(null);
    });
  });

  describe('with a allowFalsey enabled', () => {
    const safeNot1 = tryer({
      default: 'boom!',
      forbidFalsey: true
    })(not1);

    it('returns the default value if result is falsey', () => {
      expect(safeNot1(0)).toEqual('boom!');
      expect(safeNot1(undefined)).toEqual('boom!');
      expect(safeNot1(null)).toEqual('boom!');
      expect(safeNot1(false)).toEqual('boom!');
    });

    it('returns the default value if there is en error', () => {
      expect(safeNot1(1)).toEqual('boom!');
    });
  });

  describe('with a catch function', () => {
    const safeNot1 = tryer({catch: (e) => e})(not1);

    it('returns the result of `catch` when where is an error', () => {
      expect(safeNot1(1)).toEqual('Oh nooo!');
    });
  });
});
