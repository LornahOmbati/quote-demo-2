import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

const LogsList = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const snapshot = await getDocs(collection(db, "logs"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLogs(data);
    };

    fetchLogs();
  }, []);

  const handleDownload = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div>
      <h2>Saved Logs</h2>
      <table>
        <thead>
          <tr>
            <th>Document Type</th>
            <th>Client Name</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id}>
              <td>{log.documentType}</td>
              <td>{log.clientName}</td>
              <td>${log.total}</td>
              <td>
                <button onClick={() => handleDownload(log.pdfUrl)}>Download</button>
                <button onClick={() => alert("Edit not implemented")}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogsList;
