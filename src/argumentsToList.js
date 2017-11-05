import { unapply, identity } from 'ramda';

/**
 * Converts arguments to list.
 *
 * @category Function
 *
 * @example
 *
 *		R.compose(R.sum, argumentsToList)(1, 2, 3) // 6
 *
 * @sig (a, b, c, ...) → ([a|b|c|...])
 */
export default unapply(identity);
