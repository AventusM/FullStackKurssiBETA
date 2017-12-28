const average = require('../utils/for_testing').average
describe('average of', () => {

    test('one value that is the value itself', () => {
        expect(average([10])).toBe(10)
    })

    test('more than one to be correct', () => {
        expect(average([1, 2, 3])).toBe(2)
    })

    test('empty array to be zero', () => {
        expect(average([])).toBe(0)
    })

})