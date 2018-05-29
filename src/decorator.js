const reactInjextDecorator = (...dependencies) => (target) => {
  // eslint-disable-next-line no-param-reassign
  target.inject = dependencies;
};

export default reactInjextDecorator;
