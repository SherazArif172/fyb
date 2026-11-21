"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { PageBody } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Drawer } from "@/components/ui/Drawer";
import { fieldClasses, SearchInput } from "@/components/ui/Form";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Segmented } from "@/components/ui/Segmented";
import { Cell, TableHead } from "@/components/ui/Table";

type UserStatus = "Active" | "Blocked" | "Invited";
type User = { initials: string; name: string; email: string; dept: string; projects: number; status: UserStatus; joined: string };

const supervisors: User[] = [
  { initials: "IS", name: "Dr. Imran Shah", email: "imran.shah@university.edu", dept: "Computer Science", projects: 6, status: "Active", joined: "Aug 2023" },
  { initials: "FN", name: "Dr. Farah Naz", email: "farah.naz@university.edu", dept: "Computer Science", projects: 3, status: "Active", joined: "Jan 2024" },
  { initials: "KY", name: "Dr. Kamran Yousaf", email: "kamran.yousaf@university.edu", dept: "Software Engineering", projects: 4, status: "Active", joined: "Mar 2024" },
  { initials: "SJ", name: "Dr. Saima Javed", email: "saima.javed@university.edu", dept: "Electrical Engineering", projects: 5, status: "Active", joined: "Sep 2022" },
  { initials: "AA", name: "Dr. Adeel Akhtar", email: "adeel.akhtar@university.edu", dept: "Computer Science", projects: 0, status: "Blocked", joined: "Feb 2021" },
  { initials: "RA", name: "Dr. Rabia Anwar", email: "rabia.anwar@university.edu", dept: "Data Science", projects: 0, status: "Invited", joined: "2 days ago" },
];

const students: User[] = [
  { initials: "AK", name: "Ayesha Khan", email: "ayesha.khan@university.edu", dept: "Computer Science", projects: 3, status: "Active", joined: "Sep 2025" },
  { initials: "BA", name: "Bilal Ahmed", email: "bilal.ahmed@university.edu", dept: "Computer Science", projects: 1, status: "Active", joined: "Sep 2025" },
  { initials: "HS", name: "Hira Siddiqui", email: "hira.siddiqui@university.edu", dept: "Computer Science", projects: 1, status: "Active", joined: "Sep 2025" },
  { initials: "NF", name: "Nida Farooq", email: "nida.farooq@university.edu", dept: "Data Science", projects: 1, status: "Active", joined: "Nov 2026" },
];

const admins: User[] = [
  { initials: "SM", name: "Sana Malik", email: "sana.malik@university.edu", dept: "Graduate Office", projects: 0, status: "Active", joined: "Jan 2022" },
  { initials: "OR", name: "Omar Rehman", email: "omar.rehman@university.edu", dept: "IT Services", projects: 0, status: "Active", joined: "Jun 2023" },
];

const pill: Record<UserStatus, string> = {
  Active: "bg-teal-50 text-teal-700",
  Blocked: "bg-danger-100 text-danger",
  Invited: "bg-peach-100 text-peach-700",
};
const dot: Record<UserStatus, string> = { Active: "bg-teal-700", Blocked: "bg-danger", Invited: "bg-peach-700" };

function DrawerField({ label, icon, value, select }: { label: string; icon: IconName; value: string; select?: boolean }) {
  return (
    <label className="flex flex-col gap-[8px]">
      <span className="text-[14px] leading-normal font-medium text-ink">{label}</span>
      <span className={cn(fieldClasses(), "relative h-[48px] px-[16px] focus-within:px-[15px]")}>
        <Icon name={icon} className="shrink-0 text-muted" />
        <input defaultValue={value} className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none" />
        {select && <Icon name="chevronDown" className="shrink-0 text-muted" />}
      </span>
    </label>
  );
}

export default function UsersPage() {
  const [tab, setTab] = useState<"students" | "supervisors" | "admins">("supervisors");
  const [q, setQ] = useState("");
  const [drawer, setDrawer] = useState(true);
  const [data, setData] = useState({ students, supervisors, admins });
  const [expertise, setExpertise] = useState(["Data Science", "Time Series", "Deep Learning"]);
  const [exp, setExp] = useState("");

  const list = data[tab].filter((u) => `${u.name} ${u.email}`.toLowerCase().includes(q.toLowerCase()));
  const update = (email: string, fn: (u: User) => User | null) =>
    setData((d) => ({ ...d, [tab]: d[tab].map((u) => (u.email === email ? fn(u) : u)).filter(Boolean) as User[] }));

  return (
    <>
      <TopBar role="admin" title="Users & roles" subtitle="342 students · 24 supervisors · 2 admins" />
      <PageBody className="pt-[8px] pb-[48px]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Segmented
            value={tab}
            onChange={setTab}
            tabClassName="flex-none px-[14px]"
            options={[
              { value: "students", label: "Students 342" },
              { value: "supervisors", label: "Supervisors 24" },
              { value: "admins", label: "Admins 2" },
            ]}
          />
          <div className="flex items-center gap-[12px]">
            <SearchInput value={q} onChange={setQ} placeholder="Search by name or email" width={260} />
            {tab === "supervisors" && (
              <Button icon="plus" onClick={() => setDrawer(true)}>
                Add supervisor
              </Button>
            )}
          </div>
        </div>

        <Card className="flex flex-col p-[24px]">
          <TableHead cols={[{ label: "USER" }, { label: "DEPARTMENT", w: 170 }, { label: "PROJECTS", w: 90 }, { label: "STATUS", w: 120 }, { label: "JOINED", w: 110 }, { label: "", w: 96 }]} />
          {list.map((u) => (
            <div key={u.email} className="flex items-center gap-[16px] border-b border-line px-[16px] py-[14px]">
              <Cell className="gap-[10px]">
                <Avatar initials={u.initials} />
                <span className="flex flex-col leading-normal whitespace-nowrap">
                  <span className="text-[13.5px] font-semibold text-ink">{u.name}</span>
                  <span className="text-[12px] text-muted">{u.email}</span>
                </span>
              </Cell>
              <Cell w={170} className="text-[13.5px] leading-normal whitespace-nowrap text-ink">
                {u.dept}
              </Cell>
              <Cell w={90} className="text-[13.5px] leading-normal font-semibold text-ink">
                {u.projects}
              </Cell>
              <Cell w={120}>
                <span className={cn("flex items-center gap-[6px] rounded-full px-[10px] py-[5px] text-[12px] leading-normal font-semibold", pill[u.status])}>
                  <span className={cn("size-[7px] rounded-full", dot[u.status])} />
                  {u.status}
                </span>
              </Cell>
              <Cell w={110} className="text-[13px] leading-normal whitespace-nowrap text-muted">
                {u.joined}
              </Cell>
              <Cell w={96} className="gap-[14px]">
                <button type="button" aria-label="Edit" className="text-muted hover:text-teal-700">
                  <Icon name="edit" />
                </button>
                <button
                  type="button"
                  aria-label={u.status === "Blocked" ? "Unblock" : "Block"}
                  onClick={() => update(u.email, (x) => ({ ...x, status: x.status === "Blocked" ? "Active" : "Blocked" }))}
                  className="text-muted hover:text-teal-700"
                >
                  <Icon name={u.status === "Blocked" ? "checkCircle" : "x"} />
                </button>
                <button type="button" aria-label="Delete" onClick={() => update(u.email, () => null)} className="text-danger hover:opacity-80">
                  <Icon name="trash" />
                </button>
              </Cell>
            </div>
          ))}
        </Card>
      </PageBody>

      <Drawer open={drawer} onClose={() => setDrawer(false)}>
        <div className="flex items-center gap-[12px]">
          <span className="flex size-[46px] shrink-0 items-center justify-center rounded-[14.72px] bg-ice text-teal-700 shadow-neu-sm">
            <Icon name="userCheck" />
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-[2px] leading-normal">
            <h2 className="font-display text-[22px] font-semibold text-teal-900">Add supervisor</h2>
            <p className="text-[13px] text-muted">Only admins can create supervisor accounts</p>
          </div>
          <button type="button" aria-label="Close" onClick={() => setDrawer(false)} className="text-muted hover:text-ink">
            <Icon name="x" />
          </button>
        </div>
        <DrawerField label="Full name" icon="user" value="Dr. Rabia Anwar" />
        <DrawerField label="University email" icon="globe" value="rabia.anwar@university.edu" />
        <DrawerField label="Department" icon="layers" value="Data Science" select />
        <div className="flex flex-col gap-[8px]">
          <span className="text-[14px] leading-normal font-medium text-ink">Expertise</span>
          <div className="neu-inset flex flex-wrap items-center gap-[8px] rounded-[14px] border border-field px-[12px] py-[10px]">
            {expertise.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => setExpertise(expertise.filter((x) => x !== e))}
                className="rounded-full bg-ice px-[12px] py-[6px] text-[13px] leading-normal font-medium text-teal-700 shadow-neu-sm"
                title="Remove"
              >
                {e}
              </button>
            ))}
            <input
              value={exp}
              onChange={(ev) => setExp(ev.target.value)}
              onKeyDown={(ev) => {
                if (ev.key === "Enter" && exp.trim()) {
                  setExpertise([...expertise, exp.trim()]);
                  setExp("");
                }
              }}
              placeholder="Add…"
              className="min-w-[80px] flex-1 bg-transparent py-[4px] text-[14px] text-ink outline-none"
            />
          </div>
        </div>
        <DrawerField label="Maximum projects" icon="folder" value="6" />
        <div className="neu-inset flex items-start gap-[10px] rounded-[14px] p-[14px]">
          <Icon name="send" className="shrink-0 text-teal-700" />
          <p className="flex-1 text-[12.5px] leading-[18px] text-teal-700">
            They’ll get an email invite to set their password, then appear here as Active.
          </p>
        </div>
        <div className="min-h-px flex-1" />
        <div className="flex justify-end gap-[12px]">
          <Button variant="ghost" onClick={() => setDrawer(false)}>
            Cancel
          </Button>
          <Button icon="send" onClick={() => setDrawer(false)}>
            Send invite
          </Button>
        </div>
      </Drawer>
    </>
  );
}
