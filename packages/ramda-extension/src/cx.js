import {
	always,
	append,
	compose,
	concat,
	converge,
	filter,
	head,
	identity,
	ifElse,
	isEmpty,
	last,
	map,
	not,
	o,
	toPairs,
	uncurryN,
	uniq,
	unnest,
	trim,
} from 'ramda';
import flattenArgs from './flattenArgs';
import joinWithSpace from './joinWithSpace';
import isObject from './isObject';
import isString from './isString';
import rejectEq from './rejectEq';
import applyCompose from './applyCompose';

const createSaveModifiers = ifElse(isEmpty, always([identity]));

const getDefinitions = compose(uniq, unnest, map(toPairs));
const createRejects = map(o(rejectEq, head));
const createAppends = map(o(append, head));
const getRejects = createSaveModifiers(o(createRejects, filter(o(not, last))));
const getAppends = createSaveModifiers(o(createAppends, filter(last)));

const createModifiers = o(converge(concat, [getRejects, getAppends]), getDefinitions);
const createAndApplyModifiers = uncurryN(2, o(applyCompose, createModifiers));
const handleArgs = converge(createAndApplyModifiers, [filter(isObject), filter(isString)]);

/**
 * Conditionally joining classNames together.
 *
 * The cx function takes any number of arguments which can be a string, object
 * even nested arrays of strings and objects.
 *
 * The argument 'foo' is short for { foo: true }.
 *
 * If the value associated with a given key is falsy, that key won't be included in the output.
 *
 * @func
 * @category String
 *
 * @example
 *
 *        R_.cx('Table', ['MagicTable'], {'Table--active': true })	// 'Table MagicTable Table--active'
 *        R_.cx('Table', ['MagicTable'], {'Table--active': false })	// 'Table MagicTable'
 *        R_.cx(['Table', ['MagicTable']])				// 'Table MagicTable'
 *
 * @sig String | [String] | Object -> String
 */
const cx = compose(joinWithSpace, uniq, map(trim), handleArgs, flattenArgs);

export default cx;
