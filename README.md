# Hotel Management System - Frontend

A React-based frontend for the Hotel Management System, providing tailored interfaces for both hotel staff (Admin) and guests (User) to manage bookings, room availability, and customer information.

## Features

### Admin Role
- **Dashboard:** Overview of hotel operations, including current bookings and room status.
- **Room Management:** Manage room availability, add new rooms, and update room details.
- **Booking Management:** View, edit, and cancel bookings made by guests.
- **Customer Management:** Access customer profiles, view booking history, and update guest information.
- **Billing:** Generate and manage invoices for customer payments.

### User Role
- **Room Search:** Browse available rooms based on dates and preferences.
- **Booking:** Make room reservations with customer details and preferences.
- **Booking History:** View and manage personal booking history.
- **Profile Management:** Update personal details, preferences, and view invoices.

## Technologies

- **React.js:** Core frontend library
- **Redux:** State management
- **Bootstrap:** UI styling

## API Integration

The frontend communicates with the backend via a RESTful API, handling operations for both Admin and User roles, such as room management, bookings, and customer data.

## Screenshots

| Admin Dashboard | Room Management |
|-----------------|-----------------|
| ![Admin Dashboard](screenshots/admin-dashboard.png) | ![Room Management](screenshots/room-management.png) |

| User Booking | Booking History |
|--------------|-----------------|
| ![User Booking](screenshots/user-booking.png) | ![Booking History](screenshots/booking-history.png) |

## Future Works

- **Mobile Optimization:** Enhance responsiveness and usability on mobile devices.
- **Multi-Language Support:** Add support for multiple languages to cater to a diverse user base.
- **Advanced Analytics:** Integrate advanced analytics for admins to monitor booking trends, occupancy rates, and customer demographics.
- **Chat Support:** Implement a live chat feature for users to communicate with hotel staff.

## Challenges

- **State Management:** Handling complex state logic across multiple user roles (Admin and User) was challenging but manageable with Redux.
- **API Integration:** Ensuring smooth and secure API communication, especially with sensitive data like customer information and payments, required careful planning and testing.
- **Responsive Design:** Maintaining a consistent and user-friendly interface across different screen sizes was challenging but achieved through Bootstrap.

## Environment Variables

- `REACT_APP_API_URL`: The base URL of the backend API

## License

This project is licensed under the MIT License.

## Authors

- **Your Name** - [GitHub](https://github.com/your-username)
