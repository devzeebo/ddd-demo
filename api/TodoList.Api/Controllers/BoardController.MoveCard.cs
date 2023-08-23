using Microsoft.AspNetCore.Mvc;
using TodoList.App;
using TodoList.App.Handlers;

namespace TodoList.Api.Controllers;

public class MoveCardApiRequest
{
    public required string TargetGroup { get; init; }
    public required int Order { get; init; }
}

public partial class BoardController
{
    [HttpPost, Route("{boardName}/cards/{cardName}/move")]
    public async Task<IActionResult> MoveCard(string boardName, string cardName, [FromBody] MoveCardApiRequest request)
    {
        await _mediator.Send(new MoveCardCommand
        {
            BoardName = boardName,
            CardName = cardName,
            TargetGroup = request.TargetGroup,
            Order = request.Order,
        });

        return Ok();
    }
}