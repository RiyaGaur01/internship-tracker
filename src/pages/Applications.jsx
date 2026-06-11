import { useState, useEffect } from "react";
import { saveAs } from "file-saver";
function Applications() {
const [applications, setApplications] = useState(() => {
return JSON.parse(localStorage.getItem("applications")) || [];
});

const [form, setForm] = useState({
company: "",
jobTitle: "",
location: "",
appliedDate: "",
status: "Applied",
notes: "",
});

const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("");
const [editingId, setEditingId] = useState(null);

useEffect(() => {
localStorage.setItem(
"applications",
JSON.stringify(applications)
);
}, [applications]);

const handleChange = (e) => {
setForm({
...form,
[e.target.name]: e.target.value,
});
};

const handleSubmit = (e) => {
e.preventDefault();

if (editingId !== null) {
  setApplications(
    applications.map((app) =>
      app.id === editingId
        ? {
            ...app,
            ...form,
          }
        : app
    )
  );

  setEditingId(null);
} else {
  const newApplication = {
    id: Date.now(),
    ...form,
  };

  setApplications([
    ...applications,
    newApplication,
  ]);
}

setForm({
  company: "",
  jobTitle: "",
  location: "",
  appliedDate: "",
  status: "Applied",
  notes: "",
});

};

const editApplication = (app) => {
setForm({
company: app.company,
jobTitle: app.jobTitle,
location: app.location,
appliedDate: app.appliedDate,
status: app.status,
notes: app.notes,
});

setEditingId(app.id);

};

const deleteApplication = (id) => {
setApplications(
applications.filter(
(app) => app.id !== id
)
);
};
const exportCSV = () => {
  const headers = [
    "Company",
    "Job Title",
    "Location",
    "Applied Date",
    "Status",
    "Notes",
  ];

  const rows = applications.map((app) => [
    app.company,
    app.jobTitle,
    app.location,
    app.appliedDate,
    app.status,
    app.notes,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob(
    [csvContent],
    {
      type: "text/csv;charset=utf-8;",
    }
  );

  saveAs(
    blob,
    "internship_applications.csv"
  );
};
const filteredApplications =
applications.filter((app) => {
const matchesSearch =
app.company
.toLowerCase()
.includes(
search.toLowerCase()
);

  const matchesStatus =
    statusFilter === "" ||
    app.status === statusFilter;

  return (
    matchesSearch &&
    matchesStatus
  );
});

return (
  <div className="min-h-screen bg-gray-100 p-6">
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">
        Applications
      </h1>

      {editingId !== null && (
        <p className="text-green-600 font-semibold mb-4">
          Currently Editing Application
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <input
          name="company"
          placeholder="Company Name"
          value={form.company}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          name="jobTitle"
          placeholder="Job Title"
          value={form.jobTitle}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="date"
          name="appliedDate"
          value={form.appliedDate}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option>Applied</option>
          <option>Screening</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>

        <textarea
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg"
        >
          {editingId !== null
            ? "Update Application"
            : "Add Application"}
        </button>
      </form>

      <div className="bg-white p-4 rounded-lg shadow-md mt-6">
        <input
          type="text"
          placeholder="Search Company"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border rounded-lg p-3 mr-3"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="border rounded-lg p-3"
        >
          <option value="">
            All Status
          </option>
          <option value="Applied">
            Applied
          </option>
          <option value="Screening">
            Screening
          </option>
          <option value="Interview">
            Interview
          </option>
          <option value="Offer">
            Offer
          </option>
          <option value="Rejected">
            Rejected
          </option>
        </select>
      </div>

      <button
        type="button"
        onClick={exportCSV}
        className="mt-4 bg-green-600 text-white px-5 py-3 rounded-lg"
      >
        Export CSV
      </button>

      <div className="mt-6">
        {filteredApplications.map((app) => (
          <div
            key={app.id}
            className="bg-white rounded-lg shadow-md p-4 mb-4"
          >
            <h3 className="text-xl font-bold">
              {app.company}
            </h3>

            <p>Role: {app.jobTitle}</p>
            <p>Location: {app.location}</p>
            <p>Status: {app.status}</p>
            <p>Date: {app.appliedDate}</p>
            <p>{app.notes}</p>

            <div className="mt-3">
              <button
                type="button"
                onClick={() =>
                  editApplication(app)
                }
                className="bg-blue-600 text-white px-3 py-2 rounded mr-2"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() =>
                  deleteApplication(app.id)
                }
                className="bg-red-600 text-white px-3 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}
export default Applications;
