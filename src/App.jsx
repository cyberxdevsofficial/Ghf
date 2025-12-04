import React, { useState } from "react";
import { FiSearch, FiPlus, FiSettings } from "react-icons/fi";

export default function App() {
  const [query, setQuery] = useState("");

  const data = [
    {
      port: 443,
      protocol: ["vless", "tcp", "TLS"],
      clients: [
        { name: "4x9ek6fl", traffic: "20.58 GB", alltime: "20.58 GB", duration: "∞" },
        { name: "mihiranga", traffic: "2.44 GB", alltime: "2.44 GB", duration: "1d 21h" },
        { name: "maneesha", traffic: "3.75 GB", alltime: "3.75 GB", duration: "6d 21h" }
      ],
      trafficSummary: "46.25 GB",
    }
  ];

  const filtered = data.map((inb)=>({
    ...inb,
    clients: inb.clients.filter(
      c => c.name.toLowerCase().includes(query.toLowerCase()) || !query
    )
  }));

  return (
    <div className="min-h-screen bg-[#0f1724] text-slate-200 font-sans">
      <div className="max-w-[1200px] mx-auto p-6">
        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-3 bg-[#071022] rounded-2xl p-5 shadow-lg">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">DemonClassic</h2>
              <p className="text-sm text-slate-400 mt-1">VPN Admin Panel</p>
            </div>
            <nav className="space-y-2">
              <button className="w-full text-left px-3 py-2 rounded-lg bg-[#0b2133] flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block" /> Inbounds
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#0b2133]">Overview</button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#0b2133]">Panel Settings</button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#0b2133]">Xray Configs</button>
            </nav>
          </aside>

          <main className="col-span-9">
            <div className="bg-[#071025] rounded-2xl p-4 mb-6 shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm text-slate-400">Total Sent/Received</h3>
                  <div className="text-2xl font-semibold mt-1">4.97 GB / 85.30 GB</div>
                </div>
                <div className="flex gap-3">
                  <button className="px-3 py-2 bg-green-500/20 rounded-lg flex items-center gap-2"><FiPlus /> Add Inbound</button>
                  <button className="px-3 py-2 bg-slate-700/30 rounded-lg flex items-center gap-2"><FiSettings /> General Actions</button>
                </div>
              </div>
            </div>

            <div className="bg-[#071025] rounded-2xl p-4 mb-4 shadow">
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-[#081527] p-2 rounded-md w-full">
                  <FiSearch className="text-slate-400 mr-2" />
                  <input value={query} onChange={(e)=>setQuery(e.target.value)}
                    className="bg-transparent outline-none w-full text-sm"
                    placeholder="Search clients or ports..." />
                </div>
              </div>
            </div>

            {filtered.map((inb)=>(
              <section key={inb.port} className="bg-[#071025] rounded-2xl p-4 shadow mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-semibold">Port {inb.port}</div>
                    <div className="text-sm text-slate-400 flex items-center gap-2">
                      {inb.protocol.map(p=>(
                        <span key={p} className="px-2 py-1 bg-[#0b2540] rounded-full text-xs">{p}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm">Traffic: {inb.trafficSummary}</div>
                </div>

                <table className="w-full text-sm">
                  <thead className="text-slate-400 text-xs text-left">
                    <tr>
                      <th className="pb-2">Client</th>
                      <th className="pb-2">Traffic</th>
                      <th className="pb-2">All-time</th>
                      <th className="pb-2">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inb.clients.map(c=>(
                      <tr key={c.name} className="border-t border-slate-800">
                        <td className="py-3">{c.name}</td>
                        <td>{c.traffic}</td>
                        <td>{c.alltime}</td>
                        <td><span className="px-3 py-1 rounded-full bg-[#082232] text-xs">{c.duration}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
