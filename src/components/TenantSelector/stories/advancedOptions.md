## Advanced options

<!-- STORY -->

#### Usage:

```typescript jsx
import 'antd/dist/antd.css';

import React from 'react';
import { TenantSelector, PureObject } from '@cognite/gearbox';

const onTenantSelected = (tenant: string, advancedOptions: PureObject | null) => {};

function ExampleComponent(props) {
  return (
    <TenantSelector
      title="Example app"
      advancedOptions={{ apiUrl: '', comment: 'Comment' }}
      onTenantSelected={onTenantSelected}
    />
  );

}
```
