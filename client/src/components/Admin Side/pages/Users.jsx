import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../../context/AppContext";

import { useNavigate, useParams } from "react-router-dom";
const Users = () => {
  const { user, DeleteUsers, getAllUsers } = useContext(AppContext);

  const [name, setName] = useState("");

  useEffect(() => {
    getAllUsers();
  }, []);

  const username = user?.filter((data) =>
    data?.name?.toLowerCase().includes(name?.toLowerCase().trim()),
  );

  return (
    <div className="container-fluid mt-4">
      <div className="card shadow border-0">
        <div className="card-header bg-dark text-white">
          <h4 className="mb-0">All Users</h4>
        </div>

        <div className="card-body">
          {/* Search (UI only) */}
          <div className="row mb-3">
            <div className="col-md-4">
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="Search by name or email"
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Joined Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {username.length > 0 ? (
                  username?.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>

                      <td className="text-muted">{user._id.slice(0, 8)}...</td>

                      <td>{user.name}</td>
                      <td>{user.email}</td>

                      <td>
                        {new Date(user?.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      <td>
                        {/* <button className="btn btn-sm btn-primary me-2">
                        View
                      </button> */}
                        <button
                          onClick={() => DeleteUsers(user._id)}
                          className="btn btn-sm btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No Users Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
