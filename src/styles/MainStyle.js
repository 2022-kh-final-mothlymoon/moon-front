import styled from "styled-components"

export const CONTAINER_TAB = styled.div `
  width: 1020px;
  margin: auto;
  padding-bottom: 5rem;
`
export const SLIDER = styled.div `
  /* 슬라이더가로스크롤바 생기는 문제 */
  overflow: hidden;
  padding-bottom: 7rem; /* 패딩 안주면 dot 버튼 사라짐 */
`
export const SLIDEIMG = styled.img `
  width: 100%;
`

export const CARDDIV = styled.div `
  position: relative;
  margin-top: 20px;
`

export const BEST = styled.span `
  position: absolute;
  display: inline-block;
  width: 48px;
  height: 48px;
  font-size: 15px;
  background: #fff;
  border-radius: 24px;
  border-width: 2px;
  border-style: solid;
  text-align: center;
  font-weight: 700;
  color : #f05a5e;
  line-height: 44px;
  top: 40px;
  left: 20px;
`

export const CARDIMG = styled.img `
  width: 70%;
  height: 70%;
`

export const TABTITLE = styled.span `
  color: rgb(51, 51, 51);
  font-weight: 600;
  font-size: 18px;
`