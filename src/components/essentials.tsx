import { Fragment } from "react";
import { essentials } from "@/content/site";

export function Essentials() {
  return (
    <div className="essentials wrap">
      <span>{essentials.label}</span>
      <p>
        {essentials.items.map((item, i) => (
          <Fragment key={item}>
            {i > 0 && <> <i>·</i> </>}
            {item}
          </Fragment>
        ))}
      </p>
    </div>
  );
}
