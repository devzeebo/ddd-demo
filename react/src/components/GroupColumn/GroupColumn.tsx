/* eslint-disable jsx-a11y/no-noninteractive-element-interactions -- demo */
/* eslint-disable jsx-a11y/no-static-element-interactions -- demo */
import type { Card } from '#/domain/models/Board';
import type { ChangeEvent } from 'react';
import React, { useCallback, useReducer, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import type { DraggableProvided, DroppableProvided } from '@hello-pangea/dnd';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { useCurry } from '@react-shanties/core';
import { useAddCardMutation } from '#/domain/reducers/boardsReducer';
import RaisedCard from '../RaisedCard';

export type GroupColumnProps = {
  boardName: string,
  className?: string,
  title: string,
  cards: Card[]
};

const GroupColumn = ({
  boardName,
  className,
  title,
  cards,
}: GroupColumnProps) => {
  const [newCardTitle, setNewCardTitle] = useReducer(
    (_: any, e: ChangeEvent<HTMLTextAreaElement> | string) => (
      typeof e !== 'string'
        ? e.target.value
        : e
    ),
    '',
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = useCurry(setDialogOpen, true);
  const closeDialog = useCurry(setDialogOpen, false);

  const [addCardMutation] = useAddCardMutation();

  const stopPropagation = useCallback((e: Event) => e.stopPropagation(), []);
  const addCard = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      addCardMutation({
        boardName,
        targetGroup: title,
        title: newCardTitle,
      }).then(() => {
        setNewCardTitle('');
        closeDialog();
      });

      return false;
    },
    [addCardMutation, boardName, closeDialog, newCardTitle, title],
  );

  return (
    <RaisedCard className={twMerge('bg-white', className)}>
      <div className="flex flex-col gap-1 flex-1">
        <div className="flex flew-row justify-between">
          <div className="text-md">{title}</div>
          <button
            type="button"
            className=""
            onClick={openDialog}
          >
            +
          </button>
        </div>
        <Droppable droppableId={title}>
          {(provided: DroppableProvided) => (
            <div
              className="flex flex-col gap-1 flex-1"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {
                cards.map(
                  (card, key) => (
                    <Draggable draggableId={card.title} index={key} key={card.title}>
                      {(dragProvided: DraggableProvided) => (
                        <RaisedCard
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps}
                        >
                          <div>{card.title}</div>
                        </RaisedCard>
                      )}
                    </Draggable>
                  ),
                )
            }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      <form
        className={twMerge('fixed left-0 right-0 top-0 bottom-0 flex items-center justify-center', !dialogOpen && 'hidden')}
        onClick={closeDialog}
        onSubmit={addCard}
      >
        <RaisedCard className="shadow-xl bg-gray-200 border border-gray-200 gap-3 px-5" onClick={stopPropagation}>
          <div className="flex justify-between">
            <div>New Card</div>
            <button type="button" onClick={closeDialog}>X</button>
          </div>
          <textarea
            name="title"
            className="bg-white"
            value={newCardTitle}
            onChange={setNewCardTitle}
          />
          <button
            className="self-end bg-white rounded px-1 py-0.5 shadow-sm"
            type="submit"
          >
            Add Card

          </button>
        </RaisedCard>
      </form>
    </RaisedCard>
  );
};

export default GroupColumn;
