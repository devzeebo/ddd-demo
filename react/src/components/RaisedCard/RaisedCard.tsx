import React from 'react';
import type { ForwardedRef, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

export type RaisedCardProps = PropsWithChildren<{
  className?: string,
} & Record<string, any>>;

// eslint-disable-next-line react/display-name -- ref
const RaisedCard = React.forwardRef((
  {
    className,
    children,
    ...rest
  }: RaisedCardProps,
  ref: ForwardedRef<HTMLDivElement>,
) => (
  <div
    ref={ref}
    className={twMerge('bg-blue-300 py-2 px-10 rounded-xl flex flex-col shadow-sm', className)}
    {...rest}
  >
    {children}
  </div>
));

export default RaisedCard;
