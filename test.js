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
  const a = [11, 22, 33, 44, 55, 66];
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
  const a = [11, 22, 33, 44, 55, 66];
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
  const a = [11, 22, 33, 44, 55, 66];
  t.notEqual(a.ex.delete(0, 66), a);
  t.same([11, 22, 33, 44, 55, 66].ex.delete(11), [22, 33, 44, 55, 66]);
  t.same([11, 22, 33, 44, 55, 66, 44, 77, 44].ex.delete(44), [11, 22, 33, 55, 66, 77]);
  const b = {};
  t.same([11, 22, 33, 44, b, 55, 66].ex.delete(b), [11, 22, 33, 44, 55, 66]);
  t.same([11, 22, 33, 44, 55, 66].ex.delete(123), [11, 22, 33, 44, 55, 66]);
  t.same([11, 22, 33, 44, 55, 66].ex.delete({}), [11, 22, 33, 44, 55, 66]);
  t.same([].ex.delete(0), []);
  t.end();
});

test('$delete', (t) => {
  const a = [11, 22, 33, 44, 55, 66];
  t.equal(a.ex.$delete(0, 66), a);
  t.same([11, 22, 33, 44, 55, 66].ex.$delete(11), [22, 33, 44, 55, 66]);
  t.same([11, 22, 33, 44, 55, 66, 44, 77, 44].ex.$delete(44), [11, 22, 33, 55, 66, 77]);
  const b = {};
  t.same([11, 22, 33, 44, b, 55, 66].ex.$delete(b), [11, 22, 33, 44, 55, 66]);
  t.same([11, 22, 33, 44, 55, 66].ex.$delete(123), [11, 22, 33, 44, 55, 66]);
  t.same([11, 22, 33, 44, 55, 66].ex.$delete({}), [11, 22, 33, 44, 55, 66]);
  t.same([].ex.$delete(0), []);
  t.end();
});

test('deleteAt', (t) => {
  const a = [11, 22, 33, 44, 55, 66];
  t.notEqual(a.ex.deleteAt(0, 66), a);
  t.same([11, 22, 33, 44, 55, 66].ex.deleteAt(0), [22, 33, 44, 55, 66]);
  t.same([11, 22, 33, 44, 55, 66].ex.deleteAt(3), [11, 22, 33, 55, 66]);
  t.same([11, 22, 33, 44, 55, 66].ex.deleteAt(1000), [11, 22, 33, 44, 55, 66]);
  t.same([].ex.deleteAt(0), []);
  t.end();
});

test('$deleteAt', (t) => {
  const a = [11, 22, 33, 44, 55, 66];
  t.equal(a.ex.$deleteAt(0, 66), a);
  t.same([11, 22, 33, 44, 55, 66].ex.$deleteAt(0), [22, 33, 44, 55, 66]);
  t.same([11, 22, 33, 44, 55, 66].ex.$deleteAt(3), [11, 22, 33, 55, 66]);
  t.same([11, 22, 33, 44, 55, 66].ex.$deleteAt(1000), [11, 22, 33, 44, 55, 66]);
  t.same([].ex.$deleteAt(0), []);
  t.end();
});

test('$deleteIf', (t) => {
  const a = [11, 22, 33, 44, 55, 66];
  t.equal(a.ex.$deleteIf(item => item === 33), a);
  t.same([11, 22, 33, 44, 55, 12, 66, 13].ex.$deleteIf(item => item > 40), [11, 22, 33, 12, 13]);
  t.same([11, 22, 33, 44, 55, 66].ex.$deleteIf(item => item === 44), [11, 22, 33, 55, 66]);
  t.same([11, 22, 33].ex.$deleteIf(() => {}), [11, 22, 33]);
  t.same([].ex.$deleteIf(() => {}), []);
  t.end();
});

test('compact', (t) => {
  const a = [11, 22, 33, null, 44, 55, 66];
  t.notEqual(a.ex.compact(), a);
  t.same([null, null, 11, undefined, 22, 33, undefined, null, 44, null].ex.compact(), [11, 22, 33, 44]);
  t.same([].ex.compact(), []);
  t.same([null, null, undefined, null, undefined].ex.compact(), []);
  t.end();
});

test('$compact', (t) => {
  const a = [11, 22, 33, null, 44, 55, 66];
  t.equal(a.ex.$compact(), a);
  t.same([null, null, 11, undefined, 22, 33, undefined, null, 44, null].ex.$compact(), [11, 22, 33, 44]);
  t.same([].ex.$compact(), []);
  t.same([null, null, undefined, null, undefined].ex.$compact(), []);
  t.end();
});

test('uniq', (t) => {
  const a = [11, 22, 33, 44, 55, 66];
  t.notEqual(a.ex.uniq(), a);
  t.same([11, 22, 11, 22, 33, 44, 33, 44, 22].ex.uniq(), [11, 22, 33, 44]);
  const b = {}, c = [];
  t.same([11, 22, b, 11, 22, 33, b, 44, 33, c, 44, 22, c].ex.uniq(), [11, 22, b, 33, 44, c]);
  t.same([].ex.uniq(), []);
  t.same([null, undefined, null, undefined].ex.uniq(), [null, undefined]);
  t.end();
});

test('$uniq', (t) => {
  const a = [11, 22, 33, null, 44, 55, 66];
  t.equal(a.ex.$uniq(), a);
  t.same([11, 22, 11, 22, 33, 44, 33, 44, 22].ex.uniq(), [11, 22, 33, 44]);
  const b = {}, c = [];
  t.same([11, 22, b, 11, 22, 33, b, 44, 33, c, 44, 22, c].ex.uniq(), [11, 22, b, 33, 44, c]);
  t.same([].ex.uniq(), []);
  t.same([null, undefined, null, undefined].ex.uniq(), [null, undefined]);
  t.end();
});

test('minus', (t) => {
  const a = [11, 22, 33, 44, 55, 66];
  t.notEqual(a.ex.minus([11]), a);
  t.same([11, 22, 11, 22, 33, 44, 33, 44, 22].ex.minus([11, 22]), [33, 44, 33, 44]);
  const b = {}, c = [];
  t.same([11, 22, b, 11, 22, 33, b, 44, 33, c, 44, 22, c].ex.minus([b, 44]), [11, 22, 11, 22, 33, 33, c, 22, c]);
  t.same([].ex.minus([11, 22]), []);
  t.same([11, 22].ex.minus([]), [11, 22]);
  t.same([null, undefined, null, undefined].ex.minus([null]), [undefined, undefined]);
  t.end();
});

test('$minus', (t) => {
  const a = [11, 22, 33, null, 44, 55, 66];
  t.equal(a.ex.$minus([11]), a);
  t.same([11, 22, 11, 22, 33, 44, 33, 44, 22].ex.minus([11, 22]), [33, 44, 33, 44]);
  const b = {}, c = [];
  t.same([11, 22, b, 11, 22, 33, b, 44, 33, c, 44, 22, c].ex.minus([b, 44]), [11, 22, 11, 22, 33, 33, c, 22, c]);
  t.same([].ex.minus([11, 22]), []);
  t.same([11, 22].ex.minus([]), [11, 22]);
  t.same([null, undefined, null, undefined].ex.minus([null]), [undefined, undefined]);
  t.end();
});

test('assoc', (t) => {
  const a = {};
  const b = [77, 88, 99];
  t.equal([[11, 22, 33], [44, 55, 66], b].ex.assoc(77), b);
  t.equal([[11, 22, 33], [44, 55, 66], 123].ex.assoc(123), undefined);
  t.equal([[11, 22, 33], [44, 55, 66], 'aaa'].ex.assoc('aaa'), undefined);
  t.same([[11, 22, 33], [a, 55, 66], [77, 88, 99]].ex.assoc(a), [a, 55, 66]);
  t.same([[11, 22, 33], [44, 55, 66], [77, 88, 99]].ex.assoc(44), [44, 55, 66]);
  t.same([[11, 22, 33], [44, 55, 66], [77, 88, 99]].ex.assoc(445), undefined);
  t.same([].ex.assoc(44), undefined);
  t.end();
});

test('rassoc', (t) => {
  const a = {};
  const b = [77, 88, 99];
  t.equal([[11, 22, 33], [44, 55, 66], b].ex.rassoc(99), b);
  t.equal([[11, 22, 33], [44, 55, 66], 123].ex.rassoc(123), undefined);
  t.equal([[11, 22, 33], [44, 55, 66], 'aaa'].ex.rassoc('aaa'), undefined);
  t.same([[11, 22, 33], [44, 55, a], [77, 88, 99]].ex.rassoc(a), [44, 55, a]);
  t.same([[11, 22, 33], [44, 55, 66], [77, 88, 99]].ex.rassoc(66), [44, 55, 66]);
  t.same([[11, 22, 33], [44, 55, 66], [77, 88, 99]].ex.rassoc(445), undefined);
  t.same([].ex.rassoc(44), undefined);
  t.end();
});

test('at', (t) => {
  t.same([11, 22, 33, 44, 55, 66, 77, 88, 99].ex.at(0), 11);
  t.same([11, 22, 33, 44, 55, 66, 77, 88, 99].ex.at(2), 33);
  t.same([11, 22, 33, 44, 55, 66, 77, 88, 99].ex.at(1000), undefined);
  t.same([11, 22, 33, 44, 55, 66, 77, 88, 99].ex.at(-1000), undefined);
  t.same([11, 22, 33, 44, 55, 66, 77, 88, 99].ex.at(-3), 77);
  t.same([11, 22, 33, 44, 55, 66, 77, 88, 99].ex.at(-1), 99);
  t.same([].ex.at(0), undefined);
  t.end();
});

test('$clear', (t) => {
  t.same([11, 22, 33, 44, 55, 66, 77, 88, 99].ex.$clear(), []);
  const a = [11, 22, 33, 44, 55, 66, 77, 88, 99];
  t.equal(a.ex.$clear(), a);
  t.end();
});

test('count', (t) => {
  t.same([11, 11, 22, 11, 33, 22, 44, 22, 44, 55].ex.count(), 10);
  t.same([11, 11, 22, 11, 33, 22, 44, 22, 44, 55].ex.count(11), 3);
  t.same([11, 11, 22, 11, 33, 22, 44, 22, 44, 55].ex.count(44), 2);
  t.same([11, 11, 22, 11, 33, 22, 44, 22, 44, 55].ex.count(123), 0);
  const a = {};
  t.same([11, a, 11, 22, 11, 33, a, 22, {}, 44, 22, 44, 55].ex.count(a), 2);
  t.same([].ex.count(), 0);
  t.same([].ex.count(33), 0);
  t.end();
});

test('cycle', (t) => {
  const a = [];
  [11, 22, 33].ex.cycle(1, item => a.push(item));
  t.same(a, [11, 22, 33]);

  const b = [];
  [11, 22, 33].ex.cycle(3, item => b.push(item));
  t.same(b, [11, 22, 33, 11, 22, 33, 11, 22, 33]);

  const c = [];
  [11, 22, 33].ex.cycle(0, item => a.push(item));
  t.same(c, []);
  t.end();
});

test('flatten', (t) => {
  const a = [11, 22, 33, 44, 55, 66];
  t.notEqual(a.ex.flatten(), a);

  const b = {};
  t.same([[11, 22, 33], [44, [55, 66]], [[[77], 88], 99], [[[[100, b]]]]].ex.flatten(), [11, 22, 33, 44, 55, 66, 77,  88, 99, 100, b]);
  t.same([11].ex.flatten(), [11]);
  t.same([].ex.flatten(), []);
  t.end();
});

test('$flatten', (t) => {
  const a = [11, 22, 33, 44, 55, 66];
  t.equal(a.ex.$flatten(), a);

  const b = {};
  t.same([[11, 22, 33], [44, [55, 66]], [[[77], 88], 99], [[[[100, b]]]]].ex.$flatten(), [11, 22, 33, 44, 55, 66, 77,  88, 99, 100, b]);
  t.same([11].ex.$flatten(), [11]);
  t.same([].ex.$flatten(), []);
  t.end();
});

test('take', (t) => {
  t.same([11, 22, 33, 44, 55, 66].ex.take(2), [11, 22]);
  t.same([11, 22, 33, 44, 55, 66].ex.take(6), [11, 22, 33, 44, 55, 66]);
  t.same([11, 22, 33, 44, 55, 66].ex.take(0), []);
  t.same([11, 22, 33, 44, 55, 66].ex.take(10), [11, 22, 33, 44, 55, 66]);
  t.same([].ex.take(2), []);
  t.end();
});

test('takeWhile', (t) => {
  t.same([11, 12, 13, 22, 14, 15, 16].ex.takeWhile(i => i < 20), [11, 12, 13]);
  t.same([11, 12, 13, 22, 14, 15, 16].ex.takeWhile(i => i < 10), []);
  t.same([11, 12, 13, 22, 14, 15, 16].ex.takeWhile(i => i < 30), [11, 12, 13, 22, 14, 15, 16]);
  t.same([].ex.takeWhile(i => i < 20), []);
  t.end();
});
