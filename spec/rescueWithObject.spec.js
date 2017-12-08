import {rescueWithObject} from '../src/rescuer';

describe('#rescueWithObject', () => {
  const fn = rescueWithObject((v) => v);
  const brokenFn = rescueWithObject(() => { throw 'Boom!'; });

  it('returns `{}` if there is en error', () => {
    expect(brokenFn()).toEqual({});
  });

  it('returns `{}` if value is falsey', () => {
    expect(fn(undefined)).toEqual({});
    expect(fn(null)).toEqual({});
    expect(fn(false)).toEqual({});
    expect(fn('')).toEqual({});
  });

  it('returns current result when it is truthy', () => {
    expect(fn({name: 'foo'})).toEqual({name: 'foo'});
    expect(fn(1)).toEqual(1);
    expect(fn('hello')).toEqual('hello');
  });
});
