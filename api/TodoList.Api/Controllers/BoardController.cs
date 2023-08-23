using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace TodoList.Api.Controllers;

[Route("api/boards")]
public partial class BoardController : ControllerBase
{
    readonly IMediator _mediator;

    public BoardController(IMediator mediator)
    {
        _mediator = mediator;
    }
}