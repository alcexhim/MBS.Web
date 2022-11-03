//
//  EmptyClass.cs
//
//  Author:
//       Michael Becker <alcexhim@gmail.com>
//
//  Copyright (c) 2022 Mike Becker's Software
//
//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program.  If not, see <http://www.gnu.org/licenses/>.
using System;
using System.IO;
using System.Text;
using MBS.Framework;

namespace MBS.Web.Themes
{
	public class StyleSheetBulder
	{
		StringBuilder sbBefore = new StringBuilder();
		StringBuilder sbAfter = new StringBuilder();

		public bool Compressed { get; set; } = true;
		public bool Compiled { get; set; } = true;

		public string ThemeName { get; set; } = null;

		public void AddManifestResourceStreams(Reflection.ManifestResourceStream[] strms)
		{
			foreach (MBS.Framework.Reflection.ManifestResourceStream strm in strms)
			{
				if (strm.Name.StartsWith("MBS.Web.Themes.StyleSheets.") && strm.Name.EndsWith(".less"))
				{
					string objectFileName = strm.Name.Substring("MBS.Web.Themes.StyleSheets.".Length);
					string[] parts = objectFileName.Split(new char[] { '.' });
					if (parts.Length == 2 || parts.Length == 3 && parts[0] == ThemeName)
					{
						// top-level
						System.IO.Stream stream = strm.Stream;
						string strmdata = String.Format("/* {0} */", objectFileName) + "\r\n" + GetStreamContent(stream);

						if (parts.Length == 2)
						{
							PrependContent(strmdata);
						}
						else
						{
							AppendContent(strmdata);
						}
					}
				}
			}
		}

		public void PrependContent(string strmdata)
		{
			sbBefore.AppendLine(strmdata);
		}
		public void AppendContent(string strmdata)
		{
			sbAfter.AppendLine(strmdata);
		}

		private string GetStreamContent(Stream stream)
		{
			byte[] data = new byte[stream.Length];
			stream.Read(data, 0, data.Length);

			byte[] realData = null;
			if (data[0] == 0xEF && data[1] == 0xBB && data[2] == 0xBF)
			{
				realData = new byte[data.Length - 3];
				Array.Copy(data, 3, realData, 0, realData.Length);
			}
			else
			{
				realData = data;
			}
			return System.Text.Encoding.UTF8.GetString(realData);
		}

		public override string ToString()
		{
			return ToString(null);
		}
		public string ToString(System.Collections.Generic.IDictionary<string, string> paramz)
		{
			if (paramz != null)
			{
				foreach (string key in paramz.Keys)
				{
					string val = paramz[key];
					sbBefore.AppendLine(String.Format("@{0}: {1}; ", key, val));
				}
			}

			string lessstr = String.Concat(new string[] { sbBefore.ToString(), System.Environment.NewLine, sbAfter.ToString() });
			if (Compiled)
			{
				dotless.Core.LessEngine less = new dotless.Core.LessEngine();
				less.Compress = Compressed;
				string css = less.TransformToCss(lessstr, null);
				return css;
			}
			return lessstr;
		}
	}
}
