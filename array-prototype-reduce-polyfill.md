# Custom Reduce Polyfill

This repository contains a polyfill for the `Array.prototype.reduce` method in JavaScript. The polyfill ensures that the custom `reduce` method adheres to the behavior of the native `reduce` method, handling various edge cases appropriately.

## Implementation

Here’s the implementation of the custom `reduce` method:

```javascript
// Define custom reduce()
if (!Array.prototype.customReduce) {
  Array.prototype.customReduce = function(callback, initialValue) {
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    // Check if array is empty and no initialValue is provided
    if (this.length === 0 && arguments.length < 2) {
      throw new TypeError('Reduce of empty array with no initial value');
    }

    let accumulator;
    let startIndex;

    // Handling cases based on the provided initialValue
    if (arguments.length > 1) {
      accumulator = initialValue;
      startIndex = 0;
    } else {
      if (this.length === 1) {
        return this[0];
      }
      accumulator = this[0];
      startIndex = 1;
    }

    // Iterate over each item in the array starting from startIndex
    for (let index = startIndex; index < this.length; index++) {
      accumulator = callback(accumulator, this[index], index, this);
    }

    // Return the accumulated value
    return accumulator;
  }
}
