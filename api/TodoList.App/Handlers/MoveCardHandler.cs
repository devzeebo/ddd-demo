using MediatR;
using TodoList.Domain;
using TodoList.Infrastructure;

namespace TodoList.App.Handlers;

public class MoveCardCommand : IRequest<MoveCardResponse>
{
    public required string BoardName { get; init; }
    public required string CardName { get; init; }
    public required string TargetGroup { get; init; }
    public required int Order { get; init; }
}

public class MoveCardResponse
{
}

public class MoveCardHandler : IRequestHandler<MoveCardCommand, MoveCardResponse>
{
    readonly IRepository _repo;

    public MoveCardHandler(IRepository repo)
    {
        _repo = repo;
    }

    public async Task<MoveCardResponse> Handle(MoveCardCommand request, CancellationToken cancellationToken)
    {
        var board = await _repo.Query(new FindBoard(request.BoardName), cancellationToken, required: true);

        TodoGroup? group = null;
        Todo? card = null;

        foreach (var g in board.Groups)
        {
            card = g.Todos.FirstOrDefault(x => x.Title == request.CardName);
            if (card != null)
            {
                group = g;
                break;
            }
        }

        if (group == null || card == null)
        {
            throw new Exception("Card not found!");
        }

        group.Todos.Remove(card);
        board.Groups.First(x => x.Name == request.TargetGroup).Todos.Add(card);

        await _repo.SaveChangesAsync(cancellationToken);

        return new MoveCardResponse();
    }
}