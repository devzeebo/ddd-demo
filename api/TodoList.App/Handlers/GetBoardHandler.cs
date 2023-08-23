using MediatR;
using TodoList.Domain;
using TodoList.Infrastructure;

namespace TodoList.App;

public class GetBoardQuery : IRequest<GetBoardResponse>
{
    public required string Name { get; init; }
}

public class GetBoardResponse
{
    public required BoardAggregate Board { get; init; }
}

public class GetBoardHandler : IRequestHandler<GetBoardQuery, GetBoardResponse>
{
    readonly IRepository _repo;

    public GetBoardHandler(IRepository repo)
    {
        _repo = repo;
    }

    public async Task<GetBoardResponse> Handle(GetBoardQuery request, CancellationToken cancellationToken)
    {
        var board = await _repo.Query(new FindBoard(request.Name), cancellationToken, required: true);

        var aggregate = new BoardAggregate(board);

        return new GetBoardResponse
        {
            Board = aggregate
        };
    }
}

public class BoardAggregate
{
    public string Name { get; private set; }
    public IEnumerable<Group> Groups { get; private set; }

    public BoardAggregate(TodoBoard board)
    {
        Name = board.Name;
        Groups = board.Groups
            .Select(x => new Group(x))
            .ToList();
    }

    public class Group
    {
        public string Name { get; private set; }
        public IEnumerable<Card> Cards { get; private set; }
        public Group(TodoGroup group)
        {
            Name = group.Name;
            Cards = group.Todos
                .Select(x => new Card(x))
                .ToList();
        }
    }

    public class Card
    {
        public string Title { get; private set; }
        public bool Completed { get; private set; }

        public Card(Todo todo)
        {
            Title = todo.Title;
            Completed = todo.Completed;
        }
    }
}