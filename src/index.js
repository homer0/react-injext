import ReactInjextContainer, { reactInjextContainer } from './container';
import reactInjextDecorator from './decorator';
import reactInjextHOC from './hoc';

const container = reactInjextContainer;
const inject = reactInjextDecorator;

export default reactInjextHOC;
export {
  ReactInjextContainer,
  container,
  inject,
};
