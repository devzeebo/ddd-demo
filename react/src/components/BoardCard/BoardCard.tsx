import type { BoardDescriptor } from '#/domain/models/BoardDescriptor';
import Link from 'next/link';
import React from 'react';

export type BoardCardProps = {
  board: BoardDescriptor
};

const BoardCard = ({
  board,
}: BoardCardProps) => (
  <Link href={`/boards/${board.name}`}>
    <div className="bg-white py-2 px-10 rounded-xl flex flex-col items-center h-40 w-50 shadow-sm">
      <div className="text-lg">{board.name}</div>
      <div className="text-sm">{board.cards}</div>
    </div>
  </Link>
);

export default BoardCard;
