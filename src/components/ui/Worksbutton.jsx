function Worksbutton({ children, setActiveTab, activeTab, index }) {
  return (
    <button
      onClick={() => setActiveTab(index)}
      className={`cursor-pointer bg-transparent ${
        activeTab === index
          ? "text-green-400 border-b-green-300 sm: border-green-300"
          : " text-white md: border-emerald-900"
      }  lg:text-2xl lg:px-5 lg:py-2 border-b sm:border-x sm:border-b-0 hover:text-green-500/90 sm: hover:border-green-300`}
    >
      {children}
    </button>
  );
}

export default Worksbutton;
