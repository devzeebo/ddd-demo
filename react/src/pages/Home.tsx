import { useGetAllBoardsQuery } from '#/domain/reducers/boardsReducer';
import { map } from 'rambda';
import BoardCard from '#/components/BoardCard/BoardCard';

const Home = () => {
  const { data, isSuccess } = useGetAllBoardsQuery();

  if (!isSuccess) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-row flex-wrap items-start justify-start py-24">
      {
        map(
          (board) => (
            <BoardCard
              key={board.name}
              board={board}
            />
          ),
          data!,
        )
      }
      <div />
    </main>
  );
};
export default Home;
