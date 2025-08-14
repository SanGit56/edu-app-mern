import { Link } from "react-router";

const Home = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-white flex items-center justify-center transition-all duration-300 hover:bg-gray-100">
        <Link to="/register" className="text-4xl font-bold text-blue-600 hover:scale-110 transition-transform duration-300"
        >
          Register
        </Link>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center transition-all duration-300 hover:from-blue-600 hover:to-purple-700">
        <Link to="/login" className="text-4xl font-bold text-white hover:scale-110 transition-transform duration-300"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
