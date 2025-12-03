// Learning Through Motion - Pricing Utilities

import type { SessionBlock, DiscountCode, PricingBreakdown } from '@/lib/types/booking';

/**
 * Calculate the total cost for a session block
 */
export function calculateBlockTotal(block: SessionBlock): number {
  return block.registration_fee + (block.session_fee * block.total_sessions);
}

/**
 * Calculate pricing breakdown with discount applied
 */
export function calculatePricing(
  block: SessionBlock,
  discountCode?: DiscountCode
): PricingBreakdown {
  const registration_fee = block.registration_fee;
  const session_count = block.total_sessions;
  const session_fee = block.session_fee;
  const sessions_total = session_fee * session_count;
  const subtotal = registration_fee + sessions_total;

  let discount_amount = 0;

  if (discountCode && isDiscountApplicable(discountCode, block.id)) {
    if (discountCode.type === 'percentage') {
      discount_amount = (subtotal * discountCode.value) / 100;
    } else {
      discount_amount = discountCode.value;
    }

    // Ensure discount doesn't exceed subtotal
    discount_amount = Math.min(discount_amount, subtotal);
  }

  const total = subtotal - discount_amount;

  return {
    registration_fee,
    session_count,
    session_fee,
    sessions_total,
    discount_amount,
    subtotal,
    total,
  };
}

/**
 * Check if a discount code is applicable to a specific block
 */
export function isDiscountApplicable(discount: DiscountCode, blockId: string): boolean {
  // Check status
  if (discount.status !== 'active') {
    return false;
  }

  // Check date validity
  const now = new Date();
  if (now < discount.valid_from || now > discount.valid_until) {
    return false;
  }

  // Check usage limit
  if (discount.usage_limit && discount.times_used >= discount.usage_limit) {
    return false;
  }

  // Check if applicable to this block
  if (discount.applicable_to === 'specific_blocks') {
    if (!discount.applicable_block_ids || !discount.applicable_block_ids.includes(blockId)) {
      return false;
    }
  }

  return true;
}

/**
 * Format price for display (£12.50)
 */
export function formatPrice(amount: number): string {
  return `£${amount.toFixed(2)}`;
}

/**
 * Calculate outstanding balance
 */
export function calculateOutstanding(total: number, amountPaid: number): number {
  return Math.max(0, total - amountPaid);
}

/**
 * Check if payment is complete
 */
export function isPaymentComplete(total: number, amountPaid: number): boolean {
  return amountPaid >= total;
}

/**
 * Calculate what payment status should be based on amounts
 */
export function determinePaymentStatus(
  total: number,
  amountPaid: number
): 'unpaid' | 'partial' | 'paid' {
  if (amountPaid === 0) return 'unpaid';
  if (amountPaid >= total) return 'paid';
  return 'partial';
}

/**
 * Calculate revenue statistics for a block
 */
export function calculateBlockRevenue(
  registrationFee: number,
  sessionFee: number,
  totalSessions: number,
  confirmedBookings: number,
  amountPaid: number
): {
  potentialRevenue: number;
  actualRevenue: number;
  outstandingRevenue: number;
} {
  const pricePerBooking = registrationFee + (sessionFee * totalSessions);
  const potentialRevenue = pricePerBooking * confirmedBookings;
  const actualRevenue = amountPaid;
  const outstandingRevenue = Math.max(0, potentialRevenue - actualRevenue);

  return {
    potentialRevenue,
    actualRevenue,
    outstandingRevenue,
  };
}
