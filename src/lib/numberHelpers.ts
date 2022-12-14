export const reduceWithPrecision =
  (collection: Array<number>) => (reducingFn: (accumulator: number, val: number) => number) => {
    const longestDecimal = Math.max(...collection.map(num => countDecimals(num)))
    const precision = 10 ^ longestDecimal
    return collection.map(n => n * precision).reduce(reducingFn, 0) / precision
  }
/* reduceWithPrecision usage

const numbers = [1.25, 4.12345, 5.113]
const sum = reduceWithPrecision(numbers)

const objectWithNumbers = [
  {
    name: alice,
    amount: 0.123456789
  },
    {
    name: bill,
    amount: 0.987654321
  },
    {
    name: carol,
    amount: 0.133333333
  },
]
const sum = reduceWithPrecision(objectWithNumbers.map(o => o.amount))
*/

// source: https://stackoverflow.com/questions/17369098/simplest-way-of-getting-the-number-of-decimals-in-a-number-in-javascript
export const countDecimals = (num: number) => {
  if (Math.floor(num.valueOf()) === num.valueOf()) return 0
  const str = num.toString()
  if (str.indexOf('.') !== -1 && str.indexOf('-') !== -1) {
    return +str.split('-')[1] || 0
  } else if (str.indexOf('.') !== -1) {
    return +str.split('.')[1].length || 0
  }
  return +str.split('-')[1] || 0
}
