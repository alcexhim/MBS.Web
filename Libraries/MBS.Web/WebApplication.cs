using System;
using System.Web.Routing;
using MBS.Framework;
using MBS.Web.ConfigurationSections.Routing;

namespace MBS.Web
{
	public class WebApplication : MBS.Framework.Application
	{
		public WebApplication(string shortName)
		{
			ShortName = shortName;
		}

		protected override int StartInternal()
		{
			// this is so much easier with .NET than apache
			foreach (RouteConfigurationElement route in RoutingConfigurationSection.Settings.Routes)
			{
				RouteTable.Routes.MapPageRoute(route.RouteName, route.RouteUrl, route.VirtualPath);
			}
			return 0;
		}
	}
}
