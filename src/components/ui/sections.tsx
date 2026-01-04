import Link from "next/link";

/**
 * Section header props
 */
interface SectionHeaderProps {
  badge?: string;
  badgeIcon?: string;
  badgeColor?: string;
  title: string;
  highlightedText?: string;
  highlightColor?: string;
  description?: string;
  centered?: boolean;
}

/**
 * Section header component for consistent page section titles
 * @example
 * <SectionHeader
 *   badge="Layanan Kami"
 *   title="Perawatan"
 *   highlightedText="Gigi Terbaik"
 *   description="Berbagai layanan untuk kesehatan gigi Anda"
 * />
 */
export function SectionHeader({
  badge,
  badgeIcon,
  badgeColor = "bg-accent-yellow",
  title,
  highlightedText,
  highlightColor = "text-primary",
  description,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 rounded-full ${badgeColor} px-4 py-1.5 text-sm font-bold text-foreground mb-4 border border-foreground`}>
          {badgeIcon && <span className="material-symbols-outlined text-sm">{badgeIcon}</span>}
          {badge}
        </div>
      )}
      <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mb-4">
        {title}{" "}
        {highlightedText && (
          <span className={highlightColor}>{highlightedText}</span>
        )}
      </h2>
      {description && (
        <p className={`text-lg text-gray-600 ${centered ? "max-w-2xl mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </div>
  );
}

/**
 * CTA section props
 */
interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  buttonIcon?: string;
  variant?: "primary" | "secondary" | "accent";
}

/**
 * Call-to-action section component
 */
export function CTASection({
  title,
  description,
  buttonText,
  buttonLink,
  buttonIcon,
  variant = "primary",
}: CTASectionProps) {
  const bgColors = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent-yellow",
  };

  const textColors = {
    primary: "text-white",
    secondary: "text-white",
    accent: "text-foreground",
  };

  return (
    <section className={`py-20 px-6 ${bgColors[variant]} ${textColors[variant]}`}>
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="font-display text-3xl md:text-5xl font-black mb-6">{title}</h2>
        <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">{description}</p>
        <Link href={buttonLink}>
          <button className="bg-white text-foreground px-8 py-4 rounded-full text-lg font-bold border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all inline-flex items-center gap-2">
            {buttonIcon && (
              <span className="material-symbols-outlined">{buttonIcon}</span>
            )}
            {buttonText}
          </button>
        </Link>
      </div>
    </section>
  );
}

/**
 * Page hero props
 */
interface PageHeroProps {
  badge?: string;
  badgeIcon?: string;
  title: string;
  highlightedText?: string;
  description?: string;
  children?: React.ReactNode;
}

/**
 * Page hero component for page headers
 */
export function PageHero({
  badge,
  badgeIcon,
  title,
  highlightedText,
  description,
  children,
}: PageHeroProps) {
  return (
    <header className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -left-10 top-20 opacity-40">
        <svg className="text-accent-purple animate-bounce" fill="none" height="120" viewBox="0 0 100 100" width="120">
          <circle cx="50" cy="50" fill="currentColor" r="50"></circle>
        </svg>
      </div>
      <div className="absolute -right-10 top-32 opacity-40">
        <svg className="text-accent-yellow animate-bounce" fill="none" height="100" viewBox="0 0 100 100" width="100" style={{ animationDelay: "0.5s" }}>
          <path d="M50 0C55 25 75 45 100 50C75 55 55 75 50 100C45 75 25 55 0 50C25 45 45 25 50 0Z" fill="currentColor"></path>
        </svg>
      </div>

      <div className="container mx-auto px-6 max-w-6xl text-center relative z-10">
        {badge && (
          <div className="inline-flex -rotate-2 items-center rounded-full border-2 border-foreground bg-secondary text-white px-4 py-1 text-sm font-bold shadow-pop-sm mb-6">
            {badgeIcon && <span className="mr-2">{badgeIcon}</span>}
            {badge}
          </div>
        )}
        <h1 className="font-display text-5xl md:text-6xl font-black text-foreground mb-6">
          {title}{" "}
          {highlightedText && (
            <span className="text-primary relative inline-block">
              {highlightedText}
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent-yellow" fill="none" viewBox="0 0 200 9" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.00025 6.99997C29.6234 3.73719 86.9992 -1.49997 198 2.49997" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
              </svg>
            </span>
          )}
        </h1>
        {description && (
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{description}</p>
        )}
        {children}
      </div>
    </header>
  );
}

/**
 * Empty state props
 */
interface EmptyStateCardProps {
  icon: string;
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
}

/**
 * Empty state component for when no data is available
 */
export function EmptyStateCard({
  icon,
  title,
  description,
  actionText,
  actionLink,
}: EmptyStateCardProps) {
  return (
    <div className="text-center py-16 px-6">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
        <span className="material-symbols-outlined text-3xl text-gray-400">{icon}</span>
      </div>
      <h3 className="font-bold text-xl text-foreground mb-2">{title}</h3>
      <p className="text-gray-600 max-w-md mx-auto mb-6">{description}</p>
      {actionText && actionLink && (
        <Link href={actionLink}>
          <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold border-2 border-foreground shadow-pop hover:shadow-pop-hover transition-all">
            {actionText}
          </button>
        </Link>
      )}
    </div>
  );
}
