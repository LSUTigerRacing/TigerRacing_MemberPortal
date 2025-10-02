using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace TRFSAE.MemberPortal.API.Controllers;


[Route("[controller]")]
public class Program : Controller
{
    private readonly ILogger<Program> _logger;

    public Program(ILogger<Program> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View("Error!");
    }

    public IActionResult CreateUser(CreateUserRequest request)
    {
        //create the user
        //return the created response(201)

        return CreatedAtAction(
        nameof(Get),                        //method to get the user id
        new { id = Guid.NewGuid() },        //parameters needed for this method
        value: request);                    //resource
    }

    [HttpGet("id:guid")]
    public IActionResult Get(Guid id)
    {
        //get the user: I havent made references to the user, nor have I created the model for which the user's information will function 
        //return the OK response(200)

        return Ok(
        //resource
        );
    }

    public record CreateUserRequest(
        string Name,
        Array Roles,
        Boolean Active);
    }

