import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
Chart as ChartJS,
ArcElement,
Tooltip,
Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
ArcElement,
Tooltip,
Legend
);

function Dashboard() {
const { logout } = useAuth();

const applications =
JSON.parse(
localStorage.getItem("applications")
) || [];

const totalApplications =
applications.length;

const applied = applications.filter(
(app) => app.status === "Applied"
).length;

const interviews =
applications.filter(
(app) =>
app.status === "Interview"
).length;

const offers = applications.filter(
(app) => app.status === "Offer"
).length;

const rejected =
applications.filter(
(app) =>
app.status === "Rejected"
).length;
const successRate =
  totalApplications > 0
    ? (
        (offers /
          totalApplications) *
        100
      ).toFixed(1)
    : 0;

const interviewRate =
  totalApplications > 0
    ? (
        (interviews /
          totalApplications) *
        100
      ).toFixed(1)
    : 0;

const chartData = {
labels: [
"Applied",
"Interview",
"Offer",
"Rejected",
],
datasets: [
{
data: [
applied,
interviews,
offers,
rejected,
],
backgroundColor: [
"#36A2EB",
"#FFCE56",
"#4BC0C0",
"#FF6384",
],
},
],
};

return (

  <div className="min-h-screen bg-gray-100 p-6">
    <div className="max-w-7xl mx-auto">

  <div className="flex justify-between items-center mb-8">
    <h1 className="text-4xl font-bold">
      Internship Dashboard
      <p className="text-gray-500">
  Track and manage your internship applications.
</p>
    </h1>
    

    <button
      onClick={() => {
        logout();
        window.location.href = "/";
      }}
      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
    >
      Logout
    </button>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-gray-500">
        Total Applications
      </h3>
      <h2 className="text-5xl font-bold">
        {totalApplications}
      </h2>
    </div>

    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-gray-500">
        Interviews
      </h3>
      <h2 className="text-5xl font-bold text-yellow-600">
        {interviews}
      </h2>
    </div>

    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-gray-500">
        Offers
      </h3>
      <h2 className="text-5xl font-bold text-green-600">
        {offers}
      </h2>
    </div>

    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-gray-500">
        Rejected
      </h3>
      <h2 className="text-5xl font-bold text-red-600">
        {rejected}
      </h2>
    </div>

  </div>

  <div className="bg-white p-6 rounded-xl shadow-md mt-8">
    <h2 className="text-2xl font-bold mb-4">
      Analytics
    </h2>

    <p className="mb-2">
      Interview Rate:
      <span className="font-bold ml-2">
        {interviewRate}%
      </span>
    </p>

    <p>
      Offer Success Rate:
      <span className="font-bold ml-2">
        {successRate}%
      </span>
    </p>
  </div>

  <div className="bg-white p-6 rounded-xl shadow-md mt-8">
    <h2 className="text-2xl font-bold mb-4">
      Application Status
    </h2>

    <div className="max-w-lg mx-auto">
      <Pie data={chartData} />
    </div>
  </div>

  <div className="flex gap-4 mt-8">
    <Link
      to="/applications"
      className="bg-blue-600 text-white px-5 py-3 rounded-lg"
    >
      Manage Applications
    </Link>

    <Link
      to="/companies"
      className="bg-green-600 text-white px-5 py-3 rounded-lg"
    >
      View API Data
    </Link>
  </div>

</div>
</div>
);
}

export default Dashboard;
