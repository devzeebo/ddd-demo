import type { GetServerSideProps } from 'next';
import type { AppDispatch } from '#/components/ReduxProvider/store';
import { wrapper } from '#/components/ReduxProvider/store';
import { boardsApi } from '#/domain/reducers/boardsReducer';

export const getServerSideProps: GetServerSideProps<{}> = (
  wrapper.getServerSideProps((store) => (
    async () => {
      const dispatch = store.dispatch as AppDispatch;

      dispatch(boardsApi.endpoints.getAllBoards.initiate());

      await Promise.all(dispatch(boardsApi.util.getRunningQueriesThunk()));

      return {
        props: {},
      };
    }
  ))
);
