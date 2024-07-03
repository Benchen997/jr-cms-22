function sum(a, b) {
  return a + b;
}

describe('sum function', () => {
  // test('',()=>{})
  it('should return correct sum of two numbers', () => {
    // setup - initialize vairables, mock

    // exectue - run the test target
    const result = sum(1, 2);

    // compare
    // expect(result) === expected result
    expect(result).toBe(3);
    // toEqual - object comparing
    // toHaveBeenCalled
    // toHaveBeenCalledWith
  });
});

// title
// test case 1
// test case 2
