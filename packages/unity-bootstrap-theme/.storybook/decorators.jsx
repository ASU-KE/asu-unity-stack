import React, { useEffect } from "react";

export const forceReloadOfStory = (storyFn, context) => {
  useEffect(() => {
    setTimeout(() => {
      context.globals.shouldReload = true;
    }, 100);
    return () => {
      if (context.globals.shouldReload) {
        window.location.reload();
      }
    };
  }, []);

  return storyFn();
}
