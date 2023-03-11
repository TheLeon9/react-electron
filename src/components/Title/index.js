import React from 'react';
import {H1} from './style/Title';

const Title = props => {
  return (
      <H1
        margin_top={props.margin_top}
        padding_bot={props.padding_bot}
        >
        {props.title}
      </H1>
  );
};
export default Title;
