import React from "react";

interface Link {
  href?: string;
  text: string;
  isActive?: boolean;
  items?: Array<{
    href: string;
    text: string;
    isActive?: boolean;
  }>;
}

export interface SidebarProps {
  title: string;
  links: Link[];
}

export const SidebarMenu: React.FC<SidebarProps> = ({ title, links }) => {
  return (
    <div className="col-xl-3 col-lg-4 col-md-5 col-sm-12">
      <h2>{title}</h2>
      <div
        className="sidebar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#sidebar-left"
        aria-expanded="false"
        aria-controls="sidebar-left"
      >
        <p>Select Section</p>
        <span className="fas fa-chevron-up" />
      </div>

      <nav
        id="sidebar-left"
        className="sidebar collapse"
        aria-label="Secondary"
      >
        {links.map((link, index) => {
          if (link.items) {
            // Render dropdown card
            return (
              <div key={index} className="card card-foldable">
                <div className="card-header">
                  <a
                    id={`card${index}`}
                    className="collapsed nav-link"
                    href={`#cardBody${index}`}
                    data-bs-toggle="collapse"
                    data-bs-target={`#cardBody${index}`}
                    aria-expanded="false"
                    aria-controls={`cardBody${index}`}
                    data-ga-name="onclick"
                    data-ga-event="collapse"
                    data-ga-type="click"
                    data-ga-region="main content"
                    data-ga-section={title}
                    data-ga={link.text}
                  >
                    {link.text}
                    <span className="fas fa-chevron-down ms-1" />
                  </a>
                </div>
                <div
                  id={`cardBody${index}`}
                  className="collapse card-body"
                  aria-labelledby={`card${index}`}
                  data-bs-parent=".sidebar"
                >
                  {link.items.map((item, itemIndex) => (
                    <a
                      key={itemIndex}
                      href={item.href}
                      className={`nav-link${item.isActive ? " is-active" : ""}`}
                    >
                      {item.text}
                    </a>
                  ))}
                </div>
              </div>
            );
          } else {
            // Render regular link
            return (
              <div key={index} className="nav-link-container">
                <a
                  className={`nav-link${link.isActive ? " is-active" : ""}`}
                  href={link.href}
                >
                  {link.text}
                </a>
              </div>
            );
          }
        })}
      </nav>
    </div>
  );
};
