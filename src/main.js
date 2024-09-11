import $ from "jquery";

// Create a simple store
const createStore = (initialState) => {
  let state = initialState;
  const listeners = new Set();

  const getState = () => state;

  const setState = (newState) => {
    state = { ...state, ...newState };
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return { getState, setState, subscribe };
};

// Create our store
window.jQueryStore = createStore({
  jqueryLoaded: false,
  globalMessage: "",
});

// Set up jQuery content
$(document).ready(function () {
  $("#jquery-content").html("<p>This content was added using jQuery!</p>");
  $("#jquery-content").addClass("jquery-section");

  // Update our store
  window.jQueryStore.setState({
    jqueryLoaded: true,
    globalMessage: "Hello from jQuery!",
  });

  console.log("jQuery script loaded and store updated");
});
