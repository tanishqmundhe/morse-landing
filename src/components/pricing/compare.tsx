import { Tick02Icon } from "@hugeicons/core-free-icons";
import { pricing } from "@/content/site";
import { Icon } from "../ui";

const { compare, plans } = pricing;

/** "Yes" earns a tick, "—" stays a dash, anything else is just the words. */
function Value({ text }: { text: string }) {
  if (text === "Yes") return <Icon icon={Tick02Icon} className="size-[19px] text-ink" />;
  if (text === "—") return <span className="text-ink-faint">—</span>;
  return <span className="text-ink">{text}</span>;
}

const COL = "grid grid-cols-[1.6fr_repeat(3,1fr)] gap-6 px-6 sm:px-8";

/**
 * Every line of the three plans, side by side. Grouped, because sixteen rows
 * in one run is a wall; each group opens with its own raised header so the eye
 * has somewhere to rest. On a narrow screen the whole thing scrolls sideways
 * rather than folding, because a comparison that can't be compared is no use.
 */
export function Compare() {
  return (
    <div className="mt-14 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="min-w-[820px]">
        <div className={`${COL} items-end pb-5`}>
          <span />
          {plans.map((plan) => (
            <p key={plan.id} className="font-mono text-label text-ink-faint uppercase">
              {plan.name}
            </p>
          ))}
        </div>

        {compare.groups.map((group, i) => (
          <section key={group.title}>
            <div className={`${COL} rounded-[18px] bg-raised py-5`}>
              <div className="col-span-4">
                <p className="flex items-baseline gap-3">
                  <span className="font-mono text-label text-ink-faint tabular-nums">{String(i + 1).padStart(3, "0")}</span>
                  <span className="text-[22px]/[1.25] font-light text-ink">{group.title}</span>
                </p>
                <p className="mt-1.5 text-[16px] text-ink-soft">{group.note}</p>
              </div>
            </div>

            <dl>
              {group.rows.map((row) => (
                <div key={row.label} className={`${COL} items-center border-b border-hairline py-5 text-[17px]`}>
                  <dt className="text-ink-soft">{row.label}</dt>
                  {row.values.map((value, j) => (
                    <dd key={plans[j].id}>
                      <Value text={value} />
                    </dd>
                  ))}
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
