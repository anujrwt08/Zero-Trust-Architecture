# MedVault Zero (My Digital Shield)

**A Zero-Trust, Client-Side Encrypted Medical Records Platform**

MedVault Zero is a secure medical data management system designed with a "privacy-first" architecture. It ensures that sensitive patient data is encrypted in the browser before it ever reaches the server, meaning not even the server administrators can access the raw medical information.

![Project Status](https://img.shields.io/badge/Status-In%20Development-green)
![Security](https://img.shields.io/badge/Security-Zero%20Trust-blue)

## 🛡️ Key Features

- **Zero-Trust Architecture**: We assume the network is compromised. All data is treated as untrusted until verified and decrypted.
- **Client-Side Encryption**: Patient records (Lab results, Imaging, Prescriptions) are encrypted using **AES-256-GCM** directly in the user's browser.
- **Role-Based Access Control (RBAC)**:
  - **Patients**: secure dashboard to view, upload, and manage their own encrypted records.
  - **Doctors**: specific views for consultation (access delegated via secure keys).
  - **Admins**: system oversight without access to private patient content.
- **Active Defense**: Integration of "Honeytokens" to detect and alert on unauthorized access attempts.
- **Modern UI/UX**: Built with a premium, responsive design using Tailwind CSS and Framer Motion.

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Shadcn UI
- **Animations**: Framer Motion
- **State Management**: TanStack Query
- **Routing**: React Router DOM (v6)
- **Security Logic**: Web Crypto API (Simulated/Implemented for client-side ops)

## 📂 Project Structure

```bash
src/
├── components/   # Reusable UI components (ui/, dashboard/)
├── contexts/     # Global state (AuthContext)
├── lib/          # Utilities, encryption logic, mock data
├── pages/        # Main route views (PatientDashboard, Index, Auth, etc.)
└── hooks/        # Custom React hooks
```

## 🛠️ Getting Started

Follow these steps to run the application locally.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or bun

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd my-digital-shield-main
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Navigate to `http://localhost:8080` (or the port shown in your terminal).

## 🔐 Security Concepts

### Encryption Flow
1.  User uploads a file/record.
2.  Data is encrypted locally using the user's private key (derived from credentials).
3.  Only the *encrypted blob* is sent to the backend.
4.  On retrieval, the blob is downloaded and decrypted locally.

### Honeytokens
Fake records are intermixed with real data. If a malicious actor tries to access or decrypt these "traps", an alert is triggered immediately.

## 🤝 Contributing

Contributions are welcome! Please focus on security improvements and UI enhancements.

## 📄 License

This project is proprietary and intended for educational/demonstration purposes of zero-trust architecture.
