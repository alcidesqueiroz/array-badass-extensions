const test = require('tap').test;
const abex = require('.');
abex.extendArray();

test('first', (t) => {
  t.same([11, 22, 33, 44].ex.first(), 11);
  t.same([11, 22, 33, 44].ex.first(2), [11, 22]);
  t.same([11, 22, 33, 44].ex.first(10), [11, 22, 33, 44]);
  t.same([22].ex.first(), 22);
  t.same([22].ex.first(1), 22);
  t.same([22].ex.first(10), [22]);
  t.same([].ex.first(), undefined);
  t.same([].ex.first(10), []);
  t.end();
});

test('last', (t) => {
  t.same([11, 22, 33, 44].ex.last(), 44);
  t.same([11, 22, 33, 44].ex.last(2), [33, 44]);
  t.same([11, 22, 33, 44].ex.last(10), [11, 22, 33, 44]);
  t.same([22].ex.last(), 22);
  t.same([22].ex.last(1), 22);
  t.same([22].ex.last(10), [22]);
  t.same([].ex.last(), undefined);
  t.same([].ex.last(10), []);
  t.end();
});

test('isEmpty', (t) => {
  t.equal([11, 22, 33, 44, 55, 66].ex.isEmpty(), false);
  t.equal([22].ex.isEmpty(), false);
  t.equal([].ex.isEmpty(), true);
  t.end();
});

test('include', (t) => {
  t.equal([11, 22, 33, 44, 55, 66].ex.include(66), true);
  t.equal([11, 22, 33, 44, 55, 66].ex.include(44), true);
  t.equal([11, 22, 33, 44, 55, 66].ex.include(77), false);
  t.equal([11, 22, 33, 44, 55, 66].ex.include(null), false);
  t.equal([].ex.include(11), false);
  t.equal([].ex.include(undefined), false);
  t.end();
});

test('includeSome', (t) => {
  t.equal([11, 22, 33, 44, 55, 66].ex.includeSome(66, 88, 99), true);
  t.equal([11, 22, 33, 44, 55, 66].ex.includeSome(44, 99), true);
  t.equal([11, 22, 33, 44, 55, 66].ex.includeSome(77, 99, 123), false);
  t.equal([11, 22, 33, 44, 55, 66].ex.includeSome(null), false);
  t.equal([].ex.includeSome(11), false);
  t.equal([].ex.includeSome(undefined), false);
  t.end();
});

test('includeSome', (t) => {
  t.equal([11, 22, 33, 44, 55, 66].ex.includeAll(11, 44, 55), true);
  t.equal([11, 22, 33, 44, 55, 66].ex.includeAll(11), true);
  t.equal([11, 22, 33, 44, 55, 66].ex.includeAll(11, 22, 3333), false);
  t.equal([11, 22, 33, 44, 55, 66].ex.includeAll(null), false);
  t.equal([].ex.includeAll(11), false);
  t.equal([].ex.includeAll(undefined), false);
  t.end();
});

test('drop', (t) => {
  t.same([11, 22, 33, 44, 55, 66].ex.drop(2), [33, 44, 55, 66]);
  t.same([11, 22, 33, 44, 55, 66].ex.drop(0), [11, 22, 33, 44, 55, 66]);
  t.same([11, 22, 33, 44, 55, 66].ex.drop(6), []);
  t.same([11, 22, 33, 44, 55, 66].ex.drop(10), []);
  t.same([].ex.drop(2), []);
  t.end();
});

test('dropWhile', (t) => {
  t.same([11, 12, 13, 22, 14, 15, 16].ex.dropWhile(i => i < 20), [22, 14, 15, 16]);
  t.same([11, 12, 13, 22, 14, 15, 16].ex.dropWhile(i => i < 10), [11, 12, 13, 22, 14, 15, 16]);
  t.same([11, 12, 13, 22, 14, 15, 16].ex.dropWhile(i => i < 30), []);
  t.same([].ex.dropWhile(i => i < 20), []);
  t.end();
});

test('insert', (t) => {
  let a = [11, 22, 33, 44, 55, 66];
  t.notEqual(a.ex.insert(0, 77), a);
  t.same([11, 22, 33, 44, 55, 66].ex.insert(0, 77), [77, 11, 22, 33, 44, 55, 66]);
  t.same([11, 22, 33, 44, 55, 66].ex.insert(3, 77), [11, 22, 33, 77, 44, 55, 66]);
  t.same([11, 22, 33, 44, 55, 66].ex.insert(3, 77, 88, 99), [11, 22, 33, 77, 88, 99, 44, 55, 66]);
  t.same([11, 22, 33, 44, 55, 66].ex.insert(1000, 77, 88, 99), [11, 22, 33, 44, 55, 66, 77, 88, 99]);
  t.same([11, 22, 33, 44, 55, 66].ex.insert(0, 77, 88, 99), [77, 88, 99, 11, 22, 33, 44, 55, 66]);
  t.same([].ex.insert(0, 77, 88, 99), [77, 88, 99]);
  t.end();
});

test('$insert', (t) => {
  let a = [11, 22, 33, 44, 55, 66];
  t.equal(a.ex.$insert(0, 77), a);
  t.same([11, 22, 33, 44, 55, 66].ex.$insert(0, 77), [77, 11, 22, 33, 44, 55, 66]);
  t.same([11, 22, 33, 44, 55, 66].ex.$insert(3, 77), [11, 22, 33, 77, 44, 55, 66]);
  t.same([11, 22, 33, 44, 55, 66].ex.$insert(3, 77, 88, 99), [11, 22, 33, 77, 88, 99, 44, 55, 66]);
  t.same([11, 22, 33, 44, 55, 66].ex.$insert(1000, 77, 88, 99), [11, 22, 33, 44, 55, 66, 77, 88, 99]);
  t.same([11, 22, 33, 44, 55, 66].ex.$insert(0, 77, 88, 99), [77, 88, 99, 11, 22, 33, 44, 55, 66]);
  t.same([].ex.$insert(0, 77, 88, 99), [77, 88, 99]);
  t.end();
});

test('delete', (t) => {
  let a = [11, 22, 33, 44, 55, 66];
  t.notEqual(a.ex.delete(0, 66), a);
  t.same([11, 22, 33, 44, 55, 66].ex.delete(11), [22, 33, 44, 55, 66]);
  t.same([11, 22, 33, 44, 55, 66, 44, 77, 44].ex.delete(44), [11, 22, 33, 55, 66, 77]);
  let b = {};
  t.same([11, 22, 33, 44, b, 55, 66].ex.delete(b), [11, 22, 33, 44, 55, 66]);
  t.same([11, 22, 33, 44, 55, 66].ex.delete(123), [11, 22, 33, 44, 55, 66]);
  t.same([11, 22, 33, 44, 55, 66].ex.delete({}), [11, 22, 33, 44, 55, 66]);
  t.same([].ex.delete(0), []);
  t.end();
});

test('$delete', (t) => {
  let a = [11, 22, 33, 44, 55, 66];
  t.equal(a.ex.$delete(0, 66), a);
  t.same([11, 22, 33, 44, 55, 66].ex.$delete(11), [22, 33, 44, 55, 66]);
  t.same([11, 22, 33, 44, 55, 66, 44, 77, 44].ex.$delete(44), [11, 22, 33, 55, 66, 77]);
  let b = {};
  t.same([11, 22, 33, 44, b, 55, 66].ex.$delete(b), [11, 22, 33, 44, 55, 66]);
  t.same([11, 22, 33, 44, 55, 66].ex.$delete(123), [11, 22, 33, 44, 55, 66]);
  t.same([11, 22, 33, 44, 55, 66].ex.$delete({}), [11, 22, 33, 44, 55, 66]);
  t.same([].ex.$delete(0), []);
  t.end();
});

test('deleteAt', (t) => {
  let a = [11, 22, 33, 44, 55, 66];
  t.notEqual(a.ex.deleteAt(0, 66), a);
  t.same([11, 22, 33, 44, 55, 66].ex.deleteAt(0), [22, 33, 44, 55, 66]);
  t.same([11, 22, 33, 44, 55, 66].ex.deleteAt(3), [11, 22, 33, 55, 66]);
  t.same([11, 22, 33, 44, 55, 66].ex.deleteAt(1000), [11, 22, 33, 44, 55, 66]);
  t.same([].ex.deleteAt(0), []);
  t.end();
});

test('$deleteAt', (t) => {
  let a = [11, 22, 33, 44, 55, 66];
  t.equal(a.ex.$deleteAt(0, 66), a);
  t.same([11, 22, 33, 44, 55, 66].ex.$deleteAt(0), [22, 33, 44, 55, 66]);
  t.same([11, 22, 33, 44, 55, 66].ex.$deleteAt(3), [11, 22, 33, 55, 66]);
  t.same([11, 22, 33, 44, 55, 66].ex.$deleteAt(1000), [11, 22, 33, 44, 55, 66]);
  t.same([].ex.$deleteAt(0), []);
  t.end();
});

test('$deleteIf', (t) => {
  let a = [11, 22, 33, 44, 55, 66];
  t.equal(a.ex.$deleteIf(item => item === 33), a);
  t.same([11, 22, 33, 44, 55, 12, 66, 13].ex.$deleteIf(item => item > 40), [11, 22, 33, 12, 13]);
  t.same([11, 22, 33, 44, 55, 66].ex.$deleteIf(item => item === 44), [11, 22, 33, 55, 66]);
  t.same([11, 22, 33].ex.$deleteIf(() => {}), [11, 22, 33]);
  t.same([].ex.$deleteIf(() => {}), []);
  t.end();
});



test('compact', (t) => {
  let a = [11, 22, 33, null, 44, 55, 66];
  t.notEqual(a.ex.compact(), a);
  t.same([null, null, 11, undefined, 22, 33, undefined, null, 44, null].ex.compact(), [11, 22, 33, 44]);
  t.same([].ex.compact(), []);
  t.same([null, null, undefined, null, undefined].ex.compact(), []);
  t.end();
});

test('$compact', (t) => {
  let a = [11, 22, 33, null, 44, 55, 66];
  t.equal(a.ex.$compact(), a);
  t.same([null, null, 11, undefined, 22, 33, undefined, null, 44, null].ex.$compact(), [11, 22, 33, 44]);
  t.same([].ex.$compact(), []);
  t.same([null, null, undefined, null, undefined].ex.$compact(), []);
  t.end();
});
