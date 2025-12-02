import { JigsawGame } from "@/components/games/JigsawGame";
import { Section } from "@/components/common/Section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jigsaw Puzzle Game",
  description:
    "Build spatial reasoning and problem-solving skills with this accessible jigsaw puzzle game designed for SEND learners.",
};

export default function JigsawPage() {
  return (
    <>
      <Section tone="default">
        <div className="game-page-header">
          <a href="/activities" className="back-link">
            ← Back to Activities
          </a>
          <h1>Jigsaw Puzzle</h1>
          <p className="game-description">
            Complete the puzzle by clicking pieces and placing them in the right spots! Start easy and work your way up.
          </p>
        </div>
      </Section>

      <Section tone="muted">
        <JigsawGame />
      </Section>

      <Section tone="accent">
        <div className="game-info">
          <h2>How This Supports Learning</h2>
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">🧩</div>
              <h3>Spatial Reasoning</h3>
              <p>
                Develops the ability to visualize and manipulate objects mentally - essential for maths and problem-solving.
              </p>
            </div>
            <div className="info-card">
              <div className="info-icon">🎯</div>
              <h3>Problem Solving</h3>
              <p>
                Encourages trial and error, planning ahead, and logical thinking in a supportive environment.
              </p>
            </div>
            <div className="info-card">
              <div className="info-icon">👁️</div>
              <h3>Hand-Eye Coordination</h3>
              <p>
                Strengthens fine motor control and visual-motor integration through purposeful interaction.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
