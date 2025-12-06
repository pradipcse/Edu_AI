import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";   // <-- added
import API from "../../../api/api";

export default function StudentsList() {
  const { courseId } = useParams(); // <-- get courseId from URL
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId) return;

    API.get(`/courses/${courseId}/students`)   // <-- updated URL
      .then(res => setStudents(res.data || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [courseId]);

  if (loading) return <p>Loading students...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Students Enrolled</h2>

      {students.length === 0 ? (
        <p>No students enrolled yet.</p>
      ) : (
        <ul>
          {students.map((student, index) => (
            <li
              key={student._id || index}
              className="p-3 bg-gray-100 mb-2 rounded"
            >
              <p className="font-semibold">{student.name}</p>
              <p>{student.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
