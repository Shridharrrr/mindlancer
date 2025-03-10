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


export const applyforJob = async (jobId, freelancerId, amount) => {
    try {
        const contractData = {
            jobId: jobId,
            freelancer_id: freelancerId,
            amount,
            start_date: new Date(),
            status: "active",
        };
        const docRef = await addDoc(collection(db, "request"), contractData);

        const jobRef = doc(db, "jobs", jobId);
        await updateDoc(jobRef, { status: "pending" });

        return { success: true, contractId: docRef.id };
    } catch (error) {
        return { success: false, error: error.message };
    }
};


export async function getBusinessById(businessId) {
  try {
    const businessRef = doc(db, "business", businessId);
    const businessSnap = await getDoc(businessRef);

    if (businessSnap.exists()) {
      return businessSnap.data(); // Return business data (includes companyName)
    } else {
      console.log("No such business found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching business:", error);
    return null;
  }
}

export async function getAllBusinesses() {
  try {
    const querySnapshot = await getDocs(collection(db, "business")); // Get all business docs
    const businesses = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Firestore document ID (which is likely Clerk user ID)
      ...doc.data(),
    }));
    
    return { success: true, businesses };
  } catch (error) {
    console.error("Error fetching businesses:", error);
    return { success: false, error: error.message };
  }
}



