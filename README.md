## excavator

A light-weight object query lib

<img src="excavator.jpg" width="200px" />

## Usage

```js
const excavate = require('excavator');

let source = {
  data: [
    { name: 'a' },
    { name: 'b' }
  ]
};

let results = [];
excavate(source, 'data.name', value => results.push(value));

results; // [ 'a', 'b' ]
```
