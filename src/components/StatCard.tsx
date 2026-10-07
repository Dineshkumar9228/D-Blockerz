type StatCardProps = {
  label: string
  value: number
}

function StatCard({
  label,
  value,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-3.5">
      <p className="truncate text-[11px] font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold tracking-tight text-white">
        {value.toLocaleString()}
      </p>
    </div>
  )
}

export default StatCard
