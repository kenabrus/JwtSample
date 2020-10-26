using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Serv
{
    public class MyHeaderMiddleware
    {
        private readonly RequestDelegate _next;

        public MyHeaderMiddleware(RequestDelegate next)
        {
            _next = next;
            Console.WriteLine("MyHeaderMiddleware(RequestDelegate next)");
        }

        /// <summary>
    /// The main task of the middleware. This will be invoked whenever
    /// the middleware fires
    /// </summary>
    /// <param name="HttpContext">
    /// The <see cref="HttpContext" />
    /// for the current request or response
    /// </param>
    /// <returns></returns>
    public async Task Invoke(HttpContext httpContext)
    {
      // Do something here
      DateTime now = DateTime.UtcNow;


      var authorization = httpContext.Request.Headers["Authorization"];
      Console.WriteLine($"{now}  Invoke(HttpContext httpContext) Authorization: " + authorization + Environment.NewLine);
      // Call the next middleware in the chain
      await _next.Invoke(httpContext);
    }
    }
}