import React from "react";
import Title from "../../components/Title";

import {
  P,
  Span,
  LinkCont,
  StyledLink,
} from "./style/home.js";
const TextComposant = (props) => {

    const handleClick = (event) => {
        // event.preventDefault();
        props.setLinkClick(true);
        props.setLinkEvent(event);
        // props.setCameraRotateX(1.5);
        // props.setCameraPositionY(10);
    };
  return (
    <>
      <Title margin_top={0} padding_bot={0} title="THE_LEON" />
      <P>
        First Project Made in<Span> Electron </Span>with
        <Span> ThreeJS </Span>
        and<Span> React </Span>
      </P>
      <LinkCont>
        <StyledLink to="/choose_folder" onClick={handleClick}>
          START
        </StyledLink>
      </LinkCont>
    </>
  );
};

export default TextComposant;
