import { useState } from "react";
import { useMessage } from "../MessageContext";
import { useNavigate } from "react-router";
import axios from "axios";

const Login = () => {
  const { msg, setMsg } = useMessage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
        "http://localhost:5000/api/auth/login",
        formData
      );
      setMsg(res.data.pesan || "Login berhasil");
      localStorage.setItem("token", res.data.token);
      navigate("/class");
    } catch (err) {
      setMsg(err.response?.data?.pesan || "Login gagal");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-emerald-600 text-center mb-6">
          Masuk
        </h2>

        {msg && (
          <div className="mb-4 p-3 rounded bg-rose-200 text-rose-800 border border-rose-300">
            {msg}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Surel
            </label>
            <input
              type="text"
              name="surel"
              value={formData.surel}
              onChange={handleChange}
              placeholder="Masukkan surel"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Kata Sandi
            </label>
            <input
              type="text"
              name="katasandi"
              value={formData.katasandi}
              onChange={handleChange}
              placeholder="Masukkan kata sandi"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Masuk
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Tidak punya akun?{" "}
          <a href="/register" className="text-emerald-600 hover:underline">
            Daftar
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
