import { FC, useState, useEffect } from "react";
import { ArrowUpIcon } from "@heroicons/react/outline";

const ScrollToTop: FC = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 600) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      {showTopBtn && (
        <div
          className="fixed bottom-5 right-5 z-50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-black text-white opacity-50"
          onClick={goToTop}
        >
          <ArrowUpIcon className="h-8 w-8" />
        </div>
      )}
    </>
  );
};

export default ScrollToTop;
