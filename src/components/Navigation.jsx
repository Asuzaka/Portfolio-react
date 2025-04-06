// Import components
import LanguageSelection from "./LanguageSelection";
import Logo from "./ui/Logo";
import ThemeSwitch from "./ui/ThemeSwitch";

function Navigation() {
  return (
    <nav className="flex column items-center justify-between py-3 px-2 z-10">
      <Logo />
      <div className="flex column items-center gap-4">
        <LanguageSelection />
        <ThemeSwitch />
      </div>
    </nav>
  );
}

export default Navigation;
