# Network Stress Intervention Dashboard

A professional dashboard built for monitoring borrower networks, visualizing stress signals, predicting propagation risks, and initiating containment interventions. This application serves as a network telemetry and simulation platform to analyze group stability and emerging concerns in borrowing communities.

## Overview

The Network Stress Intervention Dashboard provides financial risk managers or analysts with real-time insights into borrower groups. It visualizes the interconnectedness of borrowers, highlights emerging stress signals (such as income trends and repayment pressures), and tracks the potential propagation of financial stress across the network.

## Key Features

- **Network Graph Visualization:** Interactive node-based visualization of borrower groups to understand network pathways.
- **Stress & Containment Telemetry:** Real-time KPI tracking for stress scores, propagation risks, and containment status.
- **Intervention Workflows:** Initiate and track interventions for critical cases.
- **Immune Memory & Attribution:** Analyze historical data and attribute risk factors to specific signals.
- **Passport Event Logging:** Detailed auditing and logging of interventions and state changes with cryptographic hashes.

## Technology Stack

- **Frontend:** React 19, TypeScript
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS 4, inline React CSS
- **Icons:** Lucide React

## Project Structure

```text
.
├── src/
│   ├── components/
│   │   ├── layout/       # Sidebar, TopNav
│   │   └── ui/           # NetworkGraph, Badge, Modals
│   ├── pages/            # DashboardScreen, NetworkScreen, PassportScreen, etc.
│   ├── utils/            # Mock data, types, and helpers
│   ├── App.tsx          # Main application router
│   └── main.tsx         # Application entry point
├── package.json         # Project dependencies and scripts
└── vite.config.ts       # Vite configuration
```

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm package manager

## Installation and Setup

1. Clone the repository and navigate into the project directory.

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

- **Development Server:**
  ```bash
  npm run dev
  ```
- **Production Build:**
  ```bash
  npm run build
  ```
- **Preview Production Build:**
  ```bash
  npm run preview
  ```

## Testing and Quality Assurance

- **Type Checking:** Run TypeScript to verify types without emitting files.
  ```bash
  npx tsc --noEmit
  ```
- **Code Formatting:** Format code using `oxfmt`.
  ```bash
  npm run format
  ```

## Future Improvements

- Add end-to-end testing with Cypress or Playwright.
- Connect to a live backend API for real-time telemetry data.
- Integrate authentication and role-based access control (RBAC).
