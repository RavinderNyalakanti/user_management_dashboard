# User Management Dashboard

## Project Overview

This project is a **User Management Dashboard** built using **React.js** and **Material-UI**. It provides functionalities to manage a list of users, including adding, editing, and deleting users. Additional features like pagination and search make the application user-friendly and efficient.

---

## Features

1. **User List Display**:
   - Users are displayed in a clean, tabular format.
   - Each user has options to edit or delete their details.

2. **Add New User**:
   - A modal form to add new users with fields for ID, First Name, Last Name, Email, and Department.
   - On submission, the user is added to the list.

3. **Edit User**:
   - Users can update their details by editing their information through a modal form.

4. **Delete User**:
   - Users can be removed from the list using the delete button.

5. **Pagination**:
   - Displays users in paginated chunks for better performance and usability.

6. **Search Functionality**:
   - Allows users to search by user first name or other criteria to filter the displayed list.

7. **Error Handling**:
   - Friendly error messages are displayed when API requests fail.

8. **Responsive Design**:
   - The interface is mobile-friendly, ensuring a seamless experience across devices.

---

## Technologies Used

1. **React.js**: 
   - Used to build the user interface with a component-based architecture.
2. **Material-UI**: 
   - Provides pre-styled components for a modern and consistent design.
3. **Axios**: 
   - Used for making API calls to interact with the `JSONPlaceholder` API.
4. **JSONPlaceholder API**: 
   - A mock REST API used to simulate user data for development purposes.

---

## Component Structure

1. **App Component**:
   - The main wrapper that integrates all other components.

2. **UserList Component**:
   - Displays the list of users and provides edit and delete options.

3. **UserForm Component**:
   - Handles adding and editing user details.

4. **ErrorBoundary Component**:
   - Catches errors and displays user-friendly messages.

---

## Implementation Details

### 1. **Fetching and Displaying Users**
   - Used the `componentDidMount()` lifecycle method (or `useEffect` in functional components) to fetch users from the API.
   - Data is stored in the state and displayed in a paginated table.

### 2. **Adding a New User**
   - A button labeled "Add User" opens a modal form.
   - The form includes validation for required fields and proper email format.
   - Sends a `POST` request to the API and updates the state with the new user.

### 3. **Editing a User**
   - On clicking the "Edit" button, the form fields are pre-populated with the selected user's data.
   - Sends a `PUT` request to update user details and reflects the changes in the state.

### 4. **Deleting a User**
   - Clicking the "Delete" button removes the user from the state.
   - Sends a `DELETE` request to the API to simulate deletion.

### 5. **Pagination**
   - Users are displayed in chunks based on the current page.
   - State variables manage the current page and items per page.

### 6. **Search Functionality**
   - Filters the user list based on the search query.
   - Updates the displayed list dynamically as the user types.

### 7. **Error Handling**
   - All API requests are wrapped in `try-catch` blocks.
   - Errors are displayed as friendly messages on the UI.

---

## How to Run the Project

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/RavinderNyalakanti/user_management_dashboard.git
