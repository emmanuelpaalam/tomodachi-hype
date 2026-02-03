const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();

exports.addHype = onRequest( {cors: true}, async (req, res) => {
    const docRef = admin.firestore().collection("stats").doc("global");

    await admin.firestore().runTransaction(async (t) => {
        const doc = await t.get(docRef);
        const newHype = (doc.exists ? doc.data().hype : 0) + 1;
        t.set(docRef, { hype: newHype });
    });

    res.json({ status: "Hype added!" });
});