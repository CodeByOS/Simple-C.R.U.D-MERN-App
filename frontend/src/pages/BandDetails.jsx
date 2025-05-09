import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBand, deleteBand } from "../api/bandApi";

const BandDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  //* State to manage band data and UI flags
  const [state, setState] = useState({
    band: null,
    loading: true,
    error: null,
    deleting: false,
  });

  const { band, loading, error, deleting } = state;

  //* Fetch the band data on mount
  useEffect(() => {
    const fetchBand = async () => {
      try {
        const res = await getBand(id);
        setState({ band: res.data, loading: false, error: null, deleting: false });
      } catch {
        setState(prev => ({ ...prev, loading: false, error: "Failed to load band" }));
      }
    };
    fetchBand();
  }, [id]);

  //* Handle deleting a band
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this band?")) {
      setState(prev => ({ ...prev, deleting: true }));
      try {
        await deleteBand(id);
        navigate("/");
      } catch (err) {
        console.log(err);
        setState(prev => ({ ...prev, deleting: false }));
      }
    }
  };

  //* Loading state
  if (loading) return (
    <div className="p-6 text-center text-2xl font-bold animate-pulse">
      Loading...
    </div>
  );

  //* Error state
  if (error) return (
    <div className="p-6 text-center text-red-600 text-3xl font-bold animate-pulse">
      {error}
    </div>
  );

  //* No band found state
  if (!band) return (
    <div className="p-6 text-center animate-bounce">
      No band found
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white shadow-lg rounded-xl p-8">
        {/* Band Name */}
        <h1 className="text-5xl font-extrabold text-green-700 mb-6">{band.bandName}</h1>

        {/* Band Description */}
        <p className="text-gray-700 text-lg mb-6 leading-relaxed">{band.description}</p>

        {/* Band Genre */}
        <p className="text-sm text-gray-500 italic mb-6">
          <span className="text-green-700 text-lg">Genre: {band.genre}</span>
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => navigate(`/bands/edit/${id}`)}
            className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded text-white transition ${
              deleting ? "bg-red-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {deleting && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            {deleting ? "Deleting..." : "Delete"}
          </button>

          <Link
            to="/"
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BandDetails;
