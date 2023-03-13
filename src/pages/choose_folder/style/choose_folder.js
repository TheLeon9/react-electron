import styled from "styled-components";
import { Link } from "react-router-dom";

//----------------------+
//  ALL
//----------------------+
export const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.background_color};
`;
export const ModalBackground = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0,0,0 , 0.6);
  z-index: 100;
`;
export const Modal = styled.div`
  height: 200px;
  width: 200px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-color: ${(props) => props.theme.black_color};
  box-shadow:  ${(props) => props.theme.second_color} 0px 0px 15px;
  border-radius: ${(props) => props.theme.border_radius}px;
  text-align: center;
  border: ${(props) => props.theme.border_width}px solid
    ${(props) => props.theme.first_color};
`;

//----------------------+
//  LEFT
//----------------------+

export const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 70%;
  background-image: url(${props => props.img});
`;
export const LeftCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 90%;
  width: 90%;
  border: ${(props) => props.theme.border_width}px solid
    ${(props) => props.theme.first_color};
`;

export const CanvaCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80%;
  width: 100%;
  border-bottom: ${(props) => props.theme.border_width}px solid
    ${(props) => props.theme.first_color};
`;

export const NameCont = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 20%;
  width: 100%;
  background-color: ${(props) => props.theme.black_color};
`;

export const PName = styled.p`
  font-size: ${(props) => props.theme.big_font_size}px;
  color: ${(props) => props.theme.white_color};
  letter-spacing: ${(props) => props.theme.letter_spacing}px;
  margin-left: 20px;
`;
export const SpanName = styled.span`
  margin-left: 20px;
  font-size: ${(props) => props.theme.big_font_size}px;
  letter-spacing: ${(props) => props.theme.letter_spacing}px;
  color: ${(props) => props.theme.second_color};
  border-bottom: ${(props) => props.theme.border_width}px solid
    ${(props) => props.theme.second_color};
`;

//----------------------+
//  RIGHT
//----------------------+

export const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 30%;
  border-left: ${(props) => props.theme.border_width}px solid
    ${(props) => props.theme.first_color};
  background-color: ${(props) => props.theme.black_color};
`;
export const RightCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 90%;
  width: 100%;
  text-align: center;
`;

export const P = styled.p`
  font-size: ${(props) => props.theme.font_size}px;
  color: ${(props) => props.theme.white_color};
  letter-spacing: ${(props) => props.theme.letter_spacing}px;
`;
export const Span = styled.span`
  color: ${(props) => props.theme.second_color};
  font-weight: bold;
`;
export const Caution = styled.p`
  font-size: ${(props) => props.theme.small_font_size}px;
  color: ${(props) => props.theme.first_color};
  letter-spacing: ${(props) => props.theme.letter_spacing}px;
`;
export const DragAndDropDiv = styled.div`
  width: 60%;
  height: 300px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed ${(props) => props.theme.first_color};
  `;

export const InputSelect = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  &:hover {
    cursor: pointer;
  }
`;
export const CustomButton = styled.button`
  font-family: ${(props) => props.theme.first_font};
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
    cursor: pointer;
  }
`;
export const StyledLinkCont = styled.div`
  height: 40px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;
export const StyledLink = styled(Link)`
  font-size: ${(props) => props.theme.small_font_size}px;
  background-color: transparent;
  padding: 4px;
  color: ${(props) => props.theme.second_color};
  text-decoration: none;
  letter-spacing: ${(props) => props.theme.letter_spacing}px;
  transition: 0.2s;
  &:hover {
    font-size: ${(props) => props.theme.font_size}px;
  }
`;
