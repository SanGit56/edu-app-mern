import { useState, useEffect } from "react";
import { useMessage } from "../MessageContext";
import axios from "axios";

const Student = () => {
  const { msg, setMsg } = useMessage();
  const [students, setStudents] = useState({});
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");

  const [allClasses, setAllClasses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    const fetchData = async () => {
      try {
        const [studentRes, classRes] = await Promise.all([
          axios.get("http://localhost:5000/api/student", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/class", {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        setStudents(studentRes.data);
        setAllClasses(classRes.data);
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
      const res1 = await axios.post(
        "http://localhost:5000/api/student",
        { nama, kelas },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMsg(res1.data.pesan || "Field nama harus diisi");
      setIsOpen(false);
      setNama("");
      setKelas("");

      const res2 = await axios.get("http://localhost:5000/api/student", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res2.data);
    } catch (err) {
      setMsg(err.response?.data?.pesan || "Gagal menambah murid");
    }
  };

  if (loading) {
    return <p className="text-center mt-4">Memuat data murid</p>;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <nav className="bg-amber-600 text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex gap-4">
          <a href="/class" className="hover:text-amber-200">Kelas</a>
          <a href="/students" className="text-amber-200"><b>Murid</b></a>
          <a href="/users" className="hover:text-amber-200">Pengguna</a>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg shadow hover:bg-amber-600 transition"
          >
            Tambah murid
          </button>
        </div>

        <div className="overflow-x-auto shadow rounded-lg border border-slate-200">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 border-b border-slate-200">#</th>
                <th className="p-3 border-b border-slate-200">Nama</th>
                <th className="p-3 border-b border-slate-200">Kelas</th>
              </tr>
            </thead>
            <tbody>
              {students.map((std, idx) => (
                <tr key={std._id} className="hover:bg-slate-50">
                  <td className="p-3 border-b border-slate-200">{idx + 1}</td>
                  <td className="p-3 border-b border-slate-200">{std.nama}</td>
                  <td className="p-3 border-b border-slate-200">
                    { allClasses.find(c => c._id === std.kelas)?.nama || "-" }
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
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
                Tambah kelas
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
                  Nama Murid
                </label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Masukkan nama murid"
                  className="w-full border border-amber-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-700 mb-1">
                  Pilih Kelas
                </label>
                <select
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value)}
                  className="w-full border border-amber-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value="">-- Pilih Kelas --</option>
                  {allClasses.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.nama}
                    </option>
                  ))}
                </select>
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

export default Student