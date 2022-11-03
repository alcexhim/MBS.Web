//
//  SpinButton.cs
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
using System.Web.UI;

namespace MBS.Web.Controls
{
	public class SpinButton : System.Web.UI.WebControls.WebControl
	{
		protected override HtmlTextWriterTag TagKey => HtmlTextWriterTag.Div;
		public string Text { get; set; } = null;

		public override void RenderBeginTag(HtmlTextWriter writer)
		{
			this.AddCssClass("uwt-spinbutton");

			System.Web.UI.HtmlControls.HtmlAnchor buttonUp = new System.Web.UI.HtmlControls.HtmlAnchor();
			buttonUp.AddCssClass("uwt-button-up");
			buttonUp.HRef = "#";
			Controls.Add(buttonUp);

			System.Web.UI.WebControls.Label label = new System.Web.UI.WebControls.Label() { Text = this.Text };
			Controls.Add(label);

			System.Web.UI.WebControls.TextBox textBox = new System.Web.UI.WebControls.TextBox() { Text = "50%" };
			Controls.Add(textBox);

			System.Web.UI.HtmlControls.HtmlAnchor buttonDown = new System.Web.UI.HtmlControls.HtmlAnchor();
			buttonDown.AddCssClass("uwt-button-down");
			buttonDown.HRef = "#";
			Controls.Add(buttonDown);

			base.RenderBeginTag(writer);
		}
	}
}
