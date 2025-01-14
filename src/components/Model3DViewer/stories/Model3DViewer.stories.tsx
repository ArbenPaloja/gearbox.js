import { OnProgressData } from '@cognite/3d-viewer';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import {
  createFakeViewer,
  generateNumber,
  Mock3DCogniteClient,
} from '../../../mocks';
import { ClientSDKProvider } from '../../ClientSDKProvider';
import { mockCreateViewer, Model3DViewer } from '../Model3DViewer';
import full from './full.md';
import screenshot from './screenshot.md';
import slice from './slice.md';
import slider from './slider.md';

const sdk = new Mock3DCogniteClient({ appId: 'gearbox test' });

const modelID = 0;
const revisionID = 0;
const cache = {};

const Wrapper = styled.div`
  padding: 20px;
`;

const clientSDKDecorator = (storyFn: any) => (
  <ClientSDKProvider client={sdk}>{storyFn()}</ClientSDKProvider>
);

const onClick = (modelId: number, point: THREE.Vector3) =>
  action('onClick')(
    modelId || generateNumber(),
    point ||
      new THREE.Vector3(generateNumber(), generateNumber(), generateNumber())
  );
const onProgress = (progress: OnProgressData) => action('onProgress')(progress);
const onComplete = () => action('onComplete')();
const onReady = () =>
  action('onReady')(
    { name: 'viewer' },
    { name: 'model' },
    { name: 'revision' }
  );

storiesOf('Model3DViewer', module)
  .addDecorator(clientSDKDecorator)
  .add(
    'Full description',
    () => {
      mockCreateViewer(createFakeViewer);

      return (
        <Wrapper>
          <Model3DViewer
            modelId={modelID}
            revisionId={revisionID}
            onClick={onClick}
            onProgress={onProgress}
            onComplete={onComplete}
            onReady={onReady}
            cache={cache}
          />
        </Wrapper>
      );
    },
    {
      readme: {
        content: full,
      },
    }
  );

storiesOf('Model3DViewer/Examples', module)
  .addDecorator(clientSDKDecorator)
  .add(
    'Take Screenshots',
    () => {
      mockCreateViewer(createFakeViewer);
      return (
        <Wrapper>
          <Model3DViewer
            modelId={modelID}
            revisionId={revisionID}
            showScreenshotButton={true}
            onScreenshot={(url: string) => {
              const img = document.createElement('img');
              img.src = url;
              document.body.append(img);
            }}
          />
        </Wrapper>
      );
    },
    {
      readme: {
        content: screenshot,
      },
    }
  )
  .add(
    'Slice',
    () => {
      mockCreateViewer(createFakeViewer);
      return (
        <Wrapper>
          <Model3DViewer
            modelId={modelID}
            revisionId={revisionID}
            slice={{
              y: { coord: 0, direction: false },
            }}
          />
        </Wrapper>
      );
    },
    {
      readme: {
        content: slice,
      },
    }
  )
  .add(
    'Add Sliders to Model',
    () => {
      mockCreateViewer(createFakeViewer);
      return (
        <Wrapper>
          <Model3DViewer
            modelId={modelID}
            revisionId={revisionID}
            slider={{
              x: { min: -1.5, max: 1.5 },
              y: { min: -1.5, max: 1.5 },
              z: { min: -5.5, max: 1 },
            }}
          />
        </Wrapper>
      );
    },
    {
      readme: {
        content: slider,
      },
    }
  );
