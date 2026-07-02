import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/")}
      className="font-mono text-lg font-medium text-neutral-950 cursor-pointer transition-opacity hover:opacity-70"
    >
      Paperdoc
    </button>
  );
};

export default Logo;
