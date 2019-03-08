/**
 * CUVita Client Side Implementations - action.js
 * @scope /pages/discovery
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

/**
 * Action Types
 */
export const SET_DISCOVERY_PAGEDATA = "SET_DISCOVERY_PAGEDATA";
export const PURGE_DISCOVERY_PAGEDATA = "PURGE_DISCOVERY_PAGEDATA";
export const START_PULLDOWN_REFRESH = "START_PULLDOWN_REFRESH";
export const STOP_PULLDOWN_REFRESH = "STOP_PULLDOWN_REFRESH";
export const START_SCROLL_TO_UPPER = "START_SCROLL_TO_UPPER";
export const STOP_SCROLL_TO_UPPER = "STOP_SCROLL_TO_UPPER";

/**
 * Consts
 */
export const TAP_FEEDBACK = "TAP_FEEDBACK";
export const SCROLL_TO_UPPER = "SCROLL_TO_UPPER";
export const SCROLL_TO_UPPER_IDLE = "idle";
export const SCROLL_TO_UPPER_ENGAGED = "engaged";
export const PULLDOWN_REFRESH = "PULLDOWN_REFRESH";
export const PULLDOWN_REFRESH_IDLE = "idle";
export const PULLDOWN_REFRESH_ENGAGED = "engaged";

/**
 * Action Constructors
 */
export function setPageData(data) {
  return { type: SET_DISCOVERY_PAGEDATA, data };
}

export function purgePageData(data) {
  return { type: PURGE_DISCOVERY_PAGEDATA };
}

export function startPullDownRefresh() {
  return { type: START_PULLDOWN_REFRESH };
}

export function stopPullDownRefresh() {
  return { type: STOP_PULLDOWN_REFRESH };
}

export function startScrollToUpper() {
  return { type: START_SCROLL_TO_UPPER };
}

export function stopScrollToUpper() {
  return { type: STOP_SCROLL_TO_UPPER };
}