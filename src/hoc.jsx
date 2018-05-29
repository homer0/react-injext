import React from 'react';
import { reactInjextContainer } from './container';

const reactInjextHOC = (dependencies, container = null) =>
  (Component) =>
    (props) => {
      const newContainer = container || reactInjextContainer;
      const newProps = Object.assign(
        {},
        props,
        newContainer.getDictionary(...dependencies, true),
      );

      return (<Component {...newProps} />);
    };

export default reactInjextHOC;
