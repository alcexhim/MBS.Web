using System;
using System.Configuration;

namespace MBS.Web.ConfigurationSections.Routing
{
	public class RoutingConfigurationSection : ConfigurationSection
	{
		private static RoutingConfigurationSection settings = ConfigurationManager.GetSection("routing") as RoutingConfigurationSection;
		public static RoutingConfigurationSection Settings { get { return settings; } }

		[ConfigurationProperty("routes", IsDefaultCollection = false)]
		public RoutesCollection Routes { get { return (RoutesCollection)base["routes"]; } }
	}
}