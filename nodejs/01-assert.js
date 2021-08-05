const assert =require("assert");

assert.ok(true);
// OK
assert.ok(1);
// OK


assert.ok(false,'its false');
// AssertionError: it's false

// 在交互式解释器中：
assert.ok(typeof 123 === 'string');
// AssertionError: false == true

// 在文件中（例如 test.js）：
assert.ok(typeof 123 === 'string');
// AssertionError: The expression evaluated to a falsy value:
//
//   assert.ok(typeof 123 === 'string')

assert.ok(false);
// AssertionError: The expression evaluated to a falsy value:
//
//   assert.ok(false)

assert.ok(0);
// AssertionError: The expression evaluated to a falsy value:
//
//   assert.ok(0)