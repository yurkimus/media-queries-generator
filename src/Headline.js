import React from 'react'
import styled from 'styled-components'

import { breakpoints, getConstraints, getStep } from './media'

import { generate } from './css'

const props = {
  h1: new Map([
    ['font-size', getConstraints({ 1680: 38 })],
    ['line-height', getConstraints({ 1680: 32 })]
  ]),
  h2: new Map([['font', getConstraints({ 1680: [28, 24] })]])
}

const First = styled.h1`
  font-weight: 600;
  line-height: 32px;
  font-size: 38px;
  font-family: sans-serif;

  ${generate(breakpoints, getStep(38, 22), props.h1)}
`

const Second = styled.h2`
  font: normal 600 28px/24px sans-serif;

  ${generate(breakpoints, getStep(28, 20), props.h2, {
    separator: '/',
    modify: (values) => `normal 600 ${values} sans-serif`
  })}
`

export const Headline = ({ level, ...props }) =>
  level === 1 ? <First {...props} /> : <Second {...props} />
