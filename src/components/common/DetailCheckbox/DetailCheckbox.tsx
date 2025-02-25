import { Checkbox } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { withDefaultTheme } from '../../../hoc/withDefaultTheme';
import { AnyIfEmpty } from '../../../interfaces';

export interface DetailCheckboxProps {
  checked: boolean;
  description: string;
  disabled: boolean;
  onContainerClick: any;
  onContainerMouseOver?: any;
  title: string;
  className: string;
  checkable: boolean;
  theme?: AnyIfEmpty<{}>;
}

const defaultProps = {
  checkable: true,
  onContainerClick: null,
  disabled: false,
  checked: false,
  className: 'detail-checkbox',
};

const DetailCheckbox: React.SFC<DetailCheckboxProps> = ({
  checked,
  description,
  disabled,
  onContainerClick,
  onContainerMouseOver,
  title,
  className,
  checkable,
}) => (
  <Container
    className={className}
    onClick={disabled ? null : onContainerClick}
    onMouseOver={onContainerMouseOver}
  >
    <div style={{ wordBreak: 'break-all' }}>
      <span
        style={{
          fontSize: '14px',
        }}
      >
        {title}
      </span>
      <br />
      <span
        style={{
          fontSize: '12px',
          opacity: 0.6,
        }}
      >
        {description}
      </span>
    </div>
    {checkable && (
      <Checkbox
        checked={checked}
        disabled={disabled}
        onClick={e => e.preventDefault()}
      />
    )}
  </Container>
);

DetailCheckbox.defaultProps = defaultProps;

const Container = styled.div`
  background: white;
  border: 'none';
  border-radius: 3px;
  display: inline-flex;
  justify-content: space-between;
  padding: 8px;
  margin-right: 'inherit';
  cursor: pointer;
  margin-bottom: 4px;
  width: 100%;
  transition: 0.3s all;

  &.active {
    background-color: ${({ theme }) => theme.gearbox.selectColor};
  }

  label {
    margin: auto 16px auto 32px;
  }
`;

const Component = withDefaultTheme(DetailCheckbox);
Component.displayName = 'DetailCheckbox';

export { Component as DetailCheckbox };
