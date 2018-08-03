# React Injext

> This is just a WIP; it's usable, but I'll be adding proper documentation, tests and the build engine on the following weeks.

## HOC

```js
import React from 'react';
import { compose } from 'recompose';
import inject from 'react-injext';
import MyService from '...';

const MyComponent = (props) => {
  const { dependencies: [myService] } = props;
  return (
    <button onClick={() => myService.doSomething()}>Click Me!</button>
  );
}

export default compose(
  inject(MyService)
)(MyComponent);
```

> The HOC support infinite number of items.
>
> **Named props were removed (for now) as they don't work after uglification.**

## Decorator (for services)

```js
import MyOtherService from '...';
import { inject } from 'react-injext';

@inject(MyOtherService)
class MyService {
  constructor(myOtherService) {
    myOtherService.doSomethingElse();
  }
}

export default MyService;
```

> This will add a static property called `inject` that the HOC will use to instantiate the dependencies and the service itself.

--

to be continued...