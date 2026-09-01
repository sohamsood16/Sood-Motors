"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface BookingContextValue {
  selectedService: string | null;
  selectService: (serviceTitle: string) => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const selectService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    const el = document.getElementById("booking");
    if (el) {
      el.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    }
  };

  return (
    <BookingContext.Provider value={{ selectedService, selectService }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return ctx;
}
