//
//  WebServerApplication.cs
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
using MBS.Framework;

namespace MBS.Web.WebServer
{
	public class WebServerApplication : Application
	{
		protected virtual void OnClientConnected(ClientConnectedEventArgs e)
		{

		}

		protected virtual System.Net.IPEndPoint EndPoint { get; } = null;

		protected override void OnActivated(ApplicationActivatedEventArgs e)
		{
			base.OnActivated(e);

			System.Net.Sockets.TcpListener listener = new System.Net.Sockets.TcpListener(EndPoint);
			listener.Start();

			while (true)
			{
				System.Net.Sockets.TcpClient client = listener.AcceptTcpClient();
				System.Threading.Thread t = new System.Threading.Thread(t_ParameterizedThreadStart);
				t.Start(client);
			}
		}

		private void t_ParameterizedThreadStart(object obj)
		{
			System.Net.Sockets.TcpClient client = (System.Net.Sockets.TcpClient)obj;

			System.IO.StreamReader sr = new System.IO.StreamReader(client.GetStream());
			bool readFirstLine = false;

			string method = null, rawurl = null, version = null;
			System.Collections.Generic.Dictionary<string, string> headers = new System.Collections.Generic.Dictionary<string, string>();
			while (!sr.EndOfStream)
			{
				string line = sr.ReadLine();
				if (String.IsNullOrEmpty(line))
					break;

				if (!readFirstLine)
				{
					string[] lineParts = line.Split(new char[] { ' ' });
					method = lineParts[0];
					rawurl = lineParts[1];
					version = lineParts[2];
					readFirstLine = true;
				}
				else
				{
					string[] lineParts = line.Split(new char[] { ':' }, 2);
					headers[lineParts[0].Trim()] = lineParts[1].Trim();
				}
			}

			WebRequest req = new WebRequest(method, rawurl, version, headers);
			WebResponse resp = new WebResponse();
			OnClientConnected(new ClientConnectedEventArgs(client, req, resp));

			byte[] response = resp.Stream.ToArray();

			System.IO.StreamWriter sw = new System.IO.StreamWriter(client.GetStream());
			sw.WriteLine(String.Format("{0} {1} {2}", "HTTP/1.1", resp.ResponseCode, resp.ResponseText));
			sw.WriteLine(String.Format("Content-Length: {0}", response.Length));
			if (resp.ContentType != null)
			{
				sw.WriteLine(String.Format("Content-Type: {0}", resp.ContentType));
			}
			foreach (System.Collections.Generic.KeyValuePair<string, string> kvp in resp.Headers)
			{
				sw.WriteLine(String.Format("{0}: {1}", kvp.Key, kvp.Value));
			}
			sw.WriteLine();
			sw.Flush();

			client.GetStream().Write(response, 0, response.Length);
			client.GetStream().Flush();
			client.Close();
		}
	}
}
