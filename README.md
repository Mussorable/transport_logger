# Table Management Application

This is an interactive web application for managing truck legends and schedules. The application is built using **React** with **TypeScript** and leverages the **Moment.js** library for date and time management.

---

## Features

- Add and manage truck legends dynamically.
- Edit trucks and their work schedules (`workLegend`).
- Responsive and user-friendly interface with interactive modals.
- Built-in localization for handling date and time formats based on the user's browser.

---

## Installation

### Prerequisites
To run this project locally, ensure you have the following installed on your system:
- **Node.js v16+**
- **npm v8+**

### Steps
1. Clone the repository:
   ```bash
   git clone <https://github.com/Mussorable/transport_logger.git>
   cd <transport_logger>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the application in your browser:
   ```
   http://localhost:5173
   ```

---

## Usage

### Adding a Truck
1. Click the **Add Truck** button.
2. Enter the truck number and submit the form.
3. The truck will be added to the list with an empty legend.

### Viewing and Editing a Legend
- Click the truck to view or edit its associated **workLegend**.
- Add, update, or delete entries as needed to manage the delivery schedule.

---

## Technologies Used

- **React (v18)**: For building the user interface.
- **TypeScript (v5.6)**: Ensures type safety across the codebase.
- **Moment.js (v2.30)**: For date and time manipulation.
- **Tailwind CSS (v3.4)**: For styling the components.
- **Vite (v6)**: For fast and efficient development.