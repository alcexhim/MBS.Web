using System;
using System.Web;

namespace MBS.Web.Plugins.Less
{
	public class LessHandler : IHttpHandler
	{
		public bool IsReusable => true;

		public void ProcessRequest(HttpContext context)
		{
			dotless.Core.configuration.DotlessConfiguration config = new dotless.Core.configuration.DotlessConfiguration();
			config.Debug = true;

			string path = System.IO.Path.ChangeExtension(context.Request.Path, "less");
			config.RootPath = System.IO.Path.GetDirectoryName(context.Request.PhysicalPath);

			try
			{
				string less = System.IO.File.ReadAllText(context.Request.MapPath(path));
				string css = dotless.Core.Less.Parse(less, config);

				context.Response.StatusCode = 200;
				context.Response.ContentType = "text/css";
				context.Response.Write(css);
				context.Response.End();
			}
			catch (System.IO.FileNotFoundException ex)
			{
				context.Response.StatusCode = 404;
				if (context.Request.IsLocal)
				{
					context.Response.Write("/* RootPath: " + config.RootPath + "*/");
					context.Response.Write("/* File Not Found while parsing: " + ex.Message + " */");
				}
				else
				{
					context.Response.Write("/* Error Occurred. Consult log or view on local machine. */");
				}
				context.Response.End();
			}
			catch (System.IO.IOException ex)
			{
				context.Response.StatusCode = 500;
				if (context.Request.IsLocal)
				{
					context.Response.Write("/* Error in less parsing: " + ex.Message + " */");
				}
				else
				{
					context.Response.Write("/* Error Occurred. Consult log or view on local machine. */");
				}
				context.Response.End();
			}
		}

	}
}
