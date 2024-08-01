// Polyfill for Array.prototype.reduce() method in JavaScript.

if (!Array.prototype.customReduce) {
    Array.prototype.customReduce = function (callbackFn, initialValue) {
      // Validate that the callbackFn is a function
      if (typeof callbackFn !== "function") {
        throw new TypeError(callbackFn + " is not a function");
      }
  
      // Handle the case where the array is empty and no initialValue is provided
      if (this.length === 0 && arguments.length < 2) {
        throw new TypeError("Reduce of empty array with no initial value");
      }
  
      let accumulator;
      let startIndex;
  
      // Determine whether to use initialValue
      if (arguments.length > 1) {
        // If initialValue is provided, use it and start from index 0
        accumulator = initialValue;
        startIndex = 0;
      } else {
        // If no initialValue is provided
        if (this.length === 1) {
          // If the array has only one element, return it directly
          return this[0];
        }
        // Use the first element as the initial value and start from index 1
        accumulator = this[0];
        startIndex = 1;
      }
  
      // Iterate through the array starting from startIndex
      for (let index = startIndex; index < this.length; index++) {
        // Apply the callbackFn to update the accumulator
        accumulator = callbackFn(accumulator, this[index], index, this);
      }
  
      return accumulator;
    };
  }
  