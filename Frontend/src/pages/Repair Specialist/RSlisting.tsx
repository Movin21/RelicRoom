import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

interface RepairSpecialist {
  _id: string;
  name: string;
  address: string;
  profilePicture: string;
  certifications: string[];
  experiences: string[];
}

const RepairSpecialistList: React.FC = () => {
  const [repairSpecialists, setRepairSpecialists] = useState<RepairSpecialist[]>([]);
  const [filteredSpecialists, setFilteredSpecialists] = useState<RepairSpecialist[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchName, setSearchName] = useState<string>("");

  useEffect(() => {
    axios
      .get<{ success: boolean; existingRs: RepairSpecialist[]; error: string }>("http://localhost:3000/repairSpecialist/get")
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
    const filtered = repairSpecialists.filter(rs =>
      rs.name.toLowerCase().includes(searchName.toLowerCase())
    );
    setFilteredSpecialists(filtered);
  }, [repairSpecialists, searchName]);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <input
            type="text"
            placeholder="Search Your Specialist"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            style={{ width: "300px", padding: "8px", fontSize: "16px" }}
        />
        </div>
      <div className="flex flex-wrap justify-center">
        {filteredSpecialists.map((rs) => (
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
              </div>
              <div className="px-6 py-4">
              <Button
                type="submit"
                className="w-full text-white bg-primary hover:bg-secondary ease-in-out hover:text-white tw-50 mt-4"
                variant="outline"

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
