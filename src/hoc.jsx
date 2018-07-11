import React from 'react';
import { reactInjextContainer } from './container';

const reactInjextHOC = (dependencies, container = null) =>
  (Component) =>
    (props) => {
      const newContainer = container || reactInjextContainer;
      const newProps = Object.assign(
        {},
        props,
        newContainer.getDictionary(...dependencies),
      );

      return (<Component {...newProps} />);
    };

export default reactInjextHOC;
