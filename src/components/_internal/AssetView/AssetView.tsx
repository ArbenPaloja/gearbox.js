import { Tag } from 'antd';
import React from 'react';
import { OnClick } from '../../../interfaces';
import { getColorByString } from '../../../utils/colors';

export interface AssetViewProps {
  asset: {
    id: number;
    name?: string;
    description?: string;
    metadata?: {
      ASSETSCOPENAME?: string;
      DESCRIPTION?: string;
      NAME?: string;
      PARENTUID?: string;
      SOURCE?: string;
      SOURCEID?: string;
      SOURCE_DB?: string;
      SOURCE_TABLE?: string;
      TYPE?: string;
      UID?: string;
    };
  };
  onClick?: OnClick;
  onClose?: () => void;
  color?: boolean | string;
}

export const AssetView = (props: AssetViewProps) => {
  const { asset, onClick, onClose, color } = props;

  if (!props.asset) {
    return null;
  }

  let tagColor;
  if (typeof color === 'string') {
    tagColor = color;
  } else if (color) {
    tagColor = getColorByString(asset.id.toString());
  }

  return (
    <Tag
      style={{ display: 'inline-block' }}
      onClick={onClick}
      closable={!!onClose}
      onClose={onClose}
      color={tagColor}
    >
      {asset.name || ''}
    </Tag>
  );
};

AssetView.displayName = 'AssetView';
