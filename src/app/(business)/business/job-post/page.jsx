'use client'
import { useState, useEffect } from "react";
import { createJob } from "@/services/services"; // Import backend function
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs"; // Import Clerk authentication

const AddJob = () => {
    const { user, isLoaded } = useUser(); // Get Clerk user data
    const [jobData, setJobData] = useState({
        title: "",
        companyName: '',
        description: "",
        skills_required: "",
        budget: "",
        deadline: "",
        business_id: '', // This will be set dynamically
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchBusinessDetails = async () => {
            if (isLoaded && user) {
                const businessId = user.id;
                try {
                    // Reference to the specific business document in Firestore
                    const businessRef = doc(db, "business", businessId);
                    const businessSnap = await getDoc(businessRef);

                    if (businessSnap.exists()) {
                        const businessData = businessSnap.data();
                        setJobData((prev) => ({
                            ...prev,
                            business_id: businessId,
                            companyName: businessData.companyName, // Fetch company name
                        }));
                    } else {
                        console.error("Business not found in Firestore");
                        setMessage("Error: Business not found in database.");
                    }
                } catch (error) {
                    console.error("Error fetching business details:", error);
                    setMessage("Error fetching business details.");
                }
            }
        }
    }, [isLoaded, user]);

    const handleChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
    
        if (!jobData.business_id) {
            setMessage("Error: You must be logged in to post a job.");
            setLoading(false);
            return;
        }
    
        // Convert skills into an array
        const formattedData = {
            ...jobData,
            skills_required: jobData.skills_required.split(",").map(skill => skill.trim()), 
            budget: Number(jobData.budget),
            deadline: new Date(jobData.deadline),
        };
    
        const response = await createJob(formattedData);
    
        if (response.success) {
            // Create an application request entry
            await createApplication(response.id, user);  // Pass jobId and user data
            setMessage("Job posted successfully!");
            router.push("/");
        } else {
            setMessage("Error: " + response.error);
        }
        setLoading(false);
    };
    

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
            <h2 className="text-2xl font-bold mb-4">Post a Job</h2>

            {message && (
                <div className={`p-2 mb-4 ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Job Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={jobData.title}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Description:</label>
                    <textarea
                        name="description"
                        value={jobData.description}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Required Skills (comma-separated):</label>
                    <input
                        type="text"
                        name="skills_required"
                        value={jobData.skills_required}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Budget ($):</label>
                    <input
                        type="number"
                        name="budget"
                        value={jobData.budget}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Deadline:</label>
                    <input
                        type="date"
                        name="deadline"
                        value={jobData.deadline}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded"
                    disabled={loading}
                >
                    {loading ? "Posting..." : "Post Job"}
                </button>
            </form>
        </div>
    );
};

export default AddJob;


