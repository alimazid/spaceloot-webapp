import { Global, css } from '@emotion/react'

const styles = css`
  .pagination {
    display: flex;
    align-items: center;
    padding-left: 0px;
    list-style: none !important;
    border-radius: 0.25rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .nes-dialog {
    z-index: 2;
    position: absolute;
    left: 0px;
    right: 0px;
    width: fit-content;
    height: fit-content;
    color: black;
    margin: auto;
    border-width: initial;
    border-style: solid;
    border-color: initial;
    border-image: initial;
    padding: 1em;
    background: white;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  body {
    padding: 0;
    margin: 0;
  }
  a {
    color: inherit;
    text-decoration: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  *,
  *:before,
  *:after {
    -webkit-overflow-scrolling: touch;
  }
  .Toastify {
    .Toastify__toast {
      cursor: default;
      margin: 3.5rem 0 0;
      border-radius: 0;
      border: 4px solid black;
      box-shadow: 0 0 8px 1px white;
    }
    @media only screen and (max-width: 480px) {
      .Toastify__toast-container {
        margin: auto;
        left: 0;
        right: 0;
        width: 320px;
      }
      .Toastify__toast-container--top-center {
        top: 1rem;
      }
    }
    .Toastify__toast {
      min-height: 54px;
    }
    .Toastify__toast-body {
      margin: auto 0.5rem;
    }
  }
`

export const GlobalStyle = () => <Global styles={styles} />
