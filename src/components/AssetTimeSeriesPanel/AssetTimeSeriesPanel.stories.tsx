import React from 'react';
import { storiesOf } from '@storybook/react';
import AssetTimeSeriesPanel from 'components/AssetTimeSeriesPanel/AssetTimeSeriesPanel';
import { ASSET_TIME_SERIES } from 'mocks/assets';

storiesOf('AssetTimeSeriesPanel', module)
  .addParameters({
    info: {
      inline: true,
      maxPropObjectKeys: 10,
    },
  })
  .add('Minimal', () => (
    <AssetTimeSeriesPanel timeseries={ASSET_TIME_SERIES.items} />
  ));
