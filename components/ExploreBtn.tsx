"use client"

import posthog from "posthog-js"

const isPostHogConfigured = Boolean(
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN &&
    process.env.NEXT_PUBLIC_POSTHOG_HOST,
)

const ExploreBtn = () => {
  const handleExploreClick = () => {
    if (isPostHogConfigured) {
      posthog.capture("events_explore_clicked")
      posthog.logger.info("events exploration requested", {
        interaction: "events_explore_clicked",
      })
    }
    alert("Explore Btn Clicked")
  }

  return (
      <button type="button" id="explore-btn"  className="mt-7 mx-auto" onClick={handleExploreClick}>
           Explore events
           <a href="#events">
            <img src="/web/icons/arrow-down.svg" alt="arrow-down" width={24} height={24} />
            </a>
      </button>
  );
};

export default ExploreBtn;