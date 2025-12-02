import { NumberMatchGame } from "@/components/games/NumberMatchGame";
import { Section } from "@/components/common/Section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Number Matching Game",
  description:
    "Practice counting and number recognition with our fun, interactive number matching game. Count objects and match them to the correct number.",
};

export default function NumberMatchPage() {
  return (
    <>
      <Section tone="default">
        <div className="game-page-header">
          <a href="/activities" className="back-link">
            ← Back to Activities
          </a>
          <h1>Number Matching Game</h1>
          <p className="game-description">
            Count the sports equipment and click the matching number. Perfect for
            practicing core maths skills!
          </p>
        </div>
      </Section>

      <Section tone="muted">
        <NumberMatchGame />
      </Section>

      <Section tone="accent">
        <div className="game-info">
          <h2>How This Supports Learning</h2>
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">🧮</div>
              <h3>Number Recognition</h3>
              <p>
                Children practice recognizing numerals 1-10 and connecting them
                to quantities.
              </p>
            </div>
            <div className="info-card">
              <div className="info-icon">👁️</div>
              <h3>Counting Skills</h3>
              <p>
                Develops one-to-one correspondence and accurate counting of objects.
              </p>
            </div>
            <div className="info-card">
              <div className="info-icon">🎯</div>
              <h3>Visual Attention</h3>
              <p>
                Strengthens focus and concentration through engaging visual tasks.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
