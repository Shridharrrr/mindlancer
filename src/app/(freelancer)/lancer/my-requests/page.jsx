"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function MyRequests() {
    const { user, isLoaded } = useUser();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            if (!isLoaded || !user) return;

            try {
                // Correct collection name (verify in Firestore)
                const applicationsQuery = query(
                    collection(db, "applications"),  // Ensure collection is named correctly
                    where("applicant_id", "==", user.id) // Fetch applications submitted by user
                );

                const applicationsSnapshot = await getDocs(applicationsQuery);
                const applicationsData = applicationsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setApplications(applicationsData);
            } catch (error) {
                console.error("Error fetching applications:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [user, isLoaded]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">My Job Applications</h2>
            {applications.length === 0 ? (
                <p>No applications yet.</p>
            ) : (
                <ul>
                    {applications.map((app, index) => (
                        <li key={index} className="border p-3 mb-3 rounded-lg shadow">
                            <p><strong>Job ID:</strong> {app.jobId}</p>
                            <p><strong>Applied on:</strong> {app.applied_at?.toDate ? 
                                app.applied_at.toDate().toLocaleDateString() : "N/A"}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
