# 🚂 Tomodachi Life: Living the Dream - Hype Countdown

A basic by-day countdown dashboard built to simulate the release of Tomodachi Life.
This project serves as a **Reference Implementation** for our Capstone tech stack.

## 🛠 Tech Stack
* **Frontend:** React + Vite
* **Backend:** Firebase Cloud Functions (Node.js)
* **Database:** Firebase Firestore (NoSQL)
* **Testing:** Jest + React Testing Library
* **Emulation:** Firebase Local Emulator Suite

---

### Prerequisites
You must have the following installed:
* **Node.js** (v18 or higher)
* **Java** (Required to run the Firebase Emulators)

### 2. Installation
```bash
npm install
```

#### Running the App (The "One Command" Solution)
We use a custom script to launch the React Frontend and the Backend Emulators simultaneously.
```bash
npm run dev
```

- Frontend: http://localhost:5173
-Emulator UI: http://localhost:4000 (Use this to view the database)
- Functions Port: 5001
- Firestore Port: 8080
The following ports are assumed to be the defaults you are given; defaults are fine for this "toy" project.

Note: The app has "persistence" enabled. If you restart the server, the Hype count will remain because it saves to the ./firebase-data folder on exit.

### 🧪 Testing
We use Jest for unit and integration testing. We mock Firebase, so you do not need the emulators running to run tests.
```
npm test
```

### 🚑 Troubleshooting
If you close the terminal but the emulator keeps running (blocking port 8080 or 4000), run this command to kill it:
```
npx kill-port 4000 5001 8080 9099
```
Adjust as needed for whatever ports are chosen for your Firebase components.