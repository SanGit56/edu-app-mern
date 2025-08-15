import { useState, useEffect } from "react";
import { useMessage } from "../MessageContext";
import axios from "axios";

const Class = () => {
  const { msg, setMsg } = useMessage();
  const [classes, setClasses] = useState({});
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [nama, setNama] = useState("");
  const [walikelas, setWalikelas] = useState("");
  const [students, setStudents] = useState([]);

  const [allUsers, setAllUsers] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    const fetchData = async () => {
      try {
        const [classRes, userRes, studentRes] = await Promise.all([
          axios.get("http://localhost:5000/api/class", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/user", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/student", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setClasses(classRes.data);
        setAllUsers(userRes.data);
        setAllStudents(studentRes.data);
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

    if (isEdit) {
      try {
        const res1 = await axios.put(
          `http://localhost:5000/api/class/${editId}`,
          { nama, walikelas, murid: students },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setMsg(res1.data.pesan || "Field nama harus diisi");
        setIsOpen(false);
        setNama("");
        setWalikelas("");
        setStudents([]);

        const res2 = await axios.get("http://localhost:5000/api/class", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClasses(res2.data);
      } catch (err) {
        setMsg(err.response?.data?.pesan || "Gagal menambah kelas");
      }
    } else {
      try {
        const res1 = await axios.post(
          "http://localhost:5000/api/class",
          { nama, walikelas, murid: students },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setMsg(res1.data.pesan || "Field nama harus diisi");
        setIsOpen(false);
        setNama("");
        setWalikelas("");
        setStudents([]);

        const res2 = await axios.get("http://localhost:5000/api/class", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClasses(res2.data);
      } catch (err) {
        setMsg(err.response?.data?.pesan || "Gagal menambah kelas");
      }
    }
    
    setIsEdit(false);
    setEditId(null);
  };

  const handleEdit = (kelas) => {
    setIsEdit(true);
    setIsOpen(true);
    setNama(kelas.nama);
    setWalikelas(kelas.walikelas);
    setStudents(kelas.murid);
    setEditId(kelas._id);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    if (confirm("Hapus kelas ini?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/class/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        const res = await axios.get("http://localhost:5000/api/class", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClasses(res.data);
      } catch (error) {
        alert("Gagal menghapus kelas:", error);
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
          <a href="/class" className="text-amber-200"><b>Kelas</b></a>
          <a href="/student" className="hover:text-amber-200">Murid</a>
          <a href="/user" className="hover:text-amber-200">Pengguna</a>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg shadow hover:bg-amber-600 transition"
          >
            Tambah kelas
          </button>
        </div>

        <div className="overflow-x-auto shadow rounded-lg border border-slate-200">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 border-b border-slate-200">#</th>
                <th className="p-3 border-b border-slate-200">Nama</th>
                <th className="p-3 border-b border-slate-200">Wali kelas</th>
                <th className="p-3 border-b border-slate-200">Murid</th>
                <th className="p-3 border-b border-slate-200 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls, idx) => (
                <tr key={cls._id} className="hover:bg-slate-50">
                  <td className="p-3 border-b border-slate-200">{idx + 1}</td>
                  <td className="p-3 border-b border-slate-200">{cls.nama}</td>
                  <td className="p-3 border-b border-slate-200">
                    { allUsers.find(u => u._id === cls.walikelas)?.namapengguna || "-" }
                  </td>
                  <td className="p-3 border-b border-slate-200">
                    {cls.murid && cls.murid.length > 0
                      ? `${cls.murid
                            .map(muridId => allStudents.find(s => s._id === muridId)?.nama || "-")
                            .join(", ")} (${cls.murid.length})`
                      : "0"}
                  </td>
                  <td className="p-3 border-b border-slate-200 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(cls)}
                        className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                      >
                        Ubah
                      </button>
                      <button
                        onClick={() => handleDelete(cls._id)}
                        className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {classes.length === 0 && (
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
                {isEdit ? "Sunting kelas" : "Tambah kelas"}
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
                  Nama Kelas
                </label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder={isEdit ? "Edit nama kelas" : "Masukkan nama kelas"}
                  className="w-full border border-amber-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-700 mb-1">
                  Pilih Wali kelas
                </label>
                <select
                  value={walikelas}
                  onChange={(e) => setWalikelas(e.target.value)}
                  className="w-full border border-amber-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value="">-- Pilih Wali kelas --</option>
                  {allUsers.map((u) => (
                    <option key={u._id} value={u._id}>
                      {u.namapengguna}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-700 mb-1">
                  Pilih Murid
                </label>
                <div className="border border-amber-300 rounded-lg p-2 max-h-48 overflow-y-auto">
                  {allStudents.map((s) => (
                    <label
                      key={s._id}
                      className="flex items-center space-x-2 py-1"
                    >
                      <input
                        type="checkbox"
                        value={s._id}
                        checked={students.includes(s._id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setStudents((prev) => [...prev, s._id]);
                          } else {
                            setStudents((prev) =>
                              prev.filter((id) => id !== s._id)
                            );
                          }
                        }}
                        className="text-amber-600 focus:ring-amber-500"
                      />
                      <span>{s.nama}</span>
                    </label>
                  ))}
                </div>
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

export default Class