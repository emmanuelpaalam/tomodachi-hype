import { useState, useEffect } from 'react'
import { db } from './firebase.js'
import { doc, onSnapshot } from 'firebase/firestore'
import { getCountdown } from './countdown.js'

function App() {
    const [hype, setHype] = useState(0);

    const releaseDate = new Date('2026-04-16T00:00:00Z');
    const daysLeft = getCountdown(releaseDate, new Date());

    useEffect(() => { // Listens to Firebase document for real-time updates
        const docRef = doc(db, "stats", "global");
        const unsubscribe = onSnapshot(docRef, (doc) => {
            if (doc.exists) {
                setHype(doc.data().hype);
            } else {
              setHype(0);
            }
        });

        return () => unsubscribe();
    }, []);

    // also need to send data to db
    const incrementHype = async () => {
      const projectId = "demo-tomodachi";
      const url = `http://127.0.0.1:5001/${projectId}/us-central1/addHype`;
      try {
        await fetch(url);
      } catch (error) {
        console.error("Error adding hype:", error);
      }
    };

    return (
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif', marginTop: '50px' }}>
      <h1><i>Tomodachi Life: Living the Dream</i> Countdown</h1>
      
      <div style={{ margin: '40px' }}>
        <span style={{ fontSize: '5rem', fontWeight: 'bold' }}>{daysLeft}</span>
        <p>Days until Release</p>
      </div>

      <hr style={{ maxWidth: '300px' }} />

      <div style={{ margin: '40px' }}>
        <h2>Global Hype Level</h2>
        <p style={{ fontSize: '3rem', color: '#2f9e4b' }}>{hype}</p>
        <button 
          onClick={incrementHype}
          style={{ padding: '15px 30px', fontSize: '1.2rem', cursor: 'pointer' }}
        >
          🚂 Choo Choo! (Add Hype)
        </button>
      </div>
    </div>
  );
};



export default App;
