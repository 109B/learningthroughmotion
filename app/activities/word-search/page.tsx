import { WordSearchGame } from "@/components/games/WordSearchGame";
import { Section } from "@/components/common/Section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word Search Game",
  description:
    "Find hidden words related to sports and movement in this accessible word search puzzle designed for SEND learners.",
};

export default function WordSearchPage() {
  return (
    <>
      <Section tone="default">
        <div className="game-page-header">
          <a href="/activities" className="back-link">
            ← Back to Activities
          </a>
          <h1>Word Search</h1>
          <p className="game-description">
            Find sports and movement words hidden in the grid! Click the first letter of a word, then click the last letter to select it.
          </p>
        </div>
      </Section>

      <Section tone="muted">
        <WordSearchGame />
      </Section>

      <Section tone="accent">
        <div className="game-info">
          <h2>How This Supports Learning</h2>
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">🔍</div>
              <h3>Visual Scanning</h3>
              <p>
                Develops systematic visual search patterns essential for reading and finding information.
              </p>
            </div>
            <div className="info-card">
              <div className="info-icon">📚</div>
              <h3>Vocabulary</h3>
              <p>
                Reinforces spelling and recognition of sports and movement words in a fun context.
              </p>
            </div>
            <div className="info-card">
              <div className="info-icon">🎯</div>
              <h3>Attention to Detail</h3>
              <p>
                Strengthens the ability to notice patterns and differences - key skills for learning.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
