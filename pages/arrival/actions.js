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
export const TOGGLE_ARRIVAL_BANNER_DETAIL = 'TOGGLE_ARRIVAL_BANNER_DETAIL';
export const RESET_ARRIVAL_BANNER_DETAIL = 'RESET_ARRIVAL_BANNER_DETAIL';

/**
 * Action Constructors
 */
export function toggleArrivalBannerDetail(is) {
  return { type: TOGGLE_ARRIVAL_BANNER_DETAIL, is };
}

export function resetArrivalBannerDetail() {
  return { type: RESET_ARRIVAL_BANNER_DETAIL };
}