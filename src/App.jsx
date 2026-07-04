import React, { Suspense, lazy, useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { Loader } from "lucide-react";
import Hero from "./components/home/Hero";
import "./App.css";

const DocumentsPage = lazy(() => import("./pages/DocumentsPage"));

function App() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("invoice");

  const handleNavigate = () => {
    navigate("/documents");
  };

  return (
    <Routes>
      <Route path="/" element={<Hero onNavigate={handleNavigate} />} />

      <Route
        path="/documents"
        element={
          <Suspense
            fallback={
              <div className="flex min-h-screen items-center justify-center bg-neutral-50">
                <Loader size={28} className="animate-spin text-neutral-400" />
              </div>
            }
          >
            <DocumentsPage activeView={activeView} onSelect={setActiveView} />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
