import React from 'react';

export default function FindIndex() {
  let numberArray1 = [1, 2, 4, 5, 6];
  let stringArray1 = ['string1', 'string3'];

  const fourIndex = numberArray1.findIndex(a => a === 4);
  const string3Index = stringArray1.findIndex(a => a === 'string3');

  console.log('Index of 4 in numberArray1:', fourIndex);     // Output: 2
  console.log('Index of "string3" in stringArray1:', string3Index);  // Output: 1

  return (
    <div>
      <p>Index of 4 in numberArray1: {fourIndex}</p>
      <p>Index of "string3" in stringArray1: {string3Index}</p>
    </div>
  );
}
