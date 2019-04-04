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
export const REGISTER_STEP_PROCEED = 'REGISTER_STEP_PROCEED';
export const REGISTER_STEP_ROLLBACK = 'REGISTER_STEP_ROLLBACK';

/**
 * Action Constructors
 */
export function proceedStep() {
  return { type: REGISTER_STEP_PROCEED };
}

export function rollBackStep() {
  return { type: REGISTER_STEP_ROLLBACK };
}