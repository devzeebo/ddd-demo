using System.Reflection.Metadata.Ecma335;
using MediatR;
using TodoList.Infrastructure;

namespace TodoList.App;

public class GetAllBoardsQuery : IRequest<GetAllBoardsResponse>
{
}

public class GetAllBoardsResponse
{
    public required IEnumerable<Descriptor> Boards { get; init; }

    public class Descriptor
    {
        public required string Name { get; init; }
        public required int Cards { get; init; }
    }
}

public class GetAllTodoListsHandler : IRequestHandler<GetAllBoardsQuery, GetAllBoardsResponse>
{
    readonly IRepository _repo;

    public GetAllTodoListsHandler(IRepository repo)
    {
        _repo = repo;
    }

    public async Task<GetAllBoardsResponse> Handle(GetAllBoardsQuery request, CancellationToken cancellationToken)
    {
        var allBoards = await _repo.Query(new FindAllBoards(), cancellationToken);

        var descriptors = allBoards
            .Select(board => new GetAllBoardsResponse.Descriptor
            {
                Name = board.Name,
                Cards = board.Groups.Sum(g => g.Todos.Count()),
            })
            .ToList();

        return new GetAllBoardsResponse
        {
            Boards = descriptors,
        };
    }
}