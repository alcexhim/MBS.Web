using System;
namespace MBS.Web
{
	public static class ExtensionMethods
	{
		public static void InitializeUWT(this System.Web.UI.Page page, string themeName = null, Framework.Drawing.Color themeColor = default(Framework.Drawing.Color))
		{
			if (themeName == null)
			{
				themeName = "Slate";
			}

			string color = themeColor == Framework.Drawing.Color.Empty ? System.Configuration.ConfigurationManager.AppSettings["ThemeColor"] ?? "#9a9a9a" : themeColor.ToHexadecimalHTML();
			color = System.Web.HttpUtility.UrlEncode(color);
			page.RegisterStyleSheet(String.Format("~/Themes/{0}/Theme.css?ThemeColor={1}", themeName, color));
			page.RegisterScript(String.Format("~/Themes/{0}/Theme.js", themeName));
		}
		public static void InitializeUWT(this System.Web.UI.MasterPage page, string themeName = null, Framework.Drawing.Color themeColor = default(Framework.Drawing.Color))
		{
			page.Page.InitializeUWT(themeName, themeColor);
		}

		public static string ExpandRelativePath(this System.Web.UI.Page page, string fileName)
		{
			return fileName.Replace("~/", page.Request.ApplicationPath);
		}
		public static void RegisterScript(this System.Web.UI.MasterPage page, string fileName)
		{
			page.Page.RegisterScript(fileName);
		}
		public static void RegisterScript(this System.Web.UI.Page page, string fileName)
		{
			System.Web.UI.HtmlControls.HtmlGenericControl script = new System.Web.UI.HtmlControls.HtmlGenericControl("script");
			script.Attributes.Add("type", "text/javascript");
			script.Attributes.Add("src", page.ExpandRelativePath(fileName));
			page.Header.Controls.Add(script);
		}
		public static void RegisterStyleSheet(this System.Web.UI.MasterPage page, string fileName)
		{
			page.Page.RegisterStyleSheet(fileName);
		}
		public static void RegisterStyleSheet(this System.Web.UI.Page page, string fileName)
		{
			System.Web.UI.HtmlControls.HtmlLink link = new System.Web.UI.HtmlControls.HtmlLink();
			link.Attributes.Add("rel", "stylesheet");
			link.Attributes.Add("type", "text/css");
			link.Href = page.ExpandRelativePath(fileName);
			page.Header.Controls.Add(link);
		}
		public static void RegisterStyleSheetFragment(this System.Web.UI.MasterPage page, string fragment)
		{
			page.Page.RegisterStyleSheetFragment(fragment);
		}
		public static void RegisterStyleSheetFragment(this System.Web.UI.Page page, string fragment)
		{
			System.Web.UI.HtmlControls.HtmlGenericControl style = new System.Web.UI.HtmlControls.HtmlGenericControl("style");
			style.Attributes.Add("type", "text/css");
			style.InnerText = fragment;
			page.Header.Controls.Add(style);
		}
		public static void RegisterScriptFragment(this System.Web.UI.MasterPage page, string fragment)
		{
			page.Page.RegisterScriptFragment(fragment);
		}
		public static void RegisterScriptFragment(this System.Web.UI.Page page, string fragment)
		{
			System.Web.UI.HtmlControls.HtmlGenericControl script = new System.Web.UI.HtmlControls.HtmlGenericControl("script");
			script.Attributes.Add("type", "text/javascript");
			script.InnerText = fragment;
			page.Header.Controls.Add(script);
		}

		public static bool ContainsCssClass(this System.Web.UI.WebControls.WebControl ctl, string className)
		{
			string[] cssClasses = ctl.CssClass.Split(new char[] { ' ' });
			return Array.Exists<string>(cssClasses, new Predicate<string>((string obj) => className.Equals(obj)));
		}
		public static void AddCssClass(this System.Web.UI.WebControls.WebControl ctl, string className)
		{
			if (ctl.ContainsCssClass(className)) return;
			ctl.CssClass = ApplyCssClass(ctl.CssClass, className); 
		}

		private static string ApplyCssClass(string original, string newclass)
		{
			string[] cssClasses = original.Split(new char[] { ' ' });
			string[] newCssClasses = new string[cssClasses.Length + 1];
			Array.Copy(cssClasses, 0, newCssClasses, 0, cssClasses.Length);
			newCssClasses[newCssClasses.Length - 1] = newclass;
			return String.Join(" ", newCssClasses).Trim();
		}

		public static System.Web.UI.HtmlControls.HtmlGenericControl GetBody(this System.Web.UI.Page page)
		{
			System.Web.UI.ControlCollection coll = page.Controls[0].Controls;
			for (int i = 0; i < coll.Count; i++)
			{
				if (coll[i] is System.Web.UI.HtmlControls.HtmlGenericControl && ((System.Web.UI.HtmlControls.HtmlGenericControl)coll[i]).TagName.ToLower() == "body")
				{
					return (coll[i] as System.Web.UI.HtmlControls.HtmlGenericControl);
				}
			}
			return null;
		}
		public static void AddCssClass(this System.Web.UI.MasterPage master, string className)
		{
			throw new NotImplementedException();
			foreach (System.Web.UI.Control ctl in master.Controls)
			{
				//if (ctl )
			}
		}
		public static void AddCssClass(this System.Web.UI.Page page, string className)
		{
			// here we go
			System.Web.UI.HtmlControls.HtmlGenericControl body = page.GetBody();

			string originalClassName = body.Attributes["class"];
			if (originalClassName == null) originalClassName = String.Empty;

			body.Attributes["class"] = ApplyCssClass(originalClassName, className);
		}
		public static void AddCssClass(this System.Web.UI.HtmlControls.HtmlControl control, string className)
		{
			// here we go
			string originalClassName = control.Attributes["class"];
			if (originalClassName == null) originalClassName = String.Empty;

			control.Attributes["class"] = ApplyCssClass(originalClassName, className);
		}

		public static void Redirect(this System.Web.UI.Page page, string url)
		{
			string[] pathParts = page.Request.Path.Split(new char[] { '/' });
			if (pathParts.Length >= 2)
			{
				string tenantName = pathParts[1];
				if (url.StartsWith("~/"))
				{
					url = "~/" + tenantName + "/" + url.Substring(2);
				}
			}
			page.Response.Redirect(url);
		}
		public static void Redirect(this System.Web.UI.Page page, string url, bool endResponse)
		{
			string[] pathParts = page.Request.Path.Split(new char[] { '/' });
			if (pathParts.Length >= 2)
			{
				string tenantName = pathParts[1];
				if (url.StartsWith("~/"))
				{
					url = "~/" + tenantName + "/" + url.Substring(2);
				}
			}
			page.Response.Redirect(url, endResponse);
		}

		private static System.Collections.Generic.Dictionary<System.Web.Routing.RouteData, System.Collections.Generic.Dictionary<string, string>> _routeDictionaries = new System.Collections.Generic.Dictionary<System.Web.Routing.RouteData, System.Collections.Generic.Dictionary<string, string>>();
		public static string GetRouteQueryValue(this System.Web.Routing.RouteData routeData, string name)
		{
			if (!_routeDictionaries.ContainsKey(routeData))
			{
				string vp = (routeData.RouteHandler as System.Web.Routing.PageRouteHandler).VirtualPath;
				string query = vp.Substring(vp.IndexOf('?') + 1);
				string[] queryParts = query.Split(new char[] { '&' });

				System.Collections.Generic.Dictionary<string, string> dict = new System.Collections.Generic.Dictionary<string, string>();
				for (int i = 0; i < queryParts.Length; i++)
				{
					string[] nameValue = queryParts[i].Split(new char[] { '=' }, 2);
					if (nameValue.Length == 2)
					{
						dict.Add(nameValue[0], nameValue[1]);
					}
					else if (nameValue.Length == 1)
					{
						dict.Add(nameValue[0], null);
					}
				}

				_routeDictionaries[routeData] = dict;
			}

			if (_routeDictionaries[routeData].ContainsKey(name))
			{
				return _routeDictionaries[routeData][name];
			}
			return null;
		}
	}
}
