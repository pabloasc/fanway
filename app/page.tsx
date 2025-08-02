"use client";
import { useRouter } from "next/navigation";

export default function EntryPage() {
  const router = useRouter();
  return (
    <div
      className="min-h-screen bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: "url(pitch.webp)",
      }}
    >
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ fontFamily: "Arial, sans-serif" }}>
      <a
        className="border-0 p-0 bg-none cursor-pointer focus:outline-none"
        style={{ display: "block", maxWidth: 900, width: "100%" }}
        href="https://www.fanway.io/sell"
        aria-label="Go to Jersey Exchange Form"
      >
        <div className="bg-white rounded-xl shadow-lg p-4">
          <img
            src="/banner.png"
            alt="Time to upgrade your kit - Turn your old jersey into discounts from Adidas, Nike and more."
          />
        </div>
      </a>
    </div>

    </div>
  );
}
