/**
 * CUVita Client Side Implementations - action.js
 * @scope /pages/me
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

/**
 * Constants
 */
export const STEP_ALIAS = ['information', 'checkout', 'success'];

/**
 * Action Types
 */
export const REGISTER_STEP_PROCEED = 'REGISTER_STEP_PROCEED';
export const REGISTER_STEP_FALLBACK = 'REGISTER_STEP_FALLBACK';

/**
 * Action Constructors
 */
export function proceedStep() {
  return { type: REGISTER_STEP_PROCEED };
}

export function fallBackStep() {
  return { type: REGISTER_STEP_FALLBACK };
}