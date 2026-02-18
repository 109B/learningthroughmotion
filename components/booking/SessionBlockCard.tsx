// Learning Through Motion - Session Block Card Component

import type { SessionBlock } from '@/lib/types/booking';
import Link from 'next/link';

type Props = {
  block: SessionBlock;
};

// Simple helper functions
const formatPrice = (amount: number) => `£${amount.toFixed(2)}`;
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' }).format(date);
};

const formatDateRange = (start: Date, end: Date | null | undefined) => {
  if (!end) return formatDate(start);
  return `${formatDate(start)} - ${formatDate(end)}`;
};

export function SessionBlockCard({ block }: Props) {
  const spotsRemaining = block.capacity - block.current_bookings;
  const dateRange = formatDateRange(block.start_date, block.end_date);
  const isFull = block.status === 'full' || spotsRemaining === 0;
  const isAvailable = block.status === 'published' && !isFull;

  // Calculate costs for both pricing options
  const payAsYouGoTotal = block.registration_fee + (15 * block.total_sessions);
  const fullBlockTotal = block.registration_fee + (12 * block.total_sessions);

  return (
    <article className="programme-card session-card">
      <div className="programme-card__content">
        <p className="eyebrow">{block.total_sessions} Week Block</p>
        <h3>{block.name}</h3>

        <div className="session-meta">
          <div className="session-meta-item">
            <span>📅 {dateRange}</span>
          </div>
          <div className="session-meta-item">
            <span>📍 {block.location || 'Bishop Bridgeman C.E. Primary School'}</span>
          </div>
        </div>

        {block.description && (
          <p style={{ fontSize: '0.9rem', color: '#666', margin: '0.75rem 0' }}>
            {block.description}
          </p>
        )}

        <div className="session-availability">
          <strong>{spotsRemaining}</strong> of {block.capacity} spots remaining
        </div>

        <div className="session-price" style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
            <div style={{ flex: 1, textAlign: 'center', padding: '0.5rem', backgroundColor: '#f5f5f5', borderRadius: '6px' }}>
              <div style={{ fontSize: '0.75rem', color: '#666' }}>Pay as you go</div>
              <div style={{ fontWeight: 'bold' }}>{formatPrice(payAsYouGoTotal)}</div>
            </div>
            <div style={{ flex: 1, textAlign: 'center', padding: '0.5rem', backgroundColor: '#dcfce7', borderRadius: '6px' }}>
              <div style={{ fontSize: '0.75rem', color: '#166534' }}>Full block</div>
              <div style={{ fontWeight: 'bold', color: '#16a34a' }}>{formatPrice(fullBlockTotal)}</div>
            </div>
          </div>
          <div className="session-price-note" style={{ marginTop: '0.5rem', textAlign: 'center' }}>
            + £{block.registration_fee.toFixed(0)} one-time registration
          </div>
        </div>

        <div className="programme-card__footer">
          {isFull ? (
            <button className="btn" disabled aria-label={`${block.name} is fully booked`}>
              Fully Booked
            </button>
          ) : isAvailable ? (
            <Link
              href="/enquire-now"
              className="btn"
              aria-label={`Enquire about ${block.name}`}
            >
              Book a Discovery Call
            </Link>
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
