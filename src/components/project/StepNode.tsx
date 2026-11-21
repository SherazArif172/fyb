import { Icon } from "@/components/ui/Icon";

export type StepState = "done" | "current" | "todo";

/* Milestone node: done = teal + check, current = peach, todo = inset well */
export function StepNode({ state, size = 28 }: { state: StepState; size?: number }) {
  if (state === "done")
    return (
      <span
        className="flex shrink-0 items-center justify-center rounded-full bg-teal-700 text-inverse shadow-neu-sm"
        style={{ width: size, height: size }}
      >
        <Icon name="check" size={14} strokeWidth={2.2} />
      </span>
    );
  if (state === "current")
    return <span className="shrink-0 rounded-full bg-peach-500 shadow-neu-sm" style={{ width: size, height: size }} />;
  return <span className="neu-inset shrink-0 rounded-full" style={{ width: size, height: size }} />;
}
