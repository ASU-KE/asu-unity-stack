// @ts-nocheck
import React from "react";
import { createRoot } from "react-dom/client";

import { Accordion } from "../../components/Accordion";
import { AnchorMenu } from "../../components/AnchorMenu";
import { Article } from "../../components/Article";
import { Button } from "../../components/Button";
import { ButtonIconOnly } from "../../components/ButtonIconOnly";
import { ButtonTag } from "../../components/ButtonTag";
// eslint-disable-next-line import/no-cycle
import { Card } from "../../components/Card";
import { Hero } from "../../components/Hero";
import { Image } from "../../components/Image";
import { Pagination } from "../../components/Pagination";
import { RankingCard } from "../../components/RankingCard";
import { Testimonial } from "../../components/Testimonial";
import { Video } from "../../components/Video";

/**
 * @typedef {Object} ComponentProps
 * @property {string} targetSelector - The CSS selector (#id or .class)
 * which identify the <div> element where the footer should be either hydrated or rendered.
 * @property {object} props - Properties to initialize the footer with.
 * Should only be set to true if the footer has been completely rendered server-side.
 */

/**
 * @param {ComponentProps} props
 */
const RenderReact = (component, props, target) => {
  const root = createRoot(target);
  root.render(React.createElement(component, props));
};

/**
 * @param {ComponentProps} props
 */
export const initAccordion = ({ targetSelector, props }) =>
  RenderReact(Accordion, props, document.querySelector(targetSelector));

/**
 * @param {ComponentProps} props
 */
export const initAnchorMenu = ({ targetSelector, props }) =>
  RenderReact(AnchorMenu, props, document.querySelector(targetSelector));

/**
 * @param {ComponentProps} props
 */
export const initArticle = ({ targetSelector, props }) =>
  RenderReact(Article, props, document.querySelector(targetSelector));

/**
 * @param {ComponentProps} props
 */
export const initButton = ({ targetSelector, props }) =>
  RenderReact(Button, props, document.querySelector(targetSelector));

/**
 * @param {ComponentProps} props
 */
export const initButtonIconOnly = ({ targetSelector, props }) =>
  RenderReact(ButtonIconOnly, props, document.querySelector(targetSelector));

/**
 * @param {ComponentProps} props
 */
export const initButtonTag = ({ targetSelector, props }) =>
  RenderReact(ButtonTag, props, document.querySelector(targetSelector));

/**
 * @param {ComponentProps} props
 */
export const initCard = ({ targetSelector, props }) =>
  RenderReact(Card, props, document.querySelector(targetSelector));

/**
 * @param {ComponentProps} props
 */
export const initHero = ({ targetSelector, props }) =>
  RenderReact(Hero, props, document.querySelector(targetSelector));

/**
 * @param {ComponentProps} props
 */
export const initImage = ({ targetSelector, props }) =>
  RenderReact(Image, props, document.querySelector(targetSelector));

/**
 * @param {ComponentProps} props
 */
export const initRankingCard = ({ targetSelector, props }) =>
  RenderReact(RankingCard, props, document.querySelector(targetSelector));

/**
 * @param {ComponentProps} props
 */
export const initPagination = ({ targetSelector, props }) =>
  RenderReact(Pagination, props, document.querySelector(targetSelector));

/**
 * @param {ComponentProps} props
 */
export const initTestimonial = ({ targetSelector, props }) =>
  RenderReact(Testimonial, props, document.querySelector(targetSelector));

/**
 * @param {ComponentProps} props
 */
export const initVideo = ({ targetSelector, props }) =>
  RenderReact(Video, props, document.querySelector(targetSelector));
