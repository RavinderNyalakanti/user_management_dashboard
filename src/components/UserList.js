import React, { useState, useEffect } from "react";
import axios from "axios";
import './UserList.css';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button'; 

import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

function UserList() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ id: "", firstName: "", lastName: "", email: "", department: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarDeleteOpen, setSnackbarDeleteOpen] = useState(false);
  const [snackbarEditOpen, setSnackbarEditOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState("");

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSnackbarDeleteClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarDeleteOpen(false);
  };



  const handleSnackbarEditClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarEditOpen(false);
  };





  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers) {
      setUsers(storedUsers);
    } else {
      fetchUsers();
    }
  }, []);

  useEffect(() => {
    if (isFormVisible) {
      handleClickOpen();
    } else {
      handleClose();
    }
  }, [isFormVisible]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      const fetchedUsers = response.data.map((user) => ({
        id: user.id,
        firstName: user.name.split(" ")[0],
        lastName: user.name.split(" ")[1] || "",
        email: user.email,
        department: "Unknown",
      }));
      setUsers(fetchedUsers);
      localStorage.setItem("users", JSON.stringify(fetchedUsers));
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const generateNewId = () => {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
  };

  const handleAddUser = async () => {
    try {
      const newUser = { ...formData, id: generateNewId() };
      await axios.post("https://jsonplaceholder.typicode.com/users", newUser);
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setSnackbarOpen(true);
      resetForm();
    } catch (err) {
      setError("Failed to add user");
    }
  };



  const handleEditUser = async () => {
    try {
      const updatedUser = { ...formData };
      const updatedUsers = users.map((user) => (user.id === formData.id ? updatedUser : user));
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setSnackbarEditOpen(true);
      resetForm();
    } catch (err) {
      setError("Failed to update user");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setSnackbarDeleteOpen(true);
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({ id: "", firstName: "", lastName: "", email: "", department: "" });
    setIsEditing(false);
    setIsFormVisible(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredUsers = users.filter(user => user.firstName.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4" style={{ textAlign: "center", color: "#3f51b5" }}>User Management Dashboard</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="button-container">
      
      
        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity="success">
            User added successfully!
          </Alert>
        </Snackbar>

        {isFormVisible && (
          <Dialog open={open} onClose={handleClose}>
            <DialogContent>
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded shadow-lg">
                  <h2 className="text-lg font-bold mb-4">{isEditing ? "Edit User" : "Add New User"}</h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      isEditing ? handleEditUser() : handleAddUser();
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="First Name"
                          id="outlined-size-small"
                          name="firstName"
                          size="small"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Last Name"
                          id="outlined-size-small"
                          name="lastName"
                          size="small"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Email"
                          type="email"
                          id="outlined-size-small"
                          name="email"
                          size="small"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Department"
                          id="outlined-size-small"
                          name="department"
                          size="small"
                          value={formData.department}
                          onChange={handleInputChange}
                          required
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                    <div className="flex justify-end">
                      <DialogActions>
                        <Button onClick={resetForm}>Cancel</Button>
                        <Button type="submit">{isEditing ? "Update User" : "Add User"}</Button>
                      </DialogActions>
                    </div>
                  </form>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="filter-add-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',  }}>
        <TextField
          label="Filter by First Name"
          variant="outlined"
          size="small"
          value={filter}
          onChange={handleFilterChange}
          style={{ marginBottom: "20px",  }}
        />
        <Button size="small" variant="contained" onClick={() => setIsFormVisible(true)} style={{ marginLeft: '10px' }}>Add New User</Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <TableContainer component={Paper} style={{ marginTop: "30px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>


                  <Snackbar open={snackbarEditOpen} autoHideDuration={3000} onClose={handleSnackbarEditClose}>
                      <Alert onClose={handleSnackbarEditClose} severity="primary">
                        User edited successfully!
                      </Alert>
                    </Snackbar>


                    <Button
                      className="mr-2"
                      size="small"
                      variant="contained"
                      onClick={() => {
                        setIsEditing(true);
                        setIsFormVisible(true);
                        setFormData(user); 
                       
                      }}
                    >
                      <EditIcon />
                    </Button>

                    <Snackbar open={snackbarDeleteOpen} autoHideDuration={3000} onClose={handleSnackbarDeleteClose}>
                      <Alert onClose={handleSnackbarDeleteClose} severity="error">
                        User deleted successfully!
                      </Alert>
                    </Snackbar>

                    <Button
                      className="delete-btn"
                      style={{ marginLeft: '10px' }}
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => {
                        handleDeleteUser(user.id);
                        setSnackbarDeleteOpen(true);
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
    </div>
  );
}

export default UserList;
