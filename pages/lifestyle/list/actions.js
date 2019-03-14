/**
 * CUVita Client Side Implementations - action.js
 * @scope /pages/lifestyle/list
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

/**
 * Action Types
 */
export const SWITCH_CATEGORY_LIFESTYLE = "SWITCH_CATEGORY_LIFESTYLE";

/**
 * Action Constructors
 */
export function switchCategory(value, index) {
  return { type: SWITCH_CATEGORY_LIFESTYLE, current: { value, index } };
}