# media queries generator

## Get Started

1. Create separate JS-file for your constants

- set the boundaries in object, something like:

```javascript
const boundaries = {
  0: 1680,
  1: 1024,
  2: 460,
  4: 320
}
```

You can pass in object like this any boundaries, but don't overload it :)

2. Import `generateConstraints` function from lib to apply your breakpoints

```javascript
import { generateConstraints } from './css'
```

- Then call the function and export values from it from the module

```javascript
export const { getConstraints, getStep } = generateConstraints(breakpoints)
```

3. Create your react styled component in some module and import to it function that will generate media-queries inside styled function body. Also, take to the module stuff that you done before.

```javascript
import { generate } from './css'

import { breakpoints, getConstraints, getStep } from './media'
```

4. Set the initial values of media queries for your css-properties

```javascript
const fontSize = new Map([['font-size', getConstraints({ 1680: 38 })]])
```

- `1680: 38` is initial value for your query at 1680 and less

5. Use `initials` inside `generate`

```javascript
const Component = styled.something`
  font-size: 38px; // => base value for any screen

  ${generate(breakpoints, getStep(38, 30), fontSize)}
`
```

- getStep is Function which requires two arguments - start (top) and end (low) values. Step is value which subs from css-property value on each transformation to next media query. We create 4 breakpoints and set step from 38 to 30. Step here will be equals 38 - 30 / breakpoints.length (4) = 2
