/**
 * CUVita Client Side Implementations - action.js
 * @scope /pages/coupon
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

/**
 * Action Types
 */
export const TOGGLE_COUPON_DETAIL = "TOGGLE_COUPON_DETAIL";
export const RESET_COUPON_DETAIL = "RESET_COUPON_DETAIL";

/**
 * Consts
 */
export const TAP_FEEDBACK = "TAP_FEEDBACK";

/**
 * Action Constructors
 */
export function toggleCouponDetail(id) {
  return { type: TOGGLE_COUPON_DETAIL, id };
}

export function resetCouponDetail() {
  return { type: RESET_COUPON_DETAIL };
}