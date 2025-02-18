using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.RequestHelpers;

namespace API.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaginationHeader(this HttpResponse response,MetaData metadata)
        {
            var options=new JsonSerializerOptions{PropertyNamingPolicy=JsonNamingPolicy.CamelCase};
            response.Headers.Add("Pagination",JsonSerializer.Serialize(metadata,options));
            //Shows repsonse  headers in Network tab as Access-Control-Expose-Headers:Pagination
            response.Headers.Add("Access-Control-Expose-Headers","Pagination");
           
        }
    }
}