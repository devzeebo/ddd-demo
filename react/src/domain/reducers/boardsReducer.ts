import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import type { Board } from '../models/Board';
import type { BoardDescriptor } from '../models/BoardDescriptor';

type GetBoardByNameResponse = {
  board: Board;
};

type GetAllBoardsResponse = {
  boards: Array<{
    name: string,
    cards: number,
  }>
};

type CreateCardRequest = {
  boardName: string,
  targetGroup: string,
  title: string,
};

type MoveCardRequest = {
  boardName: string,
  card: string,
  targetGroup: string,
  order: number,
};

export const boardsApi = createApi({
  reducerPath: 'boards',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:20000/api' }),
  tagTypes: ['board', 'all-boards', 'board-descriptor'],
  endpoints: (builder) => ({
    getBoardByName: builder.query<Board, string>({
      providesTags: (result) => (
        result
          ? [{ type: 'board' as const, id: result.name }]
          : []
      ),
      query: (id) => `/boards/${id}`,
      transformResponse: (x: GetBoardByNameResponse) => x.board,
    }),
    getAllBoards: builder.query<BoardDescriptor[], void>({
      providesTags: (result) => (
        result
          ? [...result.map((b) => ({ type: 'board-descriptor' as const, id: b.name })), 'all-boards']
          : ['all-boards']
      ),
      query: () => '/boards',
      transformResponse: (x: GetAllBoardsResponse) => x.boards,
    }),
    addCard: builder.mutation<Board, CreateCardRequest>({
      invalidatesTags: (result, error, arg) => (
        ['all-boards', { type: 'board' as const, id: arg.boardName }]
      ),
      query: ({
        boardName,
        targetGroup,
        title,
      }) => ({
        url: `/boards/${boardName}/cards`,
        method: 'POST',
        body: {
          targetGroup,
          title,
        },
      }),
    }),
    moveCard: builder.mutation<Board, MoveCardRequest>({
      invalidatesTags: (result, error, arg) => (
        ['all-boards', { type: 'board' as const, id: arg.boardName }]
      ),
      query: ({
        boardName,
        card,
        targetGroup,
        order,
      }) => ({
        url: `/boards/${boardName}/cards/${card}/move`,
        method: 'POST',
        body: {
          targetGroup,
          order,
        },
      }),
    }),
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }

    return undefined;
  },
});

export const {
  useGetAllBoardsQuery,
  useGetBoardByNameQuery,
  useMoveCardMutation,
  useAddCardMutation,
} = boardsApi;
