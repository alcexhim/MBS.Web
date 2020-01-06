using System.Configuration;

namespace MBS.Web.ConfigurationSections.Routing
{
	public class RouteConfigurationElement : ConfigurationElement
	{
		public RouteConfigurationElement()
		{
		}
		public RouteConfigurationElement(string name)
		{
			RouteName = name;
		}

		[ConfigurationProperty("routeName", IsRequired = true)]
		public string RouteName { get { return (string)this["routeName"]; } set { this["routeName"] = value; } }
		[ConfigurationProperty("routeUrl", IsRequired = true)]
		public string RouteUrl { get { return (string)this["routeUrl"]; } set { this["routeUrl"] = value; } }
		[ConfigurationProperty("virtualPath", IsRequired = true)]
		public string VirtualPath { get { return (string)this["virtualPath"]; } set { this["virtualPath"] = value; } }
	}
}