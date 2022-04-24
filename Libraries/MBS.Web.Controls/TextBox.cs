//
//  TextBox.cs
//
//  Author:
//       Michael Becker <alcexhim@gmail.com>
//
//  Copyright (c) 2021 Mike Becker's Software
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
using System.Web.UI;

namespace MBS.Web.Controls
{
	public class TextBox : System.Web.UI.WebControls.TextBox
	{
		public string SuggestionURL { get; set; } = null;
		public string PlaceholderText { get; set; } = null;

		public override void RenderBeginTag(HtmlTextWriter writer)
		{
			this.AddCssClass("uwt-textbox");

			if (SuggestionURL != null)
			{
				Attributes.Add("data-suggestion-url", SuggestionURL);
			}
			if (PlaceholderText != null)
			{
				Attributes.Add("placeholder", PlaceholderText);
			}
			base.RenderBeginTag(writer);
		}
		public override void RenderEndTag(HtmlTextWriter writer)
		{
			base.RenderEndTag(writer);
		}
	}
}
