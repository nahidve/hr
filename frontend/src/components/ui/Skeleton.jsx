import React from "react";

export function SkeletonLine({ className = "h-4 w-full" }) {
  return (
    <div className={`animate-pulse rounded bg-soft-stone/70 ${className}`} />
  );
}

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-canvas">
      {/* Hero Header Skeleton */}
      <div className="border-b border-hairline bg-canvas py-12">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="h-3 w-28 bg-soft-stone/70 rounded mb-2 animate-pulse" />
          <div className="h-10 w-3/4 sm:w-1/2 bg-soft-stone/70 rounded mb-3 animate-pulse" />
          <div className="h-4 w-2/3 sm:w-1/3 bg-soft-stone/70 rounded animate-pulse" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 space-y-12">
        {/* Metrics Grid Skeleton (7 Items) */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="border border-hairline bg-canvas p-5 rounded-sm animate-pulse flex flex-col justify-between h-28"
            >
              <div>
                <div className="h-2.5 w-16 bg-soft-stone/70 rounded mb-2" />
                <div className="h-7 w-8 bg-soft-stone/70 rounded" />
              </div>
              <div className="flex justify-end">
                <div className="h-4 w-4 bg-soft-stone/70 rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid Content Skeleton */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Recent Employees Box */}
              <div className="border border-hairline bg-canvas p-6 rounded-sm space-y-4 animate-pulse">
                <div className="h-4 w-32 bg-soft-stone/70 rounded pb-1 border-b border-hairline" />
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-soft-stone/70" />
                      <div className="space-y-1.5">
                        <div className="h-3 w-24 bg-soft-stone/70 rounded" />
                        <div className="h-2.5 w-32 bg-soft-stone/70 rounded" />
                      </div>
                    </div>
                    <div className="h-4 w-12 bg-soft-stone/70 rounded" />
                  </div>
                ))}
              </div>

              {/* Leave Requests Box */}
              <div className="border border-hairline bg-canvas p-6 rounded-sm space-y-4 animate-pulse">
                <div className="h-4 w-32 bg-soft-stone/70 rounded pb-1 border-b border-hairline" />
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between py-1">
                    <div className="space-y-1.5">
                      <div className="h-3.5 w-20 bg-soft-stone/70 rounded" />
                      <div className="h-2.5 w-28 bg-soft-stone/70 rounded" />
                    </div>
                    <div className="h-4 w-14 bg-soft-stone/70 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Line Chart Analytics Box */}
            <div className="border border-hairline bg-canvas p-6 rounded-sm h-80 animate-pulse flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="h-4 w-32 bg-soft-stone/70 rounded" />
                <div className="h-2.5 w-44 bg-soft-stone/70 rounded" />
              </div>
              <div className="h-48 bg-soft-stone/30 rounded border border-hairline flex items-end p-4">
                <div className="w-full h-1 bg-soft-stone/70" />
              </div>
            </div>
          </div>

          {/* Right Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Department Allocation Doughnut */}
            <div className="border border-hairline bg-canvas p-6 rounded-sm animate-pulse flex flex-col items-center justify-between h-96">
              <div className="h-4 w-36 bg-soft-stone/70 rounded self-start pb-1 border-b border-hairline" />
              <div className="h-44 w-44 rounded-full border-[18px] border-soft-stone/40 flex items-center justify-center" />
              <div className="w-full grid grid-cols-2 gap-2 mt-4">
                <div className="h-3 w-16 bg-soft-stone/70 rounded" />
                <div className="h-3 w-20 bg-soft-stone/70 rounded" />
                <div className="h-3 w-14 bg-soft-stone/70 rounded" />
                <div className="h-3 w-18 bg-soft-stone/70 rounded" />
              </div>
            </div>

            {/* Top Skills Bar Chart */}
            <div className="border border-hairline bg-canvas p-6 rounded-sm animate-pulse flex flex-col justify-between h-80">
              <div className="h-4 w-32 bg-soft-stone/70 rounded pb-1 border-b border-hairline" />
              <div className="flex items-end justify-between gap-4 h-48 px-4">
                <div className="h-24 w-8 bg-soft-stone/70 rounded-t" />
                <div className="h-36 w-8 bg-soft-stone/70 rounded-t" />
                <div className="h-16 w-8 bg-soft-stone/70 rounded-t" />
                <div className="h-40 w-8 bg-soft-stone/70 rounded-t" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EmployeeDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-canvas">
      {/* Header Banner Skeleton */}
      <div className="border-b border-hairline bg-soft-stone/30 py-12">
        <div className="mx-auto max-w-5xl px-6 md:px-8 animate-pulse space-y-4">
          <div className="h-3 w-24 bg-soft-stone/70 rounded" />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <div className="h-10 w-48 bg-soft-stone/70 rounded" />
              <div className="h-3.5 w-32 bg-soft-stone/70 rounded" />
            </div>
            <div className="h-8 w-24 bg-soft-stone/70 rounded-full" />
          </div>
        </div>
      </div>

      {/* Main Details Body Skeleton */}
      <div className="mx-auto max-w-5xl px-6 py-12 md:px-8">
        <div className="grid gap-8 md:grid-cols-12">
          {/* Main Info (8 cols) */}
          <div className="md:col-span-8 space-y-8 animate-pulse">
            <div className="space-y-4 border-b border-hairline pb-8">
              <div className="h-3.5 w-44 bg-soft-stone/70 rounded" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-soft-stone/70 rounded" />
                <div className="h-4 w-full bg-soft-stone/70 rounded" />
                <div className="h-4 w-3/4 bg-soft-stone/70 rounded" />
              </div>
            </div>

            <div className="space-y-4 border-b border-hairline pb-8">
              <div className="h-3.5 w-32 bg-soft-stone/70 rounded" />
              <div className="h-48 bg-soft-stone/30 rounded border border-hairline p-4 space-y-2">
                <div className="h-3 w-full bg-soft-stone/70 rounded" />
                <div className="h-3 w-5/6 bg-soft-stone/70 rounded" />
                <div className="h-3 w-11/12 bg-soft-stone/70 rounded" />
                <div className="h-3 w-3/4 bg-soft-stone/70 rounded" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="h-3.5 w-36 bg-soft-stone/70 rounded" />
              <div className="border border-hairline p-6 rounded-sm bg-canvas space-y-3">
                <div className="h-2.5 w-48 bg-soft-stone/70 rounded" />
                <div className="h-6 w-32 bg-soft-stone/70 rounded" />
                <div className="h-3.5 w-full bg-soft-stone/70 rounded" />
              </div>
            </div>
          </div>

          {/* Sidebar Insights (4 cols) */}
          <div className="md:col-span-4 space-y-8 animate-pulse">
            {/* Skills */}
            <div className="border border-hairline p-6 rounded-sm bg-canvas space-y-4">
              <div className="h-3.5 w-24 bg-soft-stone/70 rounded pb-1 border-b border-hairline" />
              <div className="flex flex-wrap gap-1.5">
                <div className="h-6 w-16 bg-soft-stone/70 rounded-full" />
                <div className="h-6 w-12 bg-soft-stone/70 rounded-full" />
                <div className="h-6 w-20 bg-soft-stone/70 rounded-full" />
                <div className="h-6 w-14 bg-soft-stone/70 rounded-full" />
              </div>
            </div>

            {/* Competency Radar */}
            <div className="border border-hairline p-6 rounded-sm bg-canvas space-y-4 flex flex-col items-center">
              <div className="h-3.5 w-24 bg-soft-stone/70 rounded pb-1 border-b border-hairline self-start w-full" />
              <div className="h-36 w-36 rounded-full border border-soft-stone/50 bg-soft-stone/10 flex items-center justify-center" />
            </div>

            {/* AI Resume Metrics */}
            <div className="border border-hairline p-6 rounded-sm bg-canvas space-y-6">
              <div className="h-3.5 w-28 bg-soft-stone/70 rounded pb-1 border-b border-hairline" />
              <div className="space-y-2">
                <div className="h-2.5 w-20 bg-soft-stone/70 rounded" />
                <div className="h-4 w-32 bg-soft-stone/70 rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-2.5 w-16 bg-soft-stone/70 rounded" />
                <div className="flex gap-1.5">
                  <div className="h-4 w-12 bg-soft-stone/70 rounded" />
                  <div className="h-4 w-16 bg-soft-stone/70 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
