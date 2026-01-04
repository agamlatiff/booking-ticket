import Link from "next/link";
import Image from "next/image";

/**
 * Service card props
 */
interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    category: string;
    description: string;
    icon: string;
    iconBg: string;
    iconColor: string;
    hoverColor: string;
    featured?: boolean;
  };
}

/**
 * Service card component for displaying service information
 * @example
 * <ServiceCard service={{ id: "1", name: "Scaling", ... }} />
 */
export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link href={`/layanan/${service.id}`} className="group">
      <article className="h-full flex items-start gap-4 rounded-[1.5rem] border-2 border-foreground bg-white p-5 shadow-card hover:-translate-y-1 hover:shadow-pop transition-all">
        <div className={`shrink-0 rounded-xl border-2 border-foreground p-3 ${service.iconBg} ${service.hoverColor} transition-all`}>
          <span className={`material-symbols-outlined text-2xl ${service.iconColor}`}>
            {service.icon}
          </span>
        </div>
        <div className="flex-1">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            {service.category}
          </span>
          <h3 className="text-lg font-black text-foreground mt-1 group-hover:text-primary transition-colors">
            {service.name}
          </h3>
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            {service.description}
          </p>
        </div>
      </article>
    </Link>
  );
}

/**
 * Doctor card props
 */
interface DoctorCardProps {
  doctor: {
    id: string;
    name: string;
    specialty: string;
    image: string;
    rating?: number;
    experience: string;
    patients?: string;
    badge?: string;
    badgeIcon?: string;
    badgeColor?: string;
    cardColor?: string;
    quote?: string;
  };
  variant?: "default" | "compact";
}

/**
 * Doctor card component for displaying doctor information
 * @example
 * <DoctorCard doctor={{ id: "1", name: "Dr. Siti", ... }} />
 */
export function DoctorCard({ doctor, variant = "default" }: DoctorCardProps) {
  if (variant === "compact") {
    return (
      <article className="group relative bg-white rounded-[2rem] border-2 border-foreground overflow-hidden shadow-card hover:-translate-y-1 hover:shadow-pop transition-all">
        <div className="h-48 relative overflow-hidden border-b-2 border-foreground">
          <Image
            alt={`Foto ${doctor.name} - ${doctor.specialty}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src={doctor.image}
            width={300}
            height={200}
          />
        </div>
        <div className="p-5">
          <h3 className="font-bold text-lg text-foreground">{doctor.name}</h3>
          <p className="text-sm text-gray-600">{doctor.specialty}</p>
          <p className="text-xs text-primary font-semibold mt-2">{doctor.experience}</p>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative bg-white rounded-[2rem] border-2 border-foreground overflow-hidden shadow-card hover:-translate-y-1 hover:shadow-pop transition-all">
      {doctor.badge && (
        <div className={`absolute top-4 right-4 z-10 ${doctor.badgeColor} text-xs font-bold px-3 py-1 rounded-full border border-white/30 flex items-center gap-1`}>
          {doctor.badgeIcon && (
            <span className="material-symbols-outlined text-sm">{doctor.badgeIcon}</span>
          )}
          {doctor.badge}
        </div>
      )}
      <div className={`h-56 relative overflow-hidden border-b-2 border-foreground ${doctor.cardColor}/30`}>
        <Image
          alt={`Foto ${doctor.name} - ${doctor.specialty}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={doctor.image}
          width={400}
          height={224}
        />
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl text-foreground">{doctor.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{doctor.specialty}</p>
        <div className="flex items-center gap-4 mt-3 text-sm">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-accent-yellow text-sm">star</span>
            <span className="font-bold">{doctor.rating}</span>
          </div>
          <span className="text-gray-400">|</span>
          <span className="text-gray-500">{doctor.experience}</span>
        </div>
        {doctor.quote && (
          <p className="text-gray-500 text-sm mt-4 italic border-l-2 border-primary pl-3">
            "{doctor.quote}"
          </p>
        )}
        <Link href={`/booking?doctor=${doctor.id}`}>
          <button className="w-full mt-5 bg-foreground text-white py-2.5 rounded-xl font-bold text-sm border-2 border-foreground shadow-pop-sm hover:shadow-pop-hover hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
            Booking Sekarang
          </button>
        </Link>
      </div>
    </article>
  );
}

/**
 * Feature card props
 */
interface FeatureCardProps {
  feature: {
    icon: string;
    title: string;
    description: string;
  };
  iconBg?: string;
  iconColor?: string;
}

/**
 * Feature card component for displaying feature highlights
 */
export function FeatureCard({ feature, iconBg = "bg-primary/10", iconColor = "text-primary" }: FeatureCardProps) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-gray-100">
      <div className={`shrink-0 rounded-lg ${iconBg} p-2`}>
        <span className={`material-symbols-outlined ${iconColor}`}>{feature.icon}</span>
      </div>
      <div>
        <h4 className="font-bold text-foreground">{feature.title}</h4>
        <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
      </div>
    </div>
  );
}

/**
 * Stats card props
 */
interface StatsCardProps {
  icon: string;
  value: string;
  label: string;
  iconBg?: string;
  iconColor?: string;
}

/**
 * Stats card component for displaying statistics
 */
export function StatsCard({ icon, value, label, iconBg = "bg-primary/10", iconColor = "text-primary" }: StatsCardProps) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-white border-2 border-foreground shadow-pop-sm">
      <div className={`rounded-lg ${iconBg} p-2`}>
        <span className={`material-symbols-outlined ${iconColor}`}>{icon}</span>
      </div>
      <div>
        <div className="font-black text-2xl text-foreground">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </div>
  );
}

/**
 * Testimonial card props
 */
interface TestimonialCardProps {
  testimonial: {
    name: string;
    role?: string;
    content: string;
    rating: number;
    avatar?: string;
  };
}

/**
 * Testimonial card component for displaying customer reviews
 */
export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="bg-white rounded-[1.5rem] border-2 border-foreground p-6 shadow-card">
      <div className="flex items-center gap-3 mb-4">
        {testimonial.avatar ? (
          <Image
            alt={`Avatar ${testimonial.name}`}
            className="w-12 h-12 rounded-full border-2 border-foreground object-cover"
            src={testimonial.avatar}
            width={48}
            height={48}
          />
        ) : (
          <div className="w-12 h-12 rounded-full border-2 border-foreground bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">person</span>
          </div>
        )}
        <div>
          <h4 className="font-bold text-foreground">{testimonial.name}</h4>
          {testimonial.role && (
            <p className="text-sm text-gray-500">{testimonial.role}</p>
          )}
        </div>
      </div>
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`material-symbols-outlined text-sm ${i < testimonial.rating ? "text-accent-yellow" : "text-gray-200"
              }`}
          >
            star
          </span>
        ))}
      </div>
      <p className="text-gray-600 text-sm italic">"{testimonial.content}"</p>
    </article>
  );
}
