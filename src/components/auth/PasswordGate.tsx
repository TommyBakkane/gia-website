"use client";

import "./PasswordGate.css";
import { useEffect, useState } from "react";

type PasswordGateProps = {
  children: React.ReactNode;
};

const STORAGE_KEY = "gia:isAuthenticated";

type GateStatus = "checking" | "locked" | "unlocked";

export const PasswordGate = ({ children }: PasswordGateProps) => {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<GateStatus>("checking");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const checkStatus = async () => {
      try {
        const response = await fetch("/api/site-password");
        if (!response.ok) {
          throw new Error("Failed to check password status");
        }
        const data: { enabled: boolean } = await response.json();

        if (!data.enabled) {
          if (isMounted) {
            setStatus("unlocked");
          }
          return;
        }

        if (typeof window !== "undefined") {
          const saved = window.sessionStorage.getItem(STORAGE_KEY);
          if (saved === "true") {
            if (isMounted) {
              setStatus("unlocked");
            }
            return;
          }
        }

        if (isMounted) {
          setStatus("locked");
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setStatus("unlocked");
        }
      }
    };

    void checkStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (status === "unlocked" && typeof window !== "undefined") {
      window.sessionStorage.setItem(STORAGE_KEY, "true");
    }
  }, [status]);

  if (status === "unlocked") {
    return <>{children}</>;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/site-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: input }),
      });

      if (response.ok) {
        setStatus("unlocked");
        setInput("");
        return;
      }

      if (response.status === 401) {
        setError("Incorrect password. Try again.");
        return;
      }

      throw new Error("Unexpected response");
    } catch (err) {
      console.error(err);
      setError("Unable to verify password. Please try again later.");
    }
  };

  return (
    <>
      {children}
      {status === "locked" ? (
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
      ) : null}
    </>
  );
};
