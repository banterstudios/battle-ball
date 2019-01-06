import { css } from 'styled-components'

const base = css`
  * {
    box-sizing: border-box;
    font-family: 'helvetica';
  }

  html, body {
    position: relative;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    -webkit-touch-callout: none;
    user-select: none;
    background: ${({ theme }) => theme.bgPrimary};
    overflow: hidden;
  }

  hr {
    border: none;
  }

  img {
    max-width: 100%;
  }

  ul {
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  canvas {
    display: block;
  }

  main {
    min-height: 100%;
  }

  #app {
    height: 100%;
  }

  .capitalize {
    text-transform: capitalize;
  }

  .lowercase {
    text-transform: lowercase;
  }

  .uppercase {
    text-transform: uppercase;
  }

  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  .hidden {
    display: none;
  }

  .visible {
    display: block;
  }
`

export default base
