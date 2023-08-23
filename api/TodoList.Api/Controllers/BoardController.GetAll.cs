using Microsoft.AspNetCore.Mvc;
using TodoList.App;

namespace TodoList.Api.Controllers;

public partial class BoardController
{
    [HttpGet, Route("")]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _mediator.Send(new GetAllBoardsQuery()));
    }
}