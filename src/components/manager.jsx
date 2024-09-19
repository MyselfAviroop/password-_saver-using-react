import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [savedPasswords, setSavedPasswords] = useState([]);
  const [editingId, setEditingId] = useState(null); // To track which password is being edited

  const getpasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let loadedPasswords = await req.json();
    console.log("Loaded passwords:", loadedPasswords);
    setSavedPasswords(loadedPasswords);
  };

  useEffect(() => {
    getpasswords();
  }, []);

  const savePassword = async () => {
    if (form.site.length <= 5 || form.username.length <= 3 || form.password.length <= 5) {
      toast("Ensure all fields are correctly filled", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    if (editingId) {
      // Edit existing password
      const updatedPasswords = savedPasswords.map((item) =>
        item.id === editingId ? { ...form, id: editingId } : item
      );

      await fetch("http://localhost:3000/", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "PUT", // Assuming you have an endpoint for editing
        body: JSON.stringify({ ...form, id: editingId }),
      });

      setSavedPasswords(updatedPasswords); // Set the updated passwords
      setEditingId(null); // Reset editing state
      toast("Password updated successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      // Add new password
      const newPassword = { ...form, id: uuidv4() };
      const updatedPasswords = [...savedPasswords, newPassword];
      await fetch("http://localhost:3000/", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(newPassword),
      });
      setSavedPasswords(updatedPasswords);
      toast("Password saved successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }

    setForm({ site: "", username: "", password: "" });
  };

  const deletePassword = async (id) => {
    const updatedPasswords = savedPasswords.filter((item) => item.id !== id);
    await fetch("http://localhost:3000/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    setSavedPasswords(updatedPasswords);
    toast("Password deleted successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const editPassword = (id) => {
    const passwordToEdit = savedPasswords.find((item) => item.id === id);
    if (passwordToEdit) {
      setForm({
        site: passwordToEdit.site,
        username: passwordToEdit.username,
        password: passwordToEdit.password,
      });
      setEditingId(id); // Set the editing ID to keep track of what we're editing
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    if (passwordRef.current) {
      passwordRef.current.type = showPassword ? "password" : "text";
    }
  };

  const copyText = (text, event) => {
    toast("Copied to clipboard", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    navigator.clipboard
      .writeText(text)
      .then(() => console.log("Text copied to clipboard"))
      .catch((err) => console.error("Could not copy text:", err));

    event.currentTarget.classList.add("active");
    setTimeout(() => {
      event.currentTarget.classList.remove("active");
    }, 200);
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />

      <div className="relative min-h-screen bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_10%,#63e_100%)]">
        {/* Title */}
        <h1 className="text-violet-800 font-extrabold flex justify-center py-5 text-4xl sm:text-5xl relative z-10">
          PassOp
        </h1>
        <p className="text-violet-900 py-2 font-bold flex justify-center text-xl sm:text-2xl relative z-10">
          Your own password manager
        </p>

        {/* Form Inputs */}
        <div className="mb-4 px-4 relative z-10">
          <input
            value={form.site}
            name="site"
            type="text"
            onChange={handleChange}
            className="w-full p-2 border border-black rounded-md text-base sm:text-sm"
            placeholder="Enter website URL"
          />
        </div>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 text-sm px-4 relative z-10">
          <div className="w-full sm:w-1/2">
            <input
              value={form.username}
              onChange={handleChange}
              type="text"
              name="username"
              className="w-full p-2 border border-black rounded-md text-base sm:text-sm"
              placeholder="Enter Username"
            />
          </div>

          <div className="w-full sm:w-1/2 relative text-sm">
            <input
              value={form.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              name="password"
              className="w-full p-2 border border-black rounded-md text-base sm:text-sm"
              placeholder="Enter Password"
              ref={passwordRef}
            />
            {/* Toggle icon */}
            <span
              className="absolute right-3 top-2.5 text-xl cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              <i
                className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              ></i>
            </span>
          </div>
        </div>

        {/* Center the button */}
        <div className="flex justify-center py-3 relative z-10">
          <button
            onClick={savePassword}
            className="border text-white bg-violet-800 border-black flex justify-center items-center px-4 py-2 rounded-md transition-transform duration-150 active:scale-95"
          >
            <lord-icon
              src="https://cdn.lordicon.com/zrkkrrpl.json"
              trigger="hover"
              stroke="bold"
              state="hover-swirl"
              colors="primary:#ffffff,secondary:#ffffff"
            ></lord-icon>
            Save
          </button>
        </div>

        {/* Center the table */}
        <div className="flex justify-center px-4 relative z-10">
          <div className="passwords py-5 text-black font-bold text-l overflow-auto w-full">
            <h1 className="text-2xl text-violet-900 text-center mb-4">
              Your Passwords:
            </h1>
            {savedPasswords.length === 0 && (
              <div className="text-lg">No passwords to show</div>
            )}
            {savedPasswords.length > 0 && (
              <div className="flex w-full justify-center">
                <table className="table-auto w-full max-w-6xl rounded-lg">
                  <thead className="py-5 font-semibold border text-lg border-black bg-violet-900 text-white">
                    <tr>
                      <th>Site</th>
                      <th>Username</th>
                      <th>Password</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {savedPasswords.map((item) => (
                      <tr key={item.id}>
                        <td className="text-center w-32 border border-white rounded-lg">
                          {item.site}
                          <div
                            onClick={(e) => copyText(item.site, e)}
                            className="cursor-pointer transform transition-transform duration-200 ease-in-out active:scale-90"
                          >
                            <i className="fa-regular fa-copy"></i>
                          </div>
                        </td>
                        <td className="text-center w-32 border border-white rounded-lg">
                          {item.username}
                          <div
                            onClick={(e) => copyText(item.username, e)}
                            className="cursor-pointer transform transition-transform duration-200 ease-in-out active:scale-90"
                          >
                            <i className="fa-regular fa-copy"></i>
                          </div>
                        </td>
                        <td className="text-center w-32 border border-white rounded-lg">
                          {item.password}
                          <div
                            onClick={(e) => copyText(item.password, e)}
                            className="cursor-pointer transform transition-transform duration-200 ease-in-out active:scale-90"
                          >
                            <i className="fa-regular fa-copy"></i>
                          </div>
                        </td>
                        <td className="text-center w-32 border border-white rounded-lg">
                          <span>
                            <div className="flex justify-center px-5 items-center cursor-pointer">
                              {" "}
                              <div
                                className="px-5"
                                onClick={() => deletePassword(item.id)}
                              >
                                <lord-icon
                                  src="https://cdn.lordicon.com/drxwpfop.json"
                                  trigger="hover"
                                  stroke="bold"
                                  colors="primary:#121331,secondary:#000000"
                                  className="w-6 h-6 sm:w-8 sm:h-8"
                                ></lord-icon>
                              </div>
                              <div  onClick={() => editPassword(item.id)}>
                               
                                <lord-icon
                                  src="https://cdn.lordicon.com/wuvorxbv.json"
                                  trigger="hover"
                                  stroke="bold"
                                  colors="primary:#121331,secondary:#000000"
                                  className="w-6 h-6 sm:w-8 sm:h-8"
                                ></lord-icon>
                              </div>
                            </div>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
