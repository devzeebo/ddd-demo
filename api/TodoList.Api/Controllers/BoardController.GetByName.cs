using Microsoft.AspNetCore.Mvc;
using TodoList.App;

namespace TodoList.Api.Controllers;

public partial class BoardController
{
    [HttpGet, Route("{name}")]
    public async Task<IActionResult> GetByName(string name)
    {
        return Ok(await _mediator.Send(new GetBoardQuery
        {
            Name = name
        }));
    }
}