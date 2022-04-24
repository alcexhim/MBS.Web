using System;
using System.Collections.Generic;

namespace MBS.Web
{
	public class WebRequest
	{
		public string Method { get; } = null;
		public string RawUrl { get; } = null;
		public string Version { get; } = null;
		public Dictionary<string, string> Headers { get; } = null;

		internal WebRequest(string method, string rawUrl, string version, Dictionary<string, string> headers)
		{
			Method = method;
			RawUrl = rawUrl;
			Version = version;
			Headers = headers;
		}
	}
}
