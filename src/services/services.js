import { db } from "@/config/firebase"; 
import { collection, addDoc, getDocs, getDoc, query, where, doc, updateDoc } from "firebase/firestore";

export const createJob = async (jobData) => {
    try {
        const docRef = await addDoc(collection(db, "jobs"), {
            ...jobData,
            created_at: new Date(),
            status: "open", 
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

export const getRequests = async (freelancerId) => {
    try {
        const requestQuery = query(
            collection(db, "request"),
            where("freelancer_id", "==", freelancerId) // Filter by freelancer ID
        );

        const snapshot = await getDocs(requestQuery);
        const requests = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        return { success: true, requests };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export const applyforJob = async (jobId, freelancerId) => {
    try {
        const contractData = {
            jobId: jobId,
            freelancer_id: freelancerId,
            start_date: new Date(),
            status: "active",
        };
        const docRef = await addDoc(collection(db, "request"), contractData);

        const jobRef = doc(db, "jobs", jobId);

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
      return businessSnap.data(); 
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
    const querySnapshot = await getDocs(collection(db, "business")); 
    const businesses = querySnapshot.docs.map((doc) => ({
      id: doc.id, 
      ...doc.data(),
    }));
    
    return { success: true, businesses };
  } catch (error) {
    console.error("Error fetching businesses:", error);
    return { success: false, error: error.message };
  }
}


export const createApplication = async (jobId, user) => {
    try {
        if (!user || !user.id) {
            throw new Error("User is not logged in.");
        }

        const applicationsRef = collection(db, "applications"); // Reference to Firestore collection

        const applicationData = {
            jobId: jobId, // The ID of the job
            applicant_id: user.id, // Clerk user ID
            applicant_email: user.primaryEmailAddress?.emailAddress || "No email provided",
            applied_at: serverTimestamp(), // Firestore timestamp
        };

        await addDoc(applicationsRef, applicationData);
        return { success: true };
    } catch (error) {
        console.error("Error creating application:", error);
        return { success: false, error: error.message };
    }
};



