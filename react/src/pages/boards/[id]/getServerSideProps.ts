import type { GetServerSideProps } from 'next';
import type { AppDispatch } from '#/components/ReduxProvider/store';
import { wrapper } from '#/components/ReduxProvider/store';
import { boardsApi } from '#/domain/reducers/boardsReducer';
import type { BoardPageProps } from './BoardPage';

export const getServerSideProps: GetServerSideProps<BoardPageProps> = (
  wrapper.getServerSideProps((store) => (
    async (ctx) => {
      const dispatch = store.dispatch as AppDispatch;

      const todoListId = ctx.query.id as string;

      dispatch(boardsApi.endpoints.getBoardByName.initiate(todoListId));

      await Promise.all(dispatch(boardsApi.util.getRunningQueriesThunk()));

      return {
        props: {
          todoListId,
        },
      };
    }
  ))
);
