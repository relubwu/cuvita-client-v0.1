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
export const TOGGLE_SETTINGS = "TOGGLE_SETTINGS";

/**
 * Action Constructors
 */
export function toggleSettings(current) {
  return { type: TOGGLE_SETTINGS, current };
}