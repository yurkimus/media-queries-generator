import styled from 'styled-components'

import { Headline } from './Headline'

const Wrapper = styled.section`
  padding: 40px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`

export default function App() {
  return (
    <Wrapper>
      <Headline level={1} children="Hello, world!" />

      <Headline level={2} children="Hello, world!" />
    </Wrapper>
  )
}