import type { Board } from '#/domain/models/Board';
import { map } from 'rambda';
import React, { useCallback } from 'react';
import type { DropResult } from '@hello-pangea/dnd';
import { DragDropContext } from '@hello-pangea/dnd';
import { useMoveCardMutation } from '#/domain/reducers/boardsReducer';
import GroupColumn from '../GroupColumn';

export type BoardPanelProps = {
  board: Board,
};

const BoardPanel = ({
  board,
}: BoardPanelProps) => {
  const [moveCardMutation] = useMoveCardMutation();

  const moveCard = useCallback(
    (args: DropResult) => {
      if (args.destination) {
        return moveCardMutation({
          boardName: board.name,
          card: args.draggableId,
          targetGroup: args.destination?.droppableId!,
          order: 1,
        });
      }

      return Promise.reject();
    },
    [board.name, moveCardMutation],
  );

  return (
    <DragDropContext onDragEnd={moveCard}>
      <div className="flex flex-row gap-3 justify-around flex-1 py-10">
        {
        map(
          ({ name, cards }) => (
            <GroupColumn
              boardName={board.name}
              key={name}
              title={name}
              cards={cards}
              className="flex-1"
            />
          ),
          board.groups,
        )
      }
      </div>
    </DragDropContext>
  );
};

export default BoardPanel;
