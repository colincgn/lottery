const test = require('ava');
const td = require('testdouble');

const { root, fail, notFound } = require('../../../app/controllers');

test('Root message Controller', t => {
  const res = { json: td.function() };
  root({}, res);
  t.notThrows(() =>
    td.verify(res.json({ message: 'To check ticket call ticket-scan' }))
  );
});

test('Fail Controller', t => {
  t.throws(() => fail(), 'Hello Error');
});


test('Not Found Controller', t => {
  t.throws(() => notFound(), 'Not Found');
});