import RevenueChart from "./Charts/RevenueCharts";

const AdminPortal = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-8">
      <div className="text-brownMedium text-2xl md:text-4xl font-bold mb-2 md:mb-4">
        Revenue
      </div>
      <RevenueChart />
    </div>
  );
};

export default AdminPortal;
