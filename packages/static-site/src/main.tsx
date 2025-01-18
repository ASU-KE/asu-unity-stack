import React from "react";
import ReactDOM from "react-dom/client";
import App from "~/App.tsx";
import "~/index.css";

import { RouteObject, RouterProvider, createHashRouter } from "react-router-dom";
import Pages, { AppPagesType } from "~/pages/index";
import { configRoutes } from "~/routes/config";
import { Page } from "vite-plugin-virtual-mpa";

/**
 * Create duplicate routes for paths ending with "/" and "/index.html"
 * @param {Page[]} c
 * @returns {RouteObject[]}
 */
const createRoutesFromConfig = (c: Page[]) => {
  const r: RouteObject[] = [];
  c.forEach(({data}) => {
    const Component = Pages[data?.componentName as keyof AppPagesType];
    r.push({
      path: data?.path as string,
      element: <Component />,
      children: [
        {
          path: `${ data?.path }index.html`,
          index: true,
          element: <Component />,
        }
      ]
    });
  });

  return r;
};

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: createRoutesFromConfig(configRoutes as Page[]),
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
