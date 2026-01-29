import Link from "next/link";
import { CONTACT_DETAILS, NAV_LINKS } from "@/content/siteContent";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer__grid">
        <div>
          <h3>Location</h3>
          <p>{CONTACT_DETAILS.location}</p>
        </div>

        <div>
          <h3>Contact</h3>
          <p>
            <a href={`tel:${CONTACT_DETAILS.phone.replace(/\s+/g, "")}`}>
              {CONTACT_DETAILS.phone}
            </a>
          </p>
          <p>
            <a href={`mailto:${CONTACT_DETAILS.email}`}>
              {CONTACT_DETAILS.email}
            </a>
          </p>
        </div>

        <div>
          <h3>Explore</h3>
          <ul className="footer__nav">
            {NAV_LINKS.slice(0, 5).map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Social</h3>
          <ul className="footer__social">
            <li>
              <a
                href={CONTACT_DETAILS.socials.linkedin}
                target="_blank"
                rel="noreferrer noopener"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={CONTACT_DETAILS.socials.facebook}
                target="_blank"
                rel="noreferrer noopener"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href={CONTACT_DETAILS.socials.instagram}
                target="_blank"
                rel="noreferrer noopener"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="shell footer__base">
        <span>© {new Date().getFullYear()} Learning Through Motion</span>
        <span>In school active learning for SEND pupils</span>
        <Link href="/admin/login" className="footer__admin-link">
          Admin
        </Link>
      </div>
    </footer>
  );
}
