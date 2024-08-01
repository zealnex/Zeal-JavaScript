# Implement polyfill for Reduce in JavaScript

# Question

Implement polyfill for `Array.prototype.reduce()` method in JavaScript. The polyfill must ensures that the custom `reduce()` method adheres to the behavior of the native `reduce()` method, handling various edge cases and errors appropriately.

## Solution

Here’s the implementation of the custom `reduce()` method:

```javascript
if (!Array.prototype.customReduce) {
  Array.prototype.customReduce = function (callbackFn, initialValue) {
    if (typeof callbackFn !== "function") {
      throw new TypeError(callbackFn + " is not a function");
    }

    // Check if array is empty and no initialValue is provided
    if (this.length === 0 && arguments.length < 2) {
      throw new TypeError("Reduce of empty array with no initial value");
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

    for (let index = startIndex; index < this.length; index++) {
      accumulator = callbackFn(accumulator, this[index], index, this);
    }

    return accumulator;
  };
}
```

## Error Handling

### Function Check

- Throws a `TypeError` if the `callbackFn` is a function.

### Empty Array Check

- Throws a `TypeError` if the array is empty and no `initialValue` is provided.

## Edge Case Handling

### Single Element Array Without Initial Value

- Returns the single element if the array has only one element and no `initialValue` is provided.

### Empty Array with Initial Value

- Returns the `initialValue` if provided, even if the array is empty.

### Non-Empty Array with Initial Value

- If the array is not empty and the `initialValue` is provided, the method invokes the `callbackFn` function starting at index 0.

### Non-Empty Array without Initial Value

- If the array is not empty and the `initialValue` is not provided, first element is assigned to accumulator and the method invokes the `callbackFn` function starting at index 1.

### Iteration and Accumulation

- Iterates over the array, updating the `accumulator` with each element using the provided `callbackFn`.

## Examples

```javascript
// Function Check:
try {
  [1, 2, 3].reduce(null);
} catch (e) {
  console.error(e); // TypeError: null is not a function
}

// Empty Array Check:
try {
  [].reduce((acc, curr) => acc + curr);
} catch (e) {
  console.error(e); // TypeError: Reduce of empty array with no initial value
}

// Single Element Array Without Initial Value:=
const result = [42].reduce((acc, curr) => acc + curr);
console.log(result); // 42

// Empty Array with Initial Value:
const result = [].reduce((acc, curr) => acc + curr, 10);
console.log(result); // 10

// Non-Empty Array with Initial Value:
const result = [1, 2, 3].reduce((acc, curr) => acc + curr, 10);
console.log(result); // 16

// Non-Empty Array without Initial Value
const result = [1, 2, 3].reduce((acc, curr) => acc + curr);
console.log(result); // 6

// Iteration and Accumulation:
const result = [1, 2, 3, 4].reduce((acc, curr) => acc + curr, 0);
console.log(result); // 10
```

For more details, refer to the [MDN documentation on Array.prototype.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).
