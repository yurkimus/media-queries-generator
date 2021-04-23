import { generateConstraints } from './css'

export const breakpoints = {
  desktop4: 1680,
  desktop3: 1440,
  desktop2: 1280,
  desktop1: 1024,
  mobile4: 960,
  mobile3: 768,
  mobile2: 640,
  mobile1: 360
}

export const { getConstraints, getStep } = generateConstraints(breakpoints)
