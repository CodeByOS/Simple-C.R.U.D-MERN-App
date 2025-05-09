import { useEffect, useState } from "react";
import { getBand, updateBand } from "../../api/bandApi";
import { useNavigate, useParams } from "react-router-dom";

// Component to edit an existing band
const EditBand = () => {
    // Local state for the band details
    const [band, setBand] = useState({
        bandName: "",
        short_description: "",
        description: "",
        genre: "",
    });

    // Local state for loading, error, and updating status
    const [state, setState] = useState({
        loading: true,
        error: null,
        updating: false,
    });
    const { loading, error, updating } = state;

    const navigate = useNavigate();
    const { id } = useParams(); // Get band ID from URL params

    // Fetch the band data when the component mounts or ID changes
    useEffect(() => {
        fetchBand();
    }, [id]);

    // Function to fetch a single band's data
    const fetchBand = async () => {
        setState(prev => ({ ...prev, loading: true, error: null }));
        try {
            const { data } = await getBand(id);
            setBand(data);
        } catch (err) {
            setState(prev => ({ ...prev, error: "Failed to load band data.", err }));
        } finally {
            setState(prev => ({ ...prev, loading: false }));
        }
    };

    // Handle input changes and update the 'band' state
    const handleChange = (e) => {
        setBand({ ...band, [e.target.name]: e.target.value });
    };

    // Handle form submission to update band info
    const handleSubmit = async (e) => {
        e.preventDefault();
        setState(prev => ({ ...prev, updating: true, error: null }));
        try {
            await updateBand(id, band);
            navigate("/"); // Redirect to home after successful update
        } catch (err) {
            setState(prev => ({ ...prev, error: "Failed to update the band.", err }));
        } finally {
            setState(prev => ({ ...prev, updating: false }));
        }
    };

    // Show loading state
    if (loading) return <div className="p-6 text-center text-2xl font-bold animate-pulse">Loading band info...</div>;

    // Show error message if there's an error
    if (error) return <div className="p-6 text-center text-2xl font-bold animate-pulse text-red-600">{error}</div>;

    return (
        <div className="flex items-center justify-center min-h-screen p-6">
            <div className="max-w-md w-full">
                {/* Page Title */}
                <h1 className="text-2xl font-bold mb-6 text-center">Edit Band</h1>

                {/* Form to edit band */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="text"
                        name="bandName"
                        placeholder="Band Name"
                        value={band.bandName}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                        disabled={updating}
                    />
                    <input
                        type="text"
                        name="short_description"
                        placeholder="Short Description"
                        value={band.short_description}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                        disabled={updating}
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={band.description}
                        onChange={handleChange}
                        className="border p-2 rounded h-40 resize-y"
                        required
                        disabled={updating}
                    />
                    <input
                        type="text"
                        name="genre"
                        placeholder="Genre"
                        value={band.genre}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                        disabled={updating}
                    />

                    {/* Submit button */}
                    <button
                        type="submit"
                        className={`p-2 bg-green-500 text-white rounded hover:bg-green-600 ${
                            updating ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={updating}
                    >
                        {updating ? "Updating..." : "Update"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditBand;
