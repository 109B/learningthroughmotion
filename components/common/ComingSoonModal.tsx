"use client";

import { useState } from 'react';

type Props = {
  trigger: React.ReactNode;
  title?: string;
  message?: string;
};

export function ComingSoonModal({
  trigger,
  title = "Coming Soon",
  message = "Online booking will be available soon. In the meantime, please contact us to reserve your child's place."
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)} style={{ cursor: 'pointer' }}>
        {trigger}
      </div>

      {isOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 id="modal-title">{title}</h2>
              <button
                className="modal-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <p>{message}</p>

              <div className="modal-contact">
                <h3>Get in touch:</h3>
                <p>
                  <strong>Phone:</strong> <a href="tel:07356074072">07356 074072</a>
                </p>
                <p>
                  <strong>Email:</strong> <a href="mailto:info@learningthroughmotion.co.uk">info@learningthroughmotion.co.uk</a>
                </p>
              </div>
            </div>

            <div className="modal-footer">
              <a href="/contact" className="btn">
                Contact Us
              </a>
              <button
                className="btn btn--secondary"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
