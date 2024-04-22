import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for navigation
import { Button } from "@/components/ui/button";

interface RepairSpecialist {
  _id: string;
  name: string;
  address: string;
  profilePicture: string;
  specialization: string;
  certificates: string;
  contactNumber: string;
  email: string;
}

const RepairSpecialistList: React.FC = () => {
  const [repairSpecialists, setRepairSpecialists] = useState<
    RepairSpecialist[]
  >([]);
  const [filteredSpecialists, setFilteredSpecialists] = useState<
    RepairSpecialist[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  useEffect(() => {
    axios
      .get("http://localhost:3000/repairSpecialist/get")
      .then((response) => {
        if (response.data.success) {
          setRepairSpecialists(response.data.existingRs);
          setFilteredSpecialists(response.data.existingRs);
          setError(null);
        } else {
          setError(response.data.error || "Unknown error occurred");
        }
      })
      .catch((error) => {
        console.error("Error fetching repair specialist data:", error);
        setError("Failed to fetch repair specialist data");
      });
  }, []);

  useEffect(() => {
    const filtered = repairSpecialists.filter(
      (rs) =>
        rs.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rs.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSpecialists(filtered);
  }, [repairSpecialists, searchQuery]);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Search by Name or Specialization"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "600px", padding: "8px", fontSize: "16px" }}
        />
      </div>
      <div className="flex flex-wrap justify-center">
        {filteredSpecialists.map((rs: any) => (
          <div key={rs._id} className="m-4">
            <div className="max-w-xs rounded overflow-hidden shadow-lg">
              <img
                className="w-full"
                src={rs.profilePicture}
                alt="Repair Specialist"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{rs.name}</div>
                <p className="text-gray-700 text-base">
                  <strong>Address:</strong> {rs.address}
                </p>
                <p className="text-gray-700 text-base">
                  <strong>Specialization:</strong> {rs.specialization}
                </p>
                <p className="text-gray-700 text-base">
                  <strong>Certificates:</strong> {rs.certificates}
                </p>
              </div>
              <div className="px-6 py-4">
                {/* Link to another page passing repair specialist ID as URL parameter */}
                <Button
                  type="button"
                  className="w-full text-white bg-primary hover:bg-secondary ease-in-out hover:text-white tw-50 mt-4"
                  variant="outline"
                  /*onClick={() => generateInvoiceReport(rs)}*/
                >
                  Create a Booking
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepairSpecialistList;
