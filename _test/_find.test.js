import find from '../src/index';

const data = [{
  userId: 8,
  title: 'title1',
},
{
  userId: 11,
  title: 'other',
},
{
  userId: 15,
  title: null,
},
{
  userId: 19,
  title: 'title2',
}];

test('fault-tolerant: null', () => {
  const origin = null;
  const result = find(origin);

  expect(Array.isArray(result)).toBe(true);
  expect(result.length).toBe(0);
});

test('where: RegExp', () => {
  const result = find(data).where({
    title: /\d$/,
  });
  expect(result.length).toBe(2);
  expect(result[0].userId).toBe(8);
  expect(result[1].userId).toBe(19);
});

test('where: string', () => {
  const result = find(data).where({
    title: 'other',
  });
  expect(result.length).toBe(1);
  expect(result[0].userId).toBe(11);
  expect(result[0].title).toBe('other');
});

test('where: function', () => {
  const result = find(data).where({
    title: (item) => item === 'other',
  });
  expect(result.length).toBe(1);
  expect(result[0].userId).toBe(11);
  expect(result[0].title).toBe('other');
});

test('orderBy: desc & asc', () => {
  let result = find(data).orderBy('userId', 'desc');
  expect(result.length).toBe(4);
  expect(result[0].userId).toBe(19);
  expect(result[1].userId).toBe(15);

  result = find(result).orderBy('userId', 'asc');
  expect(result.length).toBe(4);
  expect(result[0].userId).toBe(8);
  expect(result[1].userId).toBe(11);
});

test('orderBy: function', () => {
  const result = find(data).orderBy('userId', (a, b) => b - a);
  expect(result.length).toBe(4);
  expect(result[0].userId).toBe(19);
  expect(result[1].userId).toBe(15);
});

test('chained', () => {
  const result = find(data).where({
    title: /\d$/,
  }).orderBy('userId', 'desc');
  expect(result.length).toBe(2);
  expect(result[0].userId).toBe(19);
  expect(result[1].userId).toBe(8);
});
