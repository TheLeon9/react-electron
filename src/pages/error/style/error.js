import styled from "styled-components";
import { Link } from "react-router-dom";

export const GlobalCont = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

export const TextCont = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: ${(props) => props.theme.border_width}px solid
    ${(props) => props.theme.first_color};
  background-image: url(${(props) => props.img});
`;
export const Text = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;
export const Title = styled.h1`
  font-family: ${(props) => props.theme.first_font};
  color: ${(props) => props.theme.first_color};
  font-size: 60px;
  padding-bottom:px;
  margin-top: ${(props) => props.margin_top}px;
  letter-spacing: ${(props) => props.theme.letter_spacing}px;
`;
export const TitleSpan = styled.span`
    border-bottom: ${(props) => props.theme.border_width}px solid
    ${(props) => props.theme.first_color};
`;

export const CanvaCont = styled.div`
  width: 70%;
  height: 100%;
`;

export const P = styled.p`
  letter-spacing: ${(props) => props.theme.letter_spacing}px;
  font-size: ${(props) => props.theme.big_font_size}px;
  color: ${(props) => props.theme.white_color};
  line-height: 32px;

`;
export const Span = styled.span`
  color: ${(props) => props.theme.second_color};
  font-weight: bold;
  border-bottom: ${(props) => props.theme.border_width}px solid
    ${(props) => props.theme.second_color};
`;
export const LinkCont = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  width: 100%;
  height: 50px;
  margin-top: 20px;
`;
export const StyledLink = styled(Link)`
font-size: ${(props) => props.theme.medium_font_size}px;
  font-weight: bold;
  border: ${(props) => props.theme.border_width}px solid
    ${(props) => props.theme.first_color};
  background-color: transparent;
  padding: 10px;
  color: ${(props) => props.theme.first_color};
  border-radius: ${(props) => props.theme.border_radius}px;
  text-decoration: none;
  letter-spacing: ${(props) => props.theme.letter_spacing}px;
  &:hover {
    background-color: ${(props) => props.theme.first_color};
    color: ${(props) => props.theme.black_color};
  }
`;
