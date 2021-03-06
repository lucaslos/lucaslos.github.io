import iconsSet from 'data/icons.ts';
import * as React from 'react';
import { obj } from 'typings/utils';

type JsonIcon = {
  viewBox: string;
  paths?: obj[];
  rects?: obj[];
  colors?: obj[];
};

export type Icons = keyof typeof iconsSet;

type Icon = {
  name: Icons;
  color?: string;
  size?: number;
  className?: string;
};

const Icon = ({ name, color, className = 'icon', size = 24 }: Icon) => {
  if (!iconsSet[name]) throw new Error(`Icon ${name} do not exists`);

  const { viewBox, paths, rects, colors }: JsonIcon = iconsSet[name];

  return (
    <svg
      css={{
        height: size,
        width: size,
        fill: color,
      }}
      className={className}
      viewBox={viewBox}
    >
      {paths &&
        paths.map((pathElem, i) => (
          <path
            key={i}
            d={pathElem.d}
            opacity={pathElem.opacity}
            fillRule={pathElem.evenodd ? 'evenodd' : undefined}
            clipRule={pathElem.evenodd ? 'evenodd' : undefined}
          />
        ))}
      {/* {rects && rects.map(rectElem => <rect />)} */}
    </svg>
  );
};

export default Icon;
