"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bell,
  CalendarCheck,
  CalendarDays,
  Check,
  ChevronRight,
  ClipboardCheck,
  CreditCard,
  ExternalLink,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LifeBuoy,
  Loader2,
  LogOut,
  Menu,
  Settings,
  UserRound,
  Wallet,
  X,
} from "lucide-react";

import { Logo } from "@/components/site/logo";
import { ThemeToggle } from "@/components/providers/theme-toggle";
import { useAuth } from "@/components/providers/auth-provider";
import { portalNav } from "@/lib/data/navigation";
import { notifications } from "@/lib/data/portal";
import { cn, formatShortDate } from "@/lib/utils";

const iconMap = {
  "layout-dashboard": LayoutDashboard,
  user: UserRound,
  "clipboard-check": ClipboardCheck,
  "calendar-check": CalendarCheck,
  "graduation-cap": GraduationCap,
  "calendar-days": CalendarDays,
  wallet: Wallet,
  "file-text": FileText,
  "credit-card": CreditCard,
  "life-buoy": LifeBuoy,
} as const;

export function PortalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, ready, logout } = useAuth();
  const [mobileOpenPath, setMobileOpenPath] = useState<string | null>(null);
  const [notificationsOpenPath, setNotificationsOpenPath] = useState<string | null>(null);
  const [userMenuOpenPath, setUserMenuOpenPath] = useState<string | null>(null);
  const [readIds, setReadIds] = useState<string[]>([]);
  const mobileOpen = mobileOpenPath === pathname;
  const notificationsOpen = notificationsOpenPath === pathname;
  const userMenuOpen = userMenuOpenPath === pathname;
  const setMobileOpen = (open: boolean) => setMobileOpenPath(open ? pathname : null);

  useEffect(() => {
    if (ready && !user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [ready, user, pathname, router]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  if (!ready || !user) {
    return (
      <div className="grid min-h-screen place-items-center bg-background">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="size-6 animate-spin text-primary" />
          <p className="text-sm">A preparar a tua área…</p>
        </div>
      </div>
    );
  }

  const activeItem =
    portalNav.find((item) => item.href === pathname) ??
    portalNav.find((item) => item.href !== "/portal" && pathname.startsWith(item.href));
  const unread = notifications.filter((item) => !item.read && !readIds.includes(item.id)).length;

  function handleLogout() {
    logout();
    router.push("/login");
  }

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-5 py-5">
        <Logo variant="light" />
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="grid size-9 place-items-center rounded-full text-white/60 hover:bg-white/10 lg:hidden"
          aria-label="Fechar menu"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="mx-4 mb-4 rounded-2xl border border-white/10 bg-white/[0.05] p-3">
        <p className="text-xs font-medium text-sand-300">
          Portal do Estudante
        </p>
        <p className="mt-1 text-sm font-semibold text-white">{user.name}</p>
        <p className="text-[0.7rem] text-white/50">{user.studentNumber}</p>
      </div>

      <nav className="scrollbar-thin flex-1 overflow-y-auto px-3 pb-4" aria-label="Navegação do portal">
        <p className="px-3 pb-1.5 pt-2 text-xs font-medium text-white/40">
          Área pessoal
        </p>
        {portalNav.slice(0, 2).map((item) => (
          <SidebarLink key={item.href} item={item} pathname={pathname} />
        ))}
        <p className="px-3 pb-1.5 pt-4 text-xs font-medium text-white/40">
          Serviços académicos
        </p>
        {portalNav.slice(2).map((item) => (
          <SidebarLink key={item.href} item={item} pathname={pathname} />
        ))}
      </nav>

      <div className="border-t border-white/10 p-3">
        <Link
          href="/"
          className="mb-1 flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft className="size-4" />
          Voltar ao site
          <ExternalLink className="ml-auto size-3.5" />
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-white/60 transition-colors hover:bg-ember-500/15 hover:text-ember-200"
        >
          <LogOut className="size-4" />
          Terminar sessão
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/30">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 bg-brand-950 lg:block">

        <div className="relative h-full">{sidebar}</div>
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-brand-950/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-72 animate-in slide-in-from-left bg-brand-950 shadow-2xl">

            <div className="relative h-full">{sidebar}</div>
          </aside>
        </div>
      ) : null}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-xl">
          <div className="flex h-16 items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menu"
              className="grid size-9 place-items-center rounded-xl border border-border text-foreground lg:hidden"
            >
              <Menu className="size-5" />
            </button>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="hidden sm:inline">Portal</span>
                <ChevronRight className="hidden size-3 sm:inline" />
                <span className="truncate font-semibold text-foreground">
                  {activeItem?.label ?? "Visão geral"}
                </span>
              </div>
            </div>

            <ThemeToggle className="border-border bg-card text-foreground hover:bg-muted" />

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setNotificationsOpenPath((current) => (current === pathname ? null : pathname));
                  setUserMenuOpenPath(null);
                }}
                aria-label={`Notificações${unread ? ` (${unread} não lidas)` : ""}`}
                aria-expanded={notificationsOpen}
                className="relative grid size-9 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
              >
                <Bell className="size-4" />
                {unread > 0 ? (
                  <span className="absolute right-2 top-2 size-2 rounded-full bg-ember-500 ring-2 ring-card" />
                ) : null}
              </button>
              {notificationsOpen ? (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setNotificationsOpenPath(null)} />
                  <div className="absolute right-0 top-11 z-40 w-80 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
                    <div className="flex items-center justify-between border-b border-border px-4 py-3">
                      <p className="text-sm font-semibold">Notificações</p>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((item) => {
                        const read = item.read || readIds.includes(item.id);
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setReadIds((ids) => [...new Set([...ids, item.id])])}
                            className={cn(
                              "flex w-full gap-3 border-b border-border px-4 py-3 text-left transition-colors last:border-0 hover:bg-muted/60",
                              !read && "bg-brand-50/40 dark:bg-brand-950/30",
                            )}
                          >
                            <span
                              className={cn(
                                "mt-1 grid size-7 shrink-0 place-items-center rounded-lg",
                                !read
                                  ? "bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-200"
                                  : "bg-muted text-muted-foreground",
                              )}
                            >
                              {read ? <Check className="size-3.5" /> : <Bell className="size-3.5" />}
                            </span>
                            <span className="min-w-0">
                              <span className="block text-xs font-semibold leading-snug">{item.title}</span>
                              <span className="mt-0.5 block text-[0.7rem] leading-snug text-muted-foreground">
                                {item.description}
                              </span>
                              <span className="mt-1 block text-[0.6rem] text-muted-foreground/70">
                                {formatShortDate(item.date)}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : null}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setUserMenuOpenPath((current) => (current === pathname ? null : pathname));
                  setNotificationsOpenPath(null);
                }}
                aria-label="Menu da conta"
                aria-expanded={userMenuOpen}
                className="flex items-center gap-2 rounded-md border border-border bg-card p-1 pr-2.5 transition-colors hover:border-brand-300"
              >
                <span className="grid size-7 place-items-center rounded-md bg-brand-700 text-xs font-bold text-white">
                  {user.avatarInitials}
                </span>
                <span className="hidden text-xs font-semibold sm:inline">
                  {user.name.split(" ")[0]}
                </span>
              </button>
              {userMenuOpen ? (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setUserMenuOpenPath(null)} />
                  <div className="absolute right-0 top-11 z-40 w-60 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
                    <div className="border-b border-border px-4 py-3">
                      <p className="text-sm font-semibold">{user.name}</p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="p-1.5">
                      <Link href="/portal/perfil" className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                        <UserRound className="size-4" />
                        O meu perfil
                      </Link>
                      <Link href="/portal/documentos" className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                        <FileText className="size-4" />
                        Documentos
                      </Link>
                      <Link href="/portal/helpdesk" className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                        <Settings className="size-4" />
                        Helpdesk
                      </Link>
                    </div>
                    <div className="border-t border-border p-1.5">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-ember-600 transition-colors hover:bg-ember-50 dark:text-ember-300 dark:hover:bg-ember-900/40"
                      >
                        <LogOut className="size-4" />
                        Terminar sessão
                      </button>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">{children}</main>

        <footer className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-3 border-t border-border pt-5 text-[0.7rem] text-muted-foreground sm:flex-row">
            <p>© {new Date().getFullYear()} UPSantarém · Portal Académico (demonstração)</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/privacidade" className="hover:text-foreground">Privacidade</Link>
              <Link href="/legislacao" className="hover:text-foreground">Legislação</Link>
              <Link href="/portal/helpdesk" className="hover:text-foreground">Apoio</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function SidebarLink({
  item,
  pathname,
}: {
  item: (typeof portalNav)[number];
  pathname: string;
}) {
  const Icon = iconMap[item.icon as keyof typeof iconMap] ?? LayoutDashboard;
  const active = item.href === pathname;
  return (
    <Link
      href={item.href}
      className={cn(
        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
        active
          ? "bg-white/10 font-semibold text-white"
          : "text-white/60 hover:bg-white/[0.06] hover:text-white",
      )}
    >
      <Icon className={cn("size-4 shrink-0", active ? "text-sand-300" : "text-white/40 group-hover:text-white/70")} />
      <span className="flex-1">{item.label}</span>
      {active ? <span className="size-1.5 rounded-full bg-sand-300" /> : null}
    </Link>
  );
}
