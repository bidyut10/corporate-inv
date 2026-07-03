import { useNavigate } from "react-router-dom";
import paperdocLogo from "../../assets/paperdoc-logo.png";

const Logo = ({ className = "h-12 w-auto" }) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/")}
      className="cursor-pointer transition-opacity hover:opacity-90 select-none"
    >
      <img src={paperdocLogo} alt="Paperdoc" className={className} />
    </button>
  );
};

export default Logo;
