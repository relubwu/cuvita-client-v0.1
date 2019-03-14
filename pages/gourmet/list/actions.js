/**
 * CUVita Client Side Implementations - action.js
 * @scope /pages/gourmet/list
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

/**
 * Action Types
 */
export const SWITCH_CATEGORY_GOURMET = "SWITCH_CATEGORY_GOURMET";

/**
 * Action Constructors
 */
export function switchCategory(value, index) {
  return { type: SWITCH_CATEGORY_GOURMET, current: { value, index } };
}