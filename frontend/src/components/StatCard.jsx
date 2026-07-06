import CountUp from './ui/CountUp';

export default function StatCard({ title, value, icon: Icon }) {
  const isNumber = typeof value === 'number';

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          {isNumber ? (
            <p className="mt-1 text-3xl font-semibold text-slate-900">
              <CountUp to={value} className="count-up-text" />
            </p>
          ) : (
            <p className="mt-1 text-3xl font-semibold text-slate-900">{value}</p>
          )}
        </div>
        {Icon && (
          <div className="rounded-lg bg-slate-100 p-3">
            <Icon className="h-5 w-5 text-slate-600" />
          </div>
        )}
      </div>
    </div>
  );
}