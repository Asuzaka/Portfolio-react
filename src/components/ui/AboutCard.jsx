function AboutCard({ title, children }) {
  return (
    <div className="flex flex-col items-center justify-items-start text-center max-w-3xs lg:max-w-[300px]">
      <span className="bg-gray-700/75 rounded-sm px-4 py-2 text-emerald-500 text-lg drop-shadow-md">
        {title}:
      </span>
      <h3 className="text-lg italic text-white py-3 flex gap-2">{children}</h3>
    </div>
  );
}

export default AboutCard;
