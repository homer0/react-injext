class ReactInjextContainer {
  constructor(containerName = 'reactInjext') {
    this.containerName = containerName;
    this._dependencies = [];
  }

  get(...dependencies) {
    return dependencies.map((dependency) => this._getInstance(dependency));
  }

  getDictionary(...dependencies) {
    const result = {};
    dependencies.forEach((dependency) => {
      const info = this._getInstance(dependency, true);
      result[info.name] = info.instance;
    });

    return result;
  }

  asSingleton(dependency) {
    return this._asDependency(dependency);
  }

  asTransient(dependency) {
    return this._asDependency(dependency, {
      type: 'transient',
    });
  }

  _asDependency(dependency, options = {}) {
    return Object.assign(
      {
        class: dependency,
        injext: this.containerName,
        type: 'singleton',
      },
      options,
    );
  }

  _getInstance(dependency, named = false) {
    const dependencyInfo = this._isDependency(dependency) ?
      dependency :
      this._asDependency(dependency);
    const isSingleton = dependencyInfo.type === 'singleton';
    let instance;
    if (isSingleton && this._dependencies[dependencyInfo.class]) {
      instance = this._dependencies[dependencyInfo.class];
    } else {
      instance = this._buildInstance(dependencyInfo.class);
      if (isSingleton) {
        this._dependencies[dependencyInfo.class] = instance;
      }
    }

    return named ?
      {
        name: this._getDependencyName(dependencyInfo),
        instance,
      } :
      instance;
  }

  _isDependency(dependency) {
    return dependency.injext === this.containerName;
  }

  _buildInstance(ClassForInstance) {
    const dependencies = ClassForInstance.inject || [];
    const dependenciesList = dependencies
    .map((dependency) => this._getDependency(dependency));
    return new ClassForInstance(...dependenciesList);
  }

  _getDependencyName(dependency) {
    const { name } = dependency.class;
    const firstLetter = name.substr(0, 1).toLowerCase();
    const rest = name.substr(1);
    return `${firstLetter}${rest}`;
  }
}

export default ReactInjextContainer;
export const reactInjextContainer = new ReactInjextContainer();
