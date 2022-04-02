import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { Button, TabbedPanels, Tab } from "../../../components-core";
import { trackGAEvent } from "../core/services/googleAnalytics";
import { performSearch } from "../helpers/search";
import { PreSearchMessage } from "../PreSearchMessage/index";
import { QuickLinks } from "../QuickLinks/index";
import { ASUSearchResultsList } from "../SearchResultsList/index";
import { SearchPageLayout } from "./index.styles";

const SearchResultsMessage = ({ term, numResults }) => {
  return (
    <div className="message">
      <div className="results-search-message">
        <span>Your search for </span>
        <span className="search-message-emphasis">{term} </span>
        <span> returned </span>
        <span className="search-message-emphasis">{numResults}</span>
        <span> results </span>
      </div>
    </div>
  );
};

SearchResultsMessage.propTypes = {
  term: PropTypes.string,
  numResults: PropTypes.number,
};

function SearchPage({ searchURL, loggedIn }) {
  const sortOptions = [
    { value: "_score_desc", label: "Relevancy" },
    { value: "last_name_asc", label: "Last Name (ascending)" },
    { value: "last_name_desc", label: "Last Name (descending)" },
  ];
  const resultsPerPage = 6;
  const [term, setTerm] = useState("");
  const [numResults, setNumResults] = useState(0);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [site, setSite] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters] = useState({});
  const [sort, setSort] = useState("_score_desc");

  const tabIds = {
    all: "all",
    sites: "web_sites",
    faculty: "web_dir_faculty_staff",
    students: "web_dir_students",
  };

  const searchTabsId = "search-tabs";
  const queryParamName = "q";
  const sortParamName = "sort-by";
  const siteParamName = "url_host";

  const updateSearchParams = (param, newValue) => {
    const newParams = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const entry of searchParams.entries()) {
      // eslint-disable-next-line prefer-destructuring
      newParams[entry[0]] = entry[1];
    }
    newParams[param] = newValue;
    setSearchParams(newParams);
  };

  const updateContent = (tab, page = 1, limitUpdateTo = null) => {
    const searchFor = searchParams.get(queryParamName);
    if (searchFor && searchFor.length > 0 && tab) {
      if (!limitUpdateTo) {
        setIsLoading(true);
      }
      const toSearch = limitUpdateTo || tab;
      performSearch({
        tab: toSearch,
        term: searchFor,
        page,
        items: resultsPerPage,
        auth: null,
        sort,
        filters,
        site,
        searchURL,
      }).then(res => {
        if (tab === tabIds.all) {
          const total = Object.keys(tabIds).reduce(
            (prev, curr) =>
              res[tabIds[curr]]
                ? prev + res[tabIds[curr]].page.total_results
                : 0,
            0
          );
          setNumResults(total);
        } else {
          setNumResults(res.page.total_results);
        }
        if (limitUpdateTo) {
          const current = { ...results };
          current[res.tab] = res;
          setResults(current);
        } else {
          setResults(res);
        }
        setIsLoading(false);
      });
      trackGAEvent({
        event: "search",
        action: "type",
        name: "onenter",
        type: "search asu.edu",
        section: "search",
        text: term,
      });
    }
  };

  const doSearch = () => {
    updateSearchParams(queryParamName, term);
  };

  useEffect(() => {
    if (searchParams.get(siteParamName)) {
      setSite(searchParams.get(siteParamName));
    }
    if (searchParams.get(sortParamName)) {
      setSort(searchParams.get(sortParamName));
    } else {
      setSort("_score_desc");
    }
    if (searchParams.get(queryParamName)) {
      setTerm(searchParams.get(queryParamName));
    }
    updateContent(searchParams.get(searchTabsId));
  }, [searchParams]);

  const getSortEventText = () => {
    let text = sortOptions.find(op => {
      return op.value === sort;
    }).label;
    if (text === "Relevancy") {
      text = "Sort by Relevancy";
    }
    return text;
  };

  const openSort = () => {
    trackGAEvent({
      event: "collapse",
      action: "open",
      name: "onclick",
      type: "click",
      section: "all asu search",
      text: getSortEventText(),
    });
  };

  const updateSort = newSort => {
    setSort(newSort);
    updateSearchParams(sortParamName, newSort);
    trackGAEvent({
      event: "collapse",
      action: "close",
      name: "onclick",
      type: "click",
      section: "all asu search",
      text: getSortEventText(),
    });
  };

  const pageChange = (page, limitUpdateTo = null) => {
    updateContent(searchParams.get(searchTabsId), page, limitUpdateTo);
  };

  const tabChange = tab => {
    updateContent(tab);
  };

  const goToTab = tab => {
    updateContent(tab);
    updateSearchParams(searchTabsId, tab);
  };

  const inputKeyPress = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      doSearch();
    }
  };

  const preSearchOrContent = content => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (!results) {
      return <PreSearchMessage />;
    }
    return content;
  };

  return (
    <SearchPageLayout>
      <h1>
        <span className="highlight-gold">Search</span>
      </h1>
      <div className="options-area">
        <form className="uds-form">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="search-input"
              placeholder="Search"
              value={term}
              onChange={e => setTerm(e.target.value)}
              onKeyDown={inputKeyPress}
            />
            <div className="desktop-button">
              <Button
                color="maroon"
                icon={["fas", "search"]}
                label="Search"
                onClick={() => doSearch()}
              />
            </div>
            <div className="mobile-button">
              <Button
                color="maroon"
                icon={["fas", "search"]}
                label="Search"
                onClick={() => doSearch()}
                size="small"
              />
            </div>
          </div>
        </form>
        {loggedIn && (
          <div className="profile-options">
            <Button
              color="gray"
              icon={["fas", "lock"]}
              label="Edit my profile"
              href="/profile-edit"
            />
            <Button
              color="gray"
              icon={["fas", "lock"]}
              label="Department admin"
              href="/groups"
            />
          </div>
        )}
      </div>
      <TabbedPanels id={searchTabsId} onTabChange={tabChange}>
        <Tab id={tabIds.all} title="All ASU Search">
          {preSearchOrContent(
            <div className="all-asu-search">
              <SearchResultsMessage
                term={searchParams.get(queryParamName)}
                numResults={numResults}
              />
              <div className="top-results">
                <div>{results?.web_sites?.topResult}</div>
                <div>{results?.web_dir_faculty_staff?.topResult}</div>
              </div>
              <div className="faculty-and-staff">
                <ASUSearchResultsList
                  results={results?.web_dir_faculty_staff?.results.slice(0, 3)}
                  totalResults={
                    results?.web_dir_faculty_staff?.page.total_results
                  }
                  resultsPerPage={3}
                  isLoading={isLoading}
                  title="Faculty and staff"
                  size="micro"
                  summary
                  onExpandClick={() => goToTab(tabIds.faculty)}
                  GASource="faculty and staff"
                />
              </div>
              <div className="subdomain-results">
                <ASUSearchResultsList
                  results={results?.web_sites?.results}
                  totalResults={results?.web_sites?.page.total_results}
                  resultsPerPage={6}
                  isLoading={isLoading}
                  title="All results from <<sites>>"
                  summary
                  onExpandClick={() => goToTab(tabIds.sites)}
                  GASource="all results from <<subdomain>>"
                />
              </div>
              <div className="students">
                <ASUSearchResultsList
                  results={results?.web_dir_students?.results.slice(0, 3)}
                  totalResults={results?.web_dir_students?.page.total_results}
                  resultsPerPage={3}
                  isLoading={isLoading}
                  title="Students"
                  size="micro"
                  summary
                  anonymized
                  onExpandClick={() => goToTab(tabIds.students)}
                  GASource="students"
                />
              </div>
              <div className="quick-links">
                <QuickLinks />
              </div>
              <div className="all-results">
                <ASUSearchResultsList
                  results={results?.web_sites?.results}
                  totalResults={results?.web_sites?.page.total_results}
                  resultsPerPage={6}
                  isLoading={isLoading}
                  title="All asu.edu results"
                  onPageChange={page => pageChange(page, tabIds.sites)}
                  currentPage={results?.web_sites?.page?.current}
                  GASource="all asu.edu results"
                />
              </div>
            </div>
          )}
        </Tab>
        {site && (
          <Tab id={tabIds.sites} title={site}>
            {preSearchOrContent(
              <div className="sites-tab">
                <SearchResultsMessage
                  term={searchParams.get(queryParamName)}
                  numResults={numResults}
                />
                <ASUSearchResultsList
                  results={results?.results}
                  totalResults={numResults}
                  resultsPerPage={6}
                  isLoading={isLoading}
                  title={site}
                  onPageChange={pageChange}
                  GASource={site}
                />
              </div>
            )}
          </Tab>
        )}
        <Tab id={tabIds.faculty} title="Faculty and Staff">
          {preSearchOrContent(
            <div className="faculty-tab">
              <SearchResultsMessage
                term={searchParams.get(queryParamName)}
                numResults={numResults}
              />
              {numResults > 0 && (
                <form className="uds-form sort-form faculty-sort">
                  <div className="form-group">
                    <label htmlFor="sortBySelect">Sort by</label>
                    <select
                      className="form-control"
                      id="sortBySelect"
                      value={sort}
                      onChange={event => updateSort(event.target.value)}
                      onClick={openSort}
                    >
                      {results?.results?.length > 0 &&
                        sortOptions.map(op => (
                          <option key={op.value} value={op.value}>
                            {op.label === "Relevancy"
                              ? "Sort by Relevancy"
                              : op.label}
                          </option>
                        ))}
                    </select>
                  </div>
                </form>
              )}
              <ASUSearchResultsList
                results={results?.results}
                totalResults={numResults}
                resultsPerPage={6}
                currentPage={results?.page?.current}
                isLoading={isLoading}
                title="All faculty and staff results"
                onPageChange={pageChange}
                size="large"
                GASource="all faculty and staff results"
                className="faculty-results"
              />
            </div>
          )}
        </Tab>
        <Tab id={tabIds.students} title="Students">
          {preSearchOrContent(
            <div className="students-tab">
              <SearchResultsMessage
                term={searchParams.get(queryParamName)}
                numResults={numResults}
              />
              <ASUSearchResultsList
                results={results?.results}
                totalResults={numResults}
                resultsPerPage={6}
                currentPage={results?.page?.current}
                isLoading={isLoading}
                title="All Student results"
                onPageChange={pageChange}
                size="large"
                GASource="all student results"
              />
            </div>
          )}
        </Tab>
      </TabbedPanels>
    </SearchPageLayout>
  );
}

SearchPage.propTypes = {
  searchURL: PropTypes.string,
  loggedIn: PropTypes.bool,
};

export { SearchPage };
