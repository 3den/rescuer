/**
 * rescuer
 * High Order Function that wraps a function and return
 * default value if there is an error.
 *
 * options - Object:
 *  default - value that is going to be returned if there
 *    is an error, or forbidFalsey is true and a falsey
 *    value was returned.
 *  catch - errors handler function to be excuted when
 *    an error is raised. (optional).
 *  forbidFalsey - boolean when `true` any falsey value
 *    will be replaced by `default`. (optional)
 *  allowWarn - boolean when `true` errors will be logged
 *    with `console.warn`.
 *
 * Returns High Order Function that wraps a function
 *  and returns `default` value, or `catch` result, in case of errors.
 */
export default function rescuer(o = {}) {
  return (fn) => (...args) => {
    try {
      const result = fn(...args);

      return (result || !o.forbidFalsey) ? result : o.default;

    } catch(e) {
      if (o.allowWarn) console.warn(fn, e);

      return o.catch ? o.catch(e) : o.default;
    }
  };
}

/**
 * rescueWithObject
 * wraps a function and returns `{}` if there is an error or result is falsey.
 *
 * fn - function to be rescued.
 *
 * Returns safe version of `fn` that returns `{}` is there is an error or result is falsey.
 */
export const rescueWithObject = rescuer({default: {}, forbidFalsey: true});
