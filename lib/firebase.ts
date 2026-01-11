import { initializeApp, getApps } from "firebase/app"
import { getDatabase, ref, get, set, onValue, type Database } from "firebase/database"
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, type Auth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDsauv1hmzSyKWXvb-HH9wxIL1j4io_1hw",
  authDomain: "link-bio-isa.firebaseapp.com",
  databaseURL: "https://link-bio-isa-default-rtdb.firebaseio.com",
  projectId: "link-bio-isa",
  storageBucket: "link-bio-isa.firebasestorage.app",
  messagingSenderId: "231773780884",
  appId: "1:231773780884:web:54d896ace6cc6aa1a02d81",
  measurementId: "G-9VHX6MHDBH",
}

// Initialize Firebase only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const database: Database = getDatabase(app)
export const auth: Auth = getAuth(app)

// Database references
export const dataRef = ref(database, "siteData")

// Database operations
export async function fetchSiteData() {
  const snapshot = await get(dataRef)
  return snapshot.val()
}

export function subscribeSiteData(callback: (data: unknown) => void) {
  return onValue(dataRef, (snapshot) => {
    callback(snapshot.val())
  })
}

export async function saveSiteData(data: unknown) {
  await set(dataRef, data)
}

// Auth operations
export async function loginAdmin(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password)
}

export async function logoutAdmin() {
  return signOut(auth)
}

export function subscribeAuthState(callback: (user: unknown) => void) {
  return onAuthStateChanged(auth, callback)
}
