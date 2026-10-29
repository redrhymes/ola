import { Bike, IndianRupee, UserCog, Wrench } from "lucide-react";
import { site } from "@/data/site";

const iconMap = {
  bike: Bike,
  finance: IndianRupee,
  assistance: UserCog,
  service: Wrench,
} as const;

export function QuickActions() {
  return (
    <section
      id="quick-actions"
      aria-labelledby="quick-actions-title"
      className="bg-white py-10 md:py-12 lg:py-16"
    >
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <h2 id="quick-actions-title" className="sr-only">
          Quick actions
        </h2>

        <nav aria-label="Quick actions" className="w-full">
          <ul className="grid w-full gap-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {site.quickActions.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap];

              return (
                <li
                  key={item.id}
                  className={[
                    "border-b border-border last:border-b-0",
                    "md:[&:nth-child(-n+2)]:border-b md:[&:nth-child(n+3)]:border-b-0",
                    "md:[&:nth-child(odd)]:border-r md:[&:nth-child(odd)]:border-border",
                    "md:[&:nth-child(even)]:border-r-0",
                    "lg:border-b-0",
                    "lg:border-r lg:border-border lg:last:border-r-0",
                  ].join(" ")}
                >
                  <a
                    href={item.href}
                    className="group flex flex-col items-center justify-center text-center px-4 py-6 transition-all duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red md:min-h-[220px]"
                    aria-label={item.title}
                  >
                    <span className="inline-flex size-16 shrink-0 items-center justify-center rounded-full bg-surface text-brand-black transition-colors duration-200 group-hover:bg-[#FCEAEA] group-hover:text-brand-red group-focus-visible:bg-[#FCEAEA] group-focus-visible:text-brand-red">
                      <Icon aria-hidden="true" className="h-7 w-7 stroke-[1.5]" />
                    </span>

                    <span className="mt-4 text-base font-semibold text-brand-black transition-colors duration-200 group-hover:text-brand-red group-focus-visible:text-brand-red group-hover:underline group-focus-visible:underline group-hover:decoration-brand-red group-focus-visible:decoration-brand-red group-hover:underline-offset-4 group-focus-visible:underline-offset-4">
                      {item.title}
                    </span>

                    <span className="mt-2 max-w-[220px] text-sm leading-5 text-muted transition-colors duration-200 group-hover:text-brand-black group-focus-visible:text-brand-black">
                      {item.description}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </section>
  );
}
