import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (element: HTMLElement, includeChildren: boolean) => void;
    };
  }
}

export const TrustPilotContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Trustpilot widget script dynamically
    const script = document.createElement("script");
    script.src = "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
    script.async = true;
    script.onload = () => {
      if (window.Trustpilot && containerRef.current) {
        window.Trustpilot.loadFromElement(containerRef.current, true);
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div ref={containerRef}>
      <div
        className="trustpilot-widget"
        data-locale="en-US"
        data-template-id="53aa8807dec7e10d38f59f32"
        data-businessunit-id="5e795434fb50ff00015cb6e6"
        data-style-height="150px"
        data-style-width="100%"
        data-theme="light"
      >
        <a
          href="https://www.trustpilot.com/review/yourdomain.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Trustpilot
        </a>
      </div>
    </div>
  );
};
