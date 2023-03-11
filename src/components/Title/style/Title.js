import styled from "styled-components";

// -------------------------+
//                          |
//         Title            |
//                          |
// -------------------------+

export const H1 = styled.div`
  font-family: ${(props) => props.theme.first_font};
  color: ${(props) => props.theme.first_color};
  font-size: ${(props) => props.theme.title_font_size}px;
  padding-bottom: ${(props) => props.padding_bot}px;
  margin-top: ${(props) => props.margin_top}px;
  letter-spacing:  ${(props) => props.theme.letter_spacing}px;
`;
