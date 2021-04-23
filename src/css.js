import { css } from 'styled-components'

const isArray = (data) => data instanceof Array

const isNumber = (data) => typeof data === 'number' || data instanceof Number

export const generateConstraints = (breakpoints) => {
  const formatted = Object.values(breakpoints)

  const values = formatted.reduce((acc, curr) => ({ ...acc, [curr]: [] }), {})

  return {
    getConstraints: (initial) => ({ ...values, ...initial }),
    getStep: (start, end) => (start - end) / formatted.length
  }
}

const px = (value, separator) => {
  if (isArray(value)) return value.map((number) => number + 'px').join(separator)

  if (isNumber(value)) return value + 'px'
}

const property = (prop, value, addon) =>
  `${prop}: ${
    addon?.modify ? addon?.modify(px(value, addon?.separator ?? ' ')) : px(value, addon?.separator ?? ' ')
  };`

const media = (breakpoint, value) => css`
  @media (max-width: ${breakpoint}px) {
    ${value}
  }
`

export const generate = (breakpoints, step, props, addon) => {
  return [...props.entries()].map((entry) => {
    const boundaries = Object.values(breakpoints)

    return boundaries.map((boundary, i, arr) => {
      const prop = entry[0]
      const last = arr.length - 1
      const next = arr[i + 1]

      const value = props.get(prop)[boundary]

      if (isNumber(value))
        props.set(prop, {
          ...props.get(prop),
          [next]: props.get(prop)[boundary] - step
        })

      if (isArray(value))
        props.set(prop, {
          ...props.get(prop),
          [next]: props.get(prop)[boundary].map((n) => n - step)
        })

      return next
        ? media(boundary, property(prop, value, addon))
        : media(boundaries[last], property(prop, value, addon))
    })
  })
}
