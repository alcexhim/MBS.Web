namespace dotless.Core
{
    using configuration;
    using System;

    public static class Less
    {
        public static string Parse(string less)
        {
            return Parse(less, DotlessConfiguration.GetDefault());
        }

        public static string Parse(string less, DotlessConfiguration config)
        {
            if (config.Web)
            {
                // throw new Exception("Please use dotless.Core.LessWeb.Parse for web applications. This makes sure all web features are available.");
            }

			LessEngine engine = new LessEngine();
			engine.CurrentDirectory = config.RootPath;
			return engine.TransformToCss(less, null);
        }
    }
}
