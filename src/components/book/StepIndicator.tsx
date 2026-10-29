import { Check } from "lucide-react";

export type BookingStep = 1 | 2 | 3;

const defaultLabels = ["Choose scooter", "Your details", "Review & send"];

type Props = {
  step: BookingStep;
  labels?: readonly string[];
  onStepSelect?: (step: BookingStep) => void;
};

export function StepIndicator({
  step,
  labels = defaultLabels,
  onStepSelect,
}: Props) {
  return (
    <nav aria-label="Booking progress" className="mb-9">
      <ol className="flex items-start">
        {defaultLabels.map((fallback, index) => {
          const number = (index + 1) as BookingStep;
          const complete = step > number;
          const current = step === number;
          const label = labels[index] ?? fallback;
          return (
            <li
              key={number}
              aria-current={current ? "step" : undefined}
              className={`relative flex min-w-0 flex-1 flex-col items-center text-center ${
                index < defaultLabels.length - 1
                  ? `after:absolute after:left-[calc(50%+18px)] after:right-[calc(-50%+18px)] after:top-[17px] after:z-0 after:h-0.5 after:content-[''] ${
                      complete ? "after:bg-brand-red" : "after:bg-[#D0D3DA]"
                    }`
                  : ""
              }`}
            >
              {complete && onStepSelect ? (
                <button
                  type="button"
                  onClick={() => onStepSelect(number)}
                  aria-label={`Return to step ${number}: ${label}`}
                  className="relative z-10 inline-flex size-9 items-center justify-center rounded-full border-2 border-brand-red bg-brand-red text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                >
                  <Check aria-hidden="true" className="size-4" />
                </button>
              ) : (
                <span
                  className={`relative z-10 inline-flex size-9 items-center justify-center rounded-full border-2 text-sm font-bold ${
                    current
                      ? "border-brand-red bg-white text-brand-red"
                      : complete
                        ? "border-brand-red bg-brand-red text-white"
                        : "border-[#DADCE2] bg-white text-[#777B84]"
                  }`}
                >
                  {complete ? <Check aria-hidden="true" className="size-4" /> : number}
                </span>
              )}
              <span className={`mt-2 text-[11px] font-semibold leading-4 sm:text-sm ${
                current ? "text-brand-black" : "text-[#777B84]"
              }`}>
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
