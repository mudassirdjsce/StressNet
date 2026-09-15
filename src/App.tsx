import { useState } from "react";
import type { Screen } from "./utils/mock";
import { passportEvents as initialPassportEvents } from "./utils/mock";
import Sidebar from "./components/layout/Sidebar";
import TopNav from "./components/layout/TopNav";
import LoginScreen from "./pages/LoginScreen";
import DashboardScreen from "./pages/DashboardScreen";
import NetworkScreen from "./pages/NetworkScreen";
import AttributionScreen from "./pages/AttributionScreen";
import ImmuneMemoryScreen from "./pages/ImmuneMemoryScreen";
import InterventionScreen from "./pages/InterventionScreen";
import PassportScreen from "./pages/PassportScreen";

export interface PassportEvent {
  year: string;
  date: string;
  type: string;
  detail: string;
  status: string;
  outcome: string;
  intervention: string;
  hash: string;
  isNew?: boolean;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const [passportEvents, setPassportEvents] = useState<PassportEvent[]>(initialPassportEvents);
  const [interventionDone, setInterventionDone] = useState(false);
  const [caseStatuses, setCaseStatuses] = useState<Record<string, string>>({});

  const navigate = (s: Screen) => setScreen(s);

  const handleConfirmIntervention = (caseId: string, optionLabel: string) => {
    setCaseStatuses(prev => ({ ...prev, [caseId]: "Intervention Initiated" }));
    setInterventionDone(true);

    const now = new Date();
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const dateStr = monthNames[now.getMonth()] + " " + now.getFullYear();
    const hashSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();

    const newEvent: PassportEvent = {
      year: String(now.getFullYear()),
      date: dateStr,
      type: "Intervention Recorded",
      detail: "Network stress intervention — Group G-204",
      status: "Verified",
      outcome: "Monitoring",
      intervention: optionLabel,
      hash: "SIM-RECORD-D" + hashSuffix,
      isNew: true,
    };

    setPassportEvents(prev => [...prev, newEvent]);
  };

  const handleResetDemo = () => {
    setScreen("login");
    setPassportEvents(initialPassportEvents);
    setInterventionDone(false);
    setCaseStatuses({});
  };

  if (screen === "login") {
    return <LoginScreen onLogin={() => setScreen("dashboard")} />;
  }

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#F5F7FA" }}>
      <Sidebar current={screen} onNavigate={navigate} onSignOut={handleResetDemo} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopNav onResetDemo={handleResetDemo} interventionDone={interventionDone} />
        <main style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", minHeight: 0 }}>
          {screen === "dashboard" && <DashboardScreen onNavigate={navigate} interventionDone={interventionDone} />}
          {screen === "network" && <NetworkScreen onNavigate={navigate} />}
          {screen === "attribution" && <AttributionScreen onNavigate={navigate} />}
          {screen === "immune-memory" && <ImmuneMemoryScreen onNavigate={navigate} />}
          {screen === "intervention" && (
            <InterventionScreen
              onNavigate={navigate}
              onConfirmIntervention={handleConfirmIntervention}
              caseStatuses={caseStatuses}
              interventionDone={interventionDone}
            />
          )}
          {screen === "passport" && (
            <PassportScreen onNavigate={navigate} passportEvents={passportEvents} />
          )}
        </main>
      </div>
    </div>
  );
}
