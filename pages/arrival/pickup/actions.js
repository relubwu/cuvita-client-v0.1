/**
 * CUVita Client Side Implementations - action.js
 * @scope /pages/arrival/pickup
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
export const ARRIVAL_PICKUP_STEP_PROCEED = 'ARRIVAL_PICKUP_STEP_PROCEED';
export const ARRIVAL_PICKUP_STEP_FALLBACK = 'ARRIVAL_PICKUP_STEP_FALLBACK';

/**
 * Action Constructors
 */
export function proceedStep() {
  return { type: ARRIVAL_PICKUP_STEP_PROCEED };
}

export function fallBackStep() {
  return { type: ARRIVAL_PICKUP_STEP_FALLBACK };
}
