import BoardListGroup from '#/components/BoardPanel';
import { useGetBoardByNameQuery } from '#/domain/reducers/boardsReducer';

export type BoardPageProps = {
  todoListId: string,
};
const BoardPage = ({
  todoListId,
}: BoardPageProps) => {
  const { data, isLoading } = useGetBoardByNameQuery(todoListId);

  if (isLoading) {
    return null;
  }

  return (
    <BoardListGroup board={data!} />
  );
};
export default BoardPage;
