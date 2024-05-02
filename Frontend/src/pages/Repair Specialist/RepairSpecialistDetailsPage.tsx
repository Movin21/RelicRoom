/*import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams to get URL parameters

const RepairSpecialistDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the ID parameter from the URL
  const [specialist, setSpecialist] = useState<any>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/repairSpecialist/${id}`)
      .then((response) => {
        if (response.data.success) {
          setSpecialist(response.data.repairSpecialist);
          setError(null);
        } else {
          setError(response.data.error || "Unknown error occurred");
        }
      })
      .catch((error) => {
        console.error("Error fetching repair specialist data:", error);
        setError("Failed to fetch repair specialist data");
      });
  }, [id]);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="max-w-xs rounded overflow-hidden shadow-lg">
        <img
          className="w-full"
          src={specialist.profilePicture}
          alt="Repair Specialist"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{specialist.name}</div>
          <p className="text-gray-700 text-base">
            <strong>Address:</strong> {specialist.address}
          </p>
          <p className="text-gray-700 text-base">
            <strong>Specialization:</strong> {specialist.specialization}
          </p>
          <p className="text-gray-700 text-base">
            <strong>Certificates:</strong> {specialist.certificates}
          </p>
          <p className="text-gray-700 text-base">
            <strong>Contact Number:</strong> {specialist.contactNumber}
          </p>
          <p className="text-gray-700 text-base">
            <strong>Email:</strong> {specialist.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RepairSpecialistDetailsPage;*/
