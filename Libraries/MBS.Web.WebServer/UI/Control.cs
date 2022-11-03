//
//  Control.cs
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
using System.Collections.Generic;

namespace MBS.Web.WebServer.UI
{
	public class Control
	{
		public class ControlCollection
			: System.Collections.ObjectModel.Collection<Control>
		{

		}

		protected virtual System.Web.UI.HtmlTextWriterTag TagKey { get; } = System.Web.UI.HtmlTextWriterTag.Unknown;
		protected virtual string TagName { get; } = null;
		protected virtual KeyValuePair<string, string>[] RequiredAttributes { get; } = null;

		private string GetTagName()
		{
			if (TagKey == System.Web.UI.HtmlTextWriterTag.Unknown && TagName == null)
			{
				throw new ArgumentException("expected either TagKey or TagName to be set");
			}
			if (TagKey != System.Web.UI.HtmlTextWriterTag.Unknown)
			{

			}
			if (TagName != null)
			{
				return TagName;
			}
			return null;
		}

		protected void RenderBeginTag(System.Web.UI.HtmlTextWriter htw)
		{
			htw.BeginRender();
			if (RequiredAttributes != null)
			{
				foreach (KeyValuePair<string, string> kvp in RequiredAttributes)
				{
					htw.AddAttribute(kvp.Key, kvp.Value);
				}
			}
			htw.RenderBeginTag(GetTagName());
			htw.EndRender();
		}
		protected virtual void RenderContents(System.Web.UI.HtmlTextWriter htw)
		{
		}
		protected void RenderEndTag(System.Web.UI.HtmlTextWriter htw)
		{
			htw.RenderEndTag();
		}

		public void Render(System.Web.UI.HtmlTextWriter htw)
		{
			RenderBeginTag(htw);
			RenderContents(htw);
			RenderEndTag(htw);
		}
	}
}
