# FaddomTest Full Stack Project

This repository includes both the frontend and backend services for the FaddomTest project. The backend fetches AWS metrics data, while the frontend displays it in a user-friendly format.

---

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Version 14 or above)
- npm (Node Package Manager)

---

## How to Run the Project

### Step 1: Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/moranshalvi/FaddomTest.git
cd FaddomTest
```

### Backend Setup

#### Navigate to the Backend Directory
Move to the backend directory:

```bash
cd FaddomTest-Backend
```

#### Install Dependencies
Install the required dependencies:

```bash
yarn install
```

#### Configure Environment Variables
Create a `.env` file in the `Server` directory and add the following variables:

```plaintext
PORT=8000
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=your-aws-region
```

Replace the placeholders (`your-access-key-id`, `your-secret-access-key`, `your-aws-region`) with the appropriate values.

#### Start the Backend Server
Run the server:

```bash
npm start
```

The backend will be accessible at `http://localhost:8000`.

### Frontend Setup

#### Navigate to the Frontend Directory
Move to the frontend directory:

```bash
cd ../FaddomTest-Front
```

#### Install Dependencies
Install the required dependencies:

```bash
npm install
```

#### Start the Frontend Development Server
Run the following command to start the development server:

```bash
npm run dev
```

The frontend will be accessible at `http://localhost:5173`.

---

## Notes

### Backend

- Ensure the backend server is running before accessing the frontend.
- The backend requires AWS credentials with permissions to access EC2 and CloudWatch.

### Frontend

- The frontend communicates with the backend server at `http://localhost:8000`.

### Environment Variables

The `.env` file is not included in the repository for security reasons. Use the provided `.env.example` file as a reference.

---

## API Endpoints (Backend)

### 1. Get AWS Metrics

**Endpoint:** `/aws/getAwsCloudWatch`

**Method:** `POST`

#### Request Body Example:

```json
{
  "startTime": "2025-01-01T00:00:00.000Z",
  "endTime": "2025-01-07T23:59:59.999Z",
  "period": 300,
  "ipAddress": "192.168.1.1",
  "statistics": ["Average"]
}
```

#### Response Example:

```json
{
  "Datapoints": [
    {
      "Timestamp": "2025-01-01T01:00:00.000Z",
      "Average": 10.5,
      "Unit": "Percent"
    },
    {
      "Timestamp": "2025-01-01T02:00:00.000Z",
      "Average": 12.3,
      "Unit": "Percent"
    }
  ]
}
```

---

## Common Commands

### Backend

- Run Server:

```bash
npm start
```

### Frontend

- Run Development Server:

```bash
npm run dev
```

---

## Contributing

Feel free to contribute by forking the repository, making changes, and submitting a pull request.

---

## License

This project is licensed under the MIT License.
