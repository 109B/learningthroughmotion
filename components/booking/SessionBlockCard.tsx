// Learning Through Motion - Session Block Card Component

import type { SessionBlock } from '@/lib/types/booking';
import { formatDate, formatTimeRange, getDayName, formatDateRange } from '@/lib/utils/dates';
import { formatPrice, calculateBlockTotal } from '@/lib/utils/pricing';
import { ComingSoonModal } from '@/components/common/ComingSoonModal';

type Props = {
  block: SessionBlock;
};

export function SessionBlockCard({ block }: Props) {
  const spotsRemaining = block.capacity - block.current_bookings;
  const totalCost = calculateBlockTotal(block);
  const dayName = getDayName(block.day_of_week);
  const dateRange = formatDateRange(block.start_date, block.end_date);
  const timeRange = formatTimeRange(block.time_start, block.time_end);
  const isFull = block.status === 'full' || spotsRemaining === 0;
  const isAvailable = block.status === 'published' && !isFull;

  return (
    <article className="programme-card session-card">
      <div className="programme-card__content">
        <p className="eyebrow">{block.total_sessions} Week Programme</p>
        <h3>{block.name}</h3>

        <div className="session-meta">
          <div className="session-meta-item">
            <span>📅 {dayName}s</span>
          </div>
          <div className="session-meta-item">
            <span>⏰ {timeRange}</span>
          </div>
          <div className="session-meta-item">
            <span>📍 {block.location || 'Bolton Arena'}</span>
          </div>
        </div>

        <div className="session-dates">
          {dateRange}
        </div>

        <div className="session-availability">
          <strong>{spotsRemaining}</strong> of {block.capacity} spots remaining
        </div>

        <div className="session-price">
          <div className="session-price-total">
            <span className="session-price-label">Total Programme Cost</span>
            <span className="session-price-amount">{formatPrice(totalCost)}</span>
          </div>
          <div className="session-price-note">
            Includes registration + {block.total_sessions} sessions
          </div>
        </div>

        <div className="programme-card__footer">
          {isFull ? (
            <button className="btn" disabled aria-label={`${block.name} is fully booked`}>
              Fully Booked
            </button>
          ) : isAvailable ? (
            <ComingSoonModal
              trigger={
                <button className="btn" aria-label={`Book ${block.name}`}>
                  Book Now
                </button>
              }
              title="Online Booking Coming Soon"
              message="We're setting up our online booking system! In the meantime, please contact us directly to reserve your child's place on this programme."
            />
          ) : (
            <button className="btn" disabled aria-label={`${block.name} is not available`}>
              Not Available
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
