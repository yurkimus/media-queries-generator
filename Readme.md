# media queries generator

## Get Started

1. Create separate JS-file for your constants

- set the screen sizes for your queries, something like:

```javascript
const sizes = [ 1680, 1024, 460, 320 ]
```

2. Set the initial values of media queries for your css-properties

- `base` is initial value, first query will be generated based on it
- `target` is final value that should be generated
 - `unit` is any valid css unit

```javascript
const h1 = new Map([
  ['font-size', { base: 38, target: 20, unit: "px" }]
])
```

3. Use `sizes` and `properties` inside `generate`

## CSS IN JS

```javascript
const Component = styled.something`
  font-size: 38px; // => base value for any screen

  ${generate(sizes, h1)}
`
```

## NATIVE JS

```javascript
const style = document.createElement('style')

style.innerText = generate(sizes, h1, { className: 'myClassName' })

document.head.appendChild(style)
```

4. 0_0 what is options?

- `options` is configuration for `generate` output, at the moment you can pass only `className` field of `string` type `value` to generate queries for specific css-classname or don't pass anything to generate plane joined set of queries