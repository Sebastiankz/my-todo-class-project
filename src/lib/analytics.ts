import ReactGA from "react-ga4";

export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  if (measurementId) {
    ReactGA.initialize(measurementId, {
      gaOptions: {
        debug_mode: import.meta.env.MODE === "development",
      },
    });
    console.log("Google Analytics initialized with ID:", measurementId);
  } else {
    console.warn("Google Analytics Measurement ID not found");
  }
};

export const trackPageView = (path: string, title?: string) => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
    title: title || document.title,
  });
};

export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};

export const trackAuth = (action: "login" | "register" | "logout") => {
  trackEvent("User", action, `User ${action}`);
};

export const trackTodo = (
  action: "create" | "update" | "delete" | "toggle"
) => {
  trackEvent("Todo", action, `Todo ${action}`);
};
