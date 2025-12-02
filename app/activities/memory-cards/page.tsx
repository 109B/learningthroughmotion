import { MemoryCardGame } from "@/components/games/MemoryCardGame";
import { Section } from "@/components/common/Section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Memory Card Matching Game",
  description:
    "Practice memory and concentration skills by finding matching pairs in this fun, interactive card game designed for SEND learners.",
};

export default function MemoryCardsPage() {
  return (
    <>
      <Section tone="default">
        <div className="game-page-header">
          <a href="/activities" className="back-link">
            ← Back to Activities
          </a>
          <h1>Memory Match Game</h1>
          <p className="game-description">
            Flip cards to find matching pairs! Start with an easy level and progress as you improve your memory skills.
          </p>
        </div>
      </Section>

      <Section tone="muted">
        <MemoryCardGame />
      </Section>

      <Section tone="accent">
        <div className="game-info">
          <h2>How This Supports Learning</h2>
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">🧠</div>
              <h3>Working Memory</h3>
              <p>
                Strengthens the ability to hold and manipulate information, essential for following instructions and completing tasks.
              </p>
            </div>
            <div className="info-card">
              <div className="info-icon">🎯</div>
              <h3>Concentration</h3>
              <p>
                Builds sustained attention and focus skills in a low-pressure, engaging environment.
              </p>
            </div>
            <div className="info-card">
              <div className="info-icon">🔄</div>
              <h3>Pattern Recognition</h3>
              <p>
                Develops visual processing and the ability to identify and remember patterns and relationships.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
