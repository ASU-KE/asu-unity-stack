import React from "react";

import anonPic from "../assets/anon.png";
import { ProfileCard } from "../ProfileCard/index";
import { ResultCard } from "../ResultCard/index";

const fillInBlanks = datum => {
  const full = {
    id: {
      raw: "",
    },
    eid: {
      raw: "",
    },
    photo_url: {
      raw: "",
    },
    display_name: {
      raw: "",
    },
    title: {
      raw: "",
    },
    titles: {
      raw: [],
    },
    email_address: {
      raw: "",
    },
    phone: {
      raw: "",
    },
    address_line1: {
      raw: "",
    },
    address_line2: {
      raw: "",
    },
    bio: {
      raw: "",
    },
    shortBio: {
      raw: "",
    },
    url_path_dir1: {
      raw: "",
    },
    url_path_dir2: {
      raw: "",
    },
    facebook_link: {
      raw: "",
    },
    linkedIn_link: {
      raw: "",
    },
    twitter_link: {
      raw: "",
    },
    url_host: {
      raw: "",
    },
    body_content: {
      raw: "",
    },
    url: {
      raw: "",
    },
  };
  return { ...full, ...datum };
};

export const staffConverter = (datum, size = "small", titleOverwrite) => {
  const filledDatum = fillInBlanks(datum);
  let primaryAffiliationTitle = null;
  if (titleOverwrite) {
    const deptId = titleOverwrite.find(item => {
      return item.asurite_id === filledDatum.asurite_id.raw;
    }).dept;
    const deptIndex = filledDatum.deptids.raw.findIndex(
      dept => dept === deptId
    );
    primaryAffiliationTitle = filledDatum.titles.raw[deptIndex];
    const dept = filledDatum.departments.raw[deptIndex];
    primaryAffiliationTitle = `${primaryAffiliationTitle}, ${dept}`;
  } else if (filledDatum.titles.raw.length > 0) {
    const primaryAff = filledDatum.primaryi_search_department_affiliation.raw;
    const deptIndex = filledDatum.departments.raw.findIndex(
      dept => dept === primaryAff
    );
    const relevantField = filledDatum.title_source.raw[deptIndex];
    if (relevantField === "titles" || !filledDatum.working_title) {
      primaryAffiliationTitle = filledDatum.titles.raw[deptIndex];
    } else if (relevantField === "workingTitle") {
      primaryAffiliationTitle = filledDatum.working_title.raw;
    }
    const dept = filledDatum.departments.raw[deptIndex];
    primaryAffiliationTitle = `${primaryAffiliationTitle}, ${dept}`;
  }
  return (
    <ProfileCard
      isRequired={false}
      id={filledDatum.eid.raw.toString()}
      key={filledDatum.eid.raw.toString()}
      imgURL={filledDatum.photo_url.raw}
      name={filledDatum.display_name.raw}
      titles={filledDatum.titles.raw}
      primaryAffiliationTitle={primaryAffiliationTitle}
      email={filledDatum.email_address.raw}
      telephone={filledDatum.phone.raw}
      addressLine1={filledDatum.address_line1.raw}
      addressLine2={filledDatum.address_line2.raw}
      description={filledDatum.bio.raw}
      shortBio={filledDatum.shortBio.raw}
      facebookLink={filledDatum.facebook_link.raw}
      linkedinLink={filledDatum.linkedIn_link.raw}
      twitterLink={filledDatum.twitter_link.raw}
      size={size}
      fill
    />
  );
};

export const studentsConverter = (datum, size = "small") => {
  const filledDatum = fillInBlanks(datum);
  return (
    <ProfileCard
      isRequired={false}
      id={filledDatum.eid.raw.toString()}
      key={filledDatum.eid.raw.toString()}
      imgURL={filledDatum.photo_url.raw}
      name={filledDatum.display_name.raw}
      titles={filledDatum.titles.raw}
      email={filledDatum.email_address.raw}
      telephone={filledDatum.phone.raw}
      addressLine1={filledDatum.address_line1.raw}
      addressLine2={filledDatum.address_line2.raw}
      description={filledDatum.bio.raw}
      facebookLink={filledDatum.facebook_link.raw}
      linkedinLink={filledDatum.linkedIn_link.raw}
      twitterLink={filledDatum.twitter_link.raw}
      size={size}
      fill
    />
  );
};

export const anonConverter = (datum, size = "small") => {
  return (
    <ProfileCard
      isRequired={false}
      id={datum.toString()}
      key={datum}
      imgURL={anonPic}
      name="Student Name"
      titles={["Title"]}
      email="email@example.com"
      telephone=""
      addressLine1=""
      addressLine2=""
      description=""
      facebookLink=""
      linkedinLink=""
      twitterLink=""
      size={size}
    />
  );
};

export const subdomainConverter = (datum, size = "small") => {
  const filledDatum = fillInBlanks(datum);
  return (
    <ResultCard
      id={filledDatum.id.raw}
      key={filledDatum.id.raw}
      name={filledDatum.title.raw}
      area={filledDatum.url_host.raw}
      description={filledDatum.body_content.raw}
      cookieTrail={[
        filledDatum.url_path_dir1.raw,
        filledDatum.url_path_dir2.raw,
      ]}
      link={filledDatum.url.raw}
      size={size}
      fill
    />
  );
};
