import axios from "axios";
import { useEffect, useState } from "react";

export default function UserData() {
  const [users, setUsers] = useState([]);
  const [findTerm, setFindTerm] = useState("");
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    department: "",
    salary: "",
    employeeId: "",
  });
  const [showInsertUser, setShowInsertUser] = useState(false);

  const handleShowInsertUser = () => {
    setShowInsertUser(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleInsertUser = async () => {
    // Perform logic to insert the user using the userData state
    let response = await axios.post(
      "http://localhost:3000/employee/user/insert",
      {
        name: formData.name,
        email: formData.email,
        department: formData.department,
        salary: parseInt(formData.salary),
        employeeId: parseInt(formData.employeeId),
      }
    );
    console.log(response.data);
  };

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        "http://localhost:3000/employee/user/"
      );
      const sortedUsers = result.data.sort((a, b) => a.id - b.id);
      setUsers(sortedUsers);
    }
    fetchData();
  }, []);

  const handleAddUsers = () => {
    // Add logic to show users
  };

  const handleFindUser = () => {
    // Add logic to find user
    setShowSearchBox((prevShowSearchBox) => !prevShowSearchBox);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/employee/user/delete/${id}`
      );
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (event) => {
    // event.preventDefault();

    try {
      let response;
      if (formData.id) {
        response = await axios.put(
          `http://localhost:3000/employee/user/update/${formData.id}`,
          {
            name: formData.name,
            email: formData.email,
            department: formData.department,
            salary: parseInt(formData.salary),
            employeeId: parseInt(formData.employeeId),
          }
        );
        console.log("User updated successfully");
      } 
      console.log(response.data);
    } catch (error) {
      console.log("Something Went Wrong!");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        className="text-white px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 mr-2"
        onClick={handleShowInsertUser}
        >
        Add User
      </button>

      {showInsertUser && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Insert User</h2>
          <form>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
            <input
              type="text"
              name="department"
              placeholder="Most Played Genre"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
            <input
              type="text"
              name="salary"
              placeholder="Total Download"
              value={formData.salary}
              onChange={handleInputChange}
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
            <input
              type="text"
              name="employeeId"
              placeholder="Employee ID"
              value={formData.employeeId}
              onChange={handleInputChange}
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
            <button
              type="button"
              onClick={handleInsertUser}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Insert
            </button>
          </form>
          </div>)}


      <button
        className="text-white px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600"
        onClick={handleFindUser}
        >
        Find User
      </button>
      {showSearchBox && (
          <div className="mb-4 mt-4">
            <input
              type="text"
              placeholder="Search user..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              value={findTerm}
              onChange={(e) => setFindTerm(e.target.value)}
            />
          </div>
        )}
      <br></br>
      <h2 className="text-2xl font-bold mb-4">Active Users</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Most Played Genre</th>
            <th className="border border-gray-300 px-4 py-2">Downloads</th>
            <th className="border border-gray-300 px-4 py-2">Employee ID</th>
          </tr>
        </thead>
        <tbody>
          {users.filter((user) =>
              user.name.toLowerCase().includes(findTerm.toLowerCase())
            )
          .map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 px-4 py-2">
                {user.isEditing ? (
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) =>
                      handleUpdate(user.id, 'name', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.isEditing ? (
                  <input
                    type="text"
                    value={user.email}
                    onChange={(e) =>
                      handleUpdate(user.id, 'email', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.isEditing ? (
                  <input
                    type="text"
                    value={user.department}
                    onChange={(e) =>
                      handleUpdate(user.id, 'department', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                  />
                ) : (
                  user.department
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.isEditing ? (
                  <input
                    type="text"
                    value={user.salary}
                    onChange={(e) =>
                      handleUpdate(user.id, 'salary', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                  />
                ) : (
                  user.salary
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.isEditing ? (
                  <input
                    type="text"
                    value={user.employeeId}
                    onChange={(e) =>
                      handleUpdate(user.id, 'employeeId', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                  />
                ) : (
                  user.employeeId
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.isEditing ? (
                  <>
                    <button
                      className="text-blue-500 hover:text-blue-700 mr-2"
                      onClick={() =>
                        handleUpdate(user.id, 'isEditing', false)
                      }
                    >
                      Save
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() =>
                        handleUpdate(user.id, 'isEditing', false)
                      }
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() =>
                      handleUpdate(user.id, 'isEditing', true)
                    }
                  >
                    Edit
                  </button>
                )}
                <button
                  className="text-red-500 hover:text-red-700 ml-2"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}