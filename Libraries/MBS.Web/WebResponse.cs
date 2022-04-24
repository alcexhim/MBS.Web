using System;
using System.Collections.Generic;
using UniversalEditor.Accessors;
using UniversalEditor.IO;

namespace MBS.Web
{
	public class WebResponse
	{
		public int ResponseCode { get; set; } = 200;
		public string ResponseText { get; set; } = null;
		public Dictionary<string, string> Headers { get; } = new Dictionary<string, string>();

		internal MemoryAccessor ma = new MemoryAccessor();
		public Writer Writer { get { return ma.Writer; } }
	}
}
