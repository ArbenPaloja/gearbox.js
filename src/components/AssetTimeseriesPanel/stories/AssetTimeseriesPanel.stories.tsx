import { GetTimeSeriesMetadataDTO } from '@cognite/sdk';
import { CogniteAsyncIterator } from '@cognite/sdk/dist/src/autoPagination';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { timeseriesListV2 } from '../../../mocks/';
import { ASSET_META_SERIES_STYLES } from '../../../mocks/events';
import { ClientSDKProvider } from '../../ClientSDKProvider';
import { MockDatapointsClientObject } from '../../TimeseriesChart/stories/TimeseriesChart.stories';
import {
  MockTimeseriesClientObject,
  TimeseriesMockClient,
} from '../../TimeseriesChart/stories/TimeseriesChart.stories';
import { AssetTimeseriesPanel } from '../AssetTimeseriesPanel';
import customSpinner from './customSpinner.md';
import customStyles from './customStyles.md';
import customTimeseriesChartMeta from './customTimeseriesChartMeta.md';
import fullDescription from './full.md';
import loadCallback from './loadCallback.md';

class CogniteClient extends TimeseriesMockClient {
  timeseries: any = {
    ...MockTimeseriesClientObject,
    list: (): CogniteAsyncIterator<GetTimeSeriesMetadataDTO[]> => {
      return {
        // @ts-ignore TODO - remove this ts-ignore after fixing SDK
        autoPagingToArray: async () => {
          await new Promise(resolve => setTimeout(resolve, 1000));
          return timeseriesListV2;
        },
      };
    },
  };
  datapoints: any = {
    ...MockDatapointsClientObject,
    retrieveLatest: () =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve([
            {
              isString: false,
              id: 123,
              datapoints: [
                {
                  timestamp: new Date(Date.now()),
                  value: 15 + Math.random() * 5.0,
                },
              ],
            },
          ]);
        }, 1000);
      }),
  };
}

const sdk = new CogniteClient({ appId: 'gearbox test' });

const clientSdkDecorator = (storyFn: any) => (
  <ClientSDKProvider client={sdk}>{storyFn()}</ClientSDKProvider>
);

storiesOf('AssetTimeseriesPanel', module)
  .addDecorator(clientSdkDecorator)
  .add(
    'Full Description',
    () => {
      return <AssetTimeseriesPanel assetId={4650652196144007} />;
    },
    {
      readme: {
        content: fullDescription,
      },
    }
  );

storiesOf('AssetTimeseriesPanel/Examples', module)
  .addDecorator(clientSdkDecorator)
  .add(
    'With load callback',
    () => {
      return (
        <AssetTimeseriesPanel
          assetId={4650652196144007}
          onAssetTimeseriesLoaded={action('onAssetTimeseriesLoaded')}
        />
      );
    },
    {
      readme: {
        content: loadCallback,
      },
    }
  )
  .add(
    'With custom spinner',
    () => {
      return (
        <AssetTimeseriesPanel
          assetId={4650652196144007}
          customSpinner={<div>Loading...</div>}
        />
      );
    },
    {
      readme: {
        content: customSpinner,
      },
    }
  )
  .add(
    'Custom TimeseriesChartMeta',
    () => {
      return (
        <AssetTimeseriesPanel
          assetId={4650652196144007}
          defaultTimePeriod="lastHour"
          liveUpdate={false}
          showChart={true}
          showDescription={false}
          showDatapoint={true}
          showMetadata={false}
          showPeriods={true}
        />
      );
    },
    {
      readme: {
        content: customTimeseriesChartMeta,
      },
    }
  )
  .add(
    'With custom styles',
    () => {
      return (
        <AssetTimeseriesPanel
          assetId={4650652196144007}
          styles={ASSET_META_SERIES_STYLES}
        />
      );
    },
    {
      readme: {
        content: customStyles,
      },
    }
  );
