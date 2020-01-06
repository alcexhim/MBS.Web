using System.Configuration;

namespace MBS.Web.ConfigurationSections.Routing
{
	public class RoutesCollection : ConfigurationElementCollection
	{
		public override ConfigurationElementCollectionType CollectionType => ConfigurationElementCollectionType.AddRemoveClearMap;
		protected override ConfigurationElement CreateNewElement()
		{
			return new RouteConfigurationElement();
		}
		protected override ConfigurationElement CreateNewElement(string elementName)
		{
			return new RouteConfigurationElement(elementName);
		}

		protected override object GetElementKey(ConfigurationElement element)
		{
			return ((RouteConfigurationElement)element).RouteName;
		}
	}
}