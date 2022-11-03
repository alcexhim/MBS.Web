using System;
using System.Collections.Generic;

namespace MBS.Web
{
	public class WebResponse
	{
		public int ResponseCode { get; set; } = 200;
		public string ResponseText { get; set; } = null;
		public Dictionary<string, string> Headers { get; } = new Dictionary<string, string>();

		public System.IO.MemoryStream Stream { get; } = new System.IO.MemoryStream();
		public string ContentType { get; set; } = null;
	}
}
