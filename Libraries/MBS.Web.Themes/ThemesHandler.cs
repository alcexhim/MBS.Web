using System;
using System.Web;

namespace MBS.Web.Themes
{
	public class ThemesHandler : IHttpHandler
	{
		public bool IsReusable => true;

		public void ProcessRequest(HttpContext context)
		{
			System.Reflection.Assembly asm = System.Reflection.Assembly.GetExecutingAssembly();
			string[] names = asm.GetManifestResourceNames();

			string themeName = String.Empty;
			string[] pathParts = context.Request.Path.Split(new char[] { '/' });
			if (pathParts.Length > 3)
			{
				if (pathParts[1] == "Themes")
				{
					themeName = pathParts[2];
					if (pathParts[3] == "Theme.css")
					{
						string str = String.Empty;
						foreach (string name in names)
						{
							if (name.StartsWith("MBS.Web.Themes.StyleSheets.") && name.EndsWith(".less"))
							{
								string objectFileName = name.Substring("MBS.Web.Themes.StyleSheets.".Length);
								string[] parts = objectFileName.Split(new char[] { '.' });
								if (parts.Length == 2 || parts.Length == 3 && parts[0] == themeName)
								{
									// top-level
									System.IO.Stream strm = asm.GetManifestResourceStream(name);
									byte[] data = new byte[strm.Length];
									strm.Read(data, 0, data.Length);

									byte[] realData = null;
									if (data[0] == 0xEF && data[1] == 0xBB && data[2] == 0xBF)
									{
										realData = new byte[data.Length - 3];
										Array.Copy(data, 3, realData, 0, realData.Length);
									}
									else
									{
										realData = data;
									}
									string strmdata = System.Text.Encoding.UTF8.GetString(realData);
									str += strmdata;
								}
							}
						}

						dotless.Core.LessEngine less = new dotless.Core.LessEngine();
						less.Compress = true;
						string css = less.TransformToCss(str, null);

						context.Response.StatusCode = 200;
						context.Response.StatusDescription = "OK";
						context.Response.ContentType = "text/css";
						context.Response.Write(css);
					}
					else if (pathParts[3] == "Fonts" && pathParts.Length > 4)
					{
						foreach (string name in names)
						{
							if (name == "MBS.Web.Themes.Fonts." + pathParts[4] + "." + pathParts[5])
							{
								context.Response.StatusCode = 200;
								context.Response.StatusDescription = "OK";

								if (name.EndsWith(".css"))
								{
									context.Response.ContentType = "text/css";
								}
								else if (name.EndsWith(".otf"))
								{
									context.Response.ContentType = "font/otf";
								}
								else if (name.EndsWith(".woff"))
								{
									context.Response.ContentType = "font/woff";
								}
								else if (name.EndsWith(".woff2"))
								{
									context.Response.ContentType = "font/woff";
								}
								else if (name.EndsWith(".eot"))
								{
									context.Response.ContentType = "font/eot";
								}

								System.IO.Stream strm = asm.GetManifestResourceStream(name);
								byte[] data = new byte[strm.Length];
								strm.Read(data, 0, data.Length);

								context.Response.BinaryWrite(data);
							}
						}
					}
					else if (pathParts[3] == "Theme.js")
					{
						System.Text.StringBuilder sb = new System.Text.StringBuilder();
						foreach (string name in names)
						{
							if (name.StartsWith("MBS.Web.Themes.Scripts.") && name.EndsWith(".js"))
							{
								context.Response.StatusCode = 200;
								context.Response.StatusDescription = "OK";

								System.IO.Stream strm = asm.GetManifestResourceStream(name);
								byte[] data = new byte[strm.Length];
								strm.Read(data, 0, data.Length);

								byte[] realData = null;
								if (data.Length >= 3 && (data[0] == 0xEF && data[1] == 0xBB && data[2] == 0xBF))
								{
									realData = new byte[data.Length - 3];
									Array.Copy(data, 3, realData, 0, realData.Length);
								}
								else
								{
									realData = data;
								}

								sb.AppendLine(System.Text.Encoding.UTF8.GetString(realData));
							}
						}

						context.Response.ContentType = "text/javascript";
						context.Response.Write(sb.ToString());
					}
				}
			}
		}
	}
}
