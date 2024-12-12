import React from "react";
import { Modal } from "./Modal";

export default {
  title: "Modal",
  component: Modal,
};

const modalTemplate = args => <Modal {...args} />;

export const Overview = {
  render: modalTemplate.bind({}),
  name: "Modal"
};
