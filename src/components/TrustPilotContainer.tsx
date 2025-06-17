import React from "react";

// Extend Window interface to include Trustpilot
declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (element: HTMLElement, force?: boolean) => void;
    };
  }
}

const TrustBox = () => {
  // Create a reference to the <div> element which will represent the TrustBox
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // If window.Trustpilot is available it means that we need to load the TrustBox from our ref.
    // If it's not, it means the script you pasted into <head /> isn't loaded just yet.
    // When it is, it will automatically load the TrustBox.
    if (window.Trustpilot && ref.current) {
      window.Trustpilot.loadFromElement(ref.current, true);
    }
  }, []);

  return (
    <div
      ref={ref} // We need a reference to this element to load the TrustBox in the effect.
      className="trustpilot-widget " // Renamed this to className.
      data-locale="en-US"
      data-template-id="539ad0ffdec7e10e686debd7"
      data-businessunit-id="5e795434fb50ff00015cb6e6"
      data-style-height="100px"
      data-style-width="100%"
      data-theme="dark"
      style={{
        minHeight: "130px",
        fontSize: "25px", // Increase base font size
        transform: "scale(1.2)", // Scale up the entire widget
        transformOrigin: "center",
      }}
    >
      <a
        href="https://www.trustpilot.com/review/mitchcactus.co"
        target="_blank"
        rel="noopener"
      >
        Trustpilot
      </a>
    </div>
  );
};

export default TrustBox;
