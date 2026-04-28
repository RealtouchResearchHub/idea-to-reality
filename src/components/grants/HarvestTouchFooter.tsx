import { Sprout, Mail, MapPin, ExternalLink, Heart } from "lucide-react";

const footerLinks = [
  { label: "National Lottery Community Fund", href: "https://www.tnlcommunityfund.org.uk" },
  { label: "Action Together (Rochdale)", href: "https://www.actiontogether.org.uk" },
  { label: "Sport England Grants", href: "https://www.sportengland.org/apply-for-funding" },
  { label: "Gov.uk Funding Finder", href: "https://www.gov.uk/apply-funding-community-project" },
];

const programmes = [
  "6-Week Wellbeing Programme",
  "AI & Digital Skills Training",
  "Future Skills Lab",
  "Community Engagement",
];

const HarvestTouchFooter = () => {
  return (
    <footer className="border-t border-border bg-card/30 mt-auto">
      <div className="container-custom section-padding">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <Sprout className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-heading font-bold text-base">Harvest Touch CIC</span>
                <span className="text-[10px] text-muted-foreground tracking-wide uppercase">
                  Community Interest Company
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-sm">
              Growing potential in Rochdale — delivering youth wellbeing, digital skills and
              community programmes for young people aged 8–25 across Greater Manchester.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-green-400 shrink-0" />
                <span>Rochdale, Greater Manchester</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-green-400 shrink-0" />
                <a
                  href="mailto:hello@harvesttouch.org.uk"
                  className="hover:text-foreground transition-colors"
                >
                  hello@harvesttouch.org.uk
                </a>
              </div>
            </div>
          </div>

          {/* Programmes */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-5">Our Programmes</h4>
            <ul className="space-y-2.5">
              {programmes.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1 h-1 rounded-full bg-green-400 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Grant resources */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-5">Grant Resources</h4>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="w-3 h-3 shrink-0" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Harvest Touch CIC. Registered in England & Wales.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-400" /> for the community ·
            <span className="ml-1">Powered by Realtouch AI</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default HarvestTouchFooter;
