import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Users, FileText, Settings, LogOut, Lock } from "lucide-react";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "kagujje2026") { // Temporary password
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-white/40" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">Kagujje Admin</h1>
          <p className="text-white/40 text-center mb-8 text-sm">Enter password to manage your digital empire.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
            />
            <button 
              type="submit"
              className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-white/90 transition-colors"
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col">
        <div className="text-xl font-bold mb-12">KAGUJJE</div>
        
        <nav className="flex-1 space-y-2">
          {[
            { icon: LayoutDashboard, label: "Dashboard", active: true },
            { icon: FileText, label: "Projects", active: false },
            { icon: Users, label: "Services", active: false },
            { icon: Settings, label: "Settings", active: false },
          ].map((item) => (
            <button 
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                item.active ? "bg-white/10 text-white" : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <button 
          onClick={() => setIsAuthenticated(false)}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-400/5 transition-colors mt-auto"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome Back, Shardick</h1>
            <p className="text-white/40">Manage your sites, services, and digital assets.</p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2.5 bg-white text-black text-sm font-medium rounded-lg">New Project</button>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-8 mb-12">
          {[
            { label: "Active Sites", value: "5", trend: "+1 this month" },
            { label: "Total Views", value: "10.2M", trend: "+24% increase" },
            { label: "Storage Used", value: "45GB", trend: "72% of 64GB" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl">
              <div className="text-sm text-white/40 mb-4">{stat.label}</div>
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-xs text-green-400 font-medium uppercase tracking-wider">{stat.trend}</div>
            </div>
          ))}
        </div>

        <section>
          <h2 className="text-xl font-bold mb-6">Recent Activities</h2>
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-6 py-4 text-xs font-semibold text-white/40 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-4 text-xs font-semibold text-white/40 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-white/40 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-white/40 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { name: "Kagujje Portfolio", status: "Active", date: "Today" },
                  { name: "CHAT28 Messenger", status: "Active", date: "Yesterday" },
                  { name: "MDM28 Dashboard", status: "Active", date: "3 days ago" },
                ].map((item) => (
                  <tr key={item.name} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium">{item.name}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-400/10 text-green-400 text-xs rounded-full">
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white/40 text-sm">{item.date}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-sm font-medium hover:underline">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
