// @ts-check
import { trackGAEvent as fn } from "../../../../../shared";
import { useRfiContext } from "./rfiContext";

export { gaEventPropTypes } from "../../../../../shared";

export const useTryGAEvent = () => {
  const { dataLayerEnabled } = useRfiContext();

  if (dataLayerEnabled) {
    return fn;
  }
  // UDS-1943 : allow some fields to be exempted from data layer (PII)
  // return NOOP function
  return () => {};
};
