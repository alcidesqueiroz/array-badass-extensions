# array-badass-extensions [![Build status](https://travis-ci.org/alcidesqueiroz/array-badass-extensions.svg?branch=master)](https://travis-ci.org/alcidesqueiroz/array-badass-extensions)

> 🥊  Badass extension methods for JavaScript arrays.

<img src="https://gist.githubusercontent.com/alcidesqueiroz/c3d6c6edc559194bc37a2c464a21768d/raw/9a4bddc93fbd0bdaa9db856374db8050a0a4558c/array-badass-extensions.png" width="300" />

A set of array extension methods shamelessly inspired by arrays in Ruby and other languages.

## Install

With npm:
```
$ npm install --save array-badass-extensions
```

With Yarn:

```
$ yarn add array-badass-extensions
```

## Usage
You can use array-badass-extensions in two different ways:

### Extending the array prototype
The standard way of using ABEX is by extending the Array prototype. Normally, extending native object prototypes is not safe and advisable. The main reason is because it's not possible to predict whether your extension methods will collide with namesake implementations in the future. ABEX solves this problem by grouping all extension methods under a `.ex` property.
```
import { extendArray } from 'array-badass-extensions';

extendArray(); // extendArray must be called ASAP if you want to extend Array prototype

['The', 'Green', 'Bay', 'Packers'].ex.last(3);

const numbers = [11, 22, 11, 22, 33, 44, 33, 44, 22];
numbers.ex.uniq();
```
**Note:** To use these extensions throughout your whole application, you should initialize ABEX as early as you can (ideally at the very top of your boot file).


### Using the ABEX object
If you're really not willing to extend Array prototype, you can use the module exported object directly:

```
import abex from 'array-badass-extensions';

abex.last(['The', 'Green', 'Bay', 'Packers'], 3);

const numbers = [11, 22, 11, 22, 33, 44, 33, 44, 22];
abex.uniq(numbers);

```

### Methods

**Note:** All methods whose name starts with `$` mutate the original array instance.
```javascript
// first([quantity])
// Returns the first N items of the array
[11, 22, 33, 44].ex.first(); //=> 11
[11, 22, 33, 44].ex.first(2); //=> [11, 22]

// last([quantity])
// Returns the last N items of the array
[11, 22, 33, 44].ex.last(); //=> 44
[11, 22, 33, 44].ex.last(2); //=> [33, 44]

// isEmpty()
// Returns true if the array has no items
[11, 22, 33, 44, 55, 66].ex.isEmpty(); //=> false
[].ex.isEmpty(); //=> true

// include(value)
// Returns true if the array includes the value supplied as argument
[11, 22, 33, 44, 55, 66].ex.include(66); //=> true
[11, 22, 33, 44, 55, 66].ex.include(77); //=> false

// includeSome(value1[, value2, value3, value4...])
// Returns true if the array includes one of the values supplied as arguments
[11, 22, 33, 44, 55, 66].ex.includeSome(66, 88, 99); //=> true
[11, 22, 33, 44, 55, 66].ex.includeSome(77, 99, 123); //=> false

// includeAll(value1[, value2, value3, value4...])
// Returns true if the array includes all the values supplied as arguments
[11, 22, 33, 44, 55, 66].ex.includeAll(11, 44, 55); //=> true
[11, 22, 33, 44, 55, 66].ex.includeAll(11, 22, 3333); //=> false

// take(count)
// Returns the first N items of an array
[11, 22, 33, 44, 55, 66].ex.take(2); //=> [11, 22]
[11, 22, 33, 44, 55, 66].ex.take(6); //=> [11, 22, 33, 44, 55, 66]
[11, 22, 33, 44, 55, 66].ex.take(0); //=> []

// takeWhile(callback)
// Returns the first items of an array until the supplied callback evaluates to false
[11, 12, 13, 22, 14, 15, 16].ex.takeWhile(i => i < 20); //=> [11, 12, 13]
[11, 12, 13, 22, 14, 15, 16].ex.takeWhile(i => i < 10); //=> []
[11, 12, 13, 22, 14, 15, 16].ex.takeWhile(i => i < 30); //=> [11, 12, 13, 22, 14, 15, 16]

// drop(count)
// Ignores the first N items of an array, returning the remaining items
[11, 22, 33, 44, 55, 66].ex.drop(2); //=> [33, 44, 55, 66]
[11, 22, 33, 44, 55, 66].ex.drop(0); //=> [11, 22, 33, 44, 55, 66]
[11, 22, 33, 44, 55, 66].ex.drop(6); //=> []

// dropWhile(callback)
// Ignores the first items of an array until the supplied callback evaluates to false,
// returning the remaining items
[11, 12, 13, 22, 14, 15, 16].ex.dropWhile(i => i < 20); //=> [22, 14, 15, 16]
[11, 12, 13, 22, 14, 15, 16].ex.dropWhile(i => i < 10); //=> [11, 12, 13, 22, 14, 15, 16]
[11, 12, 13, 22, 14, 15, 16].ex.dropWhile(i => i < 30); //=> []

// at(index)
// Returns the item at a specific index. Negative indexes are also allowed,
// counting back from the last item.
[11, 22, 33, 44, 55, 66, 77, 88, 99].ex.at(2); //=> 33
[11, 22, 33, 44, 55, 66, 77, 88, 99].ex.at(-3); //=> 77
[11, 22, 33, 44, 55, 66, 77, 88, 99].ex.at(-1); //=> 99

// count([value])
// Returns the number of occurrences of some item in the array.
[11, 11, 22, 11, 33, 22, 44, 22, 44, 55].ex.count(); //=> 10
[11, 11, 22, 11, 33, 22, 44, 22, 44, 55].ex.count(11); //=> 3
[11, 11, 22, 11, 33, 22, 44, 22, 44, 55].ex.count(44); //=> 2
[11, 11, 22, 11, 33, 22, 44, 22, 44, 55].ex.count(123); //=> 0
const a = {};
[11, a, 11, 22, 11, 33, a, 22, {}, 44, 22, 44, 55].ex.count(a); //=> 2

// insert(index, value1[, value2, value3, value4...])
// Inserts one or more items into a specific position of an array. Returns a new array.
[11, 22, 33, 44, 55, 66].ex.insert(0, 77); //=> [77, 11, 22, 33, 44, 55, 66]
[11, 22, 33, 44, 55, 66].ex.insert(3, 77); //=> [11, 22, 33, 77, 44, 55, 66]
[11, 22, 33, 44, 55, 66].ex.insert(3, 77, 88, 99); //=> [11, 22, 33, 77, 88, 99, 44, 55, 66]
[].ex.insert(0, 77, 88, 99); //=> [77, 88, 99]

// $insert(index, value1[, value2, value3, value4...])
// Mutable version of insert()
[11, 22, 33, 44, 55, 66].ex.$insert(0, 77); //=> [77, 11, 22, 33, 44, 55, 66]
[11, 22, 33, 44, 55, 66].ex.$insert(3, 77); //=> [11, 22, 33, 77, 44, 55, 66]
[11, 22, 33, 44, 55, 66].ex.$insert(3, 77, 88, 99); //=> [11, 22, 33, 77, 88, 99, 44, 55, 66]
[].ex.$insert(0, 77, 88, 99); //=> [77, 88, 99]

// delete(value)
// Deletes all occurrences of a specific item in an array. Returns a new array.
[11, 22, 33, 44, 55, 66].ex.delete(11); //=> [22, 33, 44, 55, 66]
[11, 22, 33, 44, 55, 66, 44, 77, 44].ex.delete(44); //=> [11, 22, 33, 55, 66, 77]
const b = {};
[11, 22, 33, 44, b, 55, 66].ex.delete(b); //=> [11, 22, 33, 44, 55, 66]

// $delete(value)
// Mutable version of delete()
[11, 22, 33, 44, 55, 66].ex.$delete(11); //=> [22, 33, 44, 55, 66]
[11, 22, 33, 44, 55, 66, 44, 77, 44].ex.$delete(44); //=> [11, 22, 33, 55, 66, 77]
const b = {};
[11, 22, 33, 44, b, 55, 66].ex.$delete(b); //=> [11, 22, 33, 44, 55, 66]

// deleteAt(index)
// Deletes the element at the supplied position. Returns a new array.
[11, 22, 33, 44, 55, 66].ex.deleteAt(0); //=> [22, 33, 44, 55, 66]
[11, 22, 33, 44, 55, 66].ex.deleteAt(3); //=> [11, 22, 33, 55, 66]

// $deleteAt(index)
// Mutable version of deleteAt()
[11, 22, 33, 44, 55, 66].ex.$deleteAt(0); //=> [22, 33, 44, 55, 66]
[11, 22, 33, 44, 55, 66].ex.$deleteAt(3); //=> [11, 22, 33, 55, 66]

// $deleteIf(callback)
// Deletes all items for which the passed callback evaluates to true.
[11, 22, 33, 44, 55, 12, 66, 13].ex.$deleteIf(item => item > 40); //=> [11, 22, 33, 12, 13]
[11, 22, 33, 44, 55, 66].ex.$deleteIf(item => item === 44); //=> [11, 22, 33, 55, 66]

// compact()
// Removes all occurrences of null and undefined
[null, null, 11, undefined, 22, 33, undefined, null, 44, null].ex.compact(); //=> [11, 22, 33, 44]
[null, null, undefined, null, undefined].ex.compact(); //=> []

// $compact()
// Mutable version of compact()
[null, null, 11, undefined, 22, 33, undefined, null, 44, null].ex.$compact(); //=> [11, 22, 33, 44]
[null, null, undefined, null, undefined].ex.$compact(); //=> []

// uniq()
// Removes duplicate items
[11, 22, 11, 22, 33, 44, 33, 44, 22].ex.uniq(); //=> [11, 22, 33, 44]
const b = {}, c = [];
[11, 22, b, 11, 22, 33, b, 44, 33, c, 44, 22, c].ex.uniq(); //=> [11, 22, b, 33, 44, c]

// $uniq()
// Mutable version of uniq()
[11, 22, 11, 22, 33, 44, 33, 44, 22].ex.uniq(); //=> [11, 22, 33, 44]
const b = {}, c = [];
[11, 22, b, 11, 22, 33, b, 44, 33, c, 44, 22, c].ex.uniq(); //=> [11, 22, b, 33, 44, c]

// minus(other_array)
// Returns a new array that is a copy of the original one, removing any items that
// also appear in the other array. The order is preserved.
[11, 22, 11, 22, 33, 44, 33, 44, 22].ex.minus([11, 22]); //=> [33, 44, 33, 44]
const b = {}, c = [];
[11, 22, b, 11, 22, 33, b, 44, 33, c, 44, 22, c].ex.minus([b, 44]); //=> [11, 22, 11, 22, 33, 33, c, 22, c]

// $minus(other_array)
// Mutable version of minus()
[11, 22, 11, 22, 33, 44, 33, 44, 22].ex.minus([11, 22]); //=> [33, 44, 33, 44]
const b = {}, c = [];
[11, 22, b, 11, 22, 33, b, 44, 33, c, 44, 22, c].ex.minus([b, 44]); //=> [11, 22, 11, 22, 33, 33, c, 22, c]

// assoc(value)
// Searches through an array whose elements are also arrays, comparing the value supplied as argument
// with the first element of each contained array. Returns the first contained array that matches (that is,
// the first associated array), or undefined if no match is found.
[[11, 22, 33], [44, 55, 66], [77, 88, 99]].ex.assoc(44); //=> [44, 55, 66]
[[11, 22, 33], [44, 55, 66], 123].ex.assoc(123); //=> undefined

// rassoc(value)
// Searches through an array whose elements are also arrays, comparing the value supplied as argument
// with the last element of each contained array. Returns the first contained array that matches (that is,
// the first associated array), or undefined if no match is found.
[[11, 22, 33], [44, 55, 66], [77, 88, 99]].ex.rassoc(66); //=> [44, 55, 66]
[[11, 22, 33], [44, 55, 66], 123].ex.rassoc(123); //=> undefined

// $clear()
// Clears the original array
[11, 22, 33, 44, 55, 66, 77, 88, 99].ex.$clear(); //=> []

// cycle(count, callback)
// Calls the given callback for each element n times.
const b = [];
[11, 22, 33].ex.cycle(3, item => b.push(item));
b, [11, 22, 33, 11, 22, 33, 11, 22, 33]);

// flatten()
// Returns a new array that is a one-dimensional flattening of the original array (recursively).
[[11, 22, 33], [44, [55, 66]], [[[77], 88], 99], [[[[100]]]]].ex.flatten(); //=> [11, 22, 33, 44, 55, 66, 77,  88, 99, 100]

// $flatten()
// Mutable version of $flatten()
[[11, 22, 33], [44, [55, 66]], [[[77], 88], 99], [[[[100]]]]].ex.$flatten(); //=> [11, 22, 33, 44, 55, 66, 77,  88, 99, 100]

```

## Author

Alcides Queiroz Aguiar

- Twitter: [alcidesqueiroz](https://twitter.com/alcidesqueiroz)
- Medium: [@alcidesqueiroz](https://medium.com/@alcidesqueiroz)
- Stack Overflow: [http://is.gd/aqanso](http://stackoverflow.com/users/1295666/alcides-queiroz-aguiar)
- E-mail: alcidesqueiroz <at> gmail

## License

This code is free to use under the terms of the [MIT License](LICENSE.md).
