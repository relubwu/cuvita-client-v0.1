/**
 * CUVita Client Side Implementations - action.js
 * @scope /pages/me
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

/**
 * Action Types
 */
export const TOGGLE_QRCODE_DETAILS = "TOGGLE_QRCODE_DETAILS";

/**
 * Action Constructors
 */
export function toggleQRCodeDetails() {
  return { type: TOGGLE_QRCODE_DETAILS };
}