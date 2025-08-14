import { useState } from "react";
import { useMessage } from "../MessageContext";
import { useNavigate } from "react-router";
import axios from "axios";

const Register = () => {
  const { msg, setMsg } = useMessage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    namapengguna: "",
    surel: "",
    katasandi: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      setMsg(res.data.pesan || "Registrasi berhasil");
      navigate("/login");
    } catch (err) {
      setMsg(err.response?.data?.pesan || "Terjadi kesalahan");
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-cyan-700 mb-6 text-center">
          Buat Akun
        </h2>

        {msg && (
          <div className="mb-4 p-3 rounded bg-rose-200 text-rose-800 border border-rose-300">
            {msg}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-cyan-700 font-medium mb-1">Nama Pengguna</label>
            <input
              type="text"
              name="namapengguna"
              value={formData.namaPengguna}
              onChange={handleChange}
              placeholder="Masukkan nama pengguna"
              className="w-full border border-cyan-200 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-cyan-700 font-medium mb-1">Surel</label>
            <input
              type="text"
              name="surel"
              value={formData.surel}
              onChange={handleChange}
              placeholder="Masukkan surel"
              className="w-full border border-cyan-200 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-cyan-700 font-medium mb-1">Kata Sandi</label>
            <input
              type="text"
              name="katasandi"
              value={formData.katasandi}
              onChange={handleChange}
              placeholder="Masukkan kata sandi"
              className="w-full border border-cyan-200 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-salmon-500 hover:bg-salmon-600 text-white font-semibold py-2 px-4 rounded-lg transition"
            style={{ backgroundColor: "#FA8072" }}
          >
            Daftar
          </button>
        </form>

        <p className="text-sm text-center text-cyan-600 mt-6">
          Sudah punya akun?{" "}
          <a href="/login" className="font-medium text-salmon-500 hover:underline" style={{ color: "#FA8072" }}>
            Masuk
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register