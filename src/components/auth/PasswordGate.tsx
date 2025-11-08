"use client";

import "./PasswordGate.css";
import { useEffect, useMemo, useState } from "react";

type PasswordGateProps = {
  children: React.ReactNode;
};

const STORAGE_KEY = "gia:isAuthenticated";

export const PasswordGate = ({ children }: PasswordGateProps) => {
  const requiredPassword = useMemo(
    () => process.env.NEXT_PUBLIC_SITE_PASSWORD ?? "",
    [],
  );
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"locked" | "unlocked">(
    requiredPassword ? "locked" : "unlocked",
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!requiredPassword) return;
    if (typeof window === "undefined") return;
    const saved = window.sessionStorage.getItem(STORAGE_KEY);
    if (saved === "true") {
      setStatus("unlocked");
    }
  }, [requiredPassword]);

  useEffect(() => {
    if (status === "unlocked" && typeof window !== "undefined") {
      window.sessionStorage.setItem(STORAGE_KEY, "true");
    }
  }, [status]);

  if (status === "unlocked") {
    return <>{children}</>;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.trim() === requiredPassword.trim()) {
      setStatus("unlocked");
      setError(null);
      return;
    }
    setError("Incorrect password. Try again.");
  };

  return (
    <>
      {children}
      <div className="password-gate">
        <div className="password-gate-card">
          <form className="password-gate-form" onSubmit={handleSubmit}>
            <input
              type="password"
              autoComplete="current-password"
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
                if (error) setError(null);
              }}
              placeholder="Password"
              required
            />
            <button type="submit" className="password-gate-button">
              Unlock
            </button>
            {error ? (
              <span className="password-gate-error">{error}</span>
            ) : null}
          </form>
        </div>
      </div>
    </>
  );
};
