export default function InfoCard({ name, number, icon, label, labelIcon }) {
  return (
    <div className="mx-auto bg-card-color w-[278px] py-3 px-10 rounded-[10px] space-y-3">
      <div className="flex justify-between">
        <div className="title font-bold">
          <h2>{name}</h2>
          <h2>{number}</h2>
        </div>
        <img src={icon} alt="icon" />
      </div>
      <div className="flex gap-2">
        {labelIcon && <img src={labelIcon} alt="icon" />}
        <p className="text-[12px]">{label}</p>
      </div>
    </div>
  );
}
