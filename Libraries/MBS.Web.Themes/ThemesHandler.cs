using System;
using System.Text;
using System.Web;

namespace MBS.Web.Themes
{
	public class ThemesHandler : IHttpHandler
	{
		public bool IsReusable => true;

		public void ProcessRequest(HttpContext context)
		{
			MBS.Framework.Reflection.ManifestResourceStream[] strms = MBS.Framework.Reflection.GetAvailableManifestResourceStreams(new string[]
			{
				System.IO.Path.Combine(new string[] { context.Request.PhysicalApplicationPath, "bin" })
			});
			/*
			System.Reflection.Assembly asm = System.Reflection.Assembly.GetExecutingAssembly();
			string[] names = asm.GetManifestResourceNames();
			*/

			string themeName = String.Empty;
			string[] pathParts = context.Request.Path.Split(new char[] { '/' });
			if (pathParts.Length > 3)
			{
				if (pathParts[1] == "Themes")
				{
					themeName = pathParts[2];
					if (pathParts[3] == "Theme.css" || pathParts[3] == "Theme.less")
					{
						StyleSheetBulder SSB = new StyleSheetBulder();
						SSB.ThemeName = themeName;
						SSB.AddManifestResourceStreams(strms);
						if (pathParts[3].EndsWith(".less"))
						{
							SSB.Compiled = false;
						}

						context.Response.StatusCode = 200;
						context.Response.StatusDescription = "OK";
						context.Response.ContentType = "text/css";

						context.Response.Charset = "utf-8";
						context.Response.ContentEncoding = Encoding.UTF8;

						context.Response.Write(SSB.ToString(context.Request.QueryString.ToDictionary()));
					}
					else if (pathParts[3] == "Fonts" && pathParts.Length > 4)
					{
						foreach (MBS.Framework.Reflection.ManifestResourceStream name in strms)
						{
							if (name.Name == "MBS.Web.Themes.Fonts." + pathParts[4] + "." + pathParts[5])
							{
								context.Response.StatusCode = 200;
								context.Response.StatusDescription = "OK";

								if (name.Name.EndsWith(".css"))
								{
									context.Response.ContentType = "text/css";
								}
								else if (name.Name.EndsWith(".otf"))
								{
									context.Response.ContentType = "font/otf";
								}
								else if (name.Name.EndsWith(".woff"))
								{
									context.Response.ContentType = "font/woff";
								}
								else if (name.Name.EndsWith(".woff2"))
								{
									context.Response.ContentType = "font/woff";
								}
								else if (name.Name.EndsWith(".eot"))
								{
									context.Response.ContentType = "font/eot";
								}

								System.IO.Stream strm = name.Stream;
								byte[] data = new byte[strm.Length];
								strm.Read(data, 0, data.Length);

								context.Response.BinaryWrite(data);
							}
						}
                    }
                    else if (pathParts[3] == "Icons" && pathParts.Length > 4)
                    {
                        foreach (MBS.Framework.Reflection.ManifestResourceStream name in strms)
                        {
                            if (name.Name == "MBS.Web.Themes.Images.Icons." + pathParts[4])
                            {
                                context.Response.StatusCode = 200;
                                context.Response.StatusDescription = "OK";

                                if (name.Name.EndsWith(".svg"))
                                {
                                    context.Response.ContentType = "image/svg+xml";
                                }

                                System.IO.Stream strm = name.Stream;
                                byte[] data = new byte[strm.Length];
                                strm.Read(data, 0, data.Length);

                                context.Response.BinaryWrite(data);
                            }
                        }
                    }
                    else if (pathParts[3] == "Theme.js")
					{
						System.Text.StringBuilder sb = new System.Text.StringBuilder();
						foreach (MBS.Framework.Reflection.ManifestResourceStream name in strms)
						{
							if (name.Name.StartsWith("MBS.Web.Themes.Scripts.") && name.Name.EndsWith(".js"))
							{
								context.Response.StatusCode = 200;
								context.Response.StatusDescription = "OK";

								System.IO.Stream strm = name.Stream;
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
						context.Response.Headers.Add("Content-Encoding", "UTF-8");
						context.Response.Write(sb.ToString());
					}
				}
			}
		}
	}
}
