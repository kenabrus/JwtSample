using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;
using Serv.Models;
using Serv.ViewModels;

namespace Serv.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LetterController : ControllerBase
    {
        SqliteConnection connection;
        List<Letter> lettersList;

        public LetterController()
        {
            connection = new SqliteConnection("Data Source=.\\wwwroot\\LetterDatabase.sqlite");
            lettersList = new List<Letter>();
        }
        /// <summary>
        /// Returns all heroes
        /// </summary>
        /// <response code="200">Returns all heroes from base</response>
        /// <response code="401">User isn't login</response>
        // [HttpGet, Authorize/*(Roles ="casual"),Authorize(Roles ="admin")*/]
        [HttpGet]
        // s[Authorize(Roles = "admin")]
        [Authorize]
        [EnableCors("developerska")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<IEnumerable<Letter>> Get([FromQuery]string sort)
        {
            string cmd = "select * from letters;";
            SqliteCommand sql_cmd = new SqliteCommand(cmd, connection);
            connection.Open();
            SqliteDataReader data = sql_cmd.ExecuteReader();
            while (data.Read())
            {
                long _id = (long)data[0];
                string _character = (string)data[1];
                string _description = (string)data[2];
                string _imagePath = (string)data[3];
                lettersList.Add(new Letter { Id = (int)_id, Character = _character, Description = _description, ImagePath = _imagePath });
            }
            connection.Close();

            if (!String.IsNullOrEmpty(sort))
            {
                switch (sort)
                {
                    case "asc":
                        lettersList= lettersList.OrderBy(x => x.Character).ToList();
                        break;
                    case "desc":
                        lettersList=lettersList.OrderByDescending(x => x.Character).ToList();
                        break;
                }
                Console.WriteLine("sort: "+ sort);
            }
            return lettersList;
        }


        ///// <remarks>
        ///// Sample request:
        /////     GET
        /////     {
        /////        id:1
        /////     }
        ///// </remarks>
        /// <summary>
        /// Return letter by id
        /// </summary>
        /// <param name="id"></param>
        /// <response code="200">Returns specific hero from base</response>
        /// <response code="401">User isn't login</response>
        /// <response code="404">Id is invalid</response>
        [HttpGet("{id}"), Authorize/*(Roles = "casual"), Authorize(Roles = "admin")*/]
        [EnableCors("developerska")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Letter> Get(int id)
        {
            string commandText = "select * from letters where id=" + id + ";";
            List<Letter> tempList = new List<Letter>();
            try
            {
                SqliteCommand sqliteCommand = new SqliteCommand(commandText, connection);
                connection.Open();
                SqliteDataReader data = sqliteCommand.ExecuteReader();
                while (data.Read())
                {
                    long _id = (long)data[0];
                    string _character = (string)data[1];
                    string _description = (string)data[2];
                    string _imagePath = (string)data[3];
                    tempList.Add(new Letter { Id = (int)_id, Character = _character, Description = _description, ImagePath = _imagePath });
                }
                connection.Close();
                return tempList.ElementAt(0);

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }


        /// <remarks>
        /// Sample request:
        ///     POST /Letter
        ///     {
        ///         Id:0,
        ///        "Character":"abc",
        ///        "Description":"cba",
        ///        "ImagePath":"xyz"
        ///     }
        /// </remarks>
        /// <summary>
        /// Adds a specific Letter in db
        /// </summary>
        /// <param name="value"></param>
        /// <response code="200">Returns true after added hero to base</response>
        /// <response code="401">User isn't login</response>
        /// <response code="404">Id is invalid</response>
        [HttpPost, Authorize(Roles = "admin")]
        [EnableCors("developerska")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public bool Post([FromBody] LetterPost value)
        {
            Letter letter = new Letter() { Character = value.Character, Description = value.Description, ImagePath = value.ImagePath };

            string commandText = "insert into letters(Character, Description, ImagePath) values ('" + letter.Character + "','" + letter.Description + "','" + letter.ImagePath + "')";
            try
            {
                connection.Open();
                SqliteCommand sqliteCommand = new SqliteCommand(commandText, connection);
                sqliteCommand.ExecuteNonQuery();
                connection.Close();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }

        }
        /// <remarks>
        /// Sample request:
        ///     PUT /Letter
        ///     {   
        ///         Id:0,
        ///        "Character":"abc",
        ///        "Description":"cba",
        ///        "ImagePath":"xyz"
        ///     }
        /// </remarks>
        /// <summary>
        /// Changes a specific letter.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="value"></param>
        /// <response code="200">Returns true after founded and changed hero, when id is invalid returns false</response>
        /// <response code="401">User isn't login</response>
        /// <response code="404">Id is invalid</response>
        [HttpPut("{id}"), Authorize(Roles = "admin")]
        [EnableCors("developerska")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public bool Put(int id, [FromBody] LetterPost value)
        {
            //string cmd_ins = "insert into letters(Character, Description, ImagePath) VALUES ('"+ letter.Character + "','" + letter.Description + "','" + letter.ImagePath + "')";

            string commandText = "update letters set character = '" + value.Character + "', description = '" + value.Description + "', imagePath = '" + value.ImagePath + "' where id = '" + id + "' ";
            try
            {
                connection.Open();
                SqliteCommand sqliteCommand = new SqliteCommand(commandText, connection);
                sqliteCommand.ExecuteNonQuery();
                connection.Close();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
                return false;
            }
        }
        /// <summary>
        /// Delete letter width specific id.
        /// </summary>
        /// <param name="hero id"></param>
        /// <response code="200">Returns succesfull result</response>
        [HttpDelete("{id}"), Authorize(Roles = "admin")]
        [EnableCors("developerska")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public bool Delete(int id)
        {
            if (id >= 0)
            {
                string commandText = "delete from letters where id=" + id + ";";
                try
                {
                    connection.Open();
                    SqliteCommand sqliteCommand = new SqliteCommand(commandText, connection);
                    sqliteCommand.ExecuteNonQuery();
                    connection.Close();
                    return true;
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return false;
                }
            }
            else
                NotFound();
            return false;
        }
    }
}