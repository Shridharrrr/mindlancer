import { db } from "@/config/firebase"; // Import Firestore instance
import { collection, addDoc, getDocs, getDoc, query, where, doc, updateDoc } from "firebase/firestore";

export const createJob = async (jobData) => {
    try {
        const docRef = await addDoc(collection(db, "jobs"), {
            ...jobData,
            created_at: new Date(),
            status: "open", // Default status
        });
        return { success: true, jobId: docRef.id };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const addCompany = async (Data) => {
    try {        
        const docRef = await addDoc(collection(db, "business"), {
            ...Data,
        });
        return { success: true, jobId: docRef.id };
    } catch (error) {
        return { success: false, error: error.message };
    }
};


export const getFreelancers = async () => {
    try {
        let LancerQuery = collection(db, "freelancer");

        // if (filters.skills) {
        //     jobsQuery = query(jobsQuery, where("skills_required", "array-contains", filters.skills));
        // }

        const snapshot = await getDocs(jobsQuery);

        const lancers = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        return { success: true, lancers };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const getJobs = async (filters = {}) => {
    try {
        let jobsQuery = collection(db, "jobs");

        if (filters.skills) {
            jobsQuery = query(jobsQuery, where("skills_required", "array-contains", filters.skills));
        }
        if (filters.budget) {
            jobsQuery = query(jobsQuery, where("budget", ">=", filters.budget));
        }
        if (filters.status) {
            jobsQuery = query(jobsQuery, where("status", "==", filters.status));
        }

        const snapshot = await getDocs(jobsQuery);
        const jobs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        return { success: true, jobs };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// export const getJobById = async (jobId) => {
//     try {
//         const jobRef = doc(db, "jobs", jobId);
//         const jobSnap = await getDoc(jobRef);

//         if (jobSnap.exists()) {
//             return { success: true, job: jobSnap.data() };
//         } else {
//             return { success: false, error: "Job not found" };
//         }
//     } catch (error) {
//         return { success: false, error: error.message };
//     }
// };

export const applyForJob = async (applicationData) => {
    try {
        const docRef = await addDoc(collection(db, "proposals"), {
            ...applicationData,
            status: "pending",
            applied_at: new Date(),
        });
        return { success: true, proposalId: docRef.id };
    } catch (error) {
        return { success: false, error: error.message };
    }
};


export const hireFreelancer = async (jobId, freelancerId, amount) => {
    try {
        const contractData = {
            job_id: jobId,
            freelancer_id: freelancerId,
            amount,
            start_date: new Date(),
            status: "active",
        };
        const docRef = await addDoc(collection(db, "contracts"), contractData);

        const jobRef = doc(db, "jobs", jobId);
        await updateDoc(jobRef, { status: "hired" });

        return { success: true, contractId: docRef.id };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

