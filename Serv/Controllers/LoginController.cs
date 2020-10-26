using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.IdentityModel.Tokens;
// using Microsoft.Owin.Security.Jwt;
using Serv.Models;
using Serv.ViewModels;

namespace Serv.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
	public class LoginController : ControllerBase
	{
        SqliteConnection connection;
        List<User> users;
        public LoginController()
        {
            connection = new SqliteConnection("Data Source=.\\wwwroot\\LetterDatabase.sqlite");
            users = new List<User>();
            fill_list();
        }
        /// <remarks>
        /// Sample request:
        ///     POST /User
        ///     {
        ///        "Login":"admin",
        ///        "Password":"admin"
        ///     }
        /// </remarks>
        /// <summary>
        /// The only method that allows login
        /// </summary>
        /// <param name="user"></param>
        /// <response code="200">User is login. Returns Token and Role</response>
        /// <response code="401">User isn't login</response>
        [HttpPost]
        // [EnableCors("developerska")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public IActionResult Login([FromBody]UserLogin user)
        {
            if (user == null)
            {
                return BadRequest("Invalid client request");
            }
            else
            {
                if (users.Any(x => x.Login == user.Login && x.Password == user.Password))
                {
                    var uss = users.Where(x => x.Login == user.Login && x.Password == user.Password).Single();
                    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                    var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Name, uss.Login),
                        new Claim(ClaimTypes.Role, uss.Type)
                    };
                    var tokeOptions = new JwtSecurityToken(
                        issuer: "http://localhost:5000",
                        audience: "http://localhost:5000",
                        claims: claims,
                        expires: DateTime.Now.AddMinutes(10),
                        signingCredentials: signinCredentials
                    );
                    var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                    
                    return Ok(new { Token = tokenString, Role = uss.Type });
                }
                else
                {
                    return Unauthorized();
                }
            }
        }

		[ApiExplorerSettings(IgnoreApi = true)]
        void fill_list()
        {
            users.Clear();
            string cmd = "select * from users;";
            SqliteCommand sql_cmd = new SqliteCommand(cmd, connection);
            connection.Open();
            SqliteDataReader data = sql_cmd.ExecuteReader();
            while (data.Read())
            {
                long _id = (long)data[0];
                string _login = (string)data[1];
                string _password = (string)data[2];
                string _type = (string)data[3];
                users.Add(new User { Id = _id, Login = _login, Password = _password, Type = _type });
            }
            order_id();
            connection.Close();
        }

		[ApiExplorerSettings(IgnoreApi = true)]
        void order_id()
        {
            for (int i = 0; i < users.Count; i++)
                users[i].Id = i;
        }

		[ApiExplorerSettings(IgnoreApi = true)]
        void save_all_changes()
        {
            string cmd_reset = "delete from users;";
            SqliteCommand sql_cmd = new SqliteCommand(cmd_reset, connection);
            connection.Open();
            sql_cmd.ExecuteNonQuery();
            foreach (var user in users)
            {
                string cmd_ins = "insert into users(id,login,password,type) values(" + user.Id.ToString() + ",'" + user.Login + "','" + user.Password + "','" + user.Type + "');";
                SqliteCommand sql_cmd_in = new SqliteCommand(cmd_ins, connection);
                sql_cmd_in.ExecuteNonQuery();
            }
            connection.Close();
        }

    }
}