# Event Preview

<!-- STORY -->

### Description:

`EventPreview` component fetches information about an event and presents it as a block element with following items: event type / event subtype,
event description, event start datetime and end datetime, number of elements in metadata (additional pieces of data), button to explore 
additional event details. The component requires only `eventId` that is numerical ID of an event. While loading an event the component 
shows loading spinner.

**NOTE:** The component should have `ClientSDKProvider` as a parent component in react component tree.

#### Usage:

```typescript jsx
import 'antd/dist/antd.css';

import React from 'react';
import { CogniteEvent } from '@cognite/sdk';
import { EventPreview } from '@cognite/gearbox';

function ExampleComponent(props) {
  const onShowDetails = (event: CogniteEvent) = {};

  return (
    <EventPreview 
      eventId={4650652196144007}
      onShowDetails={onShowDetails} 
    />
  );

}
```

#### Available props:

##### Required:

| Property  | Description | Type     | Default |
| --------- | ----------- | -------- | ------- |
| `eventId` | Event Id    | `number` |         |

##### Optionals:

| Property            | Description                                                                | Type                                          | Default     |
| ------------------- | -------------------------------------------------------------------------- | --------------------------------------------- | ----------- |
| `hideProperties`    | List of event properties to be hidden. Possible values: `type`, `subtype`, `description`, `startTime`, `endTime`, `metadata`| `Array<keyof Event>`                          | []          |
| `hideLoadingSpinner`| Defines whether to hide the loading spinner                                | `boolean`                       |             | false       |
| `onShowDetails`     | Function triggered when user clicks on the 'Explore event details' button. If the function is not provided the button will not be rendered. | `(event: CogniteEvent) => void`     |             |             |
| `strings`           | Object map with strings to customize/localize text in the component        | `{[key: string]: string}`       |             |             |
| `styles`            | Object that defines inline CSS styles for inner elements of the component. | `EventPreviewStyles`            |             |             |

`strings` default value is:
```js
{
  noDescription: 'No description',
  start: 'Start',
  end: 'End',
  noStartTime: 'Unknown',
  noEndTime: 'Ongoing',
  details: 'Explore event details',
  metadataSummary: 'Contains {{count}} additional pieces of data',
}
```


### Types

#### CogniteEvent
`CogniteEvent` type can be imported from `@cognite/sdk`:

```typescript
import { CogniteEvent } from '@cognite/sdk';
```

#### EventPreviewStyles
This interface defines inline CSS styles for inner elements of `EventPreview` component.
You can override styles of following blocks:

<img src="event_preview/styling_schema.jpg" alt="EventPreview Styling" width="600px">
<br><br>
The type can be imported from `@cognite/gearbox`:

```typescript
import { EventPreviewStyles } from '@cognite/gearbox';
```

Definition:

```typescript
interface EventPreviewStyles {
  wrapper?: React.CSSProperties;
  eventType?: React.CSSProperties;
  title?: React.CSSProperties;
  button?: React.CSSProperties;
  times?: React.CSSProperties;
  metadata?: React.CSSProperties;
}
```

See more details in `Custom Styles` example.
