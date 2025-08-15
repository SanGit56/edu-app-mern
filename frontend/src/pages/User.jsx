import { useState, useEffect } from "react";
import { useMessage } from "../MessageContext";
import axios from "axios";

const User = () => {
  const { msg, setMsg } = useMessage();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [namapengguna, setNamaPengguna] = useState("");
  const [surel, setSurel] = useState("");
  const [katasandi, setKataSandi] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    const fetchData = async () => {
      try {
        const userRes = await axios.get("http://localhost:5000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(userRes.data);
      } catch (err) {
        console.error("Gagal memuat data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res1 = await axios.put(
        `http://localhost:5000/api/user/${editId}`,
        { namapengguna, surel, katasandi },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMsg(res1.data.pesan || "Field nama pengguna harus diisi");
      setIsOpen(false);
      setNamaPengguna("");
      setSurel("");
      setKataSandi("");

      const res2 = await axios.get("http://localhost:5000/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res2.data);
    } catch (err) {
      setMsg(err.response?.data?.pesan || "Gagal mengubah pengguna");
    }
    
    setEditId(null);
  };

  const handleEdit = (users) => {
    setIsOpen(true);
    setNamaPengguna(users.namapengguna);
    setSurel(users.surel);
    setKataSandi(users.katasandi);
    setEditId(users._id);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    if (confirm("Hapus pengguna ini?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/user/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        const res = await axios.get("http://localhost:5000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (error) {
        alert("Gagal menghapus pengguna:", error);
      }
    }
};

  if (loading) {
    return <p className="text-center mt-4">Memuat data kelas</p>;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <nav className="bg-amber-600 text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex gap-4">
          <a href="/class" className="hover:text-amber-200">Kelas</a>
          <a href="/student" className="hover:text-amber-200">Murid</a>
          <a href="/user" className="text-amber-200"><b>Pengguna</b></a>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        <div className="overflow-x-auto shadow rounded-lg border border-slate-200">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 border-b border-slate-200">#</th>
                <th className="p-3 border-b border-slate-200">Nama Pengguna</th>
                <th className="p-3 border-b border-slate-200">Surel</th>
                <th className="p-3 border-b border-slate-200">Kata Sandi</th>
                <th className="p-3 border-b border-slate-200 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((usr, idx) => (
                <tr key={usr._id} className="hover:bg-slate-50">
                  <td className="p-3 border-b border-slate-200">{idx + 1}</td>
                  <td className="p-3 border-b border-slate-200">{usr.namapengguna}</td>
                  <td className="p-3 border-b border-slate-200">{usr.surel}</td>
                  <td className="p-3 border-b border-slate-200">{usr.katasandi}</td>
                  <td className="p-3 border-b border-slate-200 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(usr)}
                        className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                      >
                        Ubah
                      </button>
                      <button
                        onClick={() => handleDelete(usr._id)}
                        className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="p-4 text-center text-slate-500 italic"
                  >
                    Tidak ada kelas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4 bg-amber-50">
              <h2 className="text-lg font-semibold text-amber-700">
                Sunting guru/pengguna
              </h2>

              {msg && (
                <div className="mb-4 p-3 rounded bg-rose-200 text-rose-800 border border-rose-300">
                  {msg}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-2">
              <div>
                <label className="block text-sm font-medium text-amber-700 mb-1">
                  Nama Guru
                </label>
                <input
                  type="text"
                  value={namapengguna}
                  onChange={(e) => setNamaPengguna(e.target.value)}
                  placeholder="Edit nama guru"
                  className="w-full border border-amber-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-700 mb-1">
                  Surel
                </label>
                <input
                  type="text"
                  value={surel}
                  onChange={(e) => setSurel(e.target.value)}
                  placeholder="Edit surel"
                  className="w-full border border-amber-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-700 mb-1">
                  Kata Sandi
                </label>
                <input
                  type="text"
                  value={katasandi}
                  onChange={(e) => setKataSandi(e.target.value)}
                  placeholder="Edit kata sandi"
                  className="w-full border border-amber-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="flex justify-end gap-3 border-t p-4 bg-amber-50">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default User