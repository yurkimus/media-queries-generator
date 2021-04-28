/**
 *
 * @param {string} property css property from properties Map
 * @param {number} value calculated value from property configuration in properties Map
 * @param {string} unit an valid css unit
 *
 * @returns {string} css-property with calculated value
 */
const style = (property, value, unit) => `${property}: ${value}${unit};`

/**
 *
 * @param {number} size screens size
 * @param {string} styles string with generated values from properties
 * @param {{ className: string }} options generator output configurator
 *
 * @returns {string} media-query for one of screen size
 */
const media = (size, styles, options) => {
  const { className } = options

  return className
    ? `@media (max-width: ${size}px) { .${className} { ${styles} } }\n`
    : `@media (max-width: ${size}px) { ${styles} }\n`
}

/**
 *
 * @param {string} media array of generated media-queries
 *
 * @returns {string} fromatted media-query for one of screen size
 */
const format = (media) => media.split('\n').reduce((initial, query) => initial + query, '')

/**
 *
 * @param {Array<number>} sizes screen sizes to adapt
 * @param {Map<string, { base: number, target: number, unit: string }>} properties configuration for your css properties
 * @param {{ className: string }} options generator output configurator
 *
 * @returns {string} joined set of string of media-queries
 */
const generate = (sizes, properties, options = { className: null }) => {
  const values = [...properties].reduce((map, current) => {
    const property = current[0],
      { base, target, unit } = current[1],
      step = (base - target) / sizes.length

    return map.set(
      property,
      sizes.reduce(
        (accamulator, size, index, initial) =>
          initial[index - 1]
            ? {
                ...accamulator,
                [size]: (accamulator[initial[index - 1]] - step).toFixed(2)
              }
            : { ...accamulator, [size]: (base - step).toFixed(2), unit },
        {}
      )
    )
  }, new Map())

  const screens = sizes.reduce(
    (map, size) =>
      map.set(
        size,
        [...values].reduce(
          (initial, value) => ({
            ...initial,
            [value[0]]: [value[1][size], value[1].unit]
          }),
          {}
        )
      ),
    new Map()
  )

  const queries = [...screens].reduce((initial, screen) => {
    const size = screen[0],
      properties = screen[1]

    const styles = Object.entries(properties).reduce(
      (initial, property) => [...initial, style(property[0], ...property[1])],
      []
    )

    return initial + format(media(size, styles.join('\n  '), options))
  }, '')

  return queries
}

export { generate }
