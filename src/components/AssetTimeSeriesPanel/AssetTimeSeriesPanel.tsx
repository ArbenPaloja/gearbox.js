import React, { Component } from 'react';
import { Collapse, Radio } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import { VId } from 'utils/validators/VGenericTypes';

interface AssetTimeSeriesPanelTypes {
  timeseries: {
    id: VId;
    name: string;
    [propName: string]: any;
  }[];
  accordionStyle?: boolean;
  defaultActiveKey?: string[];
  onChange?: () => void;
  scales?: {
    [propName: string]: {
      unit: string;
      number: number;
      title: string;
    };
  };
}

const NoData = styled.div`
  display: block;
  padding: 30px;
  text-align: center;
`;

class AssetTimeSeriesPanel extends Component<AssetTimeSeriesPanelTypes> {
  state = {
    baseDomain: { start: +moment().subtract(1, 'hour'), end: +moment() },
  };

  render() {
    const defaultScales = {
      lastYear: {
        unit: 'year',
        number: 1,
        title: '1 year',
      },
      lastMonth: {
        unit: 'month',
        number: 1,
        title: '1 month',
      },
      lastWeek: {
        unit: 'week',
        number: 1,
        title: '1 week',
      },
      lastDay: {
        unit: 'day',
        number: 1,
        title: '1 day',
      },
      lastHour: {
        unit: 'hour',
        number: 1,
        title: '1 hour',
      },
      last15minutes: {
        unit: 'minutes',
        number: 15,
        title: '15 minutes',
      },
    };

    const {
      timeseries,
      accordionStyle = true,
      defaultActiveKey,
      onChange,
      scales = defaultScales,
    } = this.props;

    const timeseriesCol = (timeseries || []).map(ts => ({
      ...ts,
      key: ts.name,
    }));

    return (
      <Collapse
        accordion={accordionStyle}
        defaultActiveKey={defaultActiveKey}
        onChange={onChange}
      >
        {timeseriesCol.length > 0 ? (
          timeseriesCol.map(ts => (
            <Collapse.Panel key={ts.name} header={ts.name}>
              {Object.keys(scales).length > 0 && (
                <div style={{ textAlign: 'center' }}>
                  <Radio.Group>
                    {Object.keys(scales).map(scaleKey => (
                      <Radio.Button value={scaleKey} key={scaleKey}>
                        {scales[scaleKey] && scales[scaleKey].title
                          ? scales[scaleKey].title
                          : ''}
                      </Radio.Button>
                    ))}
                  </Radio.Group>
                </div>
              )}
            </Collapse.Panel>
          ))
        ) : (
          <NoData>No data available</NoData>
        )}
      </Collapse>
    );
  }
}

export default AssetTimeSeriesPanel;
