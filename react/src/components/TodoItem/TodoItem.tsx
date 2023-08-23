import type { Card } from '#/domain/models/Board';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export type BoardItemProps = {
  className?: string,
  todo: Card
};

const BoardItem = ({
  className,
  todo,
}: BoardItemProps) => (
  <div className={twMerge('flex flex-row gap-2', className)}>
    <input type="checkbox" checked={todo.completed} />
    {todo.title}
  </div>
);

export default BoardItem;
