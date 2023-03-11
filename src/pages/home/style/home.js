import styled from "styled-components";
import { Link } from "react-router-dom";

export const GlobalCont = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.background_color};
`;
export const CanvaCont = styled.div`
  background-color: transparent;
`;
export const TextCont = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  padding: 4px;
  text-align: center;
`;
export const LinkCont = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: 50px;
`;

export const P = styled.p`
  letter-spacing: ${(props) => props.theme.letter_spacing}px;
  font-size: ${(props) => props.theme.title_font_size}px;
  color: ${(props) => props.theme.white_color};
`;
export const Span = styled.span`
  color: ${(props) => props.theme.second_color};
  font-weight: bold;
  border-bottom: ${(props) => props.theme.border_width}px solid ${(props) => props.theme.second_color};
`;
export const StyledLink  = styled(Link)`
     border: ${(props) => props.theme.border_width}px solid ${(props) => props.theme.first_color};
     background-color: transparent;
     padding: 10px;
     color: ${(props) => props.theme.first_color};
     border-radius:  ${(props) => props.theme.border_radius}px;
     text-decoration: none;
     letter-spacing: ${(props) => props.theme.letter_spacing}px;
`;