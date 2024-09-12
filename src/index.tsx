import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { useSyncExternalStore } from "react";
import ReactGraph from "./widgets/react-graph";
import $ from "jquery";

declare global {
  interface Window {
    jQueryStore: {
      getState: () => { jqueryLoaded: boolean; globalMessage: string };
      setState: (newState: Partial<{ jqueryLoaded: boolean; globalMessage: string }>) => void;
      subscribe: (listener: () => void) => () => void;
    };
  }
}

const useJQueryStore = () => {
  return useSyncExternalStore(
    window.jQueryStore.subscribe,
    () => window.jQueryStore.getState(),
    () => ({ jqueryLoaded: false, globalMessage: "" })
  );
};

const App: React.FC = () => {
  const { jqueryLoaded, globalMessage } = useJQueryStore();

  useEffect(() => {
    if (jqueryLoaded) {
      console.log("React detected jQuery has loaded");
      $("#jquery-content").append("<p>This line was added by React!</p>");
    }
  }, [jqueryLoaded]);

  if (!jqueryLoaded) {
    return <div>Waiting for jQuery to load...</div>;
  }

  return (
    <div className="react-section">
      <h2>React Content</h2>
      <p>Message from jQuery: {globalMessage}</p>
      <button onClick={() => $("#jquery-content").css("color", "red")}>Change jQuery content color</button>
      <div id="datepicker"></div>
      <ReactGraph />
    </div>
  );
};

const container = document.getElementById("react-root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  console.error("React root element not found");
}

console.log("React script loaded and waiting for jQuery");
